import type { DemoAnalytics, DemoEvent } from "../types";
import type { DemoMode } from "../../config";

// ============================================================================
// GTM ANALYTICS PROVIDER
// ============================================================================

export class GTMDemoAnalytics implements DemoAnalytics {
    /**
     * Check if GTM is available and get the gtag function
     */
    private getGtag(): typeof gtag | null {
        if (typeof window === "undefined" || typeof gtag === "undefined") {
            return null;
        }
        return gtag;
    }

    /**
     * Send a GTM event with proper error handling
     */
    private sendGTMEvent(action: string, parameters: Record<string, unknown>): void {
        const gtag = this.getGtag();
        if (!gtag) {
            console.warn("GTM not available - skipping analytics event:", action);
            return;
        }

        try {
            gtag("event", action, parameters);
        } catch (error) {
            console.error("Failed to send GTM event:", { action, parameters, error });
        }
    }

    async trackFallback(event: DemoEvent): Promise<void> {
        this.sendGTMEvent("demo_fallback", {
            event_category: "demo",
            event_label: event.slug,
            custom_parameter_1: event.reason,
            custom_parameter_2: event.chosenMode,
            custom_parameter_3: event.sessionId,
            value: 1,
        });
    }

    async trackDemoView(slug: string, mode: DemoMode): Promise<void> {
        this.sendGTMEvent("demo_view", {
            event_category: "demo",
            event_label: slug,
            custom_parameter_1: mode,
            value: 1,
        });
    }

    async trackDemoSuccess(slug: string, mode: DemoMode, duration: number): Promise<void> {
        this.sendGTMEvent("demo_success", {
            event_category: "demo",
            event_label: slug,
            custom_parameter_1: mode,
            value: Math.round(duration / 1000), // Convert to seconds
        });
    }
}
