import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, UserPlus, TrendingUp } from "lucide-react";
import { PARTNERSHIP_URL } from "@/lib/config";

type Copy = {
  title: string;
  primaryCta: { label: string; href: string };
  steps: Array<{
    number: number;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
};

export const sectionId = "get-started";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Get Started in 3 Simple Steps",
  primaryCta: { label: "Get Started", href: PARTNERSHIP_URL },
  steps: [
    {
      number: 1,
      title: "Join for Free",
      description: "Sign up in minutes through our simple online application. There's no cost or commitment.",
      icon: UserPlus,
    },
    {
      number: 2,
      title: "Register a Referral",
      description: "Use our dedicated Partner Portal to easily register new clients you're introducing to Subsights AI. Our deal protection ensures you get credit for your leads.",
      icon: CheckCircle,
    },
    {
      number: 3,
      title: "Earn Long-Term Commissions",
      description: "After a 3-month stability period, you'll start earning recurring commissions—paid out monthly like clockwork—for the life of that customer's account.",
      icon: TrendingUp,
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function GetStarted() {
  const c = copy;
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* Main Heading */}
      <Animate name="fadeIn" trigger="onVisible" className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {c.title}
        </h2>
      </Animate>

      {/* Steps */}
      <div className="space-y-8">
        {c.steps.map((step, index) => (
          <Animate
            key={index}
            name="fadeIn"
            trigger="onVisible"
            delay={index * 100}
          >
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Step Number and Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center relative">
                      <step.icon className="w-8 h-8 text-primary" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Animate>
        ))}
      </div>

      {/* Call to Action Button */}
      <Animate name="fadeIn" trigger="onVisible" delay={300} className="text-center mt-12">
        <Button size="lg" asChild className="min-w-[180px]" variant="outline">
          <a href={c.primaryCta.href} target="_blank" rel="noopener noreferrer">
            {c.primaryCta.label}
          </a>
        </Button>
      </Animate>
    </section>
  );
}
