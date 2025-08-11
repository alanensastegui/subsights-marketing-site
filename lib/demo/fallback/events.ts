import type { DemoMode } from "../config";

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
    metadata?: Record<string, unknown>;
};
