"use client";

import { useCallback, useMemo, useState } from "react";
import { Animate } from "@/components/ui/animate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/ui/video-player";
import Carousel, { CarouselItem } from "@/components/ui/carousel";
import { Brain, Palette, Users, BarChart3, Paintbrush, Hand, Wand2, Sliders } from "lucide-react";

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
  subtitle: "Craft the right behavior and create a look that feels designed for your brand.",
  methods: [
    {
      title: "Define the experience from the first interaction",
      description: "No prompt engineering required. Just describe the behavior you need.",
      icon: Brain,
      features: [
        {
          title: "Create a friendly first impression",
          description: "Craft and test greetings so your AI teammate always starts the conversation the right way.",
          icon: Hand,
          videoSrc: "/features/edit-greeting.mp4"
        },
        {
          title: "Streamlined prompt creation",
          description: "Generate effective prompts with built-in AI assistance. Shape interactions without writing everything from scratch.",
          icon: Wand2,
          videoSrc: "/features/editing-behavior.mp4"
        },
        {
          title: "Effortless updates",
          description: "Easily refine your AI’s behavior as needs evolve. Update prompts seamlessly and keep your teammate aligned with your business.",
          icon: Sliders,
          videoSrc: "/features/updating-behavior.mp4"
        }
      ]
    },
    {
      title: "A teammate that looks the part",
      description: "Make your AI teammate indistinguishable from the rest of your customer experience.",
      icon: Palette,
      features: [
        {
          title: "Header & start state",
          description: "Set the widget header text and choose how conversations begin—opened by default or only when invited.",
          icon: BarChart3,
          videoSrc: "/features/edit-header-collapsed-state.mp4"
        },
        {
          title: "Logo and icons",
          description: "Upload your logo or a custom icon to brand the header and personalize the chat avatar.",
          icon: Users,
          videoSrc: "/features/edit-logo.mp4"
        },
        {
          title: "Colors & styles",
          description: "Match headers, buttons, message bubbles, and links to your palette for a consistent look and feel.",
          icon: Paintbrush,
          videoSrc: "/features/edit-colors.mp4"
        }
      ]
    }
  ]
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function HowItWorks() {
  const c = copy;
  const [currentFeatures, setCurrentFeatures] = useState<number[]>(
    c.methods.map(() => 0)
  );

  const handleFeatureChange = useCallback((methodIndex: number, featureIndex: number) => {
    setCurrentFeatures((prev) => {
      const next = [...prev];
      next[methodIndex] = featureIndex;
      return next;
    });
  }, []);

  const getIndexChangeHandler = useCallback(
    (methodIndex: number) => (featureIndex: number) => handleFeatureChange(methodIndex, featureIndex),
    [handleFeatureChange]
  );

  const createCarouselItems = useCallback(
    (features: Feature[], methodIndex: number, activeIndex: number): CarouselItem[] => {
      return features.map((feature, featureIndex) => ({
        id: feature.title,
        content: (
          <Card className="group hover:bg-card/80 hover:border-border/70 transition-all duration-300 overflow-hidden hover:shadow-lg transform-gpu will-change-transform">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex-shrink-0">
                <feature.icon className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-base font-semibold text-foreground">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{feature.description}</p>
              <div className="relative aspect-video w-full overflow-hidden rounded-md ring-1 ring-border/50 bg-background/20">
                <VideoPlayer
                  src={feature.videoSrc}
                  className="w-full h-auto opacity-100 transition-opacity duration-300"
                  muted
                  loop={false}
                  playsInline
                  autoPlay={featureIndex === activeIndex}
                  restartOnAutoPause
                  autoplayThreshold={0.9}
                  onEnded={() => {
                    if (features.length > 1) {
                      const nextIndex = (featureIndex + 1) % features.length;
                      handleFeatureChange(methodIndex, nextIndex);
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ),
      }));
    },
    [handleFeatureChange]
  );

  const carouselItemsPerMethod = useMemo(() => {
    return c.methods.map((method, methodIndex) =>
      createCarouselItems(method.features, methodIndex, currentFeatures[methodIndex])
    );
  }, [c.methods, currentFeatures, createCarouselItems]);
  return (
    <section className="relative isolate px-6 py-12 max-w-6xl mx-auto">
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {c.title}
          </h2>
          <p className="animate-item text-lg text-muted-foreground max-w-md leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        {/* Methods List */}
        <div className="space-y-16">
          {c.methods.map((method, index) => (
            <div key={method.title} className="animate-item">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Method Header */}
                <div className="flex items-start gap-4 lg:w-80 lg:flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-2">{method.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{method.description}</p>
                  </div>
                </div>

                {/* Features Carousel */}
                <div className="flex-1">
                  <Carousel
                    items={carouselItemsPerMethod[index]}
                    currentIndex={currentFeatures[index]}
                    onIndexChange={getIndexChangeHandler(index)}
                    showNavigation={method.features.length > 1}
                    showIndicators={method.features.length > 1}
                  />
                </div>
              </div>

              {/* Subtle Divider */}
              {index < c.methods.length - 1 && (
                <div className="mt-16 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </Animate>
    </section>
  );
}
