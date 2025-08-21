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
    <section className="max-w-6xl mx-auto px-6 py-8 sm:py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Main Heading */}
        <h2 className="animate-item text-center mb-12 sm:mb-16 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          {c.title}
        </h2>

        {/* Steps */}
        <div className="space-y-6 sm:space-y-8">
          {c.steps.map((step, index) => (
            <Card key={index} className="animate-item transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  {/* Step Number and Icon */}
                  <div className="flex-shrink-0 flex justify-center sm:justify-start">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center relative">
                      <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="animate-item text-center mt-10 sm:mt-12">
          <Button size="lg" asChild className="w-full sm:w-auto min-w-[180px]" variant="outline">
            <a href={c.primaryCta.href} target="_blank" rel="noopener noreferrer">
              {c.primaryCta.label}
            </a>
          </Button>
        </div>
      </Animate>
    </section>
  );
}
