"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Analytics } from "./types";
import { GoogleAnalytics } from "./providers/ga4";
import { ConsoleAnalytics } from "./providers/console";
import { DisabledAnalytics } from "./providers/disabled";
import { ANALYTICS_CONFIG, RUNTIME } from "./config";
import { isConsentRequired, getConsentState } from "./consent";
import { analyticsEventQueue } from "./event-queue";

// ============================================================================
// ANALYTICS CONTEXT
// ============================================================================

const AnalyticsContext = createContext<Analytics | null>(null);

/**
 * Create the appropriate analytics provider based on runtime environment and region
 */
function createAnalyticsProvider(): Analytics {
  // Server-side: always return disabled provider
  if (typeof window === "undefined") {
    return new DisabledAnalytics();
  }

  // Development: Always use console analytics (override enabled flag)
  if (RUNTIME === "local") {
    return new ConsoleAnalytics();
  }

  // For non-local environments, check if analytics is enabled
  if (!ANALYTICS_CONFIG.enabled) {
    return new DisabledAnalytics();
  }

  // Check if consent is required for this region
  const consentRequired = isConsentRequired();

  if (consentRequired) {
    // EEA/UK: Check for valid consent
    const hasConsent = hasValidConsent();
    if (!hasConsent) {
      return new DisabledAnalytics();
    }
  }

  // Use appropriate provider based on configuration
  switch (ANALYTICS_CONFIG.provider) {
    case "ga4":
      return new GoogleAnalytics();
    case "console":
      return new ConsoleAnalytics();
    default:
      return new DisabledAnalytics();
  }
}

/**
 * Check if user has valid consent for analytics
 */
function hasValidConsent(): boolean {
  try {
    const consent = getConsentState();
    return consent.analytics === true;
  } catch (error) {
    console.warn("Failed to check consent state:", error);
    return false;
  }
}

/**
 * Analytics Provider component
 * Safely initializes analytics only on the client side
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [analytics] = useState<Analytics>(() => {
    // Initialize immediately, not in useEffect
    if (typeof window === "undefined") {
      return new DisabledAnalytics();
    }
    return createAnalyticsProvider();
  });

  // Initialize event queue when provider is ready
  useEffect(() => {
    if (typeof window !== "undefined" && analytics.constructor.name !== "DisabledAnalytics") {
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

/**
 * Hook to check if analytics is available and enabled
 */
export function useAnalyticsEnabled(): boolean {
  const analytics = useContext(AnalyticsContext);
  if (!analytics) {
    return false;
  }
  return analytics.constructor.name !== "DisabledAnalytics";
}
