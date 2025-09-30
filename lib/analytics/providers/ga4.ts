import type { Analytics, PageViewEvent, CustomEvent, ConversionEvent, UserTimingEvent, ExceptionEvent } from "../types";
import { GA_MEASUREMENT_ID, ANALYTICS_CONFIG } from "../config";
import { analyticsEventQueue } from "../event-queue";
import { getBotDetectionResult } from "../bot-detection";

// Extend Window interface for Google Analytics
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: Gtag.Gtag;
  }
}

// ============================================================================
// GOOGLE ANALYTICS 4 PROVIDER
// ============================================================================

export class GoogleAnalytics implements Analytics {
  private ready = false;
  private queue: Array<() => void> = [];
  private measurementId: string;

  constructor() {
    this.measurementId = GA_MEASUREMENT_ID || "";

    // Bind methods to ensure 'this' context is preserved
    this.trackPageView = this.trackPageView.bind(this);
    this.trackEvent = this.trackEvent.bind(this);
    this.trackConversion = this.trackConversion.bind(this);
    this.trackTiming = this.trackTiming.bind(this);
    this.trackException = this.trackException.bind(this);
    this.setUserProperty = this.setUserProperty.bind(this);
    this.setUserId = this.setUserId.bind(this);
    this.updateConsent = this.updateConsent.bind(this);

    if (!this.measurementId) {
      console.warn("Google Analytics: No measurement ID configured for current environment");
      return;
    }

    // Initialize GA4 with consent mode
    this.initialize();
  }

  /**
   * Initialize Google Analytics 4 with consent mode
   */
  private initialize(): void {
    if (typeof window === "undefined" || !this.measurementId) {
      return;
    }

    try {
      // Set up dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: Parameters<Gtag.Gtag>) {
        window.dataLayer.push(args);
      }

      // Initialize gtag
      gtag("js", new Date());

      // Get bot detection results for user-level tracking
      const botDetection = getBotDetectionResult();

      // Only set user properties if bot is detected
      const userProperties = botDetection.isBot ? {
        is_bot: botDetection.isBot,
        bot_confidence: botDetection.confidence,
        bot_type: botDetection.botType || 'unknown',
      } : {};

      // Configure GA4 with consent mode defaults and user properties
      gtag("config", this.measurementId, {
        send_page_view: false, // We'll control page views manually
        user_properties: userProperties,
        ...ANALYTICS_CONFIG.consentMode.default,
      });

      // Set consent mode defaults
      gtag("consent", "default", ANALYTICS_CONFIG.consentMode.default);

      // Mark as ready and flush queue
      this.ready = true;
      this.flushQueue();

      // Mark analytics event queue as ready
      analyticsEventQueue.ready();

      // Set up visibility change handler for reliable event sending
      this.setupVisibilityHandler();

    } catch (error) {
      console.error("Failed to initialize Google Analytics:", error);
    }
  }

  /**
   * Set up visibility change handler for reliable event sending
   */
  private setupVisibilityHandler(): void {
    if (typeof window === "undefined") return;

    const sendBeacon = () => {
      if (window.dataLayer && window.dataLayer.length > 0) {
        // Force send any pending events
        this.flushQueue();
      }
    };

    // Send events when page becomes hidden
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        sendBeacon();
      }
    });

    // Send events when page is about to unload
    window.addEventListener("pagehide", sendBeacon);
  }

  /**
   * Call gtag function, queue if not ready
   */
  private call(fn: () => void): void {
    if (this.ready && typeof window !== "undefined" && typeof window.gtag === 'function') {
      fn();
    } else {
      this.queue.push(fn);
    }
  }

  /**
   * Flush queued events
   */
  private flushQueue(): void {
    if (!this.ready) return;

    const queued = this.queue.splice(0);
    queued.forEach(fn => {
      try {
        fn();
      } catch (error) {
        console.error("Failed to send queued analytics event:", error);
      }
    });
  }

  /**
   * Get gtag function safely
   */
  private getGtag(): typeof gtag | null {
    if (typeof window === "undefined" || typeof window.gtag !== 'function') {
      return null;
    }
    return window.gtag;
  }

  async trackPageView(event: PageViewEvent): Promise<void> {
    this.call(() => {
      const gtag = this.getGtag();
      if (!gtag) return;

      // Get bot detection results
      const botDetection = getBotDetectionResult();

      // Only include bot detection data if it's actually a bot
      const botData: Record<string, string | number | boolean> = {};
      if (botDetection.isBot) {
        botData.bot_detected = true;
        botData.bot_confidence = botDetection.confidence;
        botData.bot_type = botDetection.botType || 'unknown';
        botData.bot_reasons = botDetection.reasons.join(',');
      }

      gtag("event", "page_view", {
        page_title: event.page_title,
        page_location: event.page_location,
        page_path: event.page_path,
        send_to: this.measurementId,
        transport_type: "beacon",
        ...botData,
        ...event.custom_parameters,
      });
    });
  }

  async trackEvent(event: CustomEvent): Promise<void> {
    this.call(() => {
      const gtag = this.getGtag();
      if (!gtag) return;

      // Get bot detection results
      const botDetection = getBotDetectionResult();

      // Only include bot detection data if it's actually a bot
      const botData: Record<string, string | number | boolean> = {};
      if (botDetection.isBot) {
        botData.bot_detected = true;
        botData.bot_confidence = botDetection.confidence;
        botData.bot_type = botDetection.botType || 'unknown';
        botData.bot_reasons = botDetection.reasons.join(',');
      }

      gtag("event", event.event_name, {
        event_category: event.event_category,
        event_label: event.event_label,
        value: event.value,
        send_to: this.measurementId,
        transport_type: "beacon",
        ...botData,
        ...event.custom_parameters,
      });
    });
  }

  async trackConversion(event: ConversionEvent): Promise<void> {
    this.call(() => {
      const gtag = this.getGtag();
      if (!gtag) return;

      // Get bot detection results
      const botDetection = getBotDetectionResult();

      // Only include bot detection data if it's actually a bot
      const botData: Record<string, string | number | boolean> = {};
      if (botDetection.isBot) {
        botData.bot_detected = true;
        botData.bot_confidence = botDetection.confidence;
        botData.bot_type = botDetection.botType || 'unknown';
        botData.bot_reasons = botDetection.reasons.join(',');
      }

      gtag("event", "conversion", {
        conversion_id: event.conversion_id,
        conversion_label: event.conversion_label,
        value: event.value,
        currency: event.currency || "USD",
        send_to: this.measurementId,
        transport_type: "beacon",
        ...botData,
        ...event.custom_parameters,
      });
    });
  }

  async trackTiming(event: UserTimingEvent): Promise<void> {
    this.call(() => {
      const gtag = this.getGtag();
      if (!gtag) return;

      // Get bot detection results
      const botDetection = getBotDetectionResult();

      // Only include bot detection data if it's actually a bot
      const botData: Record<string, string | number | boolean> = {};
      if (botDetection.isBot) {
        botData.bot_detected = true;
        botData.bot_confidence = botDetection.confidence;
        botData.bot_type = botDetection.botType || 'unknown';
      }

      gtag("event", "timing_complete", {
        name: event.name,
        value: event.value,
        event_category: event.category || "performance",
        event_label: event.label,
        send_to: this.measurementId,
        transport_type: "beacon",
        ...botData,
      });
    });
  }

  async trackException(event: ExceptionEvent): Promise<void> {
    this.call(() => {
      const gtag = this.getGtag();
      if (!gtag) return;

      // Get bot detection results
      const botDetection = getBotDetectionResult();

      // Scrub PII from error description
      const scrubbedDescription = this.scrubPII(event.description);

      // Only include bot detection data if it's actually a bot
      const botData: Record<string, string | number | boolean> = {};
      if (botDetection.isBot) {
        botData.bot_detected = true;
        botData.bot_confidence = botDetection.confidence;
        botData.bot_type = botDetection.botType || 'unknown';
      }

      gtag("event", "exception", {
        description: scrubbedDescription,
        fatal: event.fatal || false,
        send_to: this.measurementId,
        transport_type: "beacon",
        ...botData,
        ...event.custom_parameters,
      });
    });
  }

  async setUserProperty(name: string, value: string): Promise<void> {
    this.call(() => {
      const gtag = this.getGtag();
      if (!gtag) return;

      gtag("config", this.measurementId, {
        custom_map: {
          [name]: value,
        },
      });
    });
  }

  async setUserId(userId: string): Promise<void> {
    this.call(() => {
      const gtag = this.getGtag();
      if (!gtag) return;

      gtag("config", this.measurementId, {
        user_id: userId,
      });
    });
  }

  /**
   * Update consent mode
   */
  updateConsent(granted: boolean): void {
    this.call(() => {
      const gtag = this.getGtag();
      if (!gtag) return;

      const consent = granted
        ? ANALYTICS_CONFIG.consentMode.granted
        : ANALYTICS_CONFIG.consentMode.default;

      gtag("consent", "update", consent);

      // If consent is granted, flush any queued events
      if (granted) {
        this.flushQueue();
      }
    });
  }

  /**
   * Scrub personally identifiable information from error descriptions
   */
  private scrubPII(text: string): string {
    return text
      // Remove email addresses
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[EMAIL]")
      // Remove tokens (common patterns)
      .replace(/\b[A-Za-z0-9]{32,}\b/g, "[TOKEN]")
      // Remove URLs with sensitive parameters
      .replace(/https?:\/\/[^\s]+token=[^\s&]+/g, "[URL_WITH_TOKEN]")
      .replace(/https?:\/\/[^\s]+password=[^\s&]+/g, "[URL_WITH_PASSWORD]");
  }
}
