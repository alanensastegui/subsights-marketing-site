import { z } from "zod";
import { DemoEventSchema } from "./types";
import type { DemoEvent } from "./types";

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate an event using Zod schema
 * Returns true if valid, false otherwise
 */
export function isValidEvent(event: unknown): event is DemoEvent {
    const result = DemoEventSchema.safeParse(event);
    if (!result.success) {
        console.warn("Event validation failed:", {
            issues: result.error.issues,
            data: event
        });
    }
    return result.success;
}

/**
 * Parse and validate an event with detailed error information
 * Returns the parsed event or null if validation fails
 */
export function parseEvent(event: unknown): DemoEvent | null {
    const result = DemoEventSchema.safeParse(event);
    if (!result.success) {
        console.error("Failed to parse event:", {
            issues: result.error.issues,
            data: event
        });
        return null;
    }
    return result.data;
}

/**
 * Validate and transform an event, with automatic type coercion
 * Useful for data from localStorage or external sources
 */
export function validateAndTransformEvent(event: unknown): DemoEvent | null {
    try {
        // Attempt to parse with potential coercion
        const result = DemoEventSchema.parse(event);
        return result;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Event validation failed:", {
                issues: error.issues,
                data: event
            });
        } else {
            console.error("Unexpected error during validation:", error);
        }
        return null;
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate unique event ID
 */
export function generateEventId(): string {
    return `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate session ID
 */
export function getSessionId(): string {
    if (typeof window === "undefined") return "server";

    let sessionId = localStorage.getItem("subsights_session_id");
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("subsights_session_id", sessionId);
    }
    return sessionId;
}
