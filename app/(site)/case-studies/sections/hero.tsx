import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animate } from "@/components/ui/animate";
import { CALENDLY_URL } from "@/lib/config";

type Copy = {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const sectionId = "hero";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Proven Results for Businesses Like Yours",
  subtitle: "See how Subsights AI transforms business operations",
  description: "We partner with businesses across diverse industries to filter noise, enhance customer experiences, and drive strategic goals. See how a Subsights AI assistant can become a true extension of your team.",
  badge: "Customer Success",
  primaryCta: { label: "Get Your Demo", href: CALENDLY_URL },
  secondaryCta: { label: "View All Stories", href: "#customer-stories" },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Hero() {
  const c = copy;
  return (
    <section className="relative isolate text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <Animate name="fadeIn" trigger="onVisible" className="space-y-6">
            {c.badge && (
              <Badge variant="secondary" className="text-sm">
                {c.badge}
              </Badge>
            )}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {c.title}
            </h1>
            <h2 className="text-xl font-semibold text-muted-foreground">
              {c.subtitle}
            </h2>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {c.description}
            </p>
          </Animate>

          <Animate name="fadeIn" trigger="onVisible" delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                data-analytics-id="case_studies_hero_demo"
                data-analytics-name="Get Demo (Case Studies Hero)"
                data-analytics-context='{"source":"case_studies_hero","section":"hero"}'
              >
                <a href={c.primaryCta.href} target="_blank" rel="noopener noreferrer">
                  {c.primaryCta.label}
                </a>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href={c.secondaryCta.href}>
                  {c.secondaryCta.label}
                </Link>
              </Button>
            </div>
          </Animate>
        </div>
      </div>
    </section>
  );
}
