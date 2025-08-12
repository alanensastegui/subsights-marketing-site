'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import { Animate } from "@/components/ui/animate";
import { cn } from "@/lib/cn";

// ============================================================================
// TYPES & COPY
// ============================================================================

type Copy = {
  icon: {
    placeholder: string;
  };
  heading: {
    line1: string;
    line2: string;
  };
  description: string;
  valuePropositions: Array<{
    title: string;
    subtext: string;
    chatEmoji: string;
  }>;
};

const copy = {
  icon: {
    placeholder: "🎯",
  },
  heading: {
    line1: "Go Beyond Basic Bots.",
    line2: "Get a Strategic AI Partner.",
  },
  description: "Your Subsights assistant is engineered to execute your specific business goals with precision. We deliver results by focusing on three core areas:",
  valuePropositions: [
    {
      title: "Filter & Qualify Every Lead",
      subtext: "Our AI filters for intent, budget, and custom rules, so your sales team only engages with prospects ready to convert.",
      chatEmoji: "🔍",
    },
    {
      title: "Provide Expert, Nuanced Answers",
      subtext: "Go beyond FAQs. Our AI handles complex, multi-step questions with the nuance of a human expert, building customer trust around the clock.",
      chatEmoji: "💬",
    },
    {
      title: "Drive Revenue & Strategic Goals",
      subtext: "Our AI intelligently upsells services, applies strategic discounts, and guides every user toward your most important business goals.",
      chatEmoji: "💰",
    },
  ],
} satisfies Copy;

// ============================================================================
// COMPONENT DEFINITIONS
// ============================================================================

const ChatScreenshot = ({ emoji }: { emoji: string }) => (
  <div className="w-full h-64 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="text-6xl">{emoji}</div>
      <div className="text-sm text-gray-500">Chat Screenshot</div>
    </div>
  </div>
);

const ValueProposition = ({
  title,
  subtext,
  isActive,
  isExpanded,
  onClick,
  showImage = false,
  emoji = "",
  progress,
  isMobile
}: {
  title: string;
  subtext: string;
  isActive: boolean;
  isExpanded: boolean;
  onClick: () => void;
  showImage?: boolean;
  emoji?: string;
  progress: number;
  isMobile: boolean;
}) => (
  <div className="space-y-4">
    {/* Divider with loading bar */}
    <div className="relative h-1 bg-white rounded-full overflow-hidden">
      {isActive && !isMobile && (
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      )}
    </div>

    {/* Entire Value Proposition Content - Clickable */}
    <button
      onClick={onClick}
      className={cn(
        "text-left w-full transition-colors duration-200 cursor-pointer p-4 rounded-lg hover:bg-white/5",
        isActive ? "text-blue-500" : "text-white"
      )}
      type="button"
    >
      {/* Title */}
      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      {/* Subtext - always visible on desktop, conditional on mobile */}
      {(isMobile ? isExpanded : true) && (
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isMobile ? "overflow-hidden" : ""
        )}>
          <p className="text-gray-300 text-base leading-relaxed">
            {subtext}
          </p>

          {/* Mobile: Show image inside each value prop when expanded */}
          {isMobile && showImage && isExpanded && (
            <div className="mt-6">
              <ChatScreenshot emoji={emoji} />
            </div>
          )}
        </div>
      )}
    </button>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function StrategicAIPartner() {
  // ============================================================================
  // STATE
  // ============================================================================

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  // ============================================================================
  // REFS
  // ============================================================================

  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>(null);
  const progressRef = useRef<ReturnType<typeof setInterval>>(null);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play functionality for desktop
  useEffect(() => {
    if (isMobile || !isAutoPlaying) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % copy.valuePropositions.length);
        setProgress(0);
      }, 20000);
    };

    const startProgress = () => {
      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 0.1;
        });
      }, 20);
    };

    startAutoPlay();
    startProgress();

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isMobile, isAutoPlaying]);

  // Intersection Observer for mobile animation
  useEffect(() => {
    if (!isMobile || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedIn) {
          setHasAnimatedIn(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isMobile, hasAnimatedIn]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleValuePropClick = useCallback((index: number) => {
    console.log('Value prop clicked:', index, 'isMobile:', isMobile); // Debug log
    if (isMobile) {
      setExpandedIndex(expandedIndex === index ? 0 : index);
    } else {
      console.log('Setting active index to:', index); // Debug log
      setActiveIndex(index);
      setProgress(0);
      setIsAutoPlaying(false);

      // Resume auto-play after 5 seconds of inactivity
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
  }, [isMobile, expandedIndex]);

  // Create stable click handlers for each value proposition
  const createClickHandler = useCallback((index: number) => {
    return () => handleValuePropClick(index);
  }, [handleValuePropClick]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <Animate name="fadeIn" trigger="onVisible">
      <section ref={sectionRef} className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-3xl">{copy.icon.placeholder}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {copy.heading.line1}
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
              {copy.heading.line2}
            </h2>
          </div>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-6 leading-relaxed">
            {copy.description}
          </p>
        </div>

        {/* Desktop Layout */}
        {!isMobile && (
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Chat Screenshot */}
            <div className="sticky top-8">
              <ChatScreenshot emoji={copy.valuePropositions[activeIndex].chatEmoji} />
            </div>

            {/* Right: Value Propositions */}
            <div className="space-y-8">
              {copy.valuePropositions.map((prop, index) => (
                <ValueProposition
                  key={index}
                  title={prop.title}
                  subtext={prop.subtext}
                  isActive={index === activeIndex}
                  isExpanded={true}
                  onClick={createClickHandler(index)}
                  progress={progress}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <div className="space-y-8">
            {/* Value Propositions with embedded images */}
            <div className="space-y-6">
              {copy.valuePropositions.map((prop, index) => (
                <ValueProposition
                  key={index}
                  title={prop.title}
                  subtext={prop.subtext}
                  isActive={index === expandedIndex}
                  isExpanded={index === expandedIndex}
                  onClick={createClickHandler(index)}
                  showImage={true}
                  emoji={prop.chatEmoji}
                  progress={progress}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </Animate>
  );
}

export const sectionId = "strategic-ai-partner";
