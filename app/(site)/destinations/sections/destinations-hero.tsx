import Link from 'next/link';
import { Animate } from '@/components/ui/animate';
import { ButtonDuo } from '@/components/ui/button-duo';

type Copy = {
  eyebrow: string;
  heading: string;
  description: string;
  sourceNote: string;
  example: { label: string; question: string; answer: string; note: string };
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const sectionId = 'destinations-hero';

// ---- SECTION COPY REGION ----
const copy = {
  eyebrow: 'For destination marketing organizations',
  heading: "Visitor questions don't keep office hours.",
  description:
    "What's on this weekend? How do we get there? Is there somewhere to stay? Subsights helps your visitors find answers from your destination's website and event calendars, with links to take the next step.",
  sourceNote:
    'Built for tourism boards, visitor bureaus and destination marketing teams. Setup and ongoing tuning included.',
  example: {
    label: 'A helpful answer knows its limits',
    question: 'Can you check flights for my trip?',
    answer:
      "I can help you plan how to get here. For live flight availability, check the airline's booking tools. Visit Sun Valley's flight information is a useful place to start.",
    note: 'Illustrative exchange, paraphrased from the published Visit Sun Valley case study. Not a visitor transcript.',
  },
  primaryCta: { label: 'See a destination demo', href: '/email-my-demo' },
  secondaryCta: { label: 'See pricing', href: '/pricing' },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function DestinationsHero() {
  return (
    <section className="max-w-section mx-auto py-section">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <Animate name="fadeInStagger" trigger="onVisible">
          <p className="animate-item text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-5">
            {copy.eyebrow}
          </p>
          <h1 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
            {copy.heading}
          </h1>
          <p className="animate-item text-lg text-muted-foreground leading-relaxed mb-8">
            {copy.description}
          </p>
          <div className="animate-item">
            <ButtonDuo
              primary={{
                asChild: true,
                children: (
                  <Link href={copy.primaryCta.href}>
                    {copy.primaryCta.label}
                  </Link>
                ),
                size: 'lg',
                dataAttributes: {
                  'data-analytics-id': 'destinations_hero_demo',
                  'data-analytics-name': 'Destination Demo (Destinations Hero)',
                  'data-analytics-context':
                    '{"source":"destinations_hero","section":"hero"}',
                },
              }}
              secondary={{
                asChild: true,
                children: (
                  <Link href={copy.secondaryCta.href}>
                    {copy.secondaryCta.label}
                  </Link>
                ),
                variant: 'outline',
                size: 'lg',
                dataAttributes: {
                  'data-analytics-id': 'destinations_hero_pricing',
                  'data-analytics-name': 'See Pricing (Destinations Hero)',
                  'data-analytics-context':
                    '{"source":"destinations_hero","section":"hero"}',
                },
              }}
              gap="md"
              stackAt="sm"
              fullWidthMobile
              className="mx-0 w-full sm:w-fit"
            />
          </div>
          <p className="animate-item mt-6 text-sm leading-relaxed text-muted-foreground">
            {copy.sourceNote}
          </p>
        </Animate>
        <figure className="rounded-2xl border border-border bg-card p-5 sm:p-7">
          <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-5">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold"
            >
              S
            </span>
            <div>
              <p className="font-semibold">Sunny at Visit Sun Valley</p>
              <p className="text-sm text-muted-foreground">
                {copy.example.label}
              </p>
            </div>
          </div>
          <div className="space-y-5 text-base leading-relaxed">
            <div className="ml-6 rounded-2xl rounded-tr-sm bg-secondary/60 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Visitor
              </p>
              <p>{copy.example.question}</p>
            </div>
            <div className="mr-4 rounded-2xl rounded-tl-sm border border-white/10 bg-background/50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Sunny
              </p>
              <p>{copy.example.answer}</p>
            </div>
          </div>
          <figcaption className="mt-5 text-xs leading-relaxed text-muted-foreground">
            {copy.example.note}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
