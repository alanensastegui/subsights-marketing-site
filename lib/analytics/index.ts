// ============================================================================
// ANALYTICS SYSTEM - SERVER-SAFE EXPORTS
// ============================================================================

// Export types and configuration (safe for server-side)
export type * from "./types";
export * from "./config";

// Export providers for direct access if needed
export { GoogleAnalytics } from "./providers/ga4";
export { ConsoleAnalytics } from "./providers/console";
export { DisabledAnalytics } from "./providers/disabled";

// Export context (client-side only)
export { AnalyticsProvider, useAnalytics, useAnalyticsEnabled } from "./context";

// Note: The old analytics singleton is deprecated in favor of the context-based approach
// Use useAnalytics() hook instead of importing analytics directly
