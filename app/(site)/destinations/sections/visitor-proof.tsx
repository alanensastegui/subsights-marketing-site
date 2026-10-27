import Link from 'next/link';
import Image from 'next/image';
import { Animate } from '@/components/ui/animate';

type Copy = {
  heading: string;
  quote: string;
  attribution: string;
  company: string;
  logo: string;
  examples: Array<{ title: string; description: string }>;
  caseStudy: { label: string; href: string };
};

export const sectionId = 'visitor-proof';

// ---- SECTION COPY REGION ----
const copy = {
  heading: "Visit Sun Valley's assistant, Sunny, in practice",
  quote:
    'The chatbot is fantastic in providing eloquent and informative responses to users. We have seen a decrease in email inquiries as a result. Lastly, I love that the chatbot can speak many different languages!',
  attribution: 'Jessica Maynard, Director of Operations',
  company: 'Visit Sun Valley',
  logo: '/images/client-logos/vsv.avif',
  examples: [
    {
      title: 'Help finding local information',
      description:
        "Bring website content together around the visitor's question, with links to explore further.",
    },
    {
      title: "Questions in the visitor's language",
      description:
        'Visitors can ask in their own words, including languages other than English.',
    },
    {
      title: 'A person behind the setup',
      description:
        'Work with us on the sources, tone, important topics and next steps you want the experience to support.',
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
    <section className="max-w-section mx-auto px-section py-section">
      <Animate name="fadeInStagger" trigger="onVisible">
        <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
          {copy.heading}
        </h2>
        <div className="grid gap-8 md:grid-cols-5 items-start">
          <figure className="animate-item md:col-span-3 rounded-xl border border-white/10 bg-white/5 p-8">
            <blockquote className="text-xl md:text-2xl leading-relaxed text-white/95">
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
          <div className="md:col-span-2 space-y-6">
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
              className="animate-item inline-block text-primary underline-offset-4 hover:underline"
            >
              {copy.caseStudy.label} →
            </Link>
          </div>
        </div>
      </Animate>
    </section>
  );
}
