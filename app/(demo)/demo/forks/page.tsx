import type { Metadata } from "next";
import Script from "next/script";
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
  // Public client key for this demo's widget chat, not a management credential.
  const widgetKey = "b1l8ztD9sb5UiXu4CFnb9g1esLWJDOXR";
  const widgetUrl = new URL("https://widget.subsights.com/index.html");
  widgetUrl.searchParams.set("workspace_id", "0XvceSLk1j");
  widgetUrl.searchParams.set("api_key", widgetKey);

  return (
    <AnalyticsProvider>
      <main className="flex-1 shrink-0 [&+footer]:pb-28 sm:[&+footer]:pb-3 bg-[#f2f5f1] px-4 py-5 pb-28 text-[#1f3029] sm:px-8 sm:py-8 sm:pb-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium text-[#53645b]">Subsights · Forks visitor demo</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Plan your Forks visit</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 sm:text-base">
            Ask about getting here, Forever Twilight, places to stay, or nearby beaches and rainforest.
            Start with where you&apos;re coming from and when you&apos;d like to visit.
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#53645b]">
            This demo uses published{" "}
            <a className="underline underline-offset-2" href="https://forkswa.com/" target="_blank" rel="noopener noreferrer">Forks Chamber information</a>
            {" "}and linked official visitor sources, checked October 21, 2026. Our team refreshes it.
            It cannot book tickets or rooms, or check live road conditions.
          </p>
          <a
            href={widgetUrl.toString()}
            data-subsights-open="open"
            data-analytics-name="forks_open_chat"
            data-analytics-id="forks-open-chat"
            className="mt-5 inline-flex min-h-12 items-center rounded-lg bg-[#244d3c] px-5 py-3 font-medium text-white hover:bg-[#1f4033] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#244d3c]"
          >
            Ask about your visit
          </a>
          <p className="mt-3 text-sm text-[#53645b]">Use this button to reopen the chat whenever you need it.</p>
          <Script
            id="forks-visitor-widget"
            src="https://widget.subsights.com/chatbot.js"
            data-workspace="0XvceSLk1j"
            data-api-key={widgetKey}
            strategy="afterInteractive"
          />
        </div>
      </main>
      <GoogleAnalytics />
      <Suspense fallback={null}>
        <PageViewTracker />
        <ConsentBanner />
        <AutoButtonTracking />
      </Suspense>
    </AnalyticsProvider>
  );
}
