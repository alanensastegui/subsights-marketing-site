import { Funnel, MapPin, Briefcase } from "lucide-react";
import { Animate } from "@/components/ui/animate";

type Copy = {
  heading: string;
  useCases: Array<{
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
};

const copy = {
  heading: "Works across your business",
  useCases: [
    {
      title: "For Lead Generation",
      description: "Route interest, qualify fit, and hand off warm leads—seamlessly.",
      icon: Funnel,
    },
    {
      title: "For Tourism & Hospitality",
      description: "Act as a 24/7 concierge with trusted, local recommendations and frictionless bookings.",
      icon: MapPin,
    },
    {
      title: "For Specialized Services",
      description: "Screen out-of-scope inquiries and keep your team focused on high-value prospects.",
      icon: Briefcase,
    },
  ],
} satisfies Copy;

const UseCaseIcon = ({ Icon }: { Icon: React.ComponentType<{ className?: string }> }) => (
  <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
    <Icon className="w-12 h-12 text-primary" />
  </div>
);

export default function UseCases() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Main Heading */}
        <div className="animate-item text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {copy.heading}
          </h2>
        </div>

        {/* Use Cases */}
        <div className="space-y-12">
          {copy.useCases.map((useCase, index) => (
            <div key={index} className="animate-item flex flex-col md:flex-row items-start gap-8">
              {/* Left: Icon */}
              <UseCaseIcon Icon={useCase.icon} />

              {/* Right: Content */}
              <div className="flex-1 space-y-4">
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
      </Animate>
    </section>
  );
}

export const sectionId = "use-cases";
