import type { DemoMode } from "@/lib/config/demo-targets";

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
// CENTRALIZED EVENT LOGGING
// ============================================================================

export class EventLogger {
    private static instance: EventLogger;
    private analytics: DemoAnalytics;

    private constructor() {
        this.analytics = new CompositeDemoAnalytics([
            new ConsoleDemoAnalytics(),
            new GTMDemoAnalytics(),
        ]);
    }

    public static getInstance(): EventLogger {
        if (!EventLogger.instance) {
            EventLogger.instance = new EventLogger();
        }
        return EventLogger.instance;
    }

    public async logEvent(event: Omit<DemoEvent, "id" | "timestamp" | "sessionId" | "userAgent">): Promise<void> {
        try {
            // Create complete event
            const completeEvent: DemoEvent = {
                ...event,
                id: generateEventId(),
                timestamp: Date.now(),
                sessionId: getSessionId(),
                userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
            };

            // Validate event
            if (!isValidEvent(completeEvent)) {
                console.warn("Invalid event schema:", completeEvent);
                return;
            }

            // Store locally
            await this.storeEvent(completeEvent);

            // Send to analytics
            await this.trackEvent(completeEvent);

            // Performance monitoring
            this.monitorPerformance(completeEvent);

        } catch (error) {
            console.error("Failed to log demo event:", error);
            // Could send to error reporting service here
        }
    }

    private async storeEvent(event: DemoEvent): Promise<void> {
        if (typeof window === "undefined") return;

        try {
            const events = this.getStoredEvents();
            events.unshift(event);

            // Keep only last 100 events
            const trimmed = events.slice(0, 100);
            localStorage.setItem("subsights_demo_events", JSON.stringify(trimmed));
        } catch (error) {
            console.error("Failed to store demo event:", error);
            throw error;
        }
    }

    private async trackEvent(event: DemoEvent): Promise<void> {
        try {
            await this.analytics.trackFallback(event);
        } catch (error) {
            console.warn("Analytics tracking failed:", error);
            // Don't throw - analytics failure shouldn't break the app
        }
    }

    private monitorPerformance(event: DemoEvent): void {
        // Monitor slow demo loads
        if (event.performance?.loadTime && event.performance.loadTime > 5000) {
            console.warn(`Slow demo load: ${event.slug} took ${event.performance.loadTime}ms`);
        }

        // Monitor memory usage if available
        if (typeof performance !== "undefined" && (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory) {
            const memory = (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory;
            if (memory?.usedJSHeapSize && memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
                console.warn(`High memory usage: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`);
            }
        }
    }

    public getStoredEvents(): DemoEvent[] {
        if (typeof window === "undefined") return [];

        try {
            const stored = localStorage.getItem("subsights_demo_events");
            if (!stored) return [];

            const events = JSON.parse(stored) as unknown[];

            // Validate stored events and filter out invalid ones
            const validEvents = events.filter(isValidEvent);

            // If we found invalid events, clean up storage
            if (validEvents.length !== events.length) {
                console.warn(`Found ${events.length - validEvents.length} invalid events, cleaning up storage`);
                localStorage.setItem("subsights_demo_events", JSON.stringify(validEvents));
            }

            return validEvents;
        } catch (error) {
            console.error("Failed to get stored events:", error);
            // Clear corrupted storage
            localStorage.removeItem("subsights_demo_events");
            return [];
        }
    }

    public clearEvents(): void {
        if (typeof window === "undefined") return;
        localStorage.removeItem("subsights_demo_events");
    }

    public getEventStats(): { total: number; byReason: Record<string, number>; byMode: Record<string, number> } {
        const events = this.getStoredEvents();
        const byReason: Record<string, number> = {};
        const byMode: Record<string, number> = {};

        events.forEach(event => {
            byReason[event.reason] = (byReason[event.reason] || 0) + 1;
            byMode[event.chosenMode] = (byMode[event.chosenMode] || 0) + 1;
        });

        return {
            total: events.length,
            byReason,
            byMode,
        };
    }
}

// ============================================================================
// ANALYTICS INTERFACES & IMPLEMENTATIONS
// ============================================================================

export interface DemoAnalytics {
    trackFallback(event: DemoEvent): Promise<void>;
    trackDemoView(slug: string, mode: string): Promise<void>;
    trackDemoSuccess(slug: string, mode: string, duration: number): Promise<void>;
}

class ConsoleDemoAnalytics implements DemoAnalytics {
    async trackFallback(event: DemoEvent): Promise<void> {
        console.log("[Analytics] Demo Fallback:", {
            id: event.id,
            slug: event.slug,
            reason: event.reason,
            chosenMode: event.chosenMode,
            timestamp: new Date(event.timestamp).toISOString(),
            metadata: event.metadata,
            sessionId: event.sessionId,
        });
    }

    async trackDemoView(slug: string, mode: string): Promise<void> {
        console.log("[Analytics] Demo View:", {
            slug,
            mode,
            timestamp: new Date().toISOString()
        });
    }

    async trackDemoSuccess(slug: string, mode: string, duration: number): Promise<void> {
        console.log("[Analytics] Demo Success:", {
            slug,
            mode,
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
        });
    }
}

class GTMDemoAnalytics implements DemoAnalytics {
    async trackFallback(event: DemoEvent): Promise<void> {
        if (typeof window !== "undefined" && (window as unknown as { gtag?: (event: string, action: string, params: Record<string, unknown>) => void }).gtag) {
            ((window as unknown as { gtag: (event: string, action: string, params: Record<string, unknown>) => void }).gtag)("event", "demo_fallback", {
                event_category: "demo",
                event_label: event.slug,
                custom_parameter_1: event.reason,
                custom_parameter_2: event.chosenMode,
                custom_parameter_3: event.sessionId,
                value: 1,
            });
        }
    }

    async trackDemoView(slug: string, mode: string): Promise<void> {
        if (typeof window !== "undefined" && (window as unknown as { gtag?: (event: string, action: string, params: Record<string, unknown>) => void }).gtag) {
            ((window as unknown as { gtag: (event: string, action: string, params: Record<string, unknown>) => void }).gtag)("event", "demo_view", {
                event_category: "demo",
                event_label: slug,
                custom_parameter_1: mode,
                value: 1,
            });
        }
    }

    async trackDemoSuccess(slug: string, mode: string, duration: number): Promise<void> {
        if (typeof window !== "undefined" && (window as unknown as { gtag?: (event: string, action: string, params: Record<string, unknown>) => void }).gtag) {
            ((window as unknown as { gtag: (event: string, action: string, params: Record<string, unknown>) => void }).gtag)("event", "demo_success", {
                event_category: "demo",
                event_label: slug,
                custom_parameter_1: mode,
                value: Math.round(duration / 1000), // Convert to seconds
            });
        }
    }
}

// Composite analytics that sends to multiple services
class CompositeDemoAnalytics implements DemoAnalytics {
    private providers: DemoAnalytics[];

    constructor(providers: DemoAnalytics[]) {
        this.providers = providers;
    }

    async trackFallback(event: DemoEvent): Promise<void> {
        await Promise.allSettled(
            this.providers.map(provider =>
                provider.trackFallback(event).catch(error => {
                    console.warn("Analytics provider failed:", error);
                })
            )
        );
    }

    async trackDemoView(slug: string, mode: string): Promise<void> {
        await Promise.allSettled(
            this.providers.map(provider =>
                provider.trackDemoView(slug, mode).catch(error => {
                    console.warn("Analytics provider failed:", error);
                })
            )
        );
    }

    async trackDemoSuccess(slug: string, mode: string, duration: number): Promise<void> {
        await Promise.allSettled(
            this.providers.map(provider =>
                provider.trackDemoSuccess(slug, mode, duration).catch(error => {
                    console.warn("Analytics provider failed:", error);
                })
            )
        );
    }
}

// ============================================================================
// PUBLIC API - NEW CLEAN INTERFACE
// ============================================================================

// Event logger instance
export const eventLogger = EventLogger.getInstance();

// Core analytics instance
export const analytics = new CompositeDemoAnalytics([
    new ConsoleDemoAnalytics(),
    new GTMDemoAnalytics(),
]);

// Public utility functions
export function getDemoEvents(): DemoEvent[] {
    return eventLogger.getStoredEvents();
}

export function clearDemoEvents(): void {
    eventLogger.clearEvents();
}

export function getEventStats() {
    return eventLogger.getEventStats();
}

export function createDemoEvent(
    slug: string,
    reason: FallbackReason,
    chosenMode: DemoMode,
    metadata?: Record<string, unknown>
): Omit<DemoEvent, "id" | "timestamp" | "sessionId" | "userAgent"> {
    return {
        slug,
        reason,
        chosenMode,
        metadata,
    };
}
