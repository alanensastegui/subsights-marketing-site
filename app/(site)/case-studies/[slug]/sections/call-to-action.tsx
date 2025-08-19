import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Animate } from "@/components/ui/animate";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/lib/case-studies";

interface Props {
  caseStudy: CaseStudy;
}

export default function CallToAction({ caseStudy }: Props) {
  return (
    <section className={cn("relative isolate bg-gradient-to-br from-background via-muted/80 to-muted/30 rounded-3xl mx-6 my-12")}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center space-y-12">
          <Animate name="fadeIn" trigger="onVisible" className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Ready to See Similar Results?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join {caseStudy.company} and other satisfied customers
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get a personalized demo of how Subsights AI can transform your {caseStudy.industry.toLowerCase()} business and deliver measurable improvements in efficiency, satisfaction, and cost savings.
            </p>
          </Animate>

          <Animate name="fadeIn" trigger="onVisible" delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <Button size="lg" asChild className="min-w-[140px]">
                  <a href="https://calendly.com/lucas-subsights/subsights-demo" target="_blank" rel="noopener noreferrer">
                    Get Your Demo
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  See how Subsights works for your business
                </p>
              </div>

              <div className="space-y-4">
                <Button variant="outline" size="lg" asChild className="min-w-[140px]">
                  <Link href="/case-studies">
                    View All Case Studies
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Explore more customer success stories
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </div>
    </section>
  );
}
