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
    <section className="text-center space-y-8 max-w-6xl mx-auto px-6 py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        <h1 className="animate-item text-4xl md:text-5xl font-bold tracking-tight mb-8">
          {c.title}
        </h1>

        <p className="animate-item text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          {c.description}
        </p>
      </Animate>
    </section>
  );
}
