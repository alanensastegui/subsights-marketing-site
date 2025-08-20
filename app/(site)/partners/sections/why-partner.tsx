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
  title: "Why Partner with Subsights?",
  benefits: [
    {
      title: "Generous Multi-Year Revenue",
      description: "Earn substantial recurring commissions for the life of your client's subscription, with rates designed to reward long-term relationships.",
      icon: DollarSign,
    },
    {
      title: "Exclusive Founders Club",
      description: "Be one of our first 25 partners and lock in premium, higher-tier commission rates for life, ensuring you benefit most from our growth.",
      icon: Star,
    },
    {
      title: "Performance Bonuses",
      description: "Unlock annual bonuses for volume and high retention, plus a sign-up bonus of up to $200 for new annual plans.",
      icon: Award,
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function WhyPartner() {
  const c = copy;
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* Main Heading */}
      <Animate name="fadeIn" trigger="onVisible" className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {c.title}
        </h2>
      </Animate>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {c.benefits.map((benefit, index) => (
          <Animate
            key={index}
            name="fadeIn"
            trigger="onVisible"
            delay={index * 100}
          >
            <Card className="h-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
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
          </Animate>
        ))}
      </div>
    </section>
  );
}
