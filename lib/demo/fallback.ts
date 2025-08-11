import type { DemoMode } from "@/lib/config/demo-targets";

export type FallbackReason =
    | "proxy-timeout"
    | "proxy-error"
    | "proxy-fetch-failed"
    | "proxy-http-error"
    | "proxy-not-html"
    | "proxy-too-large"
    | "iframe-blocked"
    | "iframe-probe-failed"
    | "force-policy";

export type FallbackEvent = {
    slug: string;
    reason: FallbackReason;
    chosenMode: DemoMode;
    timestamp: number;
    metadata?: Record<string, any>;
};

export const FALLBACK_CONSTANTS = {
    DEFAULT_TIMEOUT_MS: 6000,
    DEFAULT_MAX_HTML_BYTES: 2_000_000,
    PROXY_HARD_TIMEOUT_MS: 7000,
    IFRAME_PROBE_TIMEOUT_MS: 3000,
} as const;

export const FALLBACK_MESSAGES = {
    "proxy-timeout": "The target site took too long to respond",
    "proxy-error": "Unable to load the target site content",
    "proxy-fetch-failed": "Failed to fetch the target site",
    "proxy-http-error": "Target site returned an error status code",
    "proxy-not-html": "Target site did not return HTML content",
    "proxy-too-large": "Target site content is too large to display",
    "iframe-blocked": "Target site blocks iframe embedding",
    "iframe-probe-failed": "Unable to check iframe compatibility",
    "force-policy": "Demo mode forced by configuration",
} as const;

export function createFallbackEvent(
    slug: string,
    reason: FallbackReason,
    chosenMode: DemoMode,
    metadata?: Record<string, any>
): FallbackEvent {
    return {
        slug,
        reason,
        chosenMode,
        timestamp: Date.now(),
        metadata,
    };
}

export function logFallback(event: FallbackEvent) {
    console.log("[Demo Fallback]", event);

    // Store event for admin viewing
    if (typeof window !== "undefined") {
        import("./analytics").then(({ storeDemoEvent, demoAnalytics }) => {
            storeDemoEvent(event);
            demoAnalytics.trackFallback(event);
        });
    }
}
