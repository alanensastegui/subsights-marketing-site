// components/sections/strategic-ai-partner/StrategicAIPartner.tsx
// NOTE: This file is a Server Component — no "use client" here.
import { strategicCopy as copy, sectionId } from "./copy";
import StrategicAIPartnerClient from "./client";

export { sectionId };

export default function StrategicAIPartner() {
  return (
    <section id={sectionId} className="max-w-6xl mx-auto px-6 py-20">
      {/* ======= SEO-visible header (SSR text) ======= */}
      <div className="text-center mb-16">
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {copy.heading.line1}
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            {copy.heading.line2}
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {copy.description}
        </p>
      </div>

      {/* ======= Interactive area (SSR + hydrated) ======= */}
      <StrategicAIPartnerClient valuePropositions={copy.valuePropositions} />
    </section>
  );
}