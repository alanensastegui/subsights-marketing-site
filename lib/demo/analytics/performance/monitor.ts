/**
 * Performance monitoring utilities for demo system
 */

import { PERFORMANCE_CONSTANTS } from "../constants";

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
     * Uses Chrome-specific performance.memory API
     */
    private getMemoryUsage(): number | undefined {
        if (typeof performance === "undefined") return undefined;

        // The @types/web package provides proper typing for performance.memory
        // We need to cast to access the Chrome-specific memory property
        const performanceWithMemory = performance as Performance & {
            memory?: {
                usedJSHeapSize: number;
                totalJSHeapSize: number;
                jsHeapSizeLimit: number;
            };
        };

        return performanceWithMemory.memory?.usedJSHeapSize;
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
 */
export function getPerformanceBudget(): Record<string, number> {
    return {
        demoLoadTime: PERFORMANCE_CONSTANTS.DEMO_LOAD_TIME_THRESHOLD,
        memoryUsage: PERFORMANCE_CONSTANTS.MEMORY_USAGE_THRESHOLD,
        domSize: PERFORMANCE_CONSTANTS.DOM_SIZE_THRESHOLD,
    };
}
