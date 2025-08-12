'use client';

import { Animate } from "@/components/ui/animate";

type Copy = {
  heading: string;
  useCases: Array<{
    title: string;
    description: string;
    imageEmoji: string;
  }>;
};

const copy = {
  heading: "Powerful Solutions for Any Business",
  useCases: [
    {
      title: "For Lead Generation",
      description: "Guide users through vast amounts of information, qualify their interests, and seamlessly connect them to the right programs or affiliate links to boost conversions.",
      imageEmoji: "🛒",
    },
    {
      title: "For Tourism & Hospitality",
      description: "Act as a 24/7 virtual concierge, answering visitor questions, providing expert local recommendations, and assisting with trip planning to enhance the user experience.",
      imageEmoji: "💻",
    },
    {
      title: "For Specialized Services",
      description: "Automate your front-line lead qualification, filtering out-of-scope inquiries and ensuring your sales team only engages with high-quality prospects that fit your niche.",
      imageEmoji: "⚖️",
    },
  ],
} satisfies Copy;

const UseCaseImage = ({ emoji }: { emoji: string }) => (
  <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
    <span className="text-3xl">{emoji}</span>
  </div>
);

export default function UseCases() {
  return (
    <Animate name="fadeIn" trigger="onVisible">
      <section className="max-w-6xl mx-auto px-6 py-20">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {copy.heading}
          </h2>
        </div>

        {/* Use Cases */}
        <div className="space-y-12">
          {copy.useCases.map((useCase, index) => (
            <div key={index} className="flex flex-col md:flex-row items-start gap-8">
              {/* Left: Image */}
              <UseCaseImage emoji={useCase.imageEmoji} />

              {/* Right: Content */}
              <div className="flex-1 space-y-3">
                <h3 className="text-2xl font-semibold text-white">
                  {useCase.title}
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Animate>
  );
}

export const sectionId = "use-cases";
