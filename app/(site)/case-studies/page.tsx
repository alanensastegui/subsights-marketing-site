import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "./sections/hero";
import CustomerStories from "./sections/customer-stories";
import ResultsOverview from "./sections/results-overview";
import CallToAction from "./sections/call-to-action";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies - Customer Success Stories",
  description: "Discover how Subsights AI has transformed customer service for businesses across industries. Real results from real customers.",
  path: "/case-studies",
  image: "/og/case-studies.png",
});

export default function CaseStudies() {
  const Sections = [Hero, CustomerStories, ResultsOverview, CallToAction];
  return (
    <main className="min-h-screen">
      {Sections.map((S, i) => <S key={i} />)}
    </main>
  );
}
