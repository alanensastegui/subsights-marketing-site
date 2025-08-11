import { DemoPageClient } from "@/components/demo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic"; // put this on the server page

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // Get the demo target to use the proper label
  const { getDemoTarget } = await import("@/lib/demo/config");
  const target = getDemoTarget(slug);

  const demoTitle = target?.label || slug;

  return {
    title: `Demo: ${demoTitle} | Subsights`,
    description: `Interactive demo of ${demoTitle} - See how Subsights works for you.`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DemoPageClient slug={slug} />;
}
