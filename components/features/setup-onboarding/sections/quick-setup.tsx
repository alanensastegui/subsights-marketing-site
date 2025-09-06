import { Animate } from "@/components/ui/animate";

type Copy = {
  heading: string;
  subheading: string;
  features: Array<{
    title: string;
    description: string;
  }>;
};

export const sectionId = "quick-setup";

// ---- SECTION COPY REGION ----
const copy = {
  heading: "Launch without detours",
  subheading: "Powerful tech should be simple to use. Our setup process is designed to deliver value from day one.",
  features: [
    {
      title: "Fast onboarding",
      description: "Spin up your AI Teammate and start engaging customers right away."
    },
    {
      title: "No setup hurdles",
      description: "Zero complex configuration, no custom code."
    },
    {
      title: "A partner on call",
      description: "Every plan includes hands-on support whenever you need it."
    }
  ]
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function QuickSetup() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Title and Subtitle */}
          <div className="animate-item space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {copy.heading}
            </h2>
            <h3 className="text-lg text-muted-foreground leading-relaxed">
              {copy.subheading}
            </h3>
          </div>

          {/* Right: Features */}
          <div className="animate-item space-y-12">
            {copy.features.map((feature, index) => (
              <div key={index}>
                <div className="space-y-4">
                  <h4 className="text-2xl font-semibold text-white transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                {index < copy.features.length - 1 && (
                  <div className="mt-8 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Animate>
    </section>
  );
}
