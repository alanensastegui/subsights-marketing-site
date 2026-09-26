import Link from "next/link";
import Image from "next/image";
import { Animate } from "@/components/ui/animate";

type Copy = {
  heading: string;
  quote: string;
  attribution: string;
  company: string;
  logo: string;
  examples: Array<{ title: string; description: string }>;
  caseStudy: { label: string; href: string };
};

export const sectionId = "visitor-proof";

// ---- SECTION COPY REGION ----
const copy = {
  heading: "Visit Sun Valley's assistant, Sunny, in practice",
  quote:
    "The chatbot is fantastic in providing eloquent and informative responses to users. We have seen a decrease in email inquiries as a result. Lastly, I love that the chatbot can seamlessly communicate in dozens of different languages!",
  attribution: "Operations Manager",
  company: "Visit Sun Valley",
  logo: "/images/client-logos/vsv.avif",
  examples: [
    {
      title: "Logistics, answered on the spot",
      description: "Ski lockers at River Run, gondola status and shuttle schedules, with a link to the current page.",
    },
    {
      title: "Multi-day plans in one conversation",
      description: "Lodging, show schedules and festival dates pulled together for the dates a visitor names.",
    },
    {
      title: "Honest about what it can't know",
      description: "Asked about live flight availability, it says so and points to the right resource.",
    },
  ],
  caseStudy: { label: "Read the Visit Sun Valley case study", href: "/case-studies/visit-sun-valley" },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function VisitorProof() {
  return (
    <section className="max-w-section mx-auto px-section py-section">
      <Animate name="fadeInStagger" trigger="onVisible">
        <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">{copy.heading}</h2>
        <div className="grid gap-8 md:grid-cols-5 items-start">
          <figure className="animate-item md:col-span-3 rounded-xl border border-white/10 bg-white/5 p-8">
            <blockquote className="text-xl md:text-2xl leading-relaxed text-white/95">&ldquo;{copy.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 flex items-center gap-4">
              <Image src={copy.logo} alt={`${copy.company} logo`} width={48} height={48} className="rounded-md" />
              <span className="text-muted-foreground">
                {copy.attribution}, {copy.company}
              </span>
            </figcaption>
          </figure>
          <div className="md:col-span-2 space-y-6">
            {copy.examples.map((example) => (
              <div key={example.title} className="animate-item">
                <h3 className="text-xl font-semibold text-white">{example.title}</h3>
                <p className="mt-1 text-lg text-muted-foreground leading-relaxed">{example.description}</p>
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
