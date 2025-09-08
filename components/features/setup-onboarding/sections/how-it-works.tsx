"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/ui/animate";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import VideoPlayer from "@/components/ui/video-player";
import type { FeatureName } from "@/lib/features/types";

type Step = {
  number: string;
  title: string;
  description: string;
  videoSrc: string;
  featureSlug?: FeatureName;
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
      description: "Power your AI Teammate with the knowledge it needs. Upload files, link your sitemap, or add text to build a knowledge base you can trust.",
      videoSrc: "/features/add-sitemap.mp4",
      featureSlug: "knowledge-base"
    },
    {
      number: "02",
      title: "Set the voice",
      description: "Make your AI Teammate unmistakeably yours. Define its behavior in plain English and customize every detail to match your brand.",
      videoSrc: "/features/editing-behavior.mp4",
      featureSlug: "brand-voice"
    },
    {
      number: "03",
      title: "Wire your workflow",
      description: "Turn conversations into action. Trigger emails, updates, and summaries right when your team needs them.",
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

        {/* Mobile Steps - All Expanded Layout */}
        <div className="lg:hidden space-y-8">
          {c.steps.map((step) => (
            <div key={step.number} className="animate-item">
              <div
                className="group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-xl shadow-primary/5 backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-primary/10 hover:scale-102 will-change-transform transform-gpu"
              >
                {/* Video Preview */}
                <div className="px-6 pt-6">
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/20 shadow-2xl bg-background/20 backdrop-blur-2xl group/video">
                    <VideoPlayer
                      src={step.videoSrc}
                      className="w-full h-auto"
                      autoPlay
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
                            {isSelected && step.featureSlug && (
                              <div className="mt-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-200">
                                <Link
                                  href={`/features/${step.featureSlug}`}
                                  className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-all duration-300 ease-out"
                                >
                                  <span className="relative">
                                    Learn more about {step.title.toLowerCase()}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300 ease-out"></span>
                                  </span>
                                  <svg
                                    className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </Link>
                              </div>
                            )}
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
              className="relative aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/20 shadow-2xl bg-background/20 backdrop-blur-2xl transition-all duration-500 ease-in-out animate-in fade-in-0 slide-in-from-right-4 will-change-transform transform-gpu"
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
