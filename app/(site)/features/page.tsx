import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import FeaturesHero from "./sections/features-hero";
import FeaturesGrid from "./sections/features-grid";
import FeaturesCta from "./sections/features-cta";

export const metadata: Metadata = buildMetadata({
  title: "Features - Subsights AI",
  description: "Discover the powerful features that make Subsights AI the perfect solution for your website conversion needs. From intelligent lead qualification to seamless integrations.",
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
