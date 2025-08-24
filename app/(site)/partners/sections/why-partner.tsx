import { Animate } from "@/components/ui/animate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Star, Award } from "lucide-react";

type Copy = {
  title: string;
  benefits: Array<{
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
};

export const sectionId = "why-partner";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Why partner with Subsights?",
  benefits: [
    {
      title: "Multi-year revenue",
      description: "Substantial recurring commissions on every client.",
      icon: DollarSign,
    },
    {
      title: "Founders Club",
      description: "First 25 partners lock premium, lifetime rates.",
      icon: Star,
    },
    {
      title: "Performance bonuses",
      description: "Sign-up bonus on new annual plans, volume milestones, and a retention kicker.",
      icon: Award,
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function WhyPartner() {
  const c = copy;
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Main Heading */}
        <h2 className="animate-item text-center mb-16 text-3xl md:text-4xl font-bold tracking-tight">
          {c.title}
        </h2>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {c.benefits.map((benefit, index) => (
            <Card key={index} className="animate-item h-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Animate>
    </section>
  );
}
