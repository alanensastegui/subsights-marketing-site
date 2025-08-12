'use client';

import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type Copy = {
  heading: string;
  subheading: string;
  quote: string;
  attribution: string;
  cta: {
    text: string;
    link: string;
  };
};

const copy = {
  heading: "Don't Just Take Our Word For It",
  subheading: "Explore our detailed case studies to see exactly how we partner with businesses to solve complex challenges and drive tangible results.",
  quote: "Subsights has been a game-changer. Our AI assistant handles the vast majority of our online inquiries, which has freed up our team to focus on providing exceptional in-person guest services. It's a true extension of our team.",
  attribution: "Intrust Funding Principal",
  cta: {
    text: "View Case Studies",
    link: "/case-studies",
  },
} satisfies Copy;

export default function CustomerQuote() {
  return (
    <Animate name="fadeIn" trigger="onVisible">
      <section className="max-w-4xl mx-auto px-6 py-20">
        {/* Main Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {copy.heading}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {copy.subheading}
          </p>
        </div>

        {/* Quote Card */}
        <Card className="border-white/10 bg-white/5 mb-8">
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              {/* Quote Text */}
              <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-6 italic">
                &ldquo;{copy.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <cite className="text-lg text-gray-300 font-medium not-italic">
                — {copy.attribution}
              </cite>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto">
            <Link href={copy.cta.link}>
              {copy.cta.text}
            </Link>
          </Button>
        </div>
      </section>
    </Animate>
  );
}

export const sectionId = "customer-quote";
