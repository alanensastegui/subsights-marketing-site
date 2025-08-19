import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { Sparkles, RefreshCw, CreditCard } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import PricingToggle from "./pricing-client";

type Copy = {
  title: string;
  subtitle: string;
  plans: {
    name: string;
    sort_price: number;
    features: string[];
    free: boolean;
    enterprise: boolean;
    monthly_price: {
      id: string | null;
      dollars: number;
      cents: number;
    };
    annual_price: {
      id: string | null;
      dollars: number;
      cents: number;
    };
    cta: { label: string; href: string; variant?: "default" | "outline" };
    featured?: boolean;
  }[];
};

export const sectionId = "pricing";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Simple, Transparent Pricing",
  subtitle: "Choose the plan that fits your business needs",
  plans: [
    {
      name: "Free Trial",
      sort_price: 0,
      features: [
        "30 days of Professional access",
        "All Professional features included",
        "No credit card required",
        "Cancel anytime"
      ],
      free: true,
      enterprise: false,
      monthly_price: { id: null, dollars: 0, cents: 0 },
      annual_price: { id: null, dollars: 0, cents: 0 },
      cta: { label: "Start Free Trial", href: "/signup" }
    },
    {
      name: "Starter",
      sort_price: 29,
      features: [
        "Up to 10,000 monthly visitors",
        "Basic analytics",
        "Email support",
        "1 website"
      ],
      free: false,
      enterprise: false,
      monthly_price: { id: null, dollars: 29, cents: 0 },
      annual_price: { id: null, dollars: 290, cents: 0 },
      cta: { label: "Get Started", href: "/signup" }
    },
    {
      name: "Professional",
      sort_price: 99,
      features: [
        "Up to 100,000 monthly visitors",
        "Advanced analytics & insights",
        "A/B testing",
        "Priority support",
        "Up to 5 websites",
        "Custom targeting"
      ],
      free: false,
      enterprise: false,
      monthly_price: { id: null, dollars: 99, cents: 0 },
      annual_price: { id: null, dollars: 990, cents: 0 },
      cta: { label: "Get Started", href: "/signup" },
      featured: true
    },
    {
      name: "Enterprise",
      sort_price: 999,
      features: [
        "Unlimited visitors",
        "Full feature access",
        "Dedicated support",
        "Unlimited websites",
        "Custom integrations",
        "SLA guarantee"
      ],
      free: false,
      enterprise: true,
      monthly_price: { id: null, dollars: 0, cents: 0 },
      annual_price: { id: null, dollars: 0, cents: 0 },
      cta: { label: "Contact Sales", href: "/contact", variant: "outline" }
    }
  ]
} satisfies Copy;
// ---- /SECTION COPY REGION ----

type Props = {
  searchParams?: { billing?: string };
};

export default function Section({ searchParams }: Props) {
  const c = copy;
  const isAnnual = searchParams?.billing !== "monthly";

  const formatPrice = (price: { id: string | null; dollars: number; cents: number }) => {
    if (price.dollars === 0 && price.cents === 0) return "Custom";
    return `$${price.dollars}${price.cents > 0 ? `.${price.cents.toString().padStart(2, '0')}` : ''}`;
  };

  const getCurrentPrice = (plan: Copy["plans"][0]) => {
    return isAnnual ? plan.annual_price : plan.monthly_price;
  };

  const getPriceUnit = (plan: Copy["plans"][0]) => {
    if (plan.enterprise) return "";
    if (plan.free) return "for 30 days";
    return isAnnual ? "/year" : "/month";
  };

  const getPriceDisplay = (plan: Copy["plans"][0]) => {
    if (plan.free) return "$0";
    if (plan.enterprise) return "Custom";
    const price = getCurrentPrice(plan);
    return formatPrice(price);
  };

  return (
    <section className="relative isolate text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="text-center space-y-6 mb-12">
          <Animate name="fadeIn" trigger="onVisible">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{c.title}</h2>
          </Animate>
          <Animate name="fadeIn" trigger="onVisible">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {c.subtitle}
            </p>
          </Animate>
        </div>

        {/* Pricing Toggle */}
        <Animate name="fadeIn" trigger="onVisible">
          <PricingToggle isAnnual={isAnnual} />
        </Animate>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {c.plans.map((plan, index) => {
            const priceUnit = getPriceUnit(plan);

            return (
              <Animate key={index} name="fadeIn" trigger="onVisible" delay={index * 100}>
                <Card
                  className={cn(
                    "relative w-56 mx-auto transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full",
                    plan.featured
                      ? "border-2 border-primary shadow-lg ring-4 ring-primary/10"
                      : "shadow-md hover:border-primary/20"
                  )}
                >
                  <CardHeader className="pb-0">
                    <div className="h-12 flex flex-col justify-center">
                      <CardTitle className="text-xl font-bold tracking-tight mb-2">{plan.name}</CardTitle>
                      {plan.featured && (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          Most Popular
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="text-center mb-2">
                      <div className="text-4xl font-bold tracking-tight text-foreground">
                        {getPriceDisplay(plan)}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 h-5 flex items-center justify-center">
                        {priceUnit || " "}
                      </div>
                    </div>

                    {/* Consistent spacing for all cards to align CTAs */}
                    <div className="h-6 mb-4">
                      {isAnnual && !plan.enterprise && !plan.free && (
                        <div className="text-center">
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                            <Sparkles className="w-4 h-4 mr-1" />
                            Save 2 months
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Primary CTA placed right after the price */}
                    <Button
                      className={cn(
                        "w-full mb-3 font-semibold transition-all duration-200",
                        plan.featured
                          ? "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl"
                          : "hover:scale-105"
                      )}
                      variant={plan.cta.variant || (plan.featured ? "default" : "outline")}
                      asChild
                      aria-label={`Select ${plan.name} ${plan.enterprise ? "" : isAnnual ? "annual" : "monthly"} plan`}
                      data-analytics={`pricing_cta_${plan.name.toLowerCase()}_${plan.enterprise ? "custom" : isAnnual ? "annual" : "monthly"}`}
                    >
                      <Link href={plan.cta.href}>
                        {plan.free
                          ? "Start Free Trial"
                          : plan.enterprise
                            ? "Contact Sales"
                            : plan.name === "Professional"
                              ? "Choose Professional"
                              : `Choose ${plan.name}`}
                      </Link>
                    </Button>

                    {/* Risk reducers directly under the CTA */}
                    <p className="text-xs text-muted-foreground text-center mb-4">
                      {plan.free ? (
                        <span className="inline-flex items-center">
                          <CreditCard className="w-3 h-3 mr-1" />
                          No credit card required
                        </span>
                      ) : (
                        <span className="inline-flex items-center">
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Cancel anytime
                        </span>
                      )}
                    </p>

                    <ul className="space-y-3 text-sm flex-1">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-muted-foreground leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Animate>
            );
          })}
        </div>
      </div>
    </section>
  );
}
