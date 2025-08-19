import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";

type Copy = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
};

export const sectionId = "hero";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Grow Your Agency with the Subsights AI Partner Program",
  subtitle: "Turn your client relationships into long-term recurring revenue. Offer a cutting-edge AI chatbot solution and earn generous, multi-year commissions.",
  primaryCta: { label: "Become a Partner", href: "https://www.subsights.com/partners/apply" }
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Hero() {
  const c = copy;
  return (
    <section className="text-center space-y-8 max-w-6xl mx-auto px-6 py-12">
      {/* Main Title */}
      <Animate name="fadeIn" trigger="onVisible">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          {c.title}
        </h2>
      </Animate>

      {/* Subtitle */}
      <Animate name="fadeIn" trigger="onVisible">
        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          {c.subtitle}
        </p>
      </Animate>

      {/* Call to Action Button */}
      <Animate name="fadeIn" trigger="onVisible">
        <div className="flex justify-center">
          <Button size="lg" asChild className="min-w-[180px]">
            <a href={c.primaryCta.href} target="_blank" rel="noopener noreferrer">
              {c.primaryCta.label}
            </a>
          </Button>
        </div>
      </Animate>
    </section>
  );
}
