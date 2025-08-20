import type { Analytics, PageViewEvent, CustomEvent, ConversionEvent, UserTimingEvent, ExceptionEvent } from "../types";
import { analyticsEventQueue } from "../event-queue";

// ============================================================================
// CONSOLE ANALYTICS PROVIDER
// ============================================================================

export class ConsoleAnalytics implements Analytics {
  private eventCount = 0;

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

  private logWithStyle(emoji: string, title: string, data: Record<string, unknown>, eventType: string): void {
    this.eventCount++;
    const timestamp = new Date().toLocaleTimeString();

    // Console logging (immediate)
    console.group(`%c${emoji} Analytics Event #${this.eventCount} - ${title} (${timestamp})`,
      'color: #3b82f6; font-weight: bold; font-size: 14px;');
    console.log('📋 Event Data:', data);
    console.log('🔗 Current URL:', window.location.href);
    console.log('📱 User Agent:', navigator.userAgent);
    console.groupEnd();

    // Queue event for dashboard (buffered)
    analyticsEventQueue.enqueue(eventType, data);
  }

  async trackPageView(event: PageViewEvent): Promise<void> {
    this.logWithStyle("📄", "Page View", {
      page_title: event.page_title,
      page_location: event.page_location,
      page_path: event.page_path,
      custom_parameters: event.custom_parameters,
    }, "pageViews");
  }

  async trackEvent(event: CustomEvent): Promise<void> {
    this.logWithStyle("🎯", "Custom Event", {
      event_name: event.event_name,
      event_category: event.event_category,
      event_label: event.event_label,
      value: event.value,
      custom_parameters: event.custom_parameters,
    }, "customEvents");
  }

  async trackConversion(event: ConversionEvent): Promise<void> {
    this.logWithStyle("💰", "Conversion", {
      conversion_id: event.conversion_id,
      conversion_label: event.conversion_label,
      value: event.value,
      currency: event.currency,
      custom_parameters: event.custom_parameters,
    }, "conversions");
  }

  async trackTiming(event: UserTimingEvent): Promise<void> {
    this.logWithStyle("⏱️", "Performance Timing", {
      name: event.name,
      value: event.value,
      category: event.category,
      label: event.label,
    }, "timing");
  }

  async trackException(event: ExceptionEvent): Promise<void> {
    this.logWithStyle("❌", "Exception", {
      description: event.description,
      fatal: event.fatal,
      custom_parameters: event.custom_parameters,
    }, "exceptions");
  }

  async setUserProperty(name: string, value: string): Promise<void> {
    this.logWithStyle("👤", "User Property", { name, value }, "userProperties");
  }

  async setUserId(userId: string): Promise<void> {
    this.logWithStyle("🆔", "User ID", { userId }, "userProperties");
  }

  updateConsent(granted: boolean): void {
    this.logWithStyle("🔒", "Consent Update", { granted }, "consent");
  }
}
