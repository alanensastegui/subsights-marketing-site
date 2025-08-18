import { Animate } from "@/components/ui/animate";

type Copy = {
  lead: string;
  paragraphs: string[];
};

export const sectionId = "narrative";

// ---- SECTION COPY REGION ----
const copy = {
  lead: "We’re crafting an AI assistant that brings focus back to your team and results back to your business",
  paragraphs: [
    "We built Subsights out of frustration with the tools that were supposed to help. Chatbots had become clunky, impersonal, and more of a burden than a benefit—leaving teams to chase noise instead of focusing on real opportunities. We wanted to create something different. Something that felt less like a bot and more like a teammate, always ready to help.",
    "What started as a simple website assistant has since grown into a powerful platform that learns your business inside and out. Subsights becomes your site’s “Expert Brain,” answering questions with accuracy, guiding visitors at the right moment, and seamlessly connecting them to your team when it matters most.",
    "Today, businesses across industries—from local tour operators to private lenders—use Subsights to filter out distractions, save hours of repetitive work, and capture high-intent leads they might otherwise lose. Subsights helps them focus on what they do best: serving their customers and growing their business.",
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Section() {
  const c = copy;

  return (
    <section
      aria-labelledby="about-narrative"
      className="mx-auto max-w-6xl px-6 py-20"
    >
      <h2 id="about-narrative" className="sr-only">
        Our approach
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left column - Large lead text */}
        <Animate name="fadeIn" trigger="onVisible">
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-foreground">
              {c.lead}
            </p>
          </div>
        </Animate>

        {/* Right column - Paragraphs */}
        <Animate name="fadeIn" trigger="onVisible">
          <div className="space-y-6">
            {c.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </Animate>
      </div>
    </section>
  );
}
