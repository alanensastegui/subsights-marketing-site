import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Copy = {
  eyebrow: string;
  heading: string;
  description: string;
  note: string;
  question: string;
  answer: string;
};
export const sectionId = 'hero';

// ---- SECTION COPY REGION ----
const copy = {
  eyebrow: 'Affordable AI for your website',
  heading:
    'Your website assistant, shaped around your business and cared for by its builders.',
  description:
    'Subsights helps visitors find useful answers and take the next step. We work with you on the content, appearance and behavior, test realistic questions before launch, and help improve the experience as you learn what visitors need.',
  note: 'Managed plans from $1,990 a year. Setup and ongoing care included.',
  question: "We're visiting without a car. Where should we start?",
  answer:
    "Let's start with where you're staying and what you'd like to do. Then we can look at transport and nearby activities together.",
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Hero() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="max-w-section mx-auto px-section py-section"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {copy.eyebrow}
          </p>
          <h1
            id="home-hero-title"
            className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            {copy.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {copy.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              data-analytics-id="home_hero_demo"
              data-analytics-name="Talk with Us (Home Hero)"
              data-analytics-context='{"source":"home_hero","section":"hero"}'
            >
              <Link href="/email-my-demo">Talk with us</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              data-analytics-id="home_hero_industries"
              data-analytics-name="Explore Industries (Home Hero)"
              data-analytics-context='{"source":"home_hero","section":"hero"}'
            >
              <Link href="#industries">Find your industry</Link>
            </Button>
          </div>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {copy.note}
          </p>
        </div>
        <figure className="min-w-0 rounded-3xl border border-border bg-card p-5 shadow-2xl sm:p-8">
          <figcaption className="mb-6 flex items-center gap-3 border-b border-border pb-5">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold"
              aria-hidden="true"
            >
              S
            </span>
            <div>
              <p className="font-semibold">Your website assistant</p>
              <p className="text-xs text-muted-foreground">
                Your look. Your content. A helpful conversation.
              </p>
            </div>
          </figcaption>
          <p className="ml-8 rounded-2xl rounded-br-sm bg-secondary p-4 text-sm leading-relaxed">
            {copy.question}
          </p>
          <p className="mr-4 mt-4 rounded-2xl rounded-bl-sm border border-border bg-background p-4 text-sm leading-relaxed">
            {copy.answer}
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5 text-center text-xs leading-relaxed text-muted-foreground">
            <p>
              Answer
              <br />
              <span className="font-medium text-foreground">the question</span>
            </p>
            <p>
              Link to
              <br />
              <span className="font-medium text-foreground">the next step</span>
            </p>
            <p>
              Learn from
              <br />
              <span className="font-medium text-foreground">
                the conversation
              </span>
            </p>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Illustrative conversation, not a customer transcript.
          </p>
        </figure>
      </div>
    </section>
  );
}
