// ============================================================================
// ANALYTICS TYPES
// ============================================================================

// Define specific parameter types for each event category
export interface PageViewParameters {
  search_params?: string;
  referrer?: string;
  user_agent?: string;
  viewport_size?: string;
}

export interface ButtonClickParameters {
  page: string;
  button_position?: string;
  button_size?: string;
}

export interface LinkClickParameters {
  page: string;
  link_url: string;
  link_type?: 'internal' | 'external' | 'download';
}

export interface FormParameters {
  page: string;
  form_type?: 'contact' | 'signup' | 'demo' | 'pricing';
  form_fields_count?: number;
}

export interface ScrollParameters {
  page: string;
  scroll_direction?: 'up' | 'down';
  scroll_speed?: 'fast' | 'medium' | 'slow';
}

export interface ConversionParameters {
  page?: string;
  location?: string;
  source?: string;
  campaign?: string;
  medium?: string;
  term?: string;
}

export interface ExceptionParameters {
  error_code?: string;
  user_action?: string;
  component?: string;
}

export interface PageViewEvent {
  page_title: string;
  page_location: string;
  page_path: string;
  custom_parameters?: PageViewParameters;
}

export interface CustomEvent {
  event_name: string;
  event_category: string;
  event_label?: string;
  value?: number;
  custom_parameters?: ButtonClickParameters | LinkClickParameters | FormParameters | ScrollParameters;
}

export interface ConversionEvent {
  conversion_id: string;
  conversion_label: string;
  value?: number;
  currency?: string;
  custom_parameters?: ConversionParameters;
}

export interface UserTimingEvent {
  name: string;
  value: number;
  category?: string;
  label?: string;
}

export interface ExceptionEvent {
  description: string;
  fatal?: boolean;
  custom_parameters?: ExceptionParameters;
}

export interface Analytics {
  // Page tracking
  trackPageView(event: PageViewEvent): Promise<void>;

  // Custom events
  trackEvent(event: CustomEvent): Promise<void>;

  // Conversions
  trackConversion(event: ConversionEvent): Promise<void>;

  // Performance tracking
  trackTiming(event: UserTimingEvent): Promise<void>;

  // Error tracking
  trackException(event: ExceptionEvent): Promise<void>;

  // User properties
  setUserProperty(name: string, value: string): Promise<void>;

  // User ID
  setUserId(userId: string): Promise<void>;

  // Consent management
  updateConsent(granted: boolean): void;
}

// Common event categories for consistency
export const EVENT_CATEGORIES = {
  ENGAGEMENT: "engagement",
  NAVIGATION: "navigation",
  FORM: "form",
  BUTTON: "button",
  LINK: "link",
  ERROR: "error",
  PERFORMANCE: "performance",
  CONVERSION: "conversion",
} as const;

// Common event names for consistency
export const EVENT_NAMES = {
  PAGE_VIEW: "page_view",
  BUTTON_CLICK: "button_click",
  LINK_CLICK: "link_click",
  FORM_SUBMIT: "form_submit",
  FORM_START: "form_start",
  SCROLL: "scroll",
  ERROR: "exception",
  TIMING: "timing_complete",
} as const;
