import type { Metadata } from "next";
import { getProspectDemo } from "@/lib/demo/config/prospects";
import { ProspectDemoPage } from "@/components/demo/prospect-demo";
import { jost } from "@/lib/demo/prospect-fonts";

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
    return (
      <div className={`flex flex-1 flex-col ${fonts}`}>
        <ProspectDemoPage demo={prospect} />
      </div>
    );
  }
  const { default: DemoPageClient } = await import("@/components/demo/demo-client-page");
  return <DemoPageClient slug={slug} />;
}
