'use client';

import { Animate } from "@/components/ui/animate";

type Copy = {
  logo: {
    placeholder: string;
  };
  slogan: {
    line1: string;
    line2: string;
  };
  description: string;
};

const copy = {
  logo: {
    placeholder: "S",
  },
  slogan: {
    line1: "Your Website is Your Front Door.",
    line2: "We Provide the 24/7 Expert.",
  },
  description: "Subsights AI qualifies, guides, and converts your best website visitors —so your team doesn't have to.",
} satisfies Copy;

export default function Hero() {
  return (
    <Animate name="fadeIn" trigger="onVisible">
      <section className="text-center space-y-8 max-w-4xl mx-auto px-6 py-20">
        {/* Company Logo */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-primary">{copy.logo.placeholder}</span>
          </div>
        </div>

        {/* Slogan */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          {copy.slogan.line1}<br />
          {copy.slogan.line2}
        </h2>

        {/* Description */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {copy.description}
        </p>
      </section>
    </Animate>
  );
}

export const sectionId = "hero";
