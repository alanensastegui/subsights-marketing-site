// components/sections/strategic-ai-partner/StrategicAIPartner.tsx
// NOTE: This file is a Server Component — no "use client" here.
import { strategicCopy as copy, sectionId } from "./copy";
import StrategicAIPartnerClient from "./client";

export { sectionId };

export default function StrategicAIPartner() {
  return (
    <section id={sectionId} className="max-w-6xl mx-auto px-6 py-12">
      {/* ======= SEO-visible header (SSR text) ======= */}
      <div className="text-center mb-16">
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground/95">
            {copy.heading.line1}
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground inline-block bg-gradient-to-r from-muted/80 via-muted/20 to-muted/80 px-4 py-2 rounded-lg backdrop-blur-sm">
            {copy.heading.line2}
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {copy.description}
        </p>
      </div>

      {/* ======= Interactive area (SSR + hydrated) ======= */}
      {/* TODO: Fix SEO - Value prop text needs to be SSR rendered for SEO friendliness */}
      <StrategicAIPartnerClient valuePropositions={copy.valuePropositions} />
    </section>
  );
}