"use client";

import { useEffect, useMemo, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { getDemoTarget, type DemoMode } from "@/lib/demo/config";
import { DemoToolbar } from "@/components/demo/demo-toolbar";
import { DefaultDemo } from "@/components/demo/default-demo";
import { DemoNotFound } from "@/components/demo/demo-not-found";
import { DemoOverlay } from "@/components/demo/demo-overlay";
import { DemoIframe } from "@/components/demo/demo-iframe";
import { GuideSequence } from "@/components/demo/guide-sequence";
import { useDemoState, useDemoAnalytics, useDemoModeRouting } from "@/components/demo/hooks";

interface DemoPageClientProps {
  slug: string;
}

// Guide sequence configuration
const GUIDE_STEPS = [
  {
    id: "click-widget",
    message: "To begin, click on the chat widget below",
    position: "top" as const,
    ctaButton: {
      text: "Click Widget",
      action: "click" as const,
      target: ".logo-toggle",
    },
  },
  {
    id: "send-message",
    message: "Great! Now let's send a message",
    position: "left" as const,
    ctaButton: {
      text: "Send 'Hello'",
      action: "sendMessage" as const,
      target: ".chatbot-input",
      value: "Hello",
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

    // Auto mode: try proxy first
    const cleanup = tryProxy();
    return () => cleanup?.();
    // NOTE: searchParams is intentionally read-only (Next provides referential stability)
  }, [slug, target, searchParams, tryProxy, handleForcedMode]);

  if (!target) {
    return <DemoNotFound slug={slug} />;
  }

  const src = demoState.mode === "proxy" ? `/api/demo/site/${encodeURIComponent(slug)}` : target.url;
  const showOverlay = demoState.isLoading || demoState.showWelcomeOverlay;
  const isDefaultMode = demoState.mode === "default" && !demoState.isLoading;

  const renderDemoContent = () => {
    if (isDefaultMode) {
      return (
        <div className="absolute inset-0 overflow-auto">
          <DefaultDemo
            targetLabel={target.label}
            scriptTag={target.scriptTag}
          />
        </div>
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
              demoState.setShowGuideSequence(true);
            }}
          />
        )}

        {/* Guide Sequence - Shows after welcome overlay completes */}
        {demoState.showGuideSequence && (
          <GuideSequence
            steps={GUIDE_STEPS}
            onComplete={() => demoState.setShowGuideSequence(false)}
          />
        )}

        {/* Demo Content - All modes */}
        {renderDemoContent()}
      </div>
    </div>
  );
}

export default DemoPageClient;
