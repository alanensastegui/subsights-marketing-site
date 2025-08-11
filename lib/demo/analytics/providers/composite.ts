import type { DemoAnalytics, DemoEvent } from "../types";

export class CompositeDemoAnalytics implements DemoAnalytics {
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
