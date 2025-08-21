// ============================================================================
// ANALYTICS ROUTER / MANAGER
// Orchestrates provider selection and hot-swaps on consent changes
// ============================================================================

import type {
  Analytics,
  PageViewEvent,
  CustomEvent,
  ConversionEvent,
  UserTimingEvent,
  ExceptionEvent,
} from "./types";
import { ANALYTICS_CONFIG, RUNTIME } from "./config";
import { GoogleAnalytics } from "./providers/ga4";
import { ConsoleAnalytics } from "./providers/console";
import { DisabledAnalytics } from "./providers/disabled";
import { getConsentState, isConsentRequired, CONSENT_STORAGE_KEY } from "./consent";
import { analyticsEventQueue } from "./event-queue";

type ProviderName = "disabled" | "console" | "ga4";

function createConcreteProvider(providerName: ProviderName): Analytics {
  switch (providerName) {
    case "console":
      return new ConsoleAnalytics();
    case "ga4":
      return new GoogleAnalytics();
    case "disabled":
    default:
      return new DisabledAnalytics();
  }
}

function resolveProviderName(): ProviderName {
  // Server-side: always return disabled provider
  if (typeof window === "undefined") {
    return "disabled";
  }

  // Local development uses console analytics regardless of consent for DX
  if (RUNTIME === "local") {
    return "console";
  }

  // If consent is required and not granted, disable
  const consentRequired = isConsentRequired();
  if (consentRequired) {
    try {
      const consent = getConsentState();
      if (!consent.analytics) {
        return "disabled";
      }
    } catch {
      return "disabled";
    }
  }

  // Otherwise use configured provider
  switch (ANALYTICS_CONFIG.provider) {
    case "ga4":
      return "ga4";
    case "console":
      return "console";
    default:
      return "disabled";
  }
}

/**
 * AnalyticsRouter implements Analytics and delegates to an internal provider.
 * It can hot-swap providers when consent or config changes.
 */
export class AnalyticsRouter implements Analytics {
  private currentProvider: Analytics;
  private providerName: ProviderName;
  private queueReady = false;

  constructor() {
    this.providerName = resolveProviderName();
    this.currentProvider = createConcreteProvider(this.providerName);
    try {
      const consent = getConsentState();
      console.info(
        "[AnalyticsRouter] init",
        { RUNTIME, provider: this.providerName, consentRequired: isConsentRequired(), consentAnalytics: consent.analytics }
      );
    } catch { }

    // Initialize queue readiness when enabled at start
    if (this.providerName !== "disabled") {
      this.markQueueReadyOnce();
    }

    // Bind all methods
    this.trackPageView = this.trackPageView.bind(this);
    this.trackEvent = this.trackEvent.bind(this);
    this.trackConversion = this.trackConversion.bind(this);
    this.trackTiming = this.trackTiming.bind(this);
    this.trackException = this.trackException.bind(this);
    this.setUserProperty = this.setUserProperty.bind(this);
    this.setUserId = this.setUserId.bind(this);
    this.updateConsent = this.updateConsent.bind(this);

    // Listen for cross-tab consent changes
    if (typeof window !== "undefined") {
      window.addEventListener("storage", (event: StorageEvent) => {
        if (event.key === CONSENT_STORAGE_KEY) {
          try {
            const consent = getConsentState();
            this.updateConsent(!!consent.analytics);
          } catch {
            // Ignore parse errors
          }
        }
      });
    }
  }

  private markQueueReadyOnce(): void {
    if (!this.queueReady) {
      this.queueReady = true;
      analyticsEventQueue.ready();
    }
  }

  private swapProviderIfNeeded(): void {
    const nextName = resolveProviderName();
    if (nextName === this.providerName) {
      return;
    }
    console.info("[AnalyticsRouter] swapping provider", { from: this.providerName, to: nextName });
    this.providerName = nextName;
    this.currentProvider = createConcreteProvider(nextName);
    if (nextName !== "disabled") {
      this.markQueueReadyOnce();
    }
  }

  // Delegation methods
  async trackPageView(event: PageViewEvent): Promise<void> {
    return this.currentProvider.trackPageView(event);
  }

  async trackEvent(event: CustomEvent): Promise<void> {
    return this.currentProvider.trackEvent(event);
  }

  async trackConversion(event: ConversionEvent): Promise<void> {
    return this.currentProvider.trackConversion(event);
  }

  async trackTiming(event: UserTimingEvent): Promise<void> {
    return this.currentProvider.trackTiming(event);
  }

  async trackException(event: ExceptionEvent): Promise<void> {
    return this.currentProvider.trackException(event);
  }

  async setUserProperty(name: string, value: string): Promise<void> {
    return this.currentProvider.setUserProperty(name, value);
  }

  async setUserId(userId: string): Promise<void> {
    return this.currentProvider.setUserId(userId);
  }

  /**
   * updateConsent serves two roles:
   * - For active providers: forward update so they can adjust internal consent mode.
   * - For boundary crossings: re-evaluate and hot-swap providers.
   */
  updateConsent(granted: boolean): void {
    const wasEnabled = this.providerName !== "disabled";

    // Forward to current provider only if it was enabled
    if (wasEnabled) {
      try {
        this.currentProvider.updateConsent(granted);
      } catch {
        // Ignore provider-specific errors
      }
    }

    // Re-evaluate and hot-swap as needed
    this.swapProviderIfNeeded();

    const isEnabledNow = this.providerName !== "disabled";
    console.info("[AnalyticsRouter] updateConsent", { granted, wasEnabled, isEnabledNow, provider: this.providerName });
    if (!wasEnabled && isEnabledNow) {
      // Newly enabled: ensure queue ready, propagate consent to new provider, and send synthetic page view
      this.markQueueReadyOnce();
      try {
        this.currentProvider.updateConsent(granted);
      } catch {
        // Ignore
      }
      this.sendSyntheticPageView();
    }
  }

  // isEnabled() removed; router handles gating internally via provider selection

  private sendSyntheticPageView(): void {
    if (typeof window === "undefined") return;
    try {
      const pageTitle = document.title;
      const pageLocation = window.location.href;
      const pagePath = window.location.pathname;
      void this.currentProvider.trackPageView({
        page_title: pageTitle,
        page_location: pageLocation,
        page_path: pagePath,
        custom_parameters: {
          search_params: window.location.search.replace(/^\?/, ""),
          referrer: document.referrer || undefined,
          user_agent: navigator.userAgent,
          viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        },
      });
    } catch {
      // Best-effort only
    }
  }
}


