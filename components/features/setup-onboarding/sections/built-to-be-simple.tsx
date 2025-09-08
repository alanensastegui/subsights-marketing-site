import React from "react";
import { Animate } from "@/components/ui/animate";

type Copy = {
  title: string;
  description: string;
};

export const sectionId = "built-to-be-simple";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Built to be simple",
  description: "Great technology lasts because it stays dependable. That's why we built Subsights to remain consistent, trustworthy, and simple—today and every day you use it.",
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function BuiltToBeSimple() {
  const c = copy;

  return (
    <section className="relative isolate px-6 py-12 max-w-6xl mx-auto">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="text-center">
          <h2 className="animate-item text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {c.title}
          </h2>
          <p className="animate-item text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {c.description}
          </p>
        </div>
      </Animate>
    </section>
  );
}
