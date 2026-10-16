import Link from 'next/link';
import Image from 'next/image';
import { Animate } from '@/components/ui/animate';

type Copy = {
  heading: string;
  quote: string;
  attribution: string;
  company: string;
  logo: string;
  volumeHeading: string;
  months: Array<{ label: string; conversations: string }>;
  volumeNote: string;
  examples: Array<{ title: string; description: string }>;
  caseStudy: { label: string; href: string };
};

export const sectionId = 'visitor-proof';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'Real visitor questions. Real destination use.',
  quote: 'We have seen a decrease in email inquiries as a result.',
  attribution: 'Operations Manager',
  company: 'Visit Sun Valley',
  logo: '/images/client-logos/vsv.avif',
  volumeHeading: '233–396 conversations a month at Visit Sun Valley',
  months: [
    { label: 'July 2026', conversations: '396' },
    { label: 'August 2026', conversations: '233' },
  ],
  volumeNote:
    'Reported monthly conversation totals for Sunny, July and August 2026. Conversations are not unique visitors or bookings; results vary by destination and season.',
  examples: [
    {
      title: 'What visitors ask',
      description:
        'Visitors ask about events, lodging, travel logistics and things to do, as described in the published Visit Sun Valley case study.',
    },
    {
      title: 'What Sunny helps them find',
      description:
        'Event details, lodging information and local travel guidance, with links back to destination resources.',
    },
    {
      title: "Honest about what it can't know",
      description:
        'For live flight availability, Sunny directs visitors to the appropriate resource. It helps them plan without pretending to be a booking engine.',
    },
  ],
  caseStudy: {
    label: 'Read the Visit Sun Valley case study',
    href: '/case-studies/visit-sun-valley',
  },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function VisitorProof() {
  return (
    <section className="max-w-section mx-auto py-section">
      <Animate name="fadeInStagger" trigger="onVisible">
        <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
          {copy.heading}
        </h2>
        <div className="animate-item rounded-2xl border border-border bg-card p-6 sm:p-8 mb-10">
          <h3 className="text-xl sm:text-2xl font-semibold">
            {copy.volumeHeading}
          </h3>
          <dl className="mt-7 grid grid-cols-2 gap-5">
            {copy.months.map((month) => (
              <div
                key={month.label}
                className="border-l-2 border-muted-foreground/60 pl-4 sm:pl-6"
              >
                <dt className="text-sm text-muted-foreground">{month.label}</dt>
                <dd className="mt-2 text-5xl sm:text-6xl font-semibold tracking-tight tabular-nums">
                  {month.conversations}
                  <span className="mt-2 block text-sm font-normal tracking-normal text-muted-foreground">
                    conversations
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-7 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {copy.volumeNote}
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <figure className="animate-item rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <blockquote className="text-2xl md:text-3xl leading-relaxed text-white/95">
              &ldquo;{copy.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-4">
              <Image
                src={copy.logo}
                alt={`${copy.company} logo`}
                width={48}
                height={48}
                className="rounded-md"
              />
              <span className="text-muted-foreground">
                {copy.attribution}, {copy.company}
              </span>
            </figcaption>
          </figure>
          <div className="space-y-6">
            {copy.examples.map((example) => (
              <div key={example.title} className="animate-item">
                <h3 className="text-xl font-semibold text-white">
                  {example.title}
                </h3>
                <p className="mt-1 text-lg text-muted-foreground leading-relaxed">
                  {example.description}
                </p>
              </div>
            ))}
            <Link
              href={copy.caseStudy.href}
              className="animate-item inline-block text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              {copy.caseStudy.label} →
            </Link>
          </div>
        </div>
      </Animate>
    </section>
  );
}
