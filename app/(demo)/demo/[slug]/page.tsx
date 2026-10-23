import { DemoPageClient } from "@/components/demo";
import type { Metadata } from "next";
import { getProspectDemo } from "@/lib/demo/config/prospects";
import { ProspectDemoPage } from "@/components/demo/prospect-demo";

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
  if (prospect) return <ProspectDemoPage demo={prospect} />;
  return <DemoPageClient slug={slug} />;
}
