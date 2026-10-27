import type { Metadata } from "next";
import { ProspectDemoPage } from "@/components/demo/prospect-demo";
import { getProspectDemo } from "@/lib/demo/config/prospects";
import { Suspense } from "react";
import { AnalyticsProvider } from "@/lib/analytics/context";
import { GoogleAnalytics } from "@/lib/analytics/components/google-analytics";
import { PageViewTracker } from "@/lib/analytics/components/page-view-tracker";
import { ConsentBanner } from "@/lib/analytics/components/consent-banner";
import { AutoButtonTracking } from "@/lib/analytics/components/auto-button-tracking";

export const metadata: Metadata = {
  title: "Plan your Forks visit | Subsights demo",
  description: "Try a visitor assistant built around Forks' published information.",
  robots: { index: false, follow: false },
};

export default function ForksDemo() {
  return (
    <AnalyticsProvider>
      <ProspectDemoPage demo={getProspectDemo("forks")!} />
      <GoogleAnalytics />
      <Suspense fallback={null}>
        <PageViewTracker />
        <ConsentBanner />
        <AutoButtonTracking />
      </Suspense>
    </AnalyticsProvider>
  );
}
