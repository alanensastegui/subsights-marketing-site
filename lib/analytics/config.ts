// ============================================================================
// ANALYTICS CONFIGURATION
// ============================================================================

import { isConsentRequired, getConsentState } from "./consent";

export type RuntimeEnvironment = "local" | "preview" | "staging" | "prod";

// Runtime environment detection with fallback to local
export const RUNTIME: RuntimeEnvironment =
  (process.env.NEXT_PUBLIC_RUNTIME_ENV as RuntimeEnvironment) ?? "local";

// Single GA Measurement ID. Provide it only in environments where you want GA enabled.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Analytics configuration based on runtime and region
export const ANALYTICS_CONFIG = {
  // Enable analytics based on region and consent requirements
  enabled: shouldEnableAnalytics(),

  // Use Google Analytics in staging/prod, console in preview
  provider: RUNTIME === "preview" ? "console" : "ga4",

  // Sampling rates for different environments
  sampling: {
    pageViews: RUNTIME === "prod" ? 1.0 : 1.0, // 100% in all envs
    events: RUNTIME === "prod" ? 1.0 : 1.0,     // 100% in all envs
    webVitals: RUNTIME === "prod" ? 0.1 : 1.0,  // 10% in prod, 100% elsewhere
  },

  // Consent mode configuration
  consentMode: {
    default: {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    },
    granted: {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    },
  },
} as const;

/**
 * Determine if analytics should be enabled based on region and consent
 */
function shouldEnableAnalytics(): boolean {
  // Development: Always use console analytics
  if (RUNTIME === "local") return false;

  // Check if consent is required for this region
  const consentRequired = isConsentRequired();

  if (consentRequired) {
    // EEA/UK: Require explicit consent
    return hasValidConsent();
  } else {
    // US/Other regions: Enable by default
    return true;
  }
}

/**
 * Check if user has valid consent for analytics
 */
function hasValidConsent(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const consent = getConsentState();
    return consent.analytics === true;
  } catch (error) {
    console.warn("Failed to check consent state:", error);
    return false;
  }
}

// Validation helpers
export const isValidRuntime = (env: string): env is RuntimeEnvironment => {
  return ["local", "preview", "staging", "prod"].includes(env);
};

export const isProduction = RUNTIME === "prod";
export const isDevelopment = RUNTIME === "local";
export const isPreview = RUNTIME === "preview";
export const isStaging = RUNTIME === "staging";
