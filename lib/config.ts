import { isProd, isPreview, isDevelopment } from "@/lib/env";

export const getAppUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (isDevelopment) return "http://localhost:4000";
  if (isProd) return "https://app.subsights.com";
  if (isPreview) return "https://app.latest.subsights.com";

  // Fallback to development
  return "http://localhost:4000";
};

// Calendly demo URL - can be overridden with NEXT_PUBLIC_CALENDLY_URL
export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/lucas-subsights/subsights-demo";

// Partnership application URL - can be overridden with NEXT_PUBLIC_PARTNERSHIP_URL
export const PARTNERSHIP_URL = process.env.NEXT_PUBLIC_PARTNERSHIP_URL || "https://form.typeform.com/to/pZT6QBsv";

// Export the resolved URL for use in components
export const APP_URL = getAppUrl();
