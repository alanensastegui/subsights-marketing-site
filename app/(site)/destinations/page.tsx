import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import DestinationsHero from "./sections/destinations-hero";
import VisitorProof from "./sections/visitor-proof";
import VisitorQuestions from "./sections/visitor-questions";
import HowItWorks from "./sections/how-it-works";
import LaunchSteps from "./sections/launch-steps";
import DestinationsFaq from "./sections/destinations-faq";
import DestinationsCta from "./sections/destinations-cta";

export const metadata: Metadata = buildMetadata({
  title: "AI Visitor Assistant for Destinations - Subsights AI",
  description:
    "A managed AI assistant for destination marketing organizations. It learns your website and event calendars, answers visitors in their language, and sends them to the next step.",
  path: "/destinations",
});

export default function DestinationsPage() {
  const Sections = [DestinationsHero, VisitorProof, VisitorQuestions, HowItWorks, LaunchSteps, DestinationsFaq, DestinationsCta];

  return <main className="min-h-screen">{Sections.map((S, i) => <S key={i} />)}</main>;
}
