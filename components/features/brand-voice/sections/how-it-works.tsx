import { Animate } from "@/components/ui/animate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/ui/video-player";
import { Brain, Palette, Settings, Target, MessageSquare, Zap, Users, BarChart3, Shield, Headphones } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  videoSrc: string;
};

type Method = {
  title: string;
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
      title: "Craft the Perfect Teammate for Any Goal",
      icon: Brain,
      features: [
        {
          title: "Sales Qualifier",
          description: "Act like an entry-level account executive, screen prospects, and send detailed summaries to your sales team.",
          icon: Target,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Support Agent",
          description: "Handle repetitive questions while learning from conversations and building its own knowledge base.",
          icon: MessageSquare,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Digital Concierge",
          description: "Proactively suggest relevant information and guide users to time-sensitive tasks.",
          icon: Zap,
          videoSrc: "/features/add-sitemap.mp4"
        }
      ]
    },
    {
      title: "Design a Seamless, On-Brand Experience",
      icon: Palette,
      features: [
        {
          title: "Brand Colors",
          description: "Precise control over hex codes for every element—header, send button, message bubbles, and link colors.",
          icon: Palette,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Your Logo",
          description: "Upload your company logo or custom icon to appear in the header and as the chat avatar.",
          icon: Users,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Header & Initial State",
          description: "Customize welcome text and choose whether the chatbot starts open or collapsed.",
          icon: BarChart3,
          videoSrc: "/features/add-sitemap.mp4"
        }
      ]
    },
    {
      title: "Advanced Customization & Reliability Testing",
      icon: Settings,
      features: [
        {
          title: "Managed Workflow Design",
          description: "Our team works directly with you to configure sophisticated, multi-step logic for complex integrations.",
          icon: Settings,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Reliability Testing",
          description: "Simulate hundreds of interactions to rigorously test AI performance for crucial conversation flows.",
          icon: Shield,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Enterprise Support",
          description: "Fully hands-on service for mission-critical workflows that require zero failure tolerance.",
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
              <div className="flex items-center gap-4 mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                  <method.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">{method.title}</h3>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {method.features.map((feature, featureIndex) => (
                  <Card key={featureIndex} className="group hover:bg-card/80 hover:border-border/70 transition-all duration-200 overflow-hidden">
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
