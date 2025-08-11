import type { DemoAnalytics, DemoEvent } from "../types";

export class GTMDemoAnalytics implements DemoAnalytics {
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
