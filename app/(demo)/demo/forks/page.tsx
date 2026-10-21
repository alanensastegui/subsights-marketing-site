import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Plan your Forks visit | Subsights demo",
  description: "Try a visitor assistant built around Forks' published information.",
  robots: { index: false, follow: false },
};

export default function ForksDemo() {
  const widgetKey = process.env.FORKS_DEMO_WIDGET_KEY;
  const widgetUrl = new URL("https://widget.subsights.com/index.html");
  widgetUrl.searchParams.set("workspace_id", "0XvceSLk1j");
  if (widgetKey) widgetUrl.searchParams.set("api_key", widgetKey);

  return (
    <main className="min-h-dvh bg-[#f2f5f1] px-4 py-5 text-[#1f3029] sm:px-8 sm:py-8">
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
        {widgetKey ? (
          <iframe
            title="Ask the Forks visitor assistant"
            src={widgetUrl.toString()}
            referrerPolicy="no-referrer"
            className="mt-5 h-[70dvh] min-h-[420px] w-full rounded-2xl border border-[#d5ded7] bg-white shadow-sm sm:h-[640px]"
          />
        ) : (
          <p className="mt-5">Coming soon: ask the Forks visitor assistant once this demo is connected.</p>
        )}
      </div>
    </main>
  );
}
