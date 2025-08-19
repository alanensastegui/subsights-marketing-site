import { Card, CardContent } from "@/components/ui/card";
import { Animate } from "@/components/ui/animate";
import type { CaseStudy } from "@/lib/case-studies";

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyMetrics({ caseStudy }: Props) {
  const metrics = caseStudy.overview.metrics;
  if (!metrics || metrics.length === 0) {
    return null;
  }
  return (
    <section className="relative isolate py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Animate name="fadeIn" trigger="onVisible" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Key Results
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The transformation delivered measurable improvements across all key performance indicators
          </p>
        </Animate>

        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <Animate key={index} name="fadeIn" trigger="onVisible" delay={index * 100}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-2">
                    {metric.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {metric.change}
                  </div>
                </CardContent>
              </Card>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
