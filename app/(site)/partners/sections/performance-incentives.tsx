import { Animate } from "@/components/ui/animate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Target, Award } from "lucide-react";

type Copy = {
  title: string;
  subtitle: string;
  incentives: Array<{
    title: string;
    description: string;
    amount: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
};

export const sectionId = "performance-incentives";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Performance incentives for every partner",
  subtitle: "Bonuses that reward high-quality, long-term clients",
  incentives: [
    {
      title: "Sign-Up Bonus",
      description: "One-time bonus for each new client on an annual plan.",
      amount: "$100–$200",
      icon: Gift,
    },
    {
      title: "Volume Milestones",
      description: "Annual bonus that scales with the number of customers you refer.",
      amount: "Up to $2,000",
      icon: Target,
    },
    {
      title: "Retention Kicker",
      description: "Earn an extra 2% for the year when portfolio churn stays under 5%.",
      amount: "+2% on Everything",
      icon: Award,
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function PerformanceIncentives() {
  const c = copy;
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Main Heading */}
        <div className="animate-item text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {c.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {c.subtitle}
          </p>
        </div>

        {/* Incentives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {c.incentives.map((incentive, index) => (
            <Card key={index} className="animate-item h-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <incentive.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  {incentive.title}
                </CardTitle>
                <div className="text-2xl font-bold text-primary">
                  {incentive.amount}
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {incentive.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Animate>
    </section>
  );
}
