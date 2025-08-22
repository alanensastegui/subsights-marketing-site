import { Animate } from "@/components/ui/animate";

type Copy = {
  lead: string;
  paragraphs: string[];
};

export const sectionId = "narrative";

// ---- SECTION COPY REGION ----
const copy = {
  lead: "We’re crafting the AI teammate that answers clearly and acts reliably. Momentum, not noise",
  paragraphs: [
    "We built Subsights because the tools meant to help started getting in the way. Chatbots became clunky, generic, noisy. We made a teammate instead—fast, useful, and easy to trust.",
    "It began as a lightweight site assistant. It’s now a platform that learns your business end-to-end. An expert brain for your website: answers with precision, guides at the right moment, and hands off to your team when it matters.",
    "Teams across industries—from local tour operators to private lenders—use Subsights to cut noise, reclaim hours, and convert high-intent leads they’d otherwise miss. Focus stays where it should: serving customers and growing the business.",
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Section() {
  const c = copy;

  return (
    <section
      aria-labelledby="about-narrative"
      className="max-w-6xl mx-auto px-6 py-12"
    >
      <div className="space-y-12">
        <h2 id="about-narrative" className="sr-only">
          Our approach
        </h2>
        <Animate name="fadeInStagger" trigger="onVisible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left column - Large lead text */}
            <div className="animate-item space-y-6">
              <p className="text-2xl md:text-3xl font-medium leading-relaxed text-foreground">
                {c.lead}
              </p>
            </div>

            {/* Right column - Paragraphs */}
            <div className="animate-item space-y-6">
              {c.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Animate>
      </div>
    </section>
  );
}
