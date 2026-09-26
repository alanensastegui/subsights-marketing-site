import { Animate } from "@/components/ui/animate";
import { ButtonDuo } from "@/components/ui/button-duo";
import Link from "next/link";
import Image from "next/image";

type Copy = {
  slogan: string;
  description: {
    mobile: string;
    desktop: string;
  };
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const copy = {
  slogan: "Answer every visitor question, day and night",
  description: {
    mobile: "A managed AI assistant for destinations and tour operators. We set it up and keep it current.",
    desktop: "A managed AI assistant for destinations and tour operators. It learns your website and calendars, answers in the visitor's language, and we keep it current.",
  },
  primaryCta: { label: "See a destination demo", href: "/email-my-demo" },
  secondaryCta: { label: "See pricing", href: "/pricing" },
} satisfies Copy;

export default function Hero() {
  return (
    // mb-24 is hardcoded until we add more padding between sections as the standard
    <section className="space-y-8 max-w-6xl mx-auto px-6 py-12 flex flex-col relative justify-start md:flex-row md:mb-24 gap-8 md:gap-0">
      {/* Slogan */}
      <div className="flex flex-col items-center md:gap-12 lg:gap-24 md:flex-row md:items-stretch">
        <Animate
          name="fadeInStagger"
          trigger="onVisible"
          className="md:flex-1 md:min-w-xs md:max-w-xs lg:min-w-md lg:max-w-md"
        >
          <h1 id="home-hero-title" className="animate-item text-5xl font-bold tracking-tight leading-tight mb-4 text-left">
            {copy.slogan}
          </h1>

          {/* Description */}
          <div className="flex">
            <p className="animate-item text-lg md:text-2xl text-muted-foreground leading-relaxed mb-8 break-normal max-w-md text-left">
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
                  "data-analytics-name": "Destination Demo (Home Hero)",
                  "data-analytics-context": '{"source":"home_hero","section":"hero"}',
                },
              }}
              secondary={{
                asChild: true,
                children: (
                  <Link href={copy.secondaryCta.href}>
                    {copy.secondaryCta.label}
                  </Link>
                ),
                variant: "outline",
                size: "lg",
                dataAttributes: {
                  "data-analytics-id": "home_hero_pricing",
                  "data-analytics-name": "See Pricing (Home Hero)",
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
      <div className="md:hidden flex w-full justify-center">
        <div className="relative w-full max-w-md">
          <div className="overflow-hidden rounded-sm">
            <Image
              src="/images/product-screenshots/chatbot-analytics.png"
              alt="Subsights chatbot analytics conversation dashboard"
              width={1960}
              height={1960}
              className="h-auto w-full"
            />
          </div>
          <div className="absolute -top-3.5 -left-4 w-28 overflow-hidden rounded-sm shadow-lg">
            <Image
              src="/images/product-screenshots/wisp-conversation.png"
              alt="Subsights assistant conversation preview"
              width={225}
              height={378}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 hidden md:block md:w-md lg:w-lg xl:w-xl 2xl:w-3xl overflow-x-clip w-0">
        {/* Overlay gradient hardcoded to match the dashboard height and top offset */}
        <div className="pointer-events-none absolute inset-y-0 right-0 -top-8 w-48 h-111 bg-gradient-to-r from-transparent via-background/80 to-background z-10" />
        <div className="rounded-xl overflow-hidden w-3xl absolute left-20 -top-8">
          <Image
            src="/images/product-screenshots/chatbot-analytics.png"
            alt="Subsights chatbot analytics conversation dashboard"
            width={1960}
            height={1960}
            priority
          />
        </div>
        <div className="rounded-xl overflow-hidden relative w-fit">
          <Image
            src="/images/product-screenshots/wisp-conversation.png"
            alt="Subsights assistant conversation preview"
            width={225}
            height={378}
          />
        </div>
      </div>
    </section>
  );
}

export const sectionId = "hero";
