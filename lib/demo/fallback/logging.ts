import { eventLogger } from "../analytics";
import type { FallbackEvent, FallbackReason } from "./events";
import type { DemoMode } from "../config";

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
    metadata?: Record<string, unknown>
): FallbackEvent {
    return {
        slug,
        reason,
        chosenMode,
        timestamp: Date.now(),
        metadata,
    };
}

export async function logFallback(event: FallbackEvent) {
    console.log("[Demo Fallback]", event);

    try {
        await eventLogger.logEvent({
            slug: event.slug,
            reason: event.reason,
            chosenMode: event.chosenMode,
            metadata: event.metadata,
        });
    } catch (error) {
        console.error("Failed to log fallback event:", error);
    }
}
