import type { Metadata } from "next";
import { getProspectDemo } from "@/lib/demo/config/prospects";
import { ProspectDemoPage } from "@/components/demo/prospect-demo";
import { jost } from "@/lib/demo/prospect-fonts";
import { getComparison } from "@/lib/demo/comparisons";
import { Suspense } from "react";
import { AnalyticsProvider } from "@/lib/analytics/context";
import { GoogleAnalytics } from "@/lib/analytics/components/google-analytics";
import { PageViewTracker } from "@/lib/analytics/components/page-view-tracker";
import { ConsentBanner } from "@/lib/analytics/components/consent-banner";
import { AutoButtonTracking } from "@/lib/analytics/components/auto-button-tracking";
import { ChatEngagementTracker } from "@/components/demo/chat-engagement-tracker";

export const dynamic = "force-dynamic"; // put this on the server page

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // Get the demo target to use the proper label
  const { getDemoTarget } = await import("@/lib/demo/config");
  const target = getProspectDemo(slug) || getDemoTarget(slug);

  const demoTitle = target?.label || slug;

  return {
    metadataBase: new URL("https://www.subsights.com"),
    title: `Demo: ${demoTitle} | Subsights`,
    description: `A working Subsights assistant preview for ${demoTitle}, prepared from selected public website pages.`,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prospect = getProspectDemo(slug);
  if (prospect) {
    const fonts = prospect.theme?.headingFont === "jost" ? jost.variable : "";
    // Page views, button clicks and moving into the chat go through the site's consent-aware analytics, as on
    // /demo/forks; what visitors ask is recorded by the assistant itself.
    return (
      <AnalyticsProvider>
        <div className={`flex flex-1 flex-col ${fonts}`}>
          <ProspectDemoPage demo={prospect} comparison={getComparison(slug)} />
        </div>
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <PageViewTracker />
          <ConsentBanner />
          <AutoButtonTracking />
          <ChatEngagementTracker slug={slug} />
        </Suspense>
      </AnalyticsProvider>
    );
  }
  const { default: DemoPageClient } = await import("@/components/demo/demo-client-page");
  return <DemoPageClient slug={slug} />;
}
