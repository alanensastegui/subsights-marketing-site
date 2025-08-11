import { CompositeDemoAnalytics } from "./providers";
import { ConsoleDemoAnalytics, GTMDemoAnalytics } from "./providers";
import { isValidEvent, generateEventId, getSessionId, type DemoEvent } from "./types";
import { getPerformanceBudget } from "../performance";
import type { FallbackReason } from "../fallback";
import type { DemoMode } from "../config";

export class EventLogger {
    private static instance: EventLogger;
    private analytics: CompositeDemoAnalytics;

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

    /**
     * Log a fallback event - moved here to break circular dependency
     */
    public async logFallback(
        slug: string,
        reason: FallbackReason,
        chosenMode: DemoMode,
        metadata?: Record<string, unknown>
    ): Promise<void> {
        await this.logEvent({
            slug,
            reason,
            chosenMode,
            metadata,
        });
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
        const budget = getPerformanceBudget();

        // Monitor slow demo loads
        if (event.performance?.loadTime && event.performance.loadTime > budget.demoLoadTime) {
            console.warn(`Slow demo load: ${event.slug} took ${event.performance.loadTime}ms (threshold: ${budget.demoLoadTime}ms)`);
        }

        // Monitor memory usage if available
        if (typeof performance !== "undefined" && (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory) {
            const memory = (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory;
            if (memory?.usedJSHeapSize && memory.usedJSHeapSize > budget.memoryUsage) {
                console.warn(`High memory usage: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB (threshold: ${Math.round(budget.memoryUsage / 1024 / 1024)}MB)`);
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
