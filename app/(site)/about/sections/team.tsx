import Image from "next/image";
import { Animate } from "@/components/ui/animate";

type Copy = {
  lead: string;
  paragraphs: string[];
  members: { name: string; role: string; headshot: string; linkedin?: string }[];
};

export const sectionId = "team";

// ---- SECTION COPY REGION ----
const copy = {
  lead: "Every detail matters",
  paragraphs: [
    "Subsights is founder-led and hands-on—a team of friends, engineers, and business strategists who obsess over fast execution and fine details. We work closely together, combining technical rigor with creative problem-solving, and we bring that same energy to every customer partnership. When you work with Subsights, you’re not getting a faceless platform—you’re working directly with the people building it, committed to making sure it delivers real results for your business.",
  ],
  members: [
    {
      name: "Alán",
      role: "Engineer & Co-Founder",
      headshot: "/images/team-headshots/alan.avif",
      linkedin: "https://www.linkedin.com/in/alanensastegui/",
    },
    {
      name: "Lucas",
      role: "Business Development & Co-Founder",
      headshot: "/images/team-headshots/lucas.avif",
      linkedin: "https://www.linkedin.com/in/lucascairns/",
    },
    {
      name: "Ryan",
      role: "Engineer & Co-Founder",
      headshot: "/images/team-headshots/ryan.avif",
      linkedin: "https://www.linkedin.com/in/ryan-buchmayer-81373b190/",
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Section() {
  const c = copy;

  return (
    <section
      aria-labelledby="about-team"
      className="max-w-6xl mx-auto px-6 py-12"
    >
      <div className="space-y-16">
        <Animate name="fadeInStagger" trigger="onVisible">
          {/* Two-column layout above team pictures */}
          <div className="animate-item grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left column - Large lead text */}
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl font-medium leading-relaxed text-foreground">
                {c.lead}
              </p>
            </div>

            {/* Right column - Paragraphs */}
            <div className="space-y-6">
              {c.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Team pictures */}
          <ul
            role="list"
            className="animate-item grid grid-cols-1 gap-10 sm:grid-cols-3"
          >
            {c.members.map((p) => (
              <li key={p.name} className="flex flex-col items-center text-center">
                <Image
                  src={p.headshot}
                  alt={`Portrait of ${p.name}`}
                  width={192}
                  height={192}
                  className="h-48 w-48 rounded-full object-cover grayscale transition hover:grayscale-0"
                  priority={true}
                />
                <div className="mt-4">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.role}</div>
                  {p.linkedin && (
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 rounded-md hover:bg-muted/50"
                      aria-label={`Open ${p.name}'s LinkedIn`}
                      title={`Open ${p.name}'s LinkedIn`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Animate>
      </div>
    </section>
  );
}
