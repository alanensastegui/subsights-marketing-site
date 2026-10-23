import Link from 'next/link';

type Copy = {
  heading: string;
  description: string;
  includes: string[];
  comparison: string;
  source: { href: string; label: string };
  fit: string;
};
export const sectionId = 'destination-value';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'Quoted $20,000+ for visitor AI?',
  description:
    'Start with what your destination actually needs. For a branded website assistant, managed support and visitor insights, Professional+ is $3,990 a year.',
  includes: [
    '2,200 conversations per month',
    '2 chatbots and 3 team seats',
    'Analytics and 2 custom reports',
    'Setup and managed priority support',
  ],
  comparison:
    "For context, the Florida Keys' 2025 GuideGeek agreement listed $25,000 for the first year: $5,000 setup, $10,000 annual subscription and $10,000 annual website indexing.",
  source: {
    href: 'https://www.monroecounty-fl.gov/DocumentCenter/View/38038/G2-Guide-Geek-Agreement',
    label: 'Read the public 2025 agreement (PDF)',
  },
  fit: "That is a dated agreement for a different scope, not a current quote or an equivalent feature bundle. If you need social messaging, human takeover or a visual itinerary planner, let's check those requirements before comparing.",
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function DestinationValue() {
  return (
    <section
      aria-labelledby="destination-value-title"
      className="max-w-section mx-auto px-section py-section"
    >
      <div className="rounded-3xl border border-muted-foreground bg-card p-6 sm:p-10">
        <h2
          id="destination-value-title"
          className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {copy.heading}
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed">
          {copy.description}
        </p>
        <ul className="mt-7 grid gap-3 text-muted-foreground sm:grid-cols-2">
          {copy.includes.map((item) => (
            <li key={item}>✓ {item}</li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted-foreground">
          Annual billing. Smaller sites can start at $1,990 a year. Bespoke
          integrations are quoted separately.{' '}
          <Link href="/pricing" className="underline underline-offset-4">
            See all plans →
          </Link>
        </p>
        <div className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            {copy.comparison}{' '}
            <a
              href={copy.source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {copy.source.label} ↗
            </a>
          </p>
          <p className="mt-3">{copy.fit}</p>
        </div>
      </div>
    </section>
  );
}
