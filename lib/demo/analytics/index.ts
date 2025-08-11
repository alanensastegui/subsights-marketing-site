import { ConsoleDemoAnalytics, GTMDemoAnalytics, CompositeDemoAnalytics } from "./providers";
import { EventLogger } from "./event-logger";
import type { FallbackReason } from "./fallback";
import type { DemoMode } from "../config";
import type { DemoEvent } from "./types";

// Main exports
export { EventLogger } from "./event-logger";
export { CompositeDemoAnalytics } from "./providers";
export * from "./performance";
export * from "./fallback";

// Types
export type { DemoEvent, DemoAnalytics } from "./types";

// Utility functions
export { isValidEvent, generateEventId, getSessionId } from "./types";

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
