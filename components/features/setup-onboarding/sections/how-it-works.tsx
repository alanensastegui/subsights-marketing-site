"use client";

import { useState, useEffect } from "react";
import { Animate } from "@/components/ui/animate";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import VideoPlayer from "@/components/ui/video-player";

type Step = {
  number: string;
  title: string;
  description: string;
  videoSrc: string;
};

type Copy = {
  title: string;
  subtitle: string;
  steps: Step[];
};

export const sectionId = "how-it-works";

// ---- SECTION COPY REGION ----
const copy = {
  title: "How it works",
  subtitle: "Sign up today. Go live in four steps",
  steps: [
    {
      number: "01",
      title: "Build the brain",
      description: "Upload files, connect your sitemap, or paste text. You control what your AI teammate knows, so answers stay accurate and up to date.",
      videoSrc: "/features/add-sitemap.mp4"
    },
    {
      number: "02",
      title: "Set the voice",
      description: "Use natural language to set tone, behavior, and guardrails; match colors, logos, and icons so it feels unmistakingly yours.",
      videoSrc: "/features/editing-behavior.mp4"
    },
    {
      number: "03",
      title: "Wire your workflow",
      description: "Send handoffs and alerts to your teams and get daily summaries to keep everyone aligned.",
      videoSrc: "/features/configuring-reports.mp4"
    },
    {
      number: "04",
      title: "Embed once",
      description: "Paste a single script into your site and hit publish. Your AI teammate is live.",
      videoSrc: "/features/creating-embedding.mp4"
    }
  ]
} satisfies Copy;
// ---- /SECTION COPY REGION ----

// Helper function to get step classes based on selection state
const getStepClasses = (isSelected: boolean) => ({
  container: `cursor-pointer transition-all duration-500 ease-in-out will-change-transform ${isSelected
    ? 'opacity-100 scale-100'
    : 'opacity-50 hover:opacity-75 hover:scale-[1.02]'
    }`,
  card: `transition-all duration-500 ease-in-out will-change-transform ${isSelected
    ? 'bg-card text-card-foreground border shadow-lg backdrop-blur-sm p-6'
    : 'bg-transparent border border-transparent shadow-none p-0'
    }`,
  cardHeader: `transition-all duration-500 ease-in-out ${isSelected
    ? 'px-0 py-0'
    : 'px-0 py-0'
    }`,
  stepNumber: `inline-flex items-center justify-center w-12 h-12 rounded-full border flex-shrink-0 transition-all duration-500 ease-in-out will-change-transform ${isSelected
    ? 'bg-gradient-to-br from-primary/20 to-primary/30 border-primary/50 shadow-md'
    : 'bg-muted/30 border-muted/50'
    }`,
  stepNumberText: `text-lg font-bold transition-colors duration-500 ease-in-out ${isSelected
    ? 'text-foreground'
    : 'text-muted-foreground'
    }`,
  title: `text-2xl font-semibold tracking-tight mb-3 transition-colors duration-500 ease-in-out ${isSelected
    ? 'text-foreground'
    : 'text-muted-foreground'
    }`,
  description: `text-base leading-relaxed transition-all duration-500 ease-in-out will-change-transform ${isSelected
    ? 'text-muted-foreground opacity-100 max-h-96 transform translate-y-0'
    : 'text-muted-foreground/70 opacity-0 max-h-0 overflow-hidden transform -translate-y-2'
    }`
});

export default function HowItWorks() {
  const c = copy;
  const [selectedStep, setSelectedStep] = useState(0);
  const handleVideoEnded = () => {
    setSelectedStep(prev => (prev + 1) % c.steps.length);
  };

  // Intersection Observer for mobile video auto-play
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('video') as HTMLVideoElement;

          if (entry.isIntersecting && video) {
            // Video comes into view - try to play
            video.play().catch(() => {
              // If auto-play fails (mobile restriction), silently fail
              console.log('Auto-play blocked on mobile');
            });
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 100% of the element is visible
        rootMargin: '0px 0px -10% 0px' // Start playing when entire card is in view
      }
    );

    // Observe all video containers
    const videoContainers = document.querySelectorAll('[data-video-index]');
    videoContainers.forEach(container => observer.observe(container));

    return () => {
      videoContainers.forEach(container => observer.unobserve(container));
    };
  }, []);

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

        {/* Mobile Steps - All Expanded Layout */}
        <div className="lg:hidden space-y-8">
          {c.steps.map((step, index) => (
            <div key={step.number} className="animate-item">
              <div
                className="group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-xl shadow-primary/5 backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-primary/10 hover:scale-102 will-change-transform"
                data-video-index={index}
              >
                {/* Video Preview */}
                <div className="px-6 pt-6">
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/20 shadow-2xl bg-background/20 backdrop-blur-2xl group/video">
                    <VideoPlayer
                      src={step.videoSrc}
                      className="w-full h-auto"
                      autoPlay={false}
                      muted
                      loop={false}
                      playsInline
                    />
                  </div>
                </div>

                {/* Step Content */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full border flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/30 border-primary/50 shadow-md">
                        <span className="text-lg font-bold text-foreground">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold tracking-tight mb-3 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Steps Column */}
          <div className="lg:col-span-2 space-y-8">
            {c.steps.map((step, index) => {
              const isSelected = selectedStep === index;
              const classes = getStepClasses(isSelected);

              return (
                <div key={step.number} className="animate-item">
                  <div
                    className={classes.container}
                    onClick={() => setSelectedStep(index)}
                  >
                    <Card className={classes.card}>
                      <CardHeader className={classes.cardHeader}>
                        <div className="flex items-start gap-4">
                          {/* Step Number */}
                          <div className={classes.stepNumber}>
                            <span className={classes.stepNumberText}>
                              {step.number}
                            </span>
                          </div>
                          <div className="flex-1">
                            <CardTitle className={classes.title}>
                              {step.title}
                            </CardTitle>
                            <CardDescription className={classes.description}>
                              {step.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Video Column */}
          <div className="lg:col-span-3 lg:sticky lg:top-8 lg:h-fit">
            <div
              key={selectedStep}
              className="relative aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/20 shadow-2xl bg-background/20 backdrop-blur-2xl transition-all duration-500 ease-in-out animate-in fade-in-0 slide-in-from-right-4 will-change-transform"
            >
              {/* Skeleton placeholder */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-muted-foreground animate-pulse rounded-2xl" />

              {selectedStep !== null && (
                <VideoPlayer
                  src={c.steps[selectedStep].videoSrc}
                  className="w-full h-auto relative z-10"
                  autoPlay
                  muted
                  loop={false}
                  playsInline
                  onEnded={handleVideoEnded}
                />
              )}
            </div>
          </div>
        </div>
      </Animate>
    </section>
  );
}
