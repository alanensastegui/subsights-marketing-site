"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAnalytics } from "@/lib/analytics/context";

// ============================================================================
// PAGE VIEW TRACKER
// ============================================================================

interface PageViewTrackerProps {
  pageTitle?: string;
}

export function PageViewTracker({ pageTitle }: PageViewTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { trackPageView } = useAnalytics();
  const lastHref = useRef<string>("");

  useEffect(() => {
    // Construct the full href
    const href = pathname + (searchParams?.toString() ? `?${searchParams}` : "");

    // Prevent duplicate tracking (especially important in React StrictMode)
    if (lastHref.current === href) {
      return;
    }

    lastHref.current = href;

    // Track the page view
    trackPageView({
      page_title: pageTitle || document.title,
      page_location: window.location.origin + href,
      page_path: pathname,
      custom_parameters: {
        search_params: searchParams?.toString() || "",
      },
    });
  }, [pathname, searchParams, pageTitle, trackPageView]);

  return null; // This component doesn't render anything
}
