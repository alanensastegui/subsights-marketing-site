import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Copy = {
  heading: string;
  description: string;
  plans: {
    name: string;
    price: string;
    detail: string;
    features: string[];
    featured: boolean;
  }[];
  note: string;
};
export const sectionId = 'managed-plans';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'A useful assistant. A clear annual price.',
  description:
    'Setup and managed support are part of the service. Choose the capacity your website needs.',
  plans: [
    {
      name: 'Professional',
      price: '$1,990',
      detail: 'For a smaller website',
      features: [
        '600 conversations per month',
        '1 chatbot and 1 seat',
        'Fully managed support',
      ],
      featured: false,
    },
    {
      name: 'Professional+',
      price: '$3,990',
      detail: 'More capacity and reporting',
      features: [
        '2,200 conversations per month',
        '2 chatbots and 3 seats',
        'Analytics and 2 custom reports',
        'Managed priority support',
      ],
      featured: true,
    },
  ],
  note: 'Annual billing. Monthly options available. Bespoke integrations and larger deployments are scoped separately.',
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function ManagedPlans() {
  return (
    <section
      aria-labelledby="managed-plans-title"
      className="max-w-section mx-auto px-section py-section"
    >
      <div className="max-w-2xl">
        <h2
          id="managed-plans-title"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {copy.heading}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {copy.description}
        </p>
      </div>
      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {copy.plans.map((plan) => (
          <div
            key={plan.name}
            className={
              plan.featured
                ? 'rounded-2xl border border-muted-foreground bg-card p-7 sm:p-9'
                : 'rounded-2xl border border-border p-7 sm:p-9'
            }
          >
            <p className="text-sm text-muted-foreground">{plan.detail}</p>
            <h3 className="mt-2 text-xl font-semibold">{plan.name}</h3>
            <p className="mt-5">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="ml-2 text-muted-foreground">/ year</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
            <Button
              asChild
              variant={plan.featured ? 'default' : 'outline'}
              className="mt-8"
              data-analytics-id={
                plan.featured ? 'home_plans_demo_plus' : 'home_plans_demo'
              }
              data-analytics-name={`Discuss ${plan.name} (Home Plans)`}
              data-analytics-context={JSON.stringify({
                source: 'home_plans',
                plan: plan.name,
                billing: 'annual',
              })}
            >
              <Link href="/email-my-demo">Discuss {plan.name}</Link>
            </Button>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        {copy.note}{' '}
        <Link href="/pricing" className="underline underline-offset-4">
          Compare all plans →
        </Link>
      </p>
    </section>
  );
}
