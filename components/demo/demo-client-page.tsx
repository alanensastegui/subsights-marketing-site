"use client";

import { useEffect, useMemo, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { getDemoTarget, type DemoMode } from "@/lib/demo/config";
import { DemoToolbar } from "@/components/demo/demo-toolbar";
import { DefaultDemo } from "@/components/demo/default-demo";
import { DemoNotFound } from "@/components/demo/demo-not-found";
import { DemoLoading } from "@/components/demo/demo-loading";
import { DemoIframe } from "@/components/demo/demo-iframe";
import { useDemoState, useDemoAnalytics, useDemoModeRouting } from "@/components/demo/hooks";

interface DemoPageClientProps {
  slug: string;
}

/**
 * Client-side demo host with policy- & query-driven routing between
 * proxy, iframe, and default modes. Designed for clarity and "performant enough".
 */
function DemoPageClient({ slug }: DemoPageClientProps) {
  const { mode, isLoading, settledRef, setMode, setIsLoading, markSuccess } = useDemoState(slug);
  const { trackView, trackSuccess, logEvent } = useDemoAnalytics(slug);
  const searchParams = useSearchParams();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const target = useMemo(() => getDemoTarget(slug), [slug]);

  const markSuccessWithAnalytics = useCallback(
    async (successMode: DemoMode) => {
      // Track successful demo load with performance metrics
      await trackSuccess(slug, successMode);

      // Mark success in state
      markSuccess(successMode);
    },
    [slug, markSuccess, trackSuccess]
  );

  const { tryProxy, tryIframe } = useDemoModeRouting({
    slug,
    target,
    settledRef,
    setMode,
    setIsLoading,
    markSuccess: markSuccessWithAnalytics,
    trackView,
    logEvent,
  });

  // Main demo logic: try proxy first, fallback to iframe/default
  useEffect(() => {
    if (!target) return;

    // Check for forced mode
    const forceMode = (searchParams.get("force") as DemoMode | null) ?? null;
    if (forceMode) {
      switch (forceMode) {
        case "proxy": {
          const cleanup = tryProxy();
          return () => {
            if (cleanup) cleanup();
          };
        }
        case "iframe": {
          const cleanup = tryIframe();
          return () => {
            if (cleanup) cleanup();
          };
        }
        case "default": {
          trackView("default");
          markSuccessWithAnalytics("default");
          return;
        }
      }
    }

    // Auto mode: try proxy first
    const cleanup = tryProxy();
    return () => {
      if (cleanup) cleanup();
    };
    // NOTE: searchParams is intentionally read-only (Next provides referential stability)
  }, [slug, target, searchParams, tryProxy, tryIframe, markSuccessWithAnalytics, trackView]);

  if (!target) {
    return <DemoNotFound slug={slug} />;
  }

  const src = mode === "proxy" ? `/api/demo/site/${encodeURIComponent(slug)}` : target.url;

  return (
    <div className="flex-1 min-h-0 flex flex-col" data-testid="demo-page-client">
      <DemoToolbar label={target.label} originalUrl={target.url} mode={mode} />

      <div className="relative flex-1 min-h-0 overflow-hidden">
        {mode === "default" && !isLoading ? (
          <div className="absolute inset-0 overflow-auto">
            <DefaultDemo
              targetLabel={target.label}
              scriptTag={target.scriptTag}
            />
          </div>
        ) : (
          <>
            {isLoading && <DemoLoading />}
            <DemoIframe
              key={src} // force remount on src change to reset listeners/load
              ref={iframeRef}
              src={src}
              title={`Demo: ${target.label}`}
              mode={mode}
              onLoad={() => {
                if (mode === "iframe") setIsLoading(false);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default DemoPageClient;
