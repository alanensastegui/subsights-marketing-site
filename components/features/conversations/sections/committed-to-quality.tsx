import React from 'react';
import { Animate } from '@/components/ui/animate';

type Copy = {
  title: string;
  description: string;
};

export const sectionId = 'committed-to-quality';

// ---- SECTION COPY REGION ----
const copy = {
  title: 'Committed to your quality',
  description:
    "We work alongside your team to analyze conversations, strengthen answers, and keep every exchange true to your company's standards.",
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function CommittedToQuality() {
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
