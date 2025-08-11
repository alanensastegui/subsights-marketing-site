"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { getDemoTarget, type DemoMode } from "@/lib/demo/config";
import { FALLBACK_CONSTANTS, createFallbackEvent, logFallback, type FallbackReason } from "@/lib/demo/fallback";
import { eventLogger } from "@/lib/demo/analytics";
import { createPerformanceMonitor, type PerformanceMetrics } from "@/lib/demo/performance";
import { DemoToolbar } from "@/components/demo/demo-toolbar";
import { DefaultDemo } from "@/components/demo/default-demo";

interface DemoPageClientProps {
  slug: string;
}

interface ProbeResponse {
  frameLikelyAllowed?: boolean;
  // allow future fields without breaking strictness
  [k: string]: unknown;
}

/**
 * Client-side demo host with policy- & query-driven routing between
 * proxy, iframe, and default modes. Designed for clarity and "performant enough".
 */
function DemoPageClient({ slug }: DemoPageClientProps) {
  const [mode, setMode] = useState<DemoMode>("default");
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const settledRef = useRef(false);
  const proxyTimeoutRef = useRef<number | null>(null);
  const performanceMonitorRef = useRef<PerformanceMetrics | null>(null);

  const target = useMemo(() => getDemoTarget(slug), [slug]);

  // Reset all state when component mounts or slug changes
  useEffect(() => {
    // Reset to loading state every time component mounts or slug changes
    setMode("default");
    setIsLoading(true);
    settledRef.current = false;

    // Start performance monitoring
    const monitor = createPerformanceMonitor();
    monitor.start();

    // Clear any active timeouts
    if (proxyTimeoutRef.current) {
      window.clearTimeout(proxyTimeoutRef.current);
      proxyTimeoutRef.current = null;
    }
  }, [slug]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Reset all state on unmount
      setIsLoading(false);
      setMode("default");
      settledRef.current = false;

      // Clear any active timeouts
      if (proxyTimeoutRef.current) {
        window.clearTimeout(proxyTimeoutRef.current);
        proxyTimeoutRef.current = null;
      }
    };
  }, []);

  const markSuccess = useCallback(
    async (successMode: DemoMode) => {
      if (settledRef.current) return;
      settledRef.current = true;
      setIsLoading(false);
      setMode(successMode);

      // Track successful demo load with performance metrics
      try {
        const performanceMetrics = performanceMonitorRef.current || { loadTime: Date.now() - performance.now() };

        await eventLogger.logEvent({
          slug,
          reason: "force-policy",
          chosenMode: successMode,
          metadata: {
            loadTime: performanceMetrics.loadTime,
            success: true,
            mode: successMode,
          },
          performance: performanceMetrics,
        });

        // Log performance warnings if thresholds are exceeded
        if (performanceMetrics.loadTime > 5000) {
          console.warn(`Slow demo load: ${slug} took ${performanceMetrics.loadTime}ms`);
        }

        if (performanceMetrics.memoryUsage && performanceMetrics.memoryUsage > 50 * 1024 * 1024) {
          console.warn(`High memory usage: ${Math.round(performanceMetrics.memoryUsage / 1024 / 1024)}MB`);
        }

      } catch (error) {
        console.warn("Failed to track demo success:", error);
      }
    },
    [slug]
  );

  /** Probe whether the iframe is likely allowed (with timeout & no-store cache). */
  const probeIframe = useCallback(async () => {
    try {
      const res = await fetch(`/api/demo/probe?slug=${encodeURIComponent(slug)}`, {
        signal: AbortSignal.timeout(FALLBACK_CONSTANTS.IFRAME_PROBE_TIMEOUT_MS),
        cache: "no-store",
      });
      if (!res.ok) return { allowed: false as const };
      const result: ProbeResponse = await res.json();
      return { allowed: Boolean(result?.frameLikelyAllowed), result };
    } catch (err) {
      console.warn(`[Demo] ${slug}: Iframe probe failed`, err);
      return { allowed: false as const };
    }
  }, [slug]);

  /**
   * Fallback: try iframe when permitted and likely allowed; otherwise default demo.
   */
  const fallbackToIframeOrDefault = useCallback(
    async (reason: FallbackReason) => {
      if (settledRef.current) return;

      const allowIframe = target?.allowIframe ?? true;

      if (allowIframe) {
        const { allowed, result } = await probeIframe();
        if (allowed) {
          await logFallback(createFallbackEvent(slug, reason, "iframe", { probeResult: result }));
          markSuccess("iframe");
          return;
        }
      }

      // default fallback
      await logFallback(
        createFallbackEvent(slug, reason, "default", {
          allowIframe,
          originalReason: reason,
        })
      );

      markSuccess("default");
    },
    [slug, target?.allowIframe, probeIframe, markSuccess]
  );

  /**
   * Proxy attempt: listen for a single successful/failed postMessage from the loaded iframe.
   * Ensures we only react to messages from our iframe and same-origin.
   */
  const tryProxy = useCallback(() => {
    if (settledRef.current) return () => void 0;

    setMode("proxy");
    setIsLoading(true);

    let timeoutId: number | undefined; // allow access from onMessage closure

    const onMessage = (e: MessageEvent) => {
      // Only handle messages from our iframe and our origin
      if (e.origin !== window.location.origin) return;
      if (!iframeRef.current || e.source !== iframeRef.current.contentWindow) return;
      const data = e.data as { type?: string; status?: string; reason?: string } | undefined;
      if (data?.type !== "subsights:proxy") return;

      // Clear timeout now that we have a result
      if (typeof timeoutId === "number") {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
        proxyTimeoutRef.current = null;
      }

      if (data.status === "ok") {
        markSuccess("proxy");
      } else {
        const reason = (data?.reason || "proxy-error") as FallbackReason;
        window.removeEventListener("message", onMessage);
        void fallbackToIframeOrDefault(reason);
      }
    };

    window.addEventListener("message", onMessage);

    // Hard timeout in case server never responds
    timeoutId = window.setTimeout(() => {
      window.removeEventListener("message", onMessage);
      void fallbackToIframeOrDefault("proxy-timeout");
    }, FALLBACK_CONSTANTS.PROXY_HARD_TIMEOUT_MS);
    proxyTimeoutRef.current = timeoutId;

    return () => {
      window.removeEventListener("message", onMessage);
      if (typeof timeoutId === "number") {
        window.clearTimeout(timeoutId);
      }
    };
  }, [markSuccess, fallbackToIframeOrDefault]);

  /**
   * Iframe attempt: load target in iframe and overlay our widget.
   * Falls back to default demo if iframe is blocked.
   */
  const tryIframe = useCallback(() => {
    if (settledRef.current) return () => void 0;

    setMode("iframe");
    setIsLoading(true);

    // Wait for iframe to load, then check if it's working
    const timeoutId = window.setTimeout(() => {
      if (settledRef.current) return;
      void fallbackToIframeOrDefault("iframe-blocked");
    }, FALLBACK_CONSTANTS.DEFAULT_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [fallbackToIframeOrDefault]);

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
          markSuccess("default");
          return;
        }
      }
    }

    // Auto mode: try proxy first
    const cleanup = tryProxy();
    return () => {
      if (cleanup) cleanup();
      // ensure pending timeout is cleared if we unmount mid-flight
      if (proxyTimeoutRef.current !== null) {
        window.clearTimeout(proxyTimeoutRef.current);
        proxyTimeoutRef.current = null;
      }
    };
    // NOTE: searchParams is intentionally read-only (Next provides referential stability)
  }, [slug, target, searchParams, tryProxy, tryIframe, markSuccess]);

  if (!target) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center" data-testid="demo-not-found">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Demo Not Found</h2>
          <p className="text-muted-foreground">The demo &quot;{slug}&quot; could not be found.</p>
          <Button asChild>
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const src = mode === "proxy" ? `/demo/${encodeURIComponent(slug)}/site` : target.url;

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
            {isLoading && (
              <div
                className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-10"
                aria-busy
                role="status"
                aria-live="polite"
                data-testid="demo-loading"
              >
                <div className="text-center space-y-2">
                  <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                  <p className="text-sm text-muted-foreground">Loading demo...</p>
                </div>
              </div>
            )}
            <iframe
              key={src} // force remount on src change to reset listeners/load
              ref={iframeRef}
              src={src}
              title={`Demo: ${target.label}`}
              className="absolute inset-0 w-full h-full border-0"
              // Add a conservative baseline; expand for iframe mode where safe
              sandbox={
                mode === "iframe"
                  ? "allow-scripts allow-forms allow-popups allow-modals allow-same-origin allow-presentation allow-downloads"
                  : "allow-scripts allow-forms allow-popups allow-modals allow-same-origin"
              }
              // Avoid layout thrash while loading
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="demo-iframe"
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
