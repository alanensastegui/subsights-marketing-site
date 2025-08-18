import type { Analytics, PageViewEvent, CustomEvent, ConversionEvent, UserTimingEvent, ExceptionEvent } from "../types";

// ============================================================================
// DISABLED ANALYTICS PROVIDER
// ============================================================================

/**
 * No-op analytics provider for when analytics is disabled or not configured
 * Provides a safe fallback that won't throw errors or cause side effects
 */
export class DisabledAnalytics implements Analytics {
  constructor() {
    // Bind methods to ensure 'this' context is preserved
    this.trackPageView = this.trackPageView.bind(this);
    this.trackEvent = this.trackEvent.bind(this);
    this.trackConversion = this.trackConversion.bind(this);
    this.trackTiming = this.trackTiming.bind(this);
    this.trackException = this.trackException.bind(this);
    this.setUserProperty = this.setUserProperty.bind(this);
    this.setUserId = this.setUserId.bind(this);
    this.updateConsent = this.updateConsent.bind(this);
  }
  async trackPageView(_event: PageViewEvent): Promise<void> {
    // No-op
  }

  async trackEvent(_event: CustomEvent): Promise<void> {
    // No-op
  }

  async trackConversion(_event: ConversionEvent): Promise<void> {
    // No-op
  }

  async trackTiming(_event: UserTimingEvent): Promise<void> {
    // No-op
  }

  async trackException(_event: ExceptionEvent): Promise<void> {
    // No-op
  }

  async setUserProperty(_name: string, _value: string): Promise<void> {
    // No-op
  }

  async setUserId(_userId: string): Promise<void> {
    // No-op
  }

  updateConsent(_granted: boolean): void {
    // No-op
  }
}
