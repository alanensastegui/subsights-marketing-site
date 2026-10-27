import Link from 'next/link';

type Copy = {
  heading: string;
  description: string;
  industries: {
    name: string;
    audience: string;
    question: string;
    description: string;
    href: string;
    analyticsId: string;
  }[];
};
export const sectionId = 'industry-routes';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'Start with the people on your website.',
  description:
    'Different businesses. Different questions. An experience built around yours.',
  industries: [
    {
      name: 'Destinations',
      audience: 'Destination marketing organizations',
      question: 'What can we do here this weekend?',
      description:
        "Help visitors navigate things to do, places to stay and local logistics. Learn what they can't find.",
      href: '/destinations',
      analyticsId: 'home_industry_destinations',
    },
    {
      name: 'Private lenders',
      audience: 'Hard money and investor lending',
      question: 'Does my project fit your lending criteria?',
      description:
        'Explain your programs and service area, ask useful questions and guide borrowers to your team.',
      href: '/lenders',
      analyticsId: 'home_industry_lenders',
    },
    {
      name: 'Publishers & directories',
      audience: 'Affiliate and lead generation websites',
      question: 'Which option actually fits me?',
      description:
        'Turn a broad search into a relevant next step, with approved partner links and measurable clicks.',
      href: '/publishers',
      analyticsId: 'home_industry_publishers',
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function IndustryRoutes() {
  return (
    <section
      id="industries"
      aria-labelledby="industry-title"
      className="max-w-section mx-auto scroll-mt-24 px-section py-section"
    >
      <h2
        id="industry-title"
        className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {copy.heading}
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        {copy.description}
      </p>
      <div className="mt-9 grid gap-5 lg:grid-cols-3">
        {copy.industries.map((industry) => (
          <Link
            key={industry.href}
            href={industry.href}
            data-slot="button"
            data-analytics-id={industry.analyticsId}
            data-analytics-name={`Explore ${industry.name} (Home Industries)`}
            data-analytics-context='{"source":"home_industries","section":"industry-routes"}'
            className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <p className="text-sm text-muted-foreground">{industry.audience}</p>
            <h3 className="mt-3 text-2xl font-semibold">{industry.name}</h3>
            <p className="my-6 text-lg leading-relaxed">
              &ldquo;{industry.question}&rdquo;
            </p>
            <p className="mb-7 text-sm leading-relaxed text-muted-foreground">
              {industry.description}
            </p>
            <span className="mt-auto text-sm font-semibold">
              Explore {industry.name.toLowerCase()}{' '}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
