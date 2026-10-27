import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import FeaturesHero from "./sections/features-hero";
import FeaturesGrid from "./sections/features-grid";
import FeaturesCta from "./sections/features-cta";

export const metadata: Metadata = buildMetadata({
  title: 'Features - Subsights AI',
  description: 'Choose sources, shape your website assistant, review conversations and test useful improvements. Work directly with the Subsights team from setup through care.',
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <FeaturesHero />
      <FeaturesGrid />
      <FeaturesCta />
    </main>
  );
}
