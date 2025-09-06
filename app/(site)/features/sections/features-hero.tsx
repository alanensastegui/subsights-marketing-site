import { Animate } from "@/components/ui/animate";
import { ButtonDuo } from "@/components/ui/button-duo";
import Link from "next/link";
import { getFreeTrialUrl } from "@/lib/subscriptions";

type Copy = {
  heading: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const copy = {
  heading: "Built for outcomes",
  description: "Features that power your Subsights teammate—so every visit counts",
  primaryCta: { label: "Email My Demo", href: "/email-my-demo" },
  secondaryCta: { label: "Start Free", href: getFreeTrialUrl() },
} satisfies Copy;

export default function FeaturesHero() {
  return (
    <section className="text-center space-y-8 max-w-6xl mx-auto px-6 py-12 relative">
      {/* Main Heading */}
      <Animate name="fadeInStagger" trigger="onVisible">
        <h1 className="animate-item max-w-2xl animate-item text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 text-center mx-auto">
          {copy.heading}
        </h1>

        {/* Description */}
        <div className="animate-item w-full flex justify-center">
          <p className="max-w-lg animate-item text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 break-normal text-center">
            {copy.description}
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="animate-item">
          <ButtonDuo
            primary={{
              asChild: true,
              children: (
                <Link href={copy.primaryCta.href}>
                  {copy.primaryCta.label}
                </Link>
              ),
              size: "lg",
              dataAttributes: {
                "data-analytics-id": "features_hero_demo",
                "data-analytics-name": "Email My Demo (Features Hero)",
                "data-analytics-context": '{"source":"features_hero","section":"hero"}',
              },
            }}
            secondary={{
              asChild: true,
              children: (
                <a href={copy.secondaryCta.href} target="_blank" rel="noopener noreferrer">
                  {copy.secondaryCta.label}
                </a>
              ),
              variant: "outline",
              size: "lg",
              dataAttributes: {
                "data-analytics-id": "features_hero_start_free",
                "data-analytics-name": "Start Free (Features Hero)",
                "data-analytics-context": '{"source":"features_hero","section":"hero"}',
              },
            }}
            gap="md"
            stackAt="sm"
            fullWidthMobile
          />
        </div>
      </Animate>
    </section>
  );
}

export const sectionId = "features-hero";
