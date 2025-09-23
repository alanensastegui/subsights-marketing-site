"use client";

import { useCallback, useMemo, useState } from "react";
import { Animate } from "@/components/ui/animate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Carousel, { CarouselItem } from "@/components/ui/carousel";
import VideoPlayer from "@/components/ui/video-player";
import { Mail, Phone, BarChart3, Calendar, Sparkles, Settings } from "lucide-react";

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
  subtitle: "Configure triggers once—your AI handles capture, handoffs, and insights end‑to‑end.",
  methods: [
    {
      title: "Lead capture that writes itself",
      description: "Detect intent, ask the right questions, and auto‑summarize for clean handoffs.",
      icon: Mail,
      features: [
        { title: "Smart triggers", description: "Only capture when it matters—intent based.", icon: Sparkles, videoSrc: "/features/configuring-leads.mp4" },
        { title: "CRM‑ready", description: "Consistent fields your team expects.", icon: Settings, videoSrc: "/features/creating-embedding.mp4" },
      ]
    },
    {
      title: "Offer a live call when urgency spikes",
      description: "Route to a human instantly during business hours with fallback after hours.",
      icon: Phone,
      features: [
        { title: "Business hours", description: "Offer calls when your team is available.", icon: Settings, videoSrc: "/features/edit-header-collapsed-state.mp4" },
      ]
    },
    {
      title: "Automated reporting that closes the loop",
      description: "Email summaries include top questions, engagement, and time saved—linked to chat logs.",
      icon: BarChart3,
      features: [
        { title: "Actionable KPIs", description: "Track what matters and spot trends.", icon: Sparkles, videoSrc: "/features/updating-behavior.mp4" },
      ]
    },
    {
      title: "Suggest upcoming events in context",
      description: "Sync a calendar so your Teammate can recommend what’s happening next.",
      icon: Calendar,
      features: [
        { title: "Google Calendar", description: "24‑hour sync keeps details fresh.", icon: Settings, videoSrc: "/features/toggle-data-source.mp4" },
      ]
    }
  ]
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function HowItWorks() {
  const c = copy;
  const [currentFeatures, setCurrentFeatures] = useState<number[]>(c.methods.map(() => 0));

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
        <div className="mb-16">
          <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight mb-4">{c.title}</h2>
          <p className="animate-item text-lg text-muted-foreground max-w-md leading-relaxed">{c.subtitle}</p>
        </div>
        <div className="space-y-16">
          {c.methods.map((method, index) => (
            <div key={method.title} className="animate-item">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="flex items-start gap-4 lg:w-80 lg:flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-2">{method.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{method.description}</p>
                  </div>
                </div>
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


