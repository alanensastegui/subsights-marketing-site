"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Analytics } from "./types";
import { AnalyticsRouter } from "./router";
import { analyticsEventQueue } from "./event-queue";
import { getBotDetectionResult, type BotDetectionResult } from "./bot-detection";

// ============================================================================
// ANALYTICS CONTEXT
// ============================================================================

interface AnalyticsContextValue {
  analytics: Analytics;
  botDetection: BotDetectionResult;
  isBot: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

/**
 * Analytics Provider component
 * Safely initializes analytics only on the client side
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [analytics] = useState<Analytics>(() => new AnalyticsRouter());
  const [botDetection, setBotDetection] = useState<BotDetectionResult>({
    isBot: false,
    confidence: 0,
    reasons: ['initializing']
  });

  // Initialize bot detection and event queue when provider is ready
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Perform bot detection
      const detection = getBotDetectionResult();
      setBotDetection(detection);

      // Mark queue as ready after a brief delay to ensure dashboard is mounted
      const timer = setTimeout(() => {
        analyticsEventQueue.ready();
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [analytics]);

  const contextValue: AnalyticsContextValue = {
    analytics,
    botDetection,
    isBot: botDetection.isBot,
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

/**
 * Hook to access bot detection information
 * Only works on the client side
 */
export function useBotDetection(): BotDetectionResult {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error("useBotDetection must be used within AnalyticsProvider");
  }

  return context.botDetection;
}

/**
 * Hook to check if current visitor is likely a bot
 * Only works on the client side
 */
export function useIsBot(): boolean {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error("useIsBot must be used within AnalyticsProvider");
  }

  return context.isBot;
}

