"use client";

import { useCallback } from "react";
import { useAnalytics } from "../context";
import type { CustomEvent } from "../types";

// ============================================================================
// ANALYTICS EVENTS HOOK
// ============================================================================

export function useAnalyticsEvents() {
  const analytics = useAnalytics();

  const trackButtonClick = useCallback(async (buttonName: string, page?: string) => {
    try {
      await analytics.trackEvent({
        event_name: "button_click",
        event_category: "engagement",
        event_label: buttonName,
        custom_parameters: {
          page: page || (typeof window !== "undefined" ? window.location.pathname : ""),
        },
      });
    } catch (error) {
      console.error("Failed to track button click:", error);
    }
  }, [analytics]);

  const trackLinkClick = useCallback(async (linkText: string, linkUrl: string, page?: string) => {
    try {
      await analytics.trackEvent({
        event_name: "link_click",
        event_category: "navigation",
        event_label: linkText,
        custom_parameters: {
          link_url: linkUrl,
          page: page || (typeof window !== "undefined" ? window.location.pathname : ""),
        },
      });
    } catch (error) {
      console.error("Failed to track link click:", error);
    }
  }, [analytics]);

  const trackFormSubmit = useCallback(async (formName: string, page?: string) => {
    try {
      await analytics.trackEvent({
        event_name: "form_submit",
        event_category: "conversion",
        event_label: formName,
        custom_parameters: {
          page: page || (typeof window !== "undefined" ? window.location.pathname : ""),
        },
      });
    } catch (error) {
      console.error("Failed to track form submit:", error);
    }
  }, [analytics]);

  const trackScroll = useCallback(async (scrollDepth: number, page?: string) => {
    try {
      await analytics.trackEvent({
        event_name: "scroll",
        event_category: "engagement",
        event_label: `${scrollDepth}%`,
        value: scrollDepth,
        custom_parameters: {
          page: page || (typeof window !== "undefined" ? window.location.pathname : ""),
        },
      });
    } catch (error) {
      console.error("Failed to track scroll:", error);
    }
  }, [analytics]);

  const trackCustomEvent = useCallback(async (event: CustomEvent) => {
    try {
      await analytics.trackEvent(event);
    } catch (error) {
      console.error("Failed to track custom event:", error);
    }
  }, [analytics]);

  return {
    // Convenience methods
    trackButtonClick,
    trackLinkClick,
    trackFormSubmit,
    trackScroll,
    trackCustomEvent,

    // Direct access to analytics methods
    trackEvent: analytics.trackEvent,
    trackPageView: analytics.trackPageView,
    trackConversion: analytics.trackConversion,
    trackTiming: analytics.trackTiming,
    trackException: analytics.trackException,
    setUserProperty: analytics.setUserProperty,
    setUserId: analytics.setUserId,
  };
}
