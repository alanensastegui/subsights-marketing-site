import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Animate } from "@/components/ui/animate";
import { cn } from "@/lib/cn";
import { CALENDLY_URL } from "@/lib/config";

type Copy = {
  title: string;
  subtitle: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  benefits: string[];
};

export const sectionId = "call-to-action";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Ready to See Similar Results?",
  subtitle: "Join the growing list of satisfied customers",
  description: "Get a personalized demo of how Subsights AI can transform your customer service operations and deliver measurable improvements in efficiency, satisfaction, and cost savings.",
  primaryCta: { label: "Get Demo", href: CALENDLY_URL },
  secondaryCta: { label: "Try For Free", href: "/pricing" },
  benefits: [
    "Free 30-minute consultation",
    "Customized demo for your industry",
    "ROI calculation for your business",
    "Implementation timeline and roadmap"
  ]
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function CallToAction() {
  const c = copy;
  return (
    <section className={cn("relative isolate bg-gradient-to-br from-background via-muted/80 to-muted/30 rounded-3xl mx-6 my-12")}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center space-y-12">
          <Animate name="fadeInStagger" trigger="onVisible">
            <div className="animate-item space-y-6 mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                {c.title}
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {c.subtitle}
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {c.description}
              </p>
            </div>

            <div className="animate-item grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              <div className="space-y-4">
                <Button
                  size="lg"
                  asChild
                  className="min-w-[140px]"
                  data-analytics-id="case_studies_cta_demo"
                  data-analytics-name="Get Demo (Case Studies CTA)"
                  data-analytics-context='{"source":"case_studies_call_to_action","section":"call-to-action"}'
                >
                  <a href={c.primaryCta.href} target="_blank" rel="noopener noreferrer">
                    {c.primaryCta.label}
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  See how Subsights works for your business
                </p>
              </div>

              <div className="space-y-4">
                <Button variant="outline" size="lg" asChild className="min-w-[140px]">
                  <Link href={c.secondaryCta.href}>
                    {c.secondaryCta.label}
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Start your 30-day free trial. No credit card required
                </p>
              </div>
            </div>

            <div className="animate-item grid gap-4 md:grid-cols-2 md:gap-8 max-w-2xl mx-auto">
              {c.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </div>
    </section>
  );
}
