import { Animate } from "@/components/ui/animate";

type Copy = {
  title: string;
  description: string;
};

export const sectionId = "hero";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about Subsights",
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Hero() {
  const c = copy;
  return (
    <section className="text-center space-y-8 max-w-6xl mx-auto px-6 py-4">
      <Animate name="fadeIn" trigger="onVisible">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {c.title}
        </h2>
      </Animate>

      <Animate name="fadeIn" trigger="onVisible">
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          {c.description}
        </p>
      </Animate>
    </section>
  );
}
