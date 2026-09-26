import Link from "next/link";
import { Animate } from "@/components/ui/animate";
import { ButtonDuo } from "@/components/ui/button-duo";

type Copy = {
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const sectionId = "destinations-cta";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Bring us your busiest visitor question.",
  description: "We'll build a demo on your own website and show you how it answers.",
  primaryCta: { label: "See a destination demo", href: "/email-my-demo" },
  secondaryCta: { label: "See pricing", href: "/pricing" },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function DestinationsCta() {
  return (
    <section className="max-w-4xl mx-auto px-section py-section text-center">
      <Animate name="fadeInStagger" trigger="onVisible">
        <h2 className="animate-item text-4xl md:text-5xl font-bold tracking-tight leading-tight">{copy.title}</h2>
        <p className="animate-item mt-4 mb-8 text-xl md:text-2xl text-muted-foreground">{copy.description}</p>
        <div className="animate-item flex justify-center">
          <ButtonDuo
            primary={{
              asChild: true,
              children: <Link href={copy.primaryCta.href}>{copy.primaryCta.label}</Link>,
              size: "lg",
              dataAttributes: {
                "data-analytics-id": "destinations_cta_demo",
                "data-analytics-name": "Destination Demo (Destinations CTA)",
                "data-analytics-context": '{"source":"destinations_cta","section":"call-to-action"}',
              },
            }}
            secondary={{
              asChild: true,
              children: <Link href={copy.secondaryCta.href}>{copy.secondaryCta.label}</Link>,
              variant: "outline",
              size: "lg",
              dataAttributes: {
                "data-analytics-id": "destinations_cta_pricing",
                "data-analytics-name": "See Pricing (Destinations CTA)",
                "data-analytics-context": '{"source":"destinations_cta","section":"call-to-action"}',
              },
            }}
            gap="md"
            stackAt="sm"
            fullWidthMobile
            className="md:w-auto"
          />
        </div>
      </Animate>
    </section>
  );
}
