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
  subheading: "Explore our detailed case studies to see exactly how we partner with businesses to solve complex challenges and drive tangible results",
  quote: "Subsights has been a game-changer. Our AI assistant handles the vast majority of our online inquiries, which has freed up our team to focus on providing exceptional in-person guest services. It's a true extension of our team.",
  attribution: "Intrust Funding Principal",
  cta: {
    text: "View Case Studies",
    link: "/case-studies",
  },
} satisfies Copy;

export default function CustomerQuote() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* Main Heading */}
      <Animate name="fadeIn" trigger="onVisible" className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {copy.heading}
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          {copy.subheading}
        </p>
      </Animate>

      {/* Quote Card */}
      <Animate name="fadeIn" trigger="onVisible" className="mb-8">
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-4">
              {/* Quote Text */}
              <blockquote className="text-xl md:text-2xl text-white leading-relaxed italic">
                &ldquo;{copy.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <cite className="text-lg text-gray-300 font-medium not-italic">
                — {copy.attribution}
              </cite>
            </div>
          </CardContent>
        </Card>
      </Animate>

      {/* Call to Action */}
      <Animate name="fadeIn" trigger="onVisible" className="text-center">
        <Button asChild size="lg">
          <Link href={copy.cta.link}>
            {copy.cta.text}
          </Link>
        </Button>
      </Animate>
    </section>
  );
}

export const sectionId = "customer-quote";
