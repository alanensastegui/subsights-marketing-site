import { Animate } from "@/components/ui/animate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/ui/video-player";
import { Globe, FileText, PenTool, Map, Link, Search, RefreshCw, Upload, Shield, Type, HelpCircle, Edit3, Briefcase } from "lucide-react";

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
  subtitle: "Build your knowledge base with flexible options designed for different workflows",
  methods: [
    {
      title: "Train from your website",
      icon: Globe,
      features: [
        {
          title: "Sitemap (recommended)",
          description: "Add your entire sitemap or select branches.",
          icon: Map,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Single URL",
          description: "Include key pages one by one.",
          icon: Link,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Auto-refresh",
          description: "Content stays current with daily updates and cut-off dates for control.",
          icon: RefreshCw,
          videoSrc: "/features/add-sitemap.mp4"
        }
      ]
    },
    {
      title: "Direct file uploads",
      icon: FileText,
      features: [
        {
          title: "Supported formats",
          description: "PDF, Markdown, and text files.",
          icon: Upload,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Use cases",
          description: "Price lists, product manuals, marketing one-pagers.",
          icon: Briefcase,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Secure storage",
          description: "Full control over access and visibility.",
          icon: Shield,
          videoSrc: "/features/add-sitemap.mp4"
        }
      ]
    },
    {
      title: "Manual text input",
      icon: PenTool,
      features: [
        {
          title: "Simple text",
          description: "Create topics with headers and body content.",
          icon: Type,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Q&A pairs",
          description: "Define questions with exact answers for consistent responses.",
          icon: HelpCircle,
          videoSrc: "/features/add-sitemap.mp4"
        },
        {
          title: "Quick edits",
          description: "Add specific directives or custom knowledge on the fly.",
          icon: Edit3,
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
                  <Card key={featureIndex} className="group hover:bg-card/80 hover:border-border/70 transition-all duration-300 overflow-hidden md:scale-95 md:hover:scale-105 hover:shadow-lg transform-gpu will-change-transform">
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
