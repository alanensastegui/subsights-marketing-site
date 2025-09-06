import { Animate } from "@/components/ui/animate";
import { Brain, Palette, Settings } from "lucide-react";

type Method = {
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
};

type Copy = {
  title: string;
  subtitle: string;
  methods: Method[];
};

export const sectionId = "how-it-works";

// ---- SECTION COPY REGION ----
const copy = {
  title: "How it works",
  subtitle: "From crafting the perfect teammate to designing a seamless brand experience—all with enterprise-grade reliability.",
  methods: [
    {
      title: "Craft the Perfect Teammate for Any Goal",
      description: "Your business is unique, and your AI's behavior should be too. Using our AI-assisted natural language tools, you can define the exact role you need your Teammate to play.",
      icon: Brain,
      features: [
        "Build a 24/7 Sales Qualifier: Instruct your AI to act like an entry-level account executive, screen prospects, and automatically send detailed summaries to your sales team",
        "Create an Instant, Self-Improving Support Agent: Handle repetitive questions while learning from conversations and building its own knowledge base",
        "Deploy a Proactive Digital Concierge: Proactively suggest relevant information and guide users to time-sensitive tasks",
        "Easy-to-use customization tools with clear insights from analytics and conversations for continuous refinement"
      ]
    },
    {
      title: "Design a Seamless, On-Brand Experience",
      description: "Make your AI Teammate look and feel like a native part of your website with simple but powerful visual controls.",
      icon: Palette,
      features: [
        "Your Brand Colors: Precise control over hex codes for every element—header, send button, message bubbles, and link colors",
        "Your Logo: Upload your company logo or custom icon to appear in the header and as the chat avatar",
        "Header & Initial State: Customize welcome text and choose whether the chatbot starts open or collapsed",
        "Complete visual control to ensure your AI feels like a natural extension of your brand"
      ]
    },
    {
      title: "Advanced Customization & Reliability Testing",
      description: "Enterprise-grade support for complex or mission-critical workflows when conversation paths cannot fail.",
      icon: Settings,
      features: [
        "Managed Workflow Design: Our team works directly with you to configure sophisticated, multi-step logic for complex integrations",
        "Advanced Reliability Testing: Simulate hundreds of interactions to rigorously test AI performance for crucial conversation flows",
        "Enterprise-Grade Support: Fully hands-on service for mission-critical workflows that require zero failure tolerance",
        "Complete peace of mind with reliable, flawlessly operating AI teammates"
      ]
    }
  ]
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function HowItWorks() {
  const c = copy;
  return (
    <section className="relative isolate px-6 py-16 max-w-6xl mx-auto">
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {c.title}
          </h2>
          <p className="animate-item text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        {/* Methods List */}
        <div className="space-y-16">
          {c.methods.map((method) => (
            <div key={method.title} className="animate-item">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                {/* Icon and Title */}
                <div className="lg:w-80 lg:flex-shrink-0">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0">
                      <method.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-semibold tracking-tight lg:text-xl">{method.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2 hidden lg:block">{method.description}</p>
                    </div>
                  </div>
                </div>

                {/* Description (mobile only) */}
                <div className="lg:hidden mb-4">
                  <p className="text-base text-muted-foreground leading-relaxed">{method.description}</p>
                </div>

                {/* Features List */}
                <div className="flex-1">
                  <ul className="space-y-4">
                    {method.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                        <span className="text-base text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Animate>
    </section>
  );
}
