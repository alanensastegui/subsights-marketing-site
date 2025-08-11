import type { DemoMode } from "../config";

// ============================================================================
// EVENT SCHEMA & VALIDATION
// ============================================================================

export interface DemoEvent {
    id: string;
    slug: string;
    reason: FallbackReason;
    chosenMode: DemoMode;
    timestamp: number;
    metadata?: Record<string, unknown>;
    sessionId?: string;
    userAgent?: string;
    performance?: {
        loadTime?: number;
        memoryUsage?: number;
    };
}

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

// Event validation
export function isValidEvent(event: unknown): event is DemoEvent {
    return (
        typeof event === "object" &&
        event !== null &&
        typeof (event as DemoEvent).id === "string" &&
        typeof (event as DemoEvent).slug === "string" &&
        typeof (event as DemoEvent).reason === "string" &&
        typeof (event as DemoEvent).chosenMode === "string" &&
        typeof (event as DemoEvent).timestamp === "number" &&
        ((event as DemoEvent).metadata === undefined || typeof (event as DemoEvent).metadata === "object") &&
        ((event as DemoEvent).sessionId === undefined || typeof (event as DemoEvent).sessionId === "string") &&
        ((event as DemoEvent).userAgent === undefined || typeof (event as DemoEvent).userAgent === "string")
    );
}

// Generate unique event ID
export function generateEventId(): string {
    return `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Generate session ID
export function getSessionId(): string {
    if (typeof window === "undefined") return "server";

    let sessionId = localStorage.getItem("subsights_session_id");
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("subsights_session_id", sessionId);
    }
    return sessionId;
}

// ============================================================================
// ANALYTICS INTERFACES
// ============================================================================

export interface DemoAnalytics {
    trackFallback(event: DemoEvent): Promise<void>;
    trackDemoView(slug: string, mode: string): Promise<void>;
    trackDemoSuccess(slug: string, mode: string, duration: number): Promise<void>;
}
