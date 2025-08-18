// ============================================================================
// WEB VITALS REPORTING
// ============================================================================

import { ANALYTICS_CONFIG } from '@/lib/analytics/config';

type WebVitalMetric = {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType?: string;
};

export function reportWebVitals(metric: WebVitalMetric) {
  // Only report in non-local environments
  if (!ANALYTICS_CONFIG.enabled) {
    return;
  }

  // Apply sampling based on environment
  const samplingRate = ANALYTICS_CONFIG.sampling.webVitals;
  if (Math.random() > samplingRate) {
    return;
  }

  // Send to analytics if available
  if (typeof window !== 'undefined' && (window as any).__analytics) {
    try {
      (window as any).__analytics.trackEvent({
        event_name: "web_vital",
        event_category: "performance",
        event_label: metric.name,
        value: Math.round(metric.value),
        custom_parameters: {
          metric_id: metric.id,
          metric_name: metric.name,
          metric_value: metric.value,
          metric_rating: metric.rating,
          metric_delta: metric.delta,
          metric_navigation_type: metric.navigationType,
        },
      });
    } catch (error) {
      console.error('Failed to report web vital:', error);
    }
  }

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }
}
