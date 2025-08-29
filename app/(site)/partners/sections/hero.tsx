import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { PARTNERSHIP_URL } from "@/lib/config";

type Copy = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
};

export const sectionId = "hero";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Subsights Partner Program",
  subtitle: "Deliver an AI teammate to your clients and earn recurring commissions",
  primaryCta: { label: "Become a Partner", href: PARTNERSHIP_URL }
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Hero() {
  const c = copy;
  return (
    <section className="text-center space-y-8 max-w-6xl mx-auto px-6 py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Main Title */}
        <h2 className="animate-item text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
          {c.title}
        </h2>

        {/* Subtitle */}
        <p className="animate-item text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
          {c.subtitle}
        </p>

        {/* Call to Action Button */}
        <div className="animate-item flex justify-center">
          <Button size="lg" asChild className="w-full sm:w-fit">
            <a href={c.primaryCta.href} target="_blank" rel="noopener noreferrer">
              {c.primaryCta.label}
            </a>
          </Button>
        </div>
      </Animate>
    </section>
  );
}
