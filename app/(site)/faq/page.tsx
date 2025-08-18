import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "./sections/hero";
import FAQList from "./sections/faq-list/server";
import CallToAction from "./sections/call-to-action";

export const metadata: Metadata = buildMetadata({
  title: "FAQ - Frequently Asked Questions",
  description:
    "Find answers to common questions about Subsights integration, features, support, and more.",
  path: "/faq",
  image: "/og/faq.png",
});

export default function FAQ() {
  const Sections = [Hero, FAQList, CallToAction];

  return (
    <main className="min-h-screen">
      {Sections.map((S, i) => (
        <S key={i} />
      ))}
    </main>
  );
}
