import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animate } from "@/components/ui/animate";
import { CALENDLY_URL } from "@/lib/config";

export const sectionId = "hero";

type Copy = {
  title: string;
  subtitle: string;
  badge: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

// ---- SECTION COPY REGION ----
const copy = {
  title: "Practical AI for support",
  subtitle: "Guides, updates, and stories from the Subsights team",
  badge: "Blog",
  primaryCta: { label: "Book Demo", href: CALENDLY_URL },
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
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {c.title}
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground">
                {c.subtitle}
              </h2>
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
