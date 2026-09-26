import Link from "next/link";
import { Animate } from "@/components/ui/animate";
import { ButtonDuo } from "@/components/ui/button-duo";

type Copy = {
  eyebrow: string;
  heading: string;
  description: string;
  priceCue: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const sectionId = "destinations-hero";

// ---- SECTION COPY REGION ----
const copy = {
  eyebrow: "For destination marketing organizations",
  heading: "Give every visitor a local expert, 24/7.",
  description:
    "Subsights answers visitor questions about events, lodging, getting around and things to do, from your own website and calendars, in the visitor's language. We set it up and keep it current each season.",
  priceCue: "Start with a three-month pilot at $99 a month. Managed plans from $199 a month after that.",
  primaryCta: { label: "See a destination demo", href: "/email-my-demo" },
  secondaryCta: { label: "See pricing", href: "/pricing" },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function DestinationsHero() {
  return (
    <section className="max-w-section mx-auto px-section py-section text-center">
      <Animate name="fadeInStagger" trigger="onVisible">
        <p className="animate-item text-sm font-semibold uppercase tracking-widest text-primary mb-4">{copy.eyebrow}</p>
        <h1 className="animate-item max-w-3xl mx-auto text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
          {copy.heading}
        </h1>
        <p className="animate-item max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
          {copy.description}
        </p>
        <div className="animate-item flex justify-center">
          <ButtonDuo
            primary={{
              asChild: true,
              children: <Link href={copy.primaryCta.href}>{copy.primaryCta.label}</Link>,
              size: "lg",
              dataAttributes: {
                "data-analytics-id": "destinations_hero_demo",
                "data-analytics-name": "Destination Demo (Destinations Hero)",
                "data-analytics-context": '{"source":"destinations_hero","section":"hero"}',
              },
            }}
            secondary={{
              asChild: true,
              children: <Link href={copy.secondaryCta.href}>{copy.secondaryCta.label}</Link>,
              variant: "outline",
              size: "lg",
              dataAttributes: {
                "data-analytics-id": "destinations_hero_pricing",
                "data-analytics-name": "See Pricing (Destinations Hero)",
                "data-analytics-context": '{"source":"destinations_hero","section":"hero"}',
              },
            }}
            gap="md"
            stackAt="sm"
            fullWidthMobile
            className="md:w-auto"
          />
        </div>
        <p className="animate-item mt-6 text-base text-muted-foreground">{copy.priceCue}</p>
      </Animate>
    </section>
  );
}
