import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animate } from "@/components/ui/animate";
import { CALENDLY_URL } from "@/lib/config";

export const sectionId = "hero";

type Copy = {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

// ---- SECTION COPY REGION ----
const copy = {
  title: "Insights & Updates",
  subtitle: "The latest from the Subsights team",
  description:
    "Deep dives on new features, practical guidance on AI, and stories from the front lines of customer support innovation.",
  badge: "Blog",
  primaryCta: { label: "Get Your Demo", href: CALENDLY_URL },
  secondaryCta: { label: "Read Posts", href: "#posts" },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Hero() {
  const c = copy;
  return (
    <section className="relative isolate text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <Animate name="fadeInStagger" trigger="onVisible">
            <div className="animate-item space-y-6">
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
            </div>
            <div className="animate-item flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                data-analytics-id="blog_hero_demo"
                data-analytics-name="Get Demo (Blog Hero)"
                data-analytics-context='{"source":"blog_hero","section":"hero"}'
              >
                <a href={c.primaryCta.href} target="_blank" rel="noopener noreferrer">
                  {c.primaryCta.label}
                </a>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href={c.secondaryCta.href}>{c.secondaryCta.label}</Link>
              </Button>
            </div>
          </Animate>
        </div>
      </div>
    </section>
  );
}
