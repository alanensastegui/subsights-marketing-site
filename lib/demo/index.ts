// Analytics system
export * from "./analytics";

// Configuration
export * from "./config";

// HTML utilities
export * from "./html";

// Performance functions (exported from analytics)
export { createPerformanceMonitor, getPerformanceBudget } from "./analytics/performance";

// Additional type exports for completeness
export type { FallbackPolicy } from "./config";
