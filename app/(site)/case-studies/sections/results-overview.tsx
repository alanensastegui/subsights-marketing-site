import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Animate } from "@/components/ui/animate";
import type { LucideIcon } from "lucide-react";
import { Globe2, TrendingUp, Sparkles, Languages } from "lucide-react";

type Copy = {
  title: string;
  subtitle: string;
  highlights: Array<{
    title: string;
    description: string;
    icon: LucideIcon;
  }>;
};

export const sectionId = "results-overview";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Why Businesses Choose Subsights AI",
  subtitle: "The key advantages that set our AI platform apart from traditional customer service",
  highlights: [
    {
      title: "24/7 Availability",
      description: "Never miss a customer inquiry, regardless of time zone or business hours.",
      icon: Globe2
    },
    {
      title: "Instant Scalability",
      description: "Handle traffic spikes without hiring additional staff or experiencing delays.",
      icon: TrendingUp
    },
    {
      title: "Consistent Quality",
      description: "Every customer receives the same high-quality service, every time.",
      icon: Sparkles
    },
    {
      title: "Multi-Language Support",
      description: "Serve customers in their preferred language with native-level fluency.",
      icon: Languages
    }
  ]
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function ResultsOverview() {
  const c = copy;

  return (
    <section className="relative isolate py-12">
      <div className="mx-auto max-w-6xl px-6">
        <Animate name="fadeIn" trigger="onVisible" className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {c.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {c.subtitle}
          </p>
        </Animate>



        {/* Key Highlights */}
        <div className="grid gap-8 md:grid-cols-2">
          {c.highlights.map((highlight, index) => (
            <Animate key={index} name="fadeIn" trigger="onVisible" delay={index * 100}>
              <Card className="border-l-4 border-l-primary transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = highlight.icon;
                      return <Icon className="w-6 h-6 text-muted-foreground" aria-hidden="true" />;
                    })()}
                    <CardTitle className="text-lg">{highlight.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
