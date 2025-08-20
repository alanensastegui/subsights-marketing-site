import { useCallback } from "react";
import { useAnalytics as useAnalyticsContext } from "../context";
import type { PageViewEvent, CustomEvent, ConversionEvent, UserTimingEvent, ExceptionEvent } from "../types";

// ============================================================================
// ANALYTICS HOOK
// ============================================================================

export function useAnalytics() {
  const analytics = useAnalyticsContext();
  
  if (!analytics) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }

  const trackPageView = useCallback(async (event: PageViewEvent) => {
    try {
      await analytics.trackPageView(event);
    } catch (error) {
      console.error("Failed to track page view:", error);
    }
  }, [analytics]);

  const trackEvent = useCallback(async (event: CustomEvent) => {
    try {
      await analytics.trackEvent(event);
    } catch (error) {
      console.error("Failed to track event:", error);
    }
  }, [analytics]);

  const trackConversion = useCallback(async (event: ConversionEvent) => {
    try {
      await analytics.trackConversion(event);
    } catch (error) {
      console.error("Failed to track conversion:", error);
    }
  }, [analytics]);

  const trackTiming = useCallback(async (event: UserTimingEvent) => {
    try {
      await analytics.trackTiming(event);
    } catch (error) {
      console.error("Failed to track timing:", error);
    }
  }, [analytics]);

  const trackException = useCallback(async (event: ExceptionEvent) => {
    try {
      await analytics.trackException(event);
    } catch (error) {
      console.error("Failed to track exception:", error);
    }
  }, [analytics]);

  const setUserProperty = useCallback(async (name: string, value: string) => {
    try {
      await analytics.setUserProperty(name, value);
    } catch (error) {
      console.error("Failed to set user property:", error);
    }
  }, [analytics]);

  const setUserId = useCallback(async (userId: string) => {
    try {
      await analytics.setUserId(userId);
    } catch (error) {
      console.error("Failed to set user ID:", error);
    }
  }, [analytics]);

  // Convenience methods for common events
  const trackButtonClick = useCallback(async (buttonName: string, page?: string) => {
    await trackEvent({
      event_name: "button_click",
      event_category: "engagement",
      event_label: buttonName,
      custom_parameters: {
        page: page || (typeof window !== "undefined" ? window.location.pathname : ""),
      },
    });
  }, [trackEvent]);

  const trackLinkClick = useCallback(async (linkText: string, linkUrl: string, page?: string) => {
    await trackEvent({
      event_name: "link_click",
      event_category: "navigation",
      event_label: linkText,
      custom_parameters: {
        link_url: linkUrl,
        page: page || (typeof window !== "undefined" ? window.location.pathname : ""),
      },
    });
  }, [trackEvent]);

  const trackFormSubmit = useCallback(async (formName: string, page?: string) => {
    await trackEvent({
      event_name: "form_submit",
      event_category: "conversion",
      event_label: formName,
      custom_parameters: {
        page: page || (typeof window !== "undefined" ? window.location.pathname : ""),
      },
    });
  }, [trackEvent]);

  const trackScroll = useCallback(async (scrollDepth: number, page?: string) => {
    await trackEvent({
      event_name: "scroll",
      event_category: "engagement",
      event_label: `${scrollDepth}%`,
      value: scrollDepth,
      custom_parameters: {
        page: page || (typeof window !== "undefined" ? window.location.pathname : ""),
      },
    });
  }, [trackEvent]);

  return {
    // Core analytics methods
    trackPageView,
    trackEvent,
    trackConversion,
    trackTiming,
    trackException,
    setUserProperty,
    setUserId,

    // Convenience methods
    trackButtonClick,
    trackLinkClick,
    trackFormSubmit,
    trackScroll,
  };
}
