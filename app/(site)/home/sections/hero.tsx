import { Animate } from "@/components/ui/animate";
import { ButtonDuo } from "@/components/ui/button-duo";
import Link from "next/link";
import { getFreeTrialUrl } from "@/lib/subscriptions";
import Image from "next/image";

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
    desktop: "Subsights is the AI teammate to grow your business"
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
    <section className="text-center space-y-8 max-w-6xl mx-auto px-6 py-12 flex flex-row gap-24 relative">
      {/* Slogan */}
      <div className="flex flex-col items-center md:gap-12 lg:gap-24 md:flex-row md:items-stretch">
        <Animate
          name="fadeInStagger"
          trigger="onVisible"
          className="md:flex-1 md:min-w-md md:max-w-md"
        >
          <h2 id="home-hero-title" className="animate-item text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 text-center md:text-left">
            <span className="block md:hidden">{copy.slogan.mobile}</span>
            <span className="hidden md:block">{copy.slogan.desktop}</span>
          </h2>

          {/* Description */}
          <div className="flex justify-center md:justify-start">
            <p className="animate-item text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 break-normal max-w-md text-center md:text-left">
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
              className="md:w-auto"
            />
          </div>
        </Animate>
      </div>
      <div className="absolute left-5/8">
        <div className="rounded-xl overflow-hidden relative w-3xl">
          <Image
            src="/images/product-screenshots/chatbot-analytics.png"
            alt="Subsights chatbot analytics conversation dashboard"
            width={1960}
            height={1960}
            priority
          />
        </div>
        <div className="rounded-xl overflow-hidden absolute -left-34 top-8 z-10">
          <Image
            src="/images/product-screenshots/wisp-conversation.png"
            alt="Subsights assistant conversation preview"
            width={225}
            height={225}
          />
        </div>
      </div>
    </section>
  );
}

export const sectionId = "hero";
