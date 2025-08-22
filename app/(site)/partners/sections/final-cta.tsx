import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { PARTNERSHIP_URL } from "@/lib/config";

type Copy = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
};

export const sectionId = "final-cta";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Ready to grow together?",
  subtitle: "Join a program that values your expertise and rewards long-term relationships",
  primaryCta: { label: "Apply Today", href: PARTNERSHIP_URL }
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function FinalCta() {
  const c = copy;
  return (
    <section className={cn("relative isolate bg-gradient-to-br from-background via-muted/80 to-muted/30 rounded-3xl mx-6 my-12")}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center space-y-8">
          <Animate name="fadeInStagger" trigger="onVisible">
            <div className="animate-item space-y-6 mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                {c.title}
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {c.subtitle}
              </p>
            </div>

            <div className="animate-item">
              <Button size="lg" asChild className="min-w-[180px]">
                <a href={c.primaryCta.href} target="_blank" rel="noopener noreferrer">
                  {c.primaryCta.label}
                </a>
              </Button>
            </div>
          </Animate>
        </div>
      </div>
    </section>
  );
}
