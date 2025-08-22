import { Animate } from "@/components/ui/animate";

type Copy = {
  title: string;
  productScreenshot: {
    posterJpg: string;
    ariaLabel: string;
  };
};

export const sectionId = "hero";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Trust, built in",
  productScreenshot: {
    posterJpg: "/images/product-screenshots/conversations-graph.png",
    ariaLabel:
      "Subsights auto-summarizes conversations and highlights root causes in real time.",
  },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Section() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="space-y-8">
        <Animate name="fadeInStagger" trigger="onVisible">
          <h1 className="animate-item text-center text-4xl md:text-5xl font-semibold tracking-tight mb-8">
            {copy.title}
          </h1>
        </Animate>
      </div>
    </section>
  );
}
