import Link from 'next/link';
import { Button } from '@/components/ui/button';

export type IndustryStoryCopy = {
  industry: 'lenders' | 'publishers' | 'chambers';
  eyebrow: string;
  heading: string;
  description: string;
  exampleHeading: string;
  examples: { question: string; response: string }[];
  proof: { label: string; title: string; description: string; href: string };
  learning: { title: string; description: string };
  boundaries: { title: string; description: string }[];
  cta: string;
};

export function IndustryStory({ copy }: { copy: IndustryStoryCopy }) {
  const demoHref = `/email-my-demo?industry=${copy.industry}`;
  return (
    <>
      <section className="max-w-section mx-auto px-section py-section">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {copy.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {copy.heading}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {copy.description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            data-analytics-id={`${copy.industry}_hero_demo`}
            data-analytics-name={`Talk with us (${copy.eyebrow})`}
            data-analytics-context={JSON.stringify({
              source: copy.industry,
              section: 'hero',
            })}
          >
            <Link href={demoHref}>Talk through your website</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            data-analytics-id={`${copy.industry}_hero_story`}
            data-analytics-name="See the Customer Example"
            data-analytics-context={JSON.stringify({
              source: copy.industry,
              section: 'hero',
            })}
          >
            <Link href={copy.proof.href}>See the customer example</Link>
          </Button>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          Managed plans from $1,990 a year. Custom integrations scoped
          separately.
        </p>
      </section>
      <section className="max-w-section mx-auto px-section py-section">
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          {copy.exampleHeading}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Illustrative questions and the behavior we design around.
        </p>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {copy.examples.map((example) => (
            <div
              key={example.question}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-xl font-semibold leading-relaxed">
                &ldquo;{example.question}&rdquo;
              </h3>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {example.response}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-section mx-auto px-section py-section">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7 sm:p-9">
            <p className="text-sm text-muted-foreground">{copy.proof.label}</p>
            <h2 className="mt-3 text-2xl font-semibold">{copy.proof.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {copy.proof.description}
            </p>
            <Link
              href={copy.proof.href}
              className="mt-6 inline-block underline underline-offset-4"
            >
              Read the implementation story →
            </Link>
          </div>
          <div className="p-2 sm:p-7">
            <h2 className="text-2xl font-semibold">{copy.learning.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {copy.learning.description}
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              We set up the experience with you, test real questions, then
              review conversations and improve it as we learn.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
          {copy.boundaries.map((boundary) => (
            <div key={boundary.title}>
              <h3 className="text-lg font-semibold">{boundary.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {boundary.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-section mx-auto px-section py-section">
        <div className="rounded-3xl border border-muted-foreground bg-card p-7 sm:p-10">
          <p className="text-sm text-muted-foreground">Professional+</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            $3,990 a year. Managed support included.
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            2,200 conversations per month, 2 chatbots, 3 seats, analytics and 2
            custom reports. Smaller sites can start with Professional at $1,990
            a year and 600 conversations per month.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Annual billing. Bespoke integrations, live inventory and connections
            to your business systems require an agreed scope and price.
          </p>
          <h3 className="mt-9 text-xl font-semibold">{copy.cta}</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              asChild
              data-analytics-id={`${copy.industry}_cta_demo`}
              data-analytics-name="Discuss Your Website"
              data-analytics-context={JSON.stringify({
                source: copy.industry,
                section: 'cta',
              })}
            >
              <Link href={demoHref}>Bring us a question</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              data-analytics-id={`${copy.industry}_cta_pricing`}
              data-analytics-name="Compare Plans"
              data-analytics-context={JSON.stringify({
                source: copy.industry,
                section: 'cta',
              })}
            >
              <Link href="/pricing">Compare plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
