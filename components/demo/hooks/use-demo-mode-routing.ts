import { useCallback, useEffect, useRef } from "react";
import { FALLBACK_CONSTANTS } from "@/lib/demo";
import type { DemoMode } from "@/lib/demo/config";
import type { FallbackReason } from "@/lib/demo/analytics";

interface ProbeResponse {
    frameLikelyAllowed?: boolean;
    // allow future fields without breaking strictness
    [k: string]: unknown;
}

interface UseDemoModeRoutingProps {
    slug: string;
    target: { allowIframe?: boolean } | null;
    settledRef: React.RefObject<boolean>;
    setMode: (mode: DemoMode) => void;
    setIsLoading: (loading: boolean) => void;
    markSuccess: (successMode: DemoMode) => Promise<void>;
    trackView: (mode: DemoMode) => void;
    logEvent: (params: {
        slug: string;
        reason: FallbackReason;
        chosenMode: DemoMode;
        metadata?: Record<string, unknown>;
    }) => Promise<void>;
}

interface UseDemoModeRoutingReturn {
    tryProxy: () => (() => void) | undefined;
    tryIframe: () => (() => void) | undefined;
    fallbackToIframeOrDefault: (reason: FallbackReason) => Promise<void>;
}

export function useDemoModeRouting({
    slug,
    target,
    settledRef,
    setMode,
    setIsLoading,
    markSuccess,
    trackView,
    logEvent,
}: UseDemoModeRoutingProps): UseDemoModeRoutingReturn {
    const proxyTimeoutRef = useRef<number | null>(null);

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            // Clear any active timeouts
            if (proxyTimeoutRef.current) {
                window.clearTimeout(proxyTimeoutRef.current);
                proxyTimeoutRef.current = null;
            }
        };
    }, []);

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
                // iframe fallback
                const { allowed, result } = await probeIframe();
                if (allowed) {
                    await logEvent({
                        slug,
                        reason: "iframe-blocked",
                        chosenMode: "iframe",
                        metadata: {
                            probeResult: result,
                        },
                    });
                    markSuccess("iframe");
                    return;
                }

                // default fallback
                await logEvent({
                    slug,
                    reason: "force-policy",
                    chosenMode: "default",
                    metadata: {
                        allowIframe,
                        originalReason: reason,
                    },
                });

            } else {
                // default fallback
                await logEvent({
                    slug,
                    reason: "force-policy",
                    chosenMode: "default",
                    metadata: {
                        allowIframe,
                        originalReason: reason,
                    },
                });
            }

            markSuccess("default");
        },
        [slug, target?.allowIframe, probeIframe, markSuccess, logEvent, settledRef]
    );

    /**
     * Proxy attempt: listen for a single successful/failed postMessage from the loaded iframe.
     * Ensures we only react to messages from our iframe and same-origin.
     */
    const tryProxy = useCallback(() => {
        if (settledRef.current) return () => void 0;

        setMode("proxy");
        setIsLoading(true);

        // Track proxy mode attempt
        trackView("proxy");

        let timeoutId: number | undefined; // allow access from onMessage closure

        const onMessage = (e: MessageEvent) => {
            // Only handle messages from our iframe and our origin
            if (e.origin !== window.location.origin) return;
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
    }, [markSuccess, fallbackToIframeOrDefault, setMode, setIsLoading, settledRef, trackView]);

    /**
     * Iframe attempt: load target in iframe and overlay our widget.
     * Falls back to default demo if iframe is blocked.
     */
    const tryIframe = useCallback(() => {
        if (settledRef.current) return () => void 0;

        setMode("iframe");
        setIsLoading(true);

        // Track iframe mode attempt
        trackView("iframe");

        // Wait for iframe to load, then check if it's working
        const timeoutId = window.setTimeout(() => {
            if (settledRef.current) return;
            void fallbackToIframeOrDefault("iframe-blocked");
        }, FALLBACK_CONSTANTS.DEFAULT_TIMEOUT_MS);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [fallbackToIframeOrDefault, setMode, setIsLoading, settledRef, trackView]);

    return {
        tryProxy,
        tryIframe,
        fallbackToIframeOrDefault,
    };
}
