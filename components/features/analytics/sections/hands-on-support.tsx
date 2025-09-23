"use client";

import { Animate } from "@/components/ui/animate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, BarChart3, CheckCircle, Lightbulb } from "lucide-react";

type SupportFeature = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

type Copy = {
  title: string;
  description: string;
  features: SupportFeature[];
};

export const sectionId = "hands-on-support";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Expert analytics, tailored to your goals",
  description: "We partner with you to define KPIs, validate data quality, and establish a reporting cadence that proves ROI and drives action.",
  features: [
    {
      title: "KPI design & alignment",
      description: "Define metrics that matter—engagement, minutes saved, conversion signals—tied to business goals.",
      icon: Target,
    },
    {
      title: "Dashboards & cadence",
      description: "Set up dashboards and email reports at a frequency your team can act on.",
      icon: BarChart3,
    },
    {
      title: "Data QA & integrity",
      description: "We audit pipelines and spot‑check samples to keep your analytics trustworthy.",
      icon: CheckCircle,
    },
    {
      title: "Proactive insight reviews",
      description: "Regular reviews to highlight trends and recommend optimizations.",
      icon: Lightbulb,
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function HandsOnSupport() {
  const c = copy;
  return (
    <section className="relative isolate px-4 sm:px-6 py-12 lg:py-12 max-w-6xl mx-auto">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="animate-item space-y-4 lg:space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{c.title}</h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">{c.description}</p>
          </div>

          <div className="animate-item">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {c.features.map((feature, index) => (
                <Card key={feature.title} className="relative group hover:bg-card/80 hover:border-border/70 transition-all duration-300 overflow-hidden hover:shadow-lg transform-gpu will-change-transform">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <CardTitle className="text-base font-semibold text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>

                  {index % 2 === 0 && index < c.features.length - 1 && (
                    <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-px bg-border/50" />
                  )}
                  {index < c.features.length - 2 && (
                    <div className="hidden sm:block absolute left-0 right-0 bottom-0 h-px bg-border/50" />
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Animate>
    </section>
  );
}


