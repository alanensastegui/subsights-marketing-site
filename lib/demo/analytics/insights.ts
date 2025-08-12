import type { DemoEvent } from "./types";
import { FALLBACK_MESSAGES } from "./constants";
import type { DemoTarget } from "../config";

/**
 * Get the most common meaningful reason from demo events
 * Filters out non-meaningful events like demo-view, demo-success, force-policy
 */
export function getMostCommonMeaningfulReason(events: DemoEvent[]): string {
    if (events.length === 0) return 'N/A';

    // Filter out events that don't indicate actual issues or meaningful outcomes
    const meaningfulEvents = events.filter(event => {
        const nonMeaningfulReasons = ['demo-view', 'demo-success', 'force-policy'];
        return !nonMeaningfulReasons.includes(event.reason);
    });

    if (meaningfulEvents.length === 0) return 'N/A';

    const reasonCounts: Record<string, number> = {};
    meaningfulEvents.forEach(event => {
        reasonCounts[event.reason] = (reasonCounts[event.reason] || 0) + 1;
    });

    const sorted = Object.entries(reasonCounts)
        .sort(([, a], [, b]) => (b as number) - (a as number));

    const mostCommonReason = sorted[0]?.[0];
    if (!mostCommonReason) return 'N/A';

    // Return user-friendly message instead of raw reason
    return FALLBACK_MESSAGES[mostCommonReason] || mostCommonReason;
}

/**
 * Calculate success rate for a specific demo target
 * Only counts events that represent actual demo outcomes (excludes demo-view attempts)
 */
export function calculateSuccessRate(slug: string, events: DemoEvent[]): number {
    const slugEvents = events.filter(event => event.slug === slug);
    if (slugEvents.length === 0) return 100;

    // Only count events that represent actual demo outcomes
    const outcomeEvents = slugEvents.filter(event => event.reason !== "demo-view");
    if (outcomeEvents.length === 0) return 100;

    const successes = outcomeEvents.filter(event =>
        event.reason === "demo-success" || event.reason === "force-policy"
    ).length;

    return Math.round((successes / outcomeEvents.length) * 100);
}

/**
 * Calculate average success rate across all demo targets
 */
export function calculateAverageSuccessRate(targets: DemoTarget[], events: DemoEvent[]): number {
    if (targets.length === 0) return 100;

    const total = targets.reduce((sum, target) =>
        sum + calculateSuccessRate(target.slug, events), 0
    );

    return Math.round(total / targets.length);
}

/**
 * Get analytics insights for admin dashboard
 */
export function getAnalyticsInsights(events: DemoEvent[], targets: DemoTarget[]) {
    return {
        mostCommonReason: getMostCommonMeaningfulReason(events),
        averageSuccessRate: calculateAverageSuccessRate(targets, events),
        totalEvents: events.length,
        meaningfulEvents: events.filter(event => {
            const nonMeaningfulReasons = ['demo-view', 'demo-success', 'force-policy'];
            return !nonMeaningfulReasons.includes(event.reason);
        }).length,
    };
}
