import { ConsoleDemoAnalytics, GTMDemoAnalytics, CompositeDemoAnalytics } from "./providers";
import { EventLogger } from "./event-logger";
import type { DemoMode } from "../config";
import type { DemoEvent, FallbackReason } from "./types";

// Main exports
export { EventLogger } from "./event-logger";
export { CompositeDemoAnalytics } from "./providers";

// Types
export type { DemoEvent, DemoAnalytics, FallbackReason, PerformanceMetrics } from "./types";

// Zod schemas
export { DemoEventSchema, PerformanceMetricsSchema } from "./types";

// Utility functions
export { isValidEvent, generateEventId, getSessionId, parseEvent, validateAndTransformEvent } from "./utils";

// Event logger instance
export const eventLogger = EventLogger.getInstance();

// Core analytics instance
export const analytics = new CompositeDemoAnalytics([
    new ConsoleDemoAnalytics(),
    new GTMDemoAnalytics(),
]);

// Public utility functions
export function getDemoEvents() {
    return eventLogger.getStoredEvents();
}

export function clearDemoEvents() {
    eventLogger.clearEvents();
}

export function getEventStats() {
    return eventLogger.getEventStats();
}

export function createDemoEvent(
    slug: string,
    reason: FallbackReason,
    chosenMode: DemoMode,
    metadata?: Record<string, unknown>
): Omit<DemoEvent, "id" | "timestamp" | "sessionId" | "userAgent"> {
    return {
        slug,
        reason,
        chosenMode,
        metadata,
    };
}
