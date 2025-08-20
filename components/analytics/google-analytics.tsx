import Script from "next/script";
import { GA_MEASUREMENT_ID, RUNTIME } from "@/lib/analytics/config";

// ============================================================================
// GOOGLE ANALYTICS COMPONENT
// ============================================================================

export function GoogleAnalytics() {
  // Only load Google Analytics when measurement ID is available and not in development
  if (!GA_MEASUREMENT_ID || RUNTIME === "local") {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false,
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
