import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Copy = {
  heading: string;
  description: string;
  detail: string;
  linkedin: string;
};
export const sectionId = 'founder';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'Talk with the person building it.',
  description:
    "Lucas Cairns is a Seattle-based Subsights co-founder and AI builder. Bring your website and the questions your customers ask. We'll talk through what would help, what needs an integration and what should stay with a person.",
  detail:
    'Follow Lucas on LinkedIn for practical lessons from building AI tools and working with customers.',
  linkedin: 'https://www.linkedin.com/in/lucascairns/',
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Founder() {
  return (
    <section
      aria-labelledby="founder-title"
      className="max-w-section mx-auto px-section py-section"
    >
      <div className="grid items-center gap-8 border-y border-border py-10 sm:grid-cols-[160px_1fr]">
        <Image
          src="/images/team-headshots/lucas.avif"
          alt="Lucas Cairns, Subsights co-founder"
          width={160}
          height={160}
          className="h-32 w-32 rounded-2xl object-cover sm:h-40 sm:w-40"
        />
        <div>
          <h2 id="founder-title" className="text-3xl font-bold tracking-tight">
            {copy.heading}
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            {copy.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              data-analytics-id="home_founder_demo"
              data-analytics-name="Talk with Lucas (Founder)"
              data-analytics-context='{"source":"home_founder"}'
            >
              <Link href="/email-my-demo">Talk with Lucas</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              data-analytics-id="home_founder_linkedin"
              data-analytics-name="Follow Lucas (LinkedIn)"
              data-analytics-context='{"source":"home_founder","channel":"linkedin"}'
            >
              <a href={copy.linkedin} target="_blank" rel="noopener noreferrer">
                Connect on LinkedIn ↗
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{copy.detail}</p>
        </div>
      </div>
    </section>
  );
}
