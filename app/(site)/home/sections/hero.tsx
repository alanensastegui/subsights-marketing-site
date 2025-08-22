import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/config";

type Copy = {
  slogan: string;
  descriptionTop: string;
  descriptionBottom: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const copy = {
  slogan: "The AI teammate for your website",
  descriptionTop: "Meet the AI teammate for modern websites.",
  descriptionBottom: "Turn traffic into qualified pipeline and revenue automatically.",
  primaryCta: { label: "Get Demo", href: CALENDLY_URL },
  secondaryCta: { label: "Watch Overview", href: "https://www.youtube.com/watch?v=OlwA_a5CpYQ&list=PLXL5IEY-s71AWou876UpvgX8r0W5B2Whc" },
} satisfies Copy;

export default function Hero() {
  return (
    <section className="text-center space-y-8 max-w-6xl mx-auto px-6 py-12">
      {/* Slogan */}
      <Animate name="fadeInStagger" trigger="onVisible">
        <h2 className="animate-item text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
          {copy.slogan}
        </h2>

        {/* Description */}
        <p className="animate-item text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
          <span className="block">{copy.descriptionTop}</span>
          <span className="block">{copy.descriptionBottom}</span>
        </p>

        {/* Call to Action Buttons */}
        <div className="animate-item flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            asChild
            className="min-w-[140px]"
            data-analytics-id="home_hero_demo"
            data-analytics-name="Get Demo (Home Hero)"
            data-analytics-context='{"source":"home_hero","section":"hero"}'
          >
            <a href={copy.primaryCta.href} target="_blank" rel="noopener noreferrer">{copy.primaryCta.label}</a>
          </Button>
          <Button variant="outline" size="lg" asChild className="min-w-[140px]">
            <a href={copy.secondaryCta.href} target="_blank" rel="noopener noreferrer">{copy.secondaryCta.label}</a>
          </Button>
        </div>
      </Animate>
    </section>
  );
}

export const sectionId = "hero";
