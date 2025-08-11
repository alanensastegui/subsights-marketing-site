/**
 * Performance monitoring utilities for demo system
 */

export interface PerformanceMetrics {
    loadTime: number;
    memoryUsage?: number;
    networkRequests?: number;
    domSize?: number;
}

export class PerformanceMonitor {
    private startTime: number;
    private metrics: Partial<PerformanceMetrics> = {};

    constructor() {
        this.startTime = performance.now();
    }

    /**
     * Mark the start of a demo load
     */
    start(): void {
        this.startTime = performance.now();
        this.metrics = {};
    }

    /**
     * Mark the end of a demo load and calculate metrics
     */
    end(): PerformanceMetrics {
        const loadTime = performance.now() - this.startTime;

        this.metrics.loadTime = loadTime;

        // Capture memory usage if available
        if (typeof performance !== "undefined" && (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory) {
            const memory = (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory;
            this.metrics.memoryUsage = memory?.usedJSHeapSize;
        }

        // Capture DOM size
        if (typeof document !== "undefined") {
            this.metrics.domSize = document.querySelectorAll('*').length;
        }

        return this.metrics as PerformanceMetrics;
    }

    /**
     * Get current load time without ending the measurement
     */
    getCurrentLoadTime(): number {
        return performance.now() - this.startTime;
    }

    /**
     * Check if current load time exceeds threshold
     */
    isSlowLoad(thresholdMs: number = 5000): boolean {
        return this.getCurrentLoadTime() > thresholdMs;
    }

    /**
     * Get memory usage if available
     */
    getMemoryUsage(): number | undefined {
        if (typeof performance !== "undefined" && (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory) {
            return (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory?.usedJSHeapSize;
        }
        return undefined;
    }

    /**
     * Check if memory usage is high
     */
    isHighMemoryUsage(thresholdMB: number = 50): boolean {
        const memoryUsage = this.getMemoryUsage();
        if (!memoryUsage) return false;
        return memoryUsage > thresholdMB * 1024 * 1024;
    }
}

/**
 * Create a performance monitor instance
 */
export function createPerformanceMonitor(): PerformanceMonitor {
    return new PerformanceMonitor();
}

/**
 * Utility to measure function execution time
 */
export async function measureExecutionTime<T>(
    fn: () => Promise<T> | T,
    label: string = "Function execution"
): Promise<{ result: T; duration: number }> {
    const start = performance.now();
    const result = await fn();
    const duration = performance.now() - start;

    console.log(`${label}: ${duration.toFixed(2)}ms`);

    return { result, duration };
}

/**
 * Utility to check if performance monitoring is available
 */
export function isPerformanceMonitoringAvailable(): boolean {
    return typeof performance !== "undefined" && typeof performance.now === "function";
}

/**
 * Utility to get performance budget recommendations
 */
export function getPerformanceBudget(): Record<string, number> {
    return {
        demoLoadTime: 3000, // 3 seconds
        memoryUsage: 50 * 1024 * 1024, // 50MB
        domSize: 1000, // 1000 DOM nodes
    };
}
