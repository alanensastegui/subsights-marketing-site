'use client';

import { Animate } from "@/components/ui/animate";

type Copy = {
  heading: string;
  challenges: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      imageEmoji: string;
    }>;
  };
  solutions: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      imageEmoji: string;
    }>;
  };
};

const copy = {
  heading: "Scale Effortlessly, Reduce Costs",
  challenges: {
    title: "Challenges Businesses Face",
    items: [
      {
        title: "High Customer Service Costs",
        description: "Traditional support teams require extensive training, work limited hours, and struggle to handle peak demand periods, leading to skyrocketing operational costs.",
        imageEmoji: "💰",
      },
      {
        title: "Inconsistent Customer Experience",
        description: "Human agents provide varying levels of service quality, leading to frustrated customers and missed opportunities for upselling and retention.",
        imageEmoji: "😤",
      },
    ],
  },
  solutions: {
    title: "The Subsights Impact",
    items: [
      {
        title: "24/7 Automated Support",
        description: "Our AI handles customer inquiries around the clock without breaks, holidays, or overtime costs, providing instant responses at scale.",
        imageEmoji: "🤖",
      },
      {
        title: "Consistent, Expert-Level Service",
        description: "Every customer interaction receives the same high-quality, knowledgeable response, building trust and improving satisfaction scores.",
        imageEmoji: "⭐",
      },
    ],
  },
} satisfies Copy;

const GridItem = ({
  title,
  description,
  imageEmoji
}: {
  title: string;
  description: string;
  imageEmoji: string;
}) => (
  <div className="flex items-start gap-4">
    {/* Left: Image */}
    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
      <span className="text-xl">{imageEmoji}</span>
    </div>

    {/* Right: Content */}
    <div className="flex-1 space-y-2">
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default function ScaleReduceCosts() {
  return (
    <Animate name="fadeIn" trigger="onVisible">
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {copy.heading}
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Challenges */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white mb-6">
              {copy.challenges.title}
            </h3>
            <div className="space-y-8">
              {copy.challenges.items.map((item, index) => (
                <GridItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  imageEmoji={item.imageEmoji}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Solutions */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white mb-6">
              {copy.solutions.title}
            </h3>
            <div className="space-y-8">
              {copy.solutions.items.map((item, index) => (
                <GridItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  imageEmoji={item.imageEmoji}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Animate>
  );
}

export const sectionId = "scale-reduce-costs";
