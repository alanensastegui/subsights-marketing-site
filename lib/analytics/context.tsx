"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Analytics } from "./types";
import { AnalyticsRouter } from "./router";
import { analyticsEventQueue } from "./event-queue";
import { getBotDetectionResult } from "./bot-detection";

// ============================================================================
// ANALYTICS CONTEXT
// ============================================================================

interface AnalyticsContextValue {
  analytics: Analytics;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

/**
 * Analytics Provider component
 * Safely initializes analytics only on the client side
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [analytics] = useState<Analytics>(() => new AnalyticsRouter());

  // Initialize event queue when provider is ready
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Mark queue as ready after a brief delay to ensure dashboard is mounted
      const timer = setTimeout(() => {
        analyticsEventQueue.ready();
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [analytics]);

  const contextValue: AnalyticsContextValue = {
    analytics,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}

/**
 * Hook to access analytics functionality
 * Only works on the client side
 */
export function useAnalytics(): Analytics {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error("useAnalytics must be used within AnalyticsProvider");
  }

  // Warn if used on server side
  if (typeof window === "undefined") {
    console.warn("useAnalytics: Called on server side - analytics will be disabled");
  }

  return context.analytics;
}


