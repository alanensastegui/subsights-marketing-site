// ============================================================================
// CONSENT MANAGEMENT
// ============================================================================



export type ConsentType = "analytics" | "advertising" | "functional";

export interface ConsentState {
  analytics: boolean;
  advertising: boolean;
  functional: boolean;
  timestamp: number;
}

const CONSENT_STORAGE_KEY = "analytics_consent";

/**
 * Get current consent state from localStorage
 */
export function getConsentState(): ConsentState {
  if (typeof window === "undefined") {
    return {
      analytics: false,
      advertising: false,
      functional: false,
      timestamp: Date.now(),
    };
  }

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        analytics: parsed.analytics ?? false,
        advertising: parsed.advertising ?? false,
        functional: parsed.functional ?? false,
        timestamp: parsed.timestamp ?? Date.now(),
      };
    }
  } catch (error) {
    console.warn("Failed to parse consent state:", error);
  }

  return {
    analytics: false,
    advertising: false,
    functional: false,
    timestamp: Date.now(),
  };
}

/**
 * Save consent state to localStorage
 */
export function saveConsentState(consent: ConsentState): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
      ...consent,
      timestamp: Date.now(),
    }));
  } catch (error) {
    console.error("Failed to save consent state:", error);
  }
}

/**
 * Update consent for specific types
 */
export function updateConsent(updates: Partial<ConsentState>): void {
  const current = getConsentState();
  const updated = { ...current, ...updates };
  saveConsentState(updated);
}

/**
 * Check if consent is required for current region
 */
export function isConsentRequired(): boolean {
  // Check if user is in EEA/UK
  const isEEA = checkIfEEA();
  return isEEA;
}

/**
 * Simple EEA detection (can be enhanced with more sophisticated geo-detection)
 */
function checkIfEEA(): boolean {
  if (typeof window === "undefined") return false;

  // Check for EU/EEA country codes in Accept-Language header
  const languages = navigator.languages || [navigator.language];
  const eeaCountries = [
    "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
    "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
    "SE", "GB", "IS", "LI", "NO"
  ];

  return languages.some(lang => {
    const country = lang.split("-")[1]?.toUpperCase();
    return country && eeaCountries.includes(country);
  });
}

/**
 * Get consent banner configuration
 */
export function getConsentBannerConfig() {
  return {
    title: "We value your privacy",
    description: "We use cookies and similar technologies to help personalize content, provide a better experience, and analyze our traffic. Please select your preferences below.",
    acceptAll: "Accept All",
    acceptEssential: "Essential Only",
    customize: "Customize",
    categories: {
      analytics: {
        title: "Analytics",
        description: "Help us understand how visitors interact with our website by collecting and reporting information anonymously.",
        required: false,
      },
      advertising: {
        title: "Advertising",
        description: "Used to make advertising messages more relevant to you and your interests.",
        required: false,
      },
      functional: {
        title: "Functional",
        description: "Enable enhanced functionality and personalization.",
        required: false,
      },
    },
  };
}
