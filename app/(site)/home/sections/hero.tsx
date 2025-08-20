import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/config";

type Copy = {
  slogan: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const copy = {
  slogan: "The AI-Native Chatbot for Your Website",
  description: "Subsights AI qualifies, guides, and converts your best website visitors; so your team doesn't have to",
  primaryCta: { label: "Get Demo", href: CALENDLY_URL },
  secondaryCta: { label: "Watch Overview", href: "https://www.youtube.com/watch?v=OlwA_a5CpYQ&list=PLXL5IEY-s71AWou876UpvgX8r0W5B2Whc" },
} satisfies Copy;

export default function Hero() {
  return (
    <section className="text-center space-y-8 max-w-6xl mx-auto px-6 py-12">
      {/* Slogan */}
      <Animate name="fadeIn" trigger="onVisible">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          {copy.slogan}
        </h2>
      </Animate>

      {/* Description */}
      <Animate name="fadeIn" trigger="onVisible">
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {copy.description}
        </p>
      </Animate>

      {/* Call to Action Buttons */}
      <Animate name="fadeIn" trigger="onVisible">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" asChild className="min-w-[140px]">
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
