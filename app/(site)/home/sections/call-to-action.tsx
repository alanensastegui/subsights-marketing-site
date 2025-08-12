import Link from "next/link";
import { Button } from "@/components/ui/button";

type Copy = {
  mainTitle: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  primaryDescription: string;
  secondaryCta: { label: string; href: string };
  secondaryDescription: string;
};

export const sectionId = "call-to-action";

// ---- SECTION COPY REGION ----
const copy = {
  mainTitle: "Ready to See Subsights in Action?",
  subtitle: "Get set up in minutes – no coding required, we handle everything.",
  primaryCta: { label: "Book Demo", href: "/demo" }, // TODO: confirm href → Ask user: "What page should the Book Demo button link to?"
  primaryDescription: "See Subsights tailored to your site in a live co-founder walkthrough. Discover potential ROI & get answers (15-30 min)",
  secondaryCta: { label: "Try For Free", href: "/signup" }, // TODO: confirm href → Ask user: "What page should the Try For Free button link to?"
  secondaryDescription: "Explore Subsights firsthand, risk-free for 30 days. No credit card, no commitment. Experience the impact yourself."
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function CallToAction() {
  const c = copy;
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-center">
      <div className="space-y-8">
        {/* Main Title */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {c.mainTitle}
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {c.subtitle}
        </p>

        {/* Primary CTA */}
        <div className="space-y-4">
          <Button size="lg" asChild>
            <Link href={c.primaryCta.href}>{c.primaryCta.label}</Link>
          </Button>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            {c.primaryDescription}
          </p>
        </div>

        {/* Secondary CTA */}
        <div className="space-y-4">
          <Button variant="outline" size="lg" asChild>
            <Link href={c.secondaryCta.href}>{c.secondaryCta.label}</Link>
          </Button>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            {c.secondaryDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
