import { useState, useEffect, useCallback } from "react";
import { getDemoEvents, clearDemoEvents, getEventStats, type DemoEvent } from "@/lib/demo/analytics";

interface UseAdminEventsReturn {
    events: DemoEvent[];
    eventStats: { total: number; byReason: Record<string, number>; byMode: Record<string, number> } | null;
    loadEvents: () => void;
    handleClearEvents: () => void;
    getSuccessRate: (slug: string) => number;
    eventsBySlug: Record<string, DemoEvent[]>;
}

export function useAdminEvents(): UseAdminEventsReturn {
    const [events, setEvents] = useState<DemoEvent[]>([]);
    const [eventStats, setEventStats] = useState<{ total: number; byReason: Record<string, number>; byMode: Record<string, number> } | null>(null);

    const loadEvents = useCallback(() => {
        const demoEvents = getDemoEvents();
        const stats = getEventStats();
        setEvents(demoEvents);
        setEventStats(stats);
    }, []);

    const handleClearEvents = useCallback(() => {
        if (confirm("Clear all demo events?")) {
            clearDemoEvents();
            setEvents([]);
            setEventStats({ total: 0, byReason: {}, byMode: {} });
        }
    }, []);

    // Group events by slug for easier processing
    const eventsBySlug = events.reduce((acc, event) => {
        const slug = event.slug || "unknown";
        if (!acc[slug]) acc[slug] = [];
        acc[slug].push(event);
        return acc;
    }, {} as Record<string, DemoEvent[]>);

    // Calculate success rate for a specific slug
    const getSuccessRate = useCallback((slug: string) => {
        const slugEvents = eventsBySlug[slug] || [];

        // Only count events that represent actual demo outcomes (exclude demo-view attempts)
        const outcomeEvents = slugEvents.filter((e: DemoEvent) => e.reason !== "demo-view");
        const total = outcomeEvents.length;

        // Count successful events (successful demos or successful fallbacks)
        const successes = outcomeEvents.filter((e: DemoEvent) =>
            e.reason === "demo-success" || e.reason === "force-policy"
        ).length;

        return total > 0 ? Math.round((successes / total) * 100) : 100;
    }, [eventsBySlug]);

    // Load events on mount
    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    return {
        events,
        eventStats,
        loadEvents,
        handleClearEvents,
        getSuccessRate,
        eventsBySlug,
    };
}
