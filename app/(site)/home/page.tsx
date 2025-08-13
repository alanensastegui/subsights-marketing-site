import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "./sections/hero";
import StrategicAIPartner from "./sections/strategic-ai-partner";
import UseCases from "./sections/use-cases";
import ScaleReduceCosts from "./sections/scale-reduce-costs";
import TrustedBy from "./sections/trusted-by";
import CustomerQuote from "./sections/customer-quote";
import CallToAction from "./sections/call-to-action";

export const metadata: Metadata = buildMetadata({
  title: "Home - Subsights AI",
  description: "Your Website is Your Front Door. We Provide the 24/7 Expert. Subsights AI qualifies, guides, and converts your best website visitors.",
  path: "/",
});

export default function Home() {
  const Sections = [Hero, TrustedBy, StrategicAIPartner, UseCases, ScaleReduceCosts, CustomerQuote, CallToAction];

  return (
    <main className="min-h-screen">
      {Sections.map((S, i) => <S key={i} />)}
    </main>
  );
}
