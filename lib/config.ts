// App URL configuration based on environment
export const getAppUrl = () => {
  // Check for explicit environment variable first
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // Fallback based on NODE_ENV
  switch (process.env.NODE_ENV) {
    case "development":
      return "http://localhost:4000";
    case "production":
      return "https://app.subsights.com";
    default:
      // For preview deployments (like Netlify previews)
      return "https://app.latest.subsights.com";
  }
};

// Calendly demo URL - can be overridden with NEXT_PUBLIC_CALENDLY_URL
export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/lucas-subsights/subsights-demo";

// Export the resolved URL for use in components
export const APP_URL = getAppUrl();
