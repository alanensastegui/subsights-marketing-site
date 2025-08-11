/**
 * Performance monitoring utilities for demo system
 */

export interface PerformanceMetrics {
    loadTime: number;
    memoryUsage?: number;
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
        const maybeMemoryUsage = this.getMemoryUsage();
        if (maybeMemoryUsage) {
            this.metrics.memoryUsage = maybeMemoryUsage;
        }

        // Capture DOM size
        if (typeof document !== "undefined") {
            this.metrics.domSize = document.querySelectorAll('*').length;
        }

        return this.metrics as PerformanceMetrics;
    }

    /**
     * Get memory usage if available
     */
    private getMemoryUsage(): number | undefined {
        if (typeof performance !== "undefined" && (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory) {
            return (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory?.usedJSHeapSize;
        }
        return undefined;
    }
}

/**
 * Create a performance monitor instance
 */
export function createPerformanceMonitor(): PerformanceMonitor {
    return new PerformanceMonitor();
}

/**
 * Get centralized performance budget thresholds
 * These values are used throughout the demo system for consistency
 */
export function getPerformanceBudget(): Record<string, number> {
    return {
        demoLoadTime: 5000, // 5 seconds - matches actual code usage
        memoryUsage: 50 * 1024 * 1024, // 50MB - matches actual code usage
        domSize: 1000, // 1000 DOM nodes - for future monitoring
    };
}
