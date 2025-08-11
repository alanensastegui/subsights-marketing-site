"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { getDemoTarget, type DemoMode } from "@/lib/config/demo-targets";
import {
  createFallbackEvent,
  logFallback,
  FALLBACK_CONSTANTS,
  type FallbackReason,
} from "@/lib/demo/fallback";
import { DemoToolbar } from "@/components/demo/demo-toolbar";
import { DefaultDemo } from "@/components/demo/default-demo";

interface DemoPageClientProps {
  slug: string;
}

// Narrow the probe response for better type-safety
interface ProbeResponse {
  frameLikelyAllowed?: boolean;
  // allow future fields without breaking strictness
  [k: string]: unknown;
}

export const dynamic = "force-dynamic";

/**
 * Client-side demo host with policy- & query-driven routing between
 * proxy, iframe, and default modes. Designed for clarity and “performant enough”.
 */
function DemoPageClient({ slug }: DemoPageClientProps) {
  const [mode, setMode] = useState<DemoMode>("proxy");
  const [isLoading, setIsLoading] = useState(true);
  const [currentReason, setCurrentReason] = useState<string>("");

  const searchParams = useSearchParams();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Track whether we've already settled on a terminal mode to avoid double transitions
  const settledRef = useRef(false);
  // Track an outstanding proxy timeout so we can cancel it when a result arrives
  const proxyTimeoutRef = useRef<number | null>(null);

  // Resolve target from slug once per slug change
  const target = useMemo(() => getDemoTarget(slug), [slug]);

  // Guarded success setter to avoid duplicate transitions
  const markSuccess = useCallback(
    (successMode: DemoMode) => {
      if (settledRef.current) return; // prevent double-settle
      settledRef.current = true;
      setMode(successMode);
      setIsLoading(false);
      // Clear any outstanding proxy timeout if present
      if (proxyTimeoutRef.current !== null) {
        window.clearTimeout(proxyTimeoutRef.current);
        proxyTimeoutRef.current = null;
      }
      // eslint-disable-next-line no-console
      console.log(`[Demo] ${slug}: Success with ${successMode} mode`);
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
      // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.log(`[Demo] ${slug}: Falling back from proxy, reason: ${reason}`);

      const allowIframe = target?.allowIframe ?? true;

      if (allowIframe) {
        const { allowed, result } = await probeIframe();
        if (allowed) {
          logFallback(createFallbackEvent(slug, reason, "iframe", { probeResult: result }));
          markSuccess("iframe");
          return;
        }
      }

      // default fallback
      logFallback(
        createFallbackEvent(slug, reason, "default", {
          allowIframe,
          originalReason: reason,
        })
      );
      setCurrentReason(reason);
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
    // eslint-disable-next-line no-console
    console.log(`[Demo] ${slug}: Trying proxy mode`);

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

    // Cleanup
    return () => {
      window.removeEventListener("message", onMessage);
      if (typeof timeoutId === "number") {
        window.clearTimeout(timeoutId);
      }
      proxyTimeoutRef.current = null;
    };
  }, [slug, markSuccess, fallbackToIframeOrDefault]);

  /** Iframe attempt with probe first (no postMessage). */
  const tryIframe = useCallback(async () => {
    if (settledRef.current) return;
    // eslint-disable-next-line no-console
    console.log(`[Demo] ${slug}: Trying iframe mode`);
    const { allowed, result } = await probeIframe();

    if (allowed) {
      // Considered a routing success, not a fallback — still useful to log routing decision
      logFallback(createFallbackEvent(slug, "force-policy", "iframe", { probeResult: result }));
      markSuccess("iframe");
    } else {
      void fallbackToIframeOrDefault("iframe-blocked");
    }
  }, [slug, probeIframe, markSuccess, fallbackToIframeOrDefault]);

  // Main routing effect (force param > explicit policy > auto)
  useEffect(() => {
    // Reset settlement when slug or query changes
    settledRef.current = false;

    if (!target) {
      setMode("default");
      setIsLoading(false);
      return;
    }

    const forceMode = (searchParams.get("force") as DemoMode | null) ?? null;

    let cleanup: (() => void) | undefined;

    if (forceMode === "default") {
      logFallback(createFallbackEvent(slug, "force-policy", "default"));
      setCurrentReason("force-policy");
      markSuccess("default");
    } else if (forceMode === "iframe") {
      logFallback(createFallbackEvent(slug, "force-policy", "iframe"));
      void tryIframe();
    } else if (forceMode === "proxy") {
      logFallback(createFallbackEvent(slug, "force-policy", "proxy"));
      cleanup = tryProxy();
    } else {
      // Policy-based routing
      const policy = target.policy ?? "auto";
      switch (policy) {
        case "force-default": {
          logFallback(createFallbackEvent(slug, "force-policy", "default"));
          setCurrentReason("force-policy");
          markSuccess("default");
          break;
        }
        case "force-iframe": {
          logFallback(createFallbackEvent(slug, "force-policy", "iframe"));
          void tryIframe();
          break;
        }
        case "force-proxy": {
          logFallback(createFallbackEvent(slug, "force-policy", "proxy"));
          cleanup = tryProxy();
          break;
        }
        case "auto":
        default: {
          cleanup = tryProxy();
          break;
        }
      }
    }

    return () => {
      if (cleanup) cleanup();
      // ensure pending timeout is cleared if we unmount mid-flight
      if (proxyTimeoutRef.current !== null) {
        window.clearTimeout(proxyTimeoutRef.current);
        proxyTimeoutRef.current = null;
      }
    };
    // NOTE: searchParams is intentionally read-only (Next provides referential stability)
  }, [slug, target, tryProxy, tryIframe, markSuccess, fallbackToIframeOrDefault, searchParams]);

  if (!target) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center" data-testid="demo-not-found">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Demo Not Found</h2>
          <p className="text-muted-foreground">The demo "{slug}" could not be found.</p>
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
        {mode === "default" ? (
          <div className="absolute inset-0 overflow-auto">
            <DefaultDemo targetLabel={target.label} targetUrl={target.url} reason={currentReason} />
          </div>
        ) : (
          <>
            {isLoading && mode === "proxy" && (
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
