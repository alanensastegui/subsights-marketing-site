import { Animate } from "@/components/ui/animate";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type Copy = {
  heading: string;
  challenges: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      imageSrc: string;
      imageAlt: string;
      painPoint: string;
    }>;
  };
  solutions: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      imageSrc: string;
      imageAlt: string;
      benefit: string;
    }>;
  };
};

const copy = {
  heading: "From Cost Center to Revenue Engine",
  challenges: {
    title: "Before Subsights",
    subtitle: "Traditional customer service struggles",
    items: [
      {
        title: "Expensive & Limited Support",
        description: "High staffing costs, limited hours, and overwhelmed teams during peak times. Customers wait hours for responses.",
        imageSrc: "/images/low-battery.svg",
        imageAlt: "Low battery icon",
        painPoint: "High operational costs",
      },
      {
        title: "Inconsistent & Frustrating Experience",
        description: "Different agents provide varying service quality. Customers get frustrated and leave without solutions.",
        imageSrc: "/images/alert-triangle.svg",
        imageAlt: "Alert triangle icon",
        painPoint: "Angry customers",
      },
      {
        title: "Missed Revenue Opportunities",
        description: "Agents miss upsell chances and can't handle multiple conversations simultaneously. Revenue leaks through the cracks.",
        imageSrc: "/images/trending-down.svg",
        imageAlt: "Trending down icon",
        painPoint: "Lost sales opportunities",
      },
    ],
  },
  solutions: {
    title: "After Subsights",
    subtitle: "AI-powered customer service excellence",
    items: [
      {
        title: "24/7 Automated Excellence",
        description: "AI handles unlimited conversations simultaneously, never takes breaks, and provides instant expert responses.",
        imageSrc: "/images/full-battery.svg",
        imageAlt: "Full battery icon",
        benefit: "Significant cost savings",
      },
      {
        title: "Consistent, Expert-Level Service",
        description: "Every customer gets the same high-quality, knowledgeable experience. No more inconsistent service quality.",
        imageSrc: "/images/checkmark-circle.svg",
        imageAlt: "Check circle icon",
        benefit: "Happy customers",
      },
      {
        title: "Revenue Optimization",
        description: "AI intelligently identifies upsell opportunities, applies strategic discounts, and maximizes every customer interaction.",
        imageSrc: "/images/trending-up.svg",
        imageAlt: "Trending up icon",
        benefit: "Increased conversions",
      },
    ],
  },
} satisfies Copy;

const GridItem = ({
  title,
  description,
  imageSrc,
  imageAlt,
  painPoint,
  benefit,
  isBefore = false
}: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  painPoint?: string;
  benefit?: string;
  isBefore?: boolean;
}) => (
  <Card className={cn(
    "border-0 transition-all duration-200 hover:scale-[1.02]",
    isBefore
      ? "bg-red-500/5 border-red-500/20 hover:bg-red-500/10"
      : "bg-green-500/5 border-green-500/20 hover:bg-green-500/10"
  )}>
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        {/* Left: Icon */}
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
          isBefore ? "bg-red-500/20" : "bg-green-500/20"
        )}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={28}
            height={28}
            className="w-7 h-7"
          />
        </div>

        {/* Right: Content */}
        <div className="flex-1 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            {description}
          </p>
          {(painPoint || benefit) && (
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                isBefore
                  ? "border-red-500/30 text-red-300 bg-red-500/20"
                  : "border-green-500/30 text-green-300 bg-green-500/20"
              )}
            >
              {painPoint || benefit}
            </Badge>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function ScaleReduceCosts() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* Main Heading */}
      <Animate name="fadeIn" trigger="onVisible" className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {copy.heading}
        </h2>
      </Animate>

      {/* Desktop: 2x2 Grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column: Before */}
        <div className="space-y-6">
          <Animate name="fadeIn" trigger="onVisible" className="mb-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-red-400">
                {copy.challenges.title}
              </h3>
              <p className="text-sm text-gray-400">
                {copy.challenges.subtitle}
              </p>
            </div>
          </Animate>
          <div className="space-y-6">
            {copy.challenges.items.map((item, index) => (
              <Animate key={index} name="fadeIn" trigger="onVisible">
                <GridItem
                  title={item.title}
                  description={item.description}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  painPoint={item.painPoint}
                  isBefore={true}
                />
              </Animate>
            ))}
          </div>
        </div>

        {/* Right Column: After */}
        <div className="space-y-6">
          <Animate name="fadeIn" trigger="onVisible" className="mb-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-green-400">
                {copy.solutions.title}
              </h3>
              <p className="text-sm text-gray-400">
                {copy.solutions.subtitle}
              </p>
            </div>
          </Animate>
          <div className="space-y-6">
            {copy.solutions.items.map((item, index) => (
              <Animate key={index} name="fadeIn" trigger="onVisible">
                <GridItem
                  title={item.title}
                  description={item.description}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  benefit={item.benefit}
                  isBefore={false}
                />
              </Animate>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Before/After Pairs */}
      <div className="md:hidden space-y-8">
        {copy.challenges.items.map((challenge, index) => {
          const solution = copy.solutions.items[index];
          return (
            <div key={index} className="space-y-4">
              {/* Before Card */}
              <Animate name="fadeIn" trigger="onVisible">
                <div className="relative">
                  <Badge className="absolute -top-3 left-4 bg-red-500 text-white text-xs font-bold">
                    BEFORE
                  </Badge>
                  <GridItem
                    title={challenge.title}
                    description={challenge.description}
                    imageSrc={challenge.imageSrc}
                    imageAlt={challenge.imageAlt}
                    painPoint={challenge.painPoint}
                    isBefore={true}
                  />
                </div>
              </Animate>

              {/* Arrow */}
              <Animate name="fadeIn" trigger="onVisible">
                <div className="flex justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">↓</span>
                  </div>
                </div>
              </Animate>

              {/* After Card */}
              <Animate name="fadeIn" trigger="onVisible">
                <div className="relative">
                  <Badge className="absolute -top-3 left-4 bg-green-500 text-white text-xs font-bold">
                    AFTER
                  </Badge>
                  <GridItem
                    title={solution.title}
                    description={solution.description}
                    imageSrc={solution.imageSrc}
                    imageAlt={solution.imageAlt}
                    benefit={solution.benefit}
                    isBefore={false}
                  />
                </div>
              </Animate>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export const sectionId = "scale-reduce-costs";
