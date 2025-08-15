"use client";

import { useEffect, useMemo, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { DemoTarget, getDemoTarget, type DemoMode } from "@/lib/demo/config";
import { DemoToolbar } from "@/components/demo/demo-toolbar";
import { DefaultDemo } from "@/components/demo/default-demo";
import { EstoPhoenixDemo } from "@/components/demo/esto-phoenix-demo";
import { DemoNotFound } from "@/components/demo/demo-not-found";
import { DemoOverlay } from "@/components/demo/demo-overlay";
import { DemoIframe } from "@/components/demo/demo-iframe";
import { useDemoState, useDemoAnalytics, useDemoModeRouting } from "@/components/demo/hooks";
import { Animate } from "@/components/ui/animate";
import { Walkthrough } from "./walkthrough";

interface DemoPageClientProps {
  slug: string;
}

// Walkthrough configuration - will be updated with target-specific message
const createWalkthroughSteps = (target: DemoTarget) => [
  {
    id: "click-widget",
    message: "To begin, click the chat widget below",
    position: "top" as const,
    ctaButton: {
      text: "Click the Widget",
      action: "click" as const,
      target: ".logo-toggle",
    },
  },
  {
    id: "send-message",
    message: "Great! Now let's send a message",
    position: "bottom" as const,
    ctaButton: {
      text: "Send a message",
      action: "sendMessage" as const,
      target: ".chatbot-input",
      value: target.testMessage,
    },
  },
];

/**
 * Client-side demo host with policy- & query-driven routing between
 * proxy, iframe, and default modes. Designed for clarity and "performant enough".
 */
function DemoPageClient({ slug }: DemoPageClientProps) {
  const demoState = useDemoState(slug);
  const { trackView, trackSuccess, logEvent } = useDemoAnalytics(slug);
  const searchParams = useSearchParams();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const target = useMemo(() => getDemoTarget(slug), [slug]);

  // Memoize the allowSkip value since it won't change during component lifecycle
  const allowSkip = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(`${slug}WalkthroughComplete`) === 'true';
  }, [slug]);

  // Set widgetViewState to collapsed when demo page opens
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('widgetViewState', 'chatbot-collapsed');
    }
  }, []);

  const markSuccessWithAnalytics = useCallback(
    async (successMode: DemoMode) => {
      await trackSuccess(slug, successMode);
      demoState.markSuccess(successMode);
    },
    [slug, demoState, trackSuccess]
  );

  const { tryProxy, tryIframe } = useDemoModeRouting({
    slug,
    target,
    settledRef: demoState.settledRef,
    setMode: demoState.setMode,
    setIsLoading: demoState.setIsLoading,
    markSuccess: markSuccessWithAnalytics,
    trackView,
    logEvent,
  });

  // Handle forced demo modes
  const handleForcedMode = useCallback((forceMode: DemoMode) => {
    switch (forceMode) {
      case "proxy": {
        const cleanup = tryProxy();
        return () => cleanup?.();
      }
      case "iframe": {
        const cleanup = tryIframe();
        return () => cleanup?.();
      }
      case "default": {
        trackView("default");
        markSuccessWithAnalytics("default");
        return () => { };
      }
      default:
        return () => { };
    }
  }, [tryProxy, tryIframe, trackView, markSuccessWithAnalytics]);

  // Main demo logic: try proxy first, fallback to iframe/default
  useEffect(() => {
    if (!target) return;

    // Check for forced mode
    const forceMode = searchParams.get("force") as DemoMode | null;
    if (forceMode) {
      return handleForcedMode(forceMode);
    }

    // Handle policy-driven mode
    if (target.policy && target.policy !== "auto") {
      return handleForcedMode(target.policy);
    }

    // Auto mode: try proxy first
    const cleanup = tryProxy();
    return () => cleanup?.();
    // NOTE: searchParams is intentionally read-only (Next provides referential stability)
  }, [slug, target, searchParams, tryProxy, handleForcedMode]);

  // Handle guidance completion
  const handleGuidanceComplete = useCallback(() => {
    // Store walkthrough completion status for this specific demo
    localStorage.setItem(`${slug}WalkthroughComplete`, 'true');

    demoState.setShowWalkthrough(false);
    demoState.setMode("default");
    demoState.setIsLoading(false);
    localStorage.setItem('widgetViewState', 'chatbot-collapsed');
    console.log('[Demo] Guidance sequence completed, switching to default demo mode');
  }, [demoState, slug]);

  if (!target) {
    return <DemoNotFound slug={slug} />;
  }

  const src = demoState.mode === "proxy" ? `/api/demo/site/${encodeURIComponent(slug)}` : target.url;
  const showOverlay = demoState.isLoading || demoState.showWelcomeOverlay;
  const isDefaultMode = demoState.mode === "default" && !demoState.isLoading;

  const renderDemoContent = () => {
    if (isDefaultMode) {
      const demoVariant = target.variant || "default";

      return (
        <Animate
          className="absolute inset-0"
          name="fadeIn"
          trigger="onLoad"
          duration={800}
        >
          {demoVariant === "estoPhoenix" ? (
            <EstoPhoenixDemo
              targetLabel={target.label}
              scriptTag={target.scriptTag}
            />
          ) : (
            <DefaultDemo
              targetLabel={target.label}
              scriptTag={target.scriptTag}
            />
          )}
        </Animate>
      );
    }

    return (
      <DemoIframe
        key={src} // force remount on src change to reset listeners/load
        ref={iframeRef}
        src={src}
        title={`Demo: ${target.label}`}
        mode={demoState.mode}
        onLoad={() => {
          if (demoState.mode === "iframe") demoState.setIsLoading(false);
        }}
      />
    );
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col" data-testid="demo-page-client">
      <DemoToolbar
        label={target.label}
        originalUrl={target.url}
        mode={demoState.mode}
      />

      <div className="relative flex-1 min-h-0 overflow-hidden">
        {/* Unified Loading/Welcome Overlay - Shows in ALL modes */}
        {showOverlay && (
          <DemoOverlay
            isLoading={demoState.isLoading}
            onWelcomeComplete={() => {
              demoState.setShowWelcomeOverlay(false);
              demoState.setShowWalkthrough(true);
            }}
          />
        )}

        {/* Walkthrough - Shows after welcome overlay completes */}
        {/* allowSkip is true when user has previously completed this demo's walkthrough */}
        {demoState.showWalkthrough && (
          <Walkthrough
            steps={createWalkthroughSteps(target)}
            onComplete={handleGuidanceComplete}
            isDefaultMode={isDefaultMode}
            allowSkip={allowSkip}
          />
        )}

        {/* Demo Content - All modes */}
        {renderDemoContent()}
      </div>
    </div>
  );
}

export default DemoPageClient;
