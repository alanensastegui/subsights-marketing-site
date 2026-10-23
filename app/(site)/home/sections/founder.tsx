import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Copy = {
  heading: string;
  description: string;
  members: { name: string; role: string; headshot: string }[];
};
export const sectionId = 'founder';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'Work with the people who build it.',
  description:
    'Built by Alán, Lucas and Ryan. Work with our team on your assistant’s appearance, sources and answers, from setup through ongoing care.',
  members: [
    {
      name: 'Alán',
      role: 'Engineer',
      headshot: '/images/team-headshots/alan.avif',
    },
    {
      name: 'Lucas',
      role: 'Business Development',
      headshot: '/images/team-headshots/lucas.avif',
    },
    {
      name: 'Ryan',
      role: 'Engineer',
      headshot: '/images/team-headshots/ryan.avif',
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Founder() {
  return (
    <section
      aria-labelledby="founder-title"
      className="max-w-section mx-auto px-section py-section"
    >
      <div className="grid items-center gap-10 border-y border-border py-10 lg:grid-cols-[1.2fr_1fr]">
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
              data-analytics-name="Talk with Us (Founder)"
              data-analytics-context='{"source":"home_founder"}'
            >
              <Link href="/email-my-demo">Talk with us</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              data-analytics-id="home_founder_team"
              data-analytics-name="Meet the Founders (Home)"
              data-analytics-context='{"source":"home_founder"}'
            >
              <Link href="/about#team">Meet the founders →</Link>
            </Button>
          </div>
        </div>
        <ul className="grid grid-cols-3 gap-4 text-center sm:gap-6">
          {copy.members.map((member) => (
            <li key={member.name}>
              <Image
                src={member.headshot}
                alt={`${member.name}, Subsights co-founder`}
                width={160}
                height={160}
                sizes="(min-width: 1024px) 160px, 30vw"
                className="mx-auto aspect-square h-auto w-full max-w-40 rounded-2xl object-cover"
              />
              <p className="mt-3 font-semibold">{member.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {member.role}
                <br />
                Co-founder
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
