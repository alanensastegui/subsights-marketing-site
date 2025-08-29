import { Animate } from "@/components/ui/animate";
import { ButtonDuo } from "@/components/ui/button-duo";
import CurvedArrow from "@/components/home/curved-arrow";
import Link from "next/link";
import { getFreeTrialUrl } from "@/lib/subscriptions";

type Copy = {
  slogan: {
    mobile: string;
    desktop: string;
  };
  description: {
    mobile: string;
    desktop: string;
  };
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const copy = {
  slogan: {
    mobile: "Meet your AI teammate",
    desktop: "Subsights is the AI teammate for modern websites"
  },
  description: {
    mobile: "Subsights is the system that streamlines support, lead qualification, and revenue growth.",
    desktop: "Meet the system that streamlines support, lead qualification, and revenue growth.",
  },
  primaryCta: { label: "Email My Demo", href: "/email-my-demo" },
  secondaryCta: { label: "Start Free", href: getFreeTrialUrl() },
} satisfies Copy;

export default function Hero() {
  return (
    <section className="text-center space-y-8 max-w-6xl mx-auto px-6 py-12 relative">
      <CurvedArrow
        anchorSelector="#home-hero-title"
        targetSelector=".logo-toggle"
        targetAnchor="top"
        targetOffsetPx={0}
        extendToViewport
        freezeAfterTarget
        renderOnlyWhenTargetPresent
        recomputeOnScrollView
        stopShortPx={32}
        className="text-foreground"
        strokeDasharray="4 8"
        containerClassName="z-10"
      />
      {/* Slogan */}
      <Animate name="fadeInStagger" trigger="onVisible">
        <h2 id="home-hero-title" className="animate-item text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 max-w-2xl text-center mx-auto">
          <span className="block md:hidden">{copy.slogan.mobile}</span>
          <span className="hidden md:block">{copy.slogan.desktop}</span>
        </h2>

        {/* Description */}
        <div className="w-full flex justify-center">
          <p className="animate-item text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 break-normal max-w-md text-center mx-auto">
            <span className="block md:hidden">{copy.description.mobile}</span>
            <span className="hidden md:block">{copy.description.desktop}</span>
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
                "data-analytics-id": "home_hero_demo",
                "data-analytics-name": "Email My Demo (Home Hero)",
                "data-analytics-context": '{"source":"home_hero","section":"hero"}',
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
                "data-analytics-id": "home_hero_start_free",
                "data-analytics-name": "Start Free (Home Hero)",
                "data-analytics-context": '{"source":"home_hero","section":"hero"}',
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

export const sectionId = "hero";
