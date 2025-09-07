import { Animate } from "@/components/ui/animate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/ui/video-player";
import { Brain, Palette, Settings, Target, MessageSquare, Zap, Users, BarChart3, Shield, Headphones, Paintbrush, Wrench } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  videoSrc: string;
};

type Method = {
  title: string;
  description: string;
  features: Feature[];
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
      title: "Craft the perfect AI teammate for any goal",
      description: "Every business is different. Define your AI's role in plain language, and let the platform handle the rest.",
      icon: Brain,
      features: [
        {
          title: "24/7 sales qualifier",
          description: "Have your AI act like an entry-level account executive. Screen prospects with targeted questions and deliver a warm, qualified lead summary to your sales team.",
          icon: Target,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Self-improving support agent",
          description: "Offload repetitive questions. Your AI builds and updates its own knowledge base, adds quick links, and escalates only when it's truly needed.",
          icon: MessageSquare,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Proactive digital concierge",
          description: "Go beyond Q&A. Suggest events, highlight timely offers, and guide visitors through tasks that add value to their journey.",
          icon: Zap,
          videoSrc: "/features/add-sitemap.mp4"
        }
      ]
    },
    {
      title: "Design a seamless, on-brand experience",
      description: "Make your AI Teammate feel like it's always been part of your site with powerful, easy-to-use visual controls.",
      icon: Palette,
      features: [
        {
          title: "Brand colors",
          description: "Adjust headers, buttons, message bubbles, and links to match your palette.",
          icon: Paintbrush,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Logo and icons",
          description: "Upload your logo or custom icon to appear in the header and avatar.",
          icon: Users,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Header & start state",
          description: "Customize welcome text and decide if chat opens by default or stays collapsed.",
          icon: BarChart3,
          videoSrc: "/features/add-sitemap.mp4"
        }
      ]
    },
    {
      title: "Advanced customization & reliability testing",
      description: "For complex or mission-critical workflows, extend beyond self-service with expert support.",
      icon: Settings,
      features: [
        {
          title: "Custom workflow design",
          description: "Configure multi-step conversation logic with prompts tailored to your business.",
          icon: Wrench,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Reliability testing",
          description: "Simulate hundreds of interactions to ensure accuracy and consistency at scale.",
          icon: Shield,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Hands-on partnership",
          description: "Collaborate with our team for setup, fine-tuning, and ongoing improvements.",
          icon: Headphones,
          videoSrc: "/features/add-sitemap.mp4"
        }
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
          <p className="animate-item text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        {/* Methods List */}
        <div className="space-y-16">
          {c.methods.map((method, index) => (
            <div key={method.title} className="animate-item">
              {/* Method Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                  <method.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-2">{method.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed max-w-md">{method.description}</p>
                </div>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {method.features.map((feature, featureIndex) => (
                  <Card key={featureIndex} className="group hover:bg-card/80 hover:border-border/70 transition-all duration-300 overflow-hidden md:hover:scale-110 hover:shadow-lg transform-gpu will-change-transform">
                    <CardHeader className="flex flex-row items-center gap-3">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-primary" />
                      </div>
                      <CardTitle className="text-sm font-semibold text-foreground">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{feature.description}</p>
                      {/* Video Preview */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-md ring-1 ring-border/50 bg-background/20">
                        <VideoPlayer
                          src={feature.videoSrc}
                          className="w-full h-auto opacity-100 transition-opacity duration-300"
                          autoPlay={false}
                          muted
                          loop={false}
                          playsInline
                          hoverToPlay
                        />

                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Subtle Divider */}
              {index < c.methods.length - 1 && (
                <div className="mt-16 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </Animate>
    </section>
  );
}
