import { z } from "zod";
import type { DemoMode } from "../config";

// ============================================================================
// ZOD SCHEMAS & VALIDATION
// ============================================================================

// Performance metrics schema
export const PerformanceMetricsSchema = z.object({
    loadTime: z.number().positive().optional(),
    memoryUsage: z.number().positive().optional(),
});

// Main demo event schema
export const DemoEventSchema = z.object({
    id: z.string().min(1, "Event ID must not be empty"),
    slug: z.string().min(1, "Slug must not be empty"),
    reason: z.enum([
        "proxy-timeout",
        "proxy-error",
        "proxy-fetch-failed",
        "proxy-http-error",
        "proxy-not-html",
        "proxy-too-large",
        "iframe-blocked",
        "iframe-probe-failed",
        "force-policy"
    ]),
    chosenMode: z.enum(["proxy", "iframe", "default"]),
    timestamp: z.number(),
    metadata: z.record(z.string(), z.unknown()).optional(),
    sessionId: z.string().optional(),
    userAgent: z.string().optional(),
    performance: PerformanceMetricsSchema.optional(),
});

// Inferred types from Zod schemas
export type DemoEvent = z.infer<typeof DemoEventSchema>;
export type PerformanceMetrics = z.infer<typeof PerformanceMetricsSchema>;
export type FallbackReason = DemoEvent["reason"];

// ============================================================================
// ANALYTICS INTERFACES
// ============================================================================

export interface DemoAnalytics {
    trackFallback(event: DemoEvent): Promise<void>;
    trackDemoView(slug: string, mode: DemoMode): Promise<void>;
    trackDemoSuccess(slug: string, mode: DemoMode, duration: number): Promise<void>;
}
