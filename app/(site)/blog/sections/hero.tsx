import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Animate } from "@/components/ui/animate";
import { CALENDLY_URL } from "@/lib/config";

export const sectionId = "hero";

type Copy = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

// ---- SECTION COPY REGION ----
const copy = {
  title: "Practical AI for support",
  subtitle: "Clear guides, product updates, and field notes from the team",
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
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 max-w-2xl text-center mx-auto">
                {c.title}
              </h1>
              <div className="w-full flex justify-center">
                <h2 className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 break-normal max-w-md text-center mx-auto">
                  {c.subtitle}
                </h2>
              </div>
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
