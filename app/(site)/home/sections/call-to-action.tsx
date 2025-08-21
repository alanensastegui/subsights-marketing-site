import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Animate } from "@/components/ui/animate";
import { cn } from "@/lib/cn";
import { CALENDLY_URL } from "@/lib/config";

type Cta = { label: string; href: string };

type Copy = {
  mainTitle: string;
  subtitle: string;
  primaryCta: Cta;
  primaryDescription: string;
  secondaryCta: Cta;
  secondaryDescription: string;
};

export const sectionId = "call-to-action";

// ---- SECTION COPY REGION ----
const copy = {
  mainTitle: "Start Converting Visitors Today",
  subtitle: "Get your AI expert live on your website in under 10 minutes",
  primaryCta: { label: "Get Demo", href: CALENDLY_URL },
  primaryDescription: "See how Subsights works for your business",
  secondaryCta: { label: "Try For Free", href: "/pricing" },
  secondaryDescription: "Start your 30-day free trial. No credit card required"
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function CallToAction() {
  return (
    <section className={cn("relative isolate bg-gradient-to-br from-background via-muted/80 to-muted/30 rounded-3xl mx-6 my-12")}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Animate name="fadeInStagger" trigger="onVisible" className="text-center space-y-12">
          <div className="animate-item space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              {copy.mainTitle}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {copy.subtitle}
            </p>
          </div>

          <div className="animate-item grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <Button
                size="lg"
                asChild
                className="min-w-[140px]"
                data-analytics-id="home_cta_demo"
                data-analytics-name="Get Demo (Home CTA)"
                data-analytics-context='{"source":"home_call_to_action","section":"call-to-action"}'
              >
                <a href={copy.primaryCta.href} target="_blank" rel="noopener noreferrer">
                  {copy.primaryCta.label}
                </a>
              </Button>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {copy.primaryDescription}
              </p>
            </div>

            <div className="space-y-4">
              <Button variant="outline" size="lg" asChild className="min-w-[140px]">
                <Link href={copy.secondaryCta.href}>
                  {copy.secondaryCta.label}
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {copy.secondaryDescription}
              </p>
            </div>
          </div>
        </Animate>
      </div>
    </section>
  );
}
