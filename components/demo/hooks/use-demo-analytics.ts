import { useRef, useEffect, useCallback } from "react";
import { createPerformanceMonitor } from "@/lib/demo";
import { trackDemoView, trackDemoSuccess, eventLogger } from "@/lib/demo/analytics";
import type { DemoMode } from "@/lib/demo/config";
import type { FallbackReason } from "@/lib/demo/analytics";

interface UseDemoAnalyticsReturn {
    performanceMonitorRef: React.RefObject<ReturnType<typeof createPerformanceMonitor> | null>;
    trackView: (mode: DemoMode) => void;
    trackSuccess: (slug: string, mode: DemoMode) => Promise<void>;
    logEvent: (params: {
        slug: string;
        reason: FallbackReason;
        chosenMode: DemoMode;
        metadata?: Record<string, unknown>;
    }) => Promise<void>;
}

export function useDemoAnalytics(slug: string): UseDemoAnalyticsReturn {
    const performanceMonitorRef = useRef<ReturnType<typeof createPerformanceMonitor> | null>(null);

    // Start performance monitoring when component mounts or slug changes
    useEffect(() => {
        const monitor = createPerformanceMonitor();
        monitor.start();
        performanceMonitorRef.current = monitor;
    }, [slug]);

    // Cleanup performance monitoring on unmount
    useEffect(() => {
        return () => {
            performanceMonitorRef.current = null;
        };
    }, []);

    const trackView = useCallback((mode: DemoMode) => {
        trackDemoView(slug, mode);
    }, [slug]);

    const trackSuccess = useCallback(async (slug: string, mode: DemoMode) => {
        try {
            const performanceMetrics = performanceMonitorRef.current?.end() || { loadTime: 0 };
            await trackDemoSuccess(slug, mode, performanceMetrics.loadTime);
        } catch (error) {
            console.warn("Failed to track demo success:", error);
        }
    }, []);

    const logEvent = useCallback(async (params: {
        slug: string;
        reason: FallbackReason;
        chosenMode: DemoMode;
        metadata?: Record<string, unknown>;
    }) => {
        try {
            await eventLogger.logEvent(params);
        } catch (error) {
            console.warn("Failed to log demo event:", error);
        }
    }, []);

    return {
        performanceMonitorRef,
        trackView,
        trackSuccess,
        logEvent,
    };
}
