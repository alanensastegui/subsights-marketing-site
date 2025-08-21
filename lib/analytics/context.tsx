"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Analytics } from "./types";
import { AnalyticsRouter } from "./router";
import { analyticsEventQueue } from "./event-queue";

// ============================================================================
// ANALYTICS CONTEXT
// ============================================================================

const AnalyticsContext = createContext<Analytics | null>(null);

/**
 * Analytics Provider component
 * Safely initializes analytics only on the client side
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [analytics] = useState<Analytics>(() => new AnalyticsRouter());

  // Initialize event queue when provider is ready
  useEffect(() => {
    // For dev dashboard visibility: if router is enabled, mark ready shortly after mount.
    // GA provider also calls ready on its own; this guard is harmless and idempotent in router.
    if (typeof window !== "undefined") {
      // Mark queue as ready after a brief delay to ensure dashboard is mounted
      const timer = setTimeout(() => {
        analyticsEventQueue.ready();
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [analytics]);

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

/**
 * Hook to access analytics functionality
 * Only works on the client side
 */
export function useAnalytics(): Analytics {
  const analytics = useContext(AnalyticsContext);

  if (!analytics) {
    throw new Error("useAnalytics must be used within AnalyticsProvider");
  }

  // Warn if used on server side
  if (typeof window === "undefined") {
    console.warn("useAnalytics: Called on server side - analytics will be disabled");
  }

  return analytics;
}

