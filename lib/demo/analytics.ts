import type { FallbackEvent } from "./fallback";

export interface DemoAnalytics {
    trackFallback(event: FallbackEvent): void;
    trackDemoView(slug: string, mode: string): void;
    trackDemoSuccess(slug: string, mode: string, duration: number): void;
}

class ConsoleDemoAnalytics implements DemoAnalytics {
    trackFallback(event: FallbackEvent): void {
        console.log("[Analytics] Demo Fallback:", {
            slug: event.slug,
            reason: event.reason,
            chosenMode: event.chosenMode,
            timestamp: new Date(event.timestamp).toISOString(),
            metadata: event.metadata,
        });
    }

    trackDemoView(slug: string, mode: string): void {
        console.log("[Analytics] Demo View:", { slug, mode, timestamp: new Date().toISOString() });
    }

    trackDemoSuccess(slug: string, mode: string, duration: number): void {
        console.log("[Analytics] Demo Success:", {
            slug,
            mode,
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
        });
    }
}

class GTMDemoAnalytics implements DemoAnalytics {
    trackFallback(event: FallbackEvent): void {
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", "demo_fallback", {
                event_category: "demo",
                event_label: event.slug,
                custom_parameter_1: event.reason,
                custom_parameter_2: event.chosenMode,
                value: 1,
            });
        }
    }

    trackDemoView(slug: string, mode: string): void {
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", "demo_view", {
                event_category: "demo",
                event_label: slug,
                custom_parameter_1: mode,
                value: 1,
            });
        }
    }

    trackDemoSuccess(slug: string, mode: string, duration: number): void {
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", "demo_success", {
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

    trackFallback(event: FallbackEvent): void {
        this.providers.forEach(provider => {
            try {
                provider.trackFallback(event);
            } catch (error) {
                console.warn("Analytics provider failed:", error);
            }
        });
    }

    trackDemoView(slug: string, mode: string): void {
        this.providers.forEach(provider => {
            try {
                provider.trackDemoView(slug, mode);
            } catch (error) {
                console.warn("Analytics provider failed:", error);
            }
        });
    }

    trackDemoSuccess(slug: string, mode: string, duration: number): void {
        this.providers.forEach(provider => {
            try {
                provider.trackDemoSuccess(slug, mode, duration);
            } catch (error) {
                console.warn("Analytics provider failed:", error);
            }
        });
    }
}

// Default analytics instance
export const demoAnalytics = new CompositeDemoAnalytics([
    new ConsoleDemoAnalytics(),
    new GTMDemoAnalytics(),
]);

/**
 * Store demo events in localStorage for admin viewing
 * 
 * NOTE: This is LOCAL browser storage only. Each user/device maintains
 * their own event history. This is intentional for MVP simplicity and
 * privacy compliance. No server-side storage or cross-user tracking.
 */
export function storeDemoEvent(event: any) {
    if (typeof window === "undefined") return;

    try {
        const events = JSON.parse(localStorage.getItem("subsights_demo_events") || "[]");
        events.unshift({ ...event, timestamp: Date.now() });

        // Keep only last 100 events
        const trimmed = events.slice(0, 100);
        localStorage.setItem("subsights_demo_events", JSON.stringify(trimmed));
    } catch (error) {
        console.warn("Failed to store demo event:", error);
    }
}

export function getDemoEvents(): any[] {
    if (typeof window === "undefined") return [];

    try {
        return JSON.parse(localStorage.getItem("subsights_demo_events") || "[]");
    } catch (error) {
        console.warn("Failed to get demo events:", error);
        return [];
    }
}

export function clearDemoEvents() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("subsights_demo_events");
}
