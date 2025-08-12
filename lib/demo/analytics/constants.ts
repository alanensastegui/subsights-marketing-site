// ============================================================================
// FALLBACK CONSTANTS
// ============================================================================

export const FALLBACK_CONSTANTS = {
    DEFAULT_TIMEOUT_MS: 6000,
    DEFAULT_MAX_HTML_BYTES: 2_000_000,
    PROXY_HARD_TIMEOUT_MS: 7000,
    IFRAME_PROBE_TIMEOUT_MS: 3000,
} as const;

export const FALLBACK_MESSAGES: Record<string, string> = {
    "proxy-timeout": "The target site took too long to respond",
    "proxy-error": "Unable to load the target site content",
    "proxy-fetch-failed": "Failed to fetch the target site",
    "proxy-http-error": "Target site returned an error status code",
    "proxy-not-html": "Target site did not return HTML content",
    "proxy-too-large": "Target site content is too large to display",
    "iframe-blocked": "Target site blocks iframe embedding",
    "iframe-probe-failed": "Unable to check iframe compatibility",
    "force-policy": "Demo mode forced by configuration",
    "demo-view": "Demo mode attempted",
    "demo-success": "Demo mode completed successfully",
} as const;

// ============================================================================
// PERFORMANCE CONSTANTS
// ============================================================================

export const PERFORMANCE_CONSTANTS = {
    DEMO_LOAD_TIME_THRESHOLD: 5000,        // 5 seconds
    MEMORY_USAGE_THRESHOLD: 50 * 1024 * 1024, // 50MB
    DOM_SIZE_THRESHOLD: 1000,              // 1000 DOM nodes
} as const;
