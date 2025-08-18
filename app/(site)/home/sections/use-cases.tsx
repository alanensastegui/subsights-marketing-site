import Image from "next/image";
import { Animate } from "@/components/ui/animate";

type Copy = {
  heading: string;
  useCases: Array<{
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
  }>;
};

const copy = {
  heading: "Powerful Solutions For Any Business",
  useCases: [
    {
      title: "For Lead Generation",
      description: "Guide users through vast amounts of information, qualify their interests, and seamlessly connect them to the right programs or affiliate links to boost conversions.",
      imageSrc: "/images/sales-funnel.svg",
      imageAlt: "Sales funnel icon",
    },
    {
      title: "For Tourism & Hospitality",
      description: "Act as a 24/7 virtual concierge, answering visitor questions, providing expert local recommendations, and assisting with trip planning to enhance the user experience.",
      imageSrc: "/images/map-with-pins.svg",
      imageAlt: "Map with pins icon",
    },
    {
      title: "For Specialized Services",
      description: "Automate your front-line lead qualification, filtering out-of-scope inquiries and ensuring your sales team only engages with high-quality prospects that fit your niche.",
      imageSrc: "/images/suitcase.svg",
      imageAlt: "Suitcase icon",
    },
  ],
} satisfies Copy;

const UseCaseImage = ({ imageSrc, imageAlt }: { imageSrc: string; imageAlt: string }) => (
  <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={70}
      height={70}
    />
  </div>
);

export default function UseCases() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Main Heading */}
      <Animate name="fadeIn" trigger="onVisible" className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {copy.heading}
        </h2>
      </Animate>

      {/* Use Cases */}
      <div className="space-y-12">
        {copy.useCases.map((useCase, index) => (
          <Animate
            key={index}
            name="fadeIn"
            trigger="onVisible"
            className="flex flex-col md:flex-row items-start gap-8"
          >
            {/* Left: Image */}
            <UseCaseImage imageSrc={useCase.imageSrc} imageAlt={useCase.imageAlt} />

            {/* Right: Content */}
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-semibold text-white">
                {useCase.title}
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                {useCase.description}
              </p>
            </div>
          </Animate>
        ))}
      </div>
    </section>
  );
}

export const sectionId = "use-cases";
