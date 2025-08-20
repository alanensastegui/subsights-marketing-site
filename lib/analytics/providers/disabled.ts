import type { Analytics } from "../types";

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
  async trackPageView(): Promise<void> {
    // No-op
  }

  async trackEvent(): Promise<void> {
    // No-op
  }

  async trackConversion(): Promise<void> {
    // No-op
  }

  async trackTiming(): Promise<void> {
    // No-op
  }

  async trackException(): Promise<void> {
    // No-op
  }

  async setUserProperty(): Promise<void> {
    // No-op
  }

  async setUserId(): Promise<void> {
    // No-op
  }

  updateConsent(): void {
    // No-op
  }
}
