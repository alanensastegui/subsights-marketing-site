import type { DemoAnalytics, DemoEvent } from "../types";

export class ConsoleDemoAnalytics implements DemoAnalytics {
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
