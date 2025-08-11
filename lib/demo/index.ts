// Analytics system
export * from "./analytics";

// Configuration
export * from "./config";

// HTML utilities
export * from "./html";

// Fallback and performance modules (excluding types to avoid conflicts)
export { FALLBACK_CONSTANTS, FALLBACK_MESSAGES, createFallbackEvent, logFallbackEvent } from "./analytics/fallback";
export { createPerformanceMonitor, getPerformanceBudget } from "./analytics/performance";

// Additional type exports for completeness
export type { FallbackPolicy } from "./config";
