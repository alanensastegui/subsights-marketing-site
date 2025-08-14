'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import { Animate } from "@/components/ui/animate";
import { cn } from "@/lib/cn";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

// ============================================================================
// TYPES & COPY
// ============================================================================

type Copy = {
  heading: {
    line1: string;
    line2: string;
  };
  description: string;
  valuePropositions: Array<{
    title: string;
    subtext: string;
    chatEmoji: string;
    imageSrc: string;
    imageAlt: string;
  }>;
};

const copy = {
  heading: {
    line1: "Go Beyond Basic Bots",
    line2: "Get a Strategic AI Partner",
  },
  description: "Engineered to execute your business goals with precision",
  valuePropositions: [
    {
      title: "Filter & Qualify Every Lead",
      subtext: "Our AI filters for intent, budget, and custom rules, so your sales team only engages with prospects ready to convert.",
      chatEmoji: "🔍",
      imageSrc: "/images/value-props/filter_lead_example.png",
      imageAlt: "AI lead filtering and qualification interface showing intent detection and budget analysis",
    },
    {
      title: "Provide Expert, Nuanced Answers",
      subtext: "Go beyond FAQs. Our AI handles complex, multi-step questions with the nuance of a human expert, building customer trust around the clock.",
      chatEmoji: "💬",
      imageSrc: "/images/value-props/expert_example.png",
      imageAlt: "AI expert conversation interface showing detailed, nuanced responses to complex questions",
    },
    {
      title: "Drive Revenue & Strategic Goals",
      subtext: "Our AI intelligently upsells services, applies strategic discounts, and guides every user toward your most important business goals.",
      chatEmoji: "💰",
      imageSrc: "/images/value-props/revenue_example.png",
      imageAlt: "AI revenue optimization interface showing upsell opportunities and strategic discount applications",
    },
  ],
} satisfies Copy;

// ============================================================================
// COMPONENT DEFINITIONS
// ============================================================================

const ChatScreenshot = ({ imageSrc, imageAlt }: { imageSrc: string; imageAlt: string }) => (
  <div className="w-full h-full overflow-hidden shadow-sm">
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={400}
      height={300}
      className="w-full h-full object-cover rounded-3xl"
    />
  </div>
);

type ValuePropositionProps = {
  title: string;
  subtext: string;
  isActive: boolean;
  isExpanded: boolean;
  onClick: () => void;
  showImage?: boolean;
  progress: number;
  isMobile: boolean;
  imageSrc?: string;
  imageAlt?: string;
  index: number;
};

const ValueProposition = ({
  title,
  subtext,
  isActive,
  isExpanded,
  onClick,
  showImage = false,
  progress,
  isMobile,
  imageSrc,
  imageAlt,
  index
}: ValuePropositionProps) => (
  <div className="space-y-4" data-value-prop={index}>
    {/* Divider with progress bar */}
    <div className={cn(
      "relative h-1 rounded-full overflow-hidden",
      isActive && isMobile ? "bg-blue-500" : "bg-white"
    )}>
      {isActive && !isMobile && (
        <Progress
          value={progress}
          className="absolute inset-0 h-full bg-transparent [&>div]:bg-blue-500"
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
        <Animate
          name="slideUp"
          trigger="onLoad"
          duration={800}
          className="overflow-hidden"
          key={isExpanded ? 'expanded' : 'collapsed'}
        >
          <div>
            <p className="text-gray-300 text-base leading-relaxed">
              {subtext}
            </p>

            {/* Mobile: Show image inside each value prop when expanded */}
            {isMobile && showImage && imageSrc && imageAlt && (
              <div className="mt-6">
                <ChatScreenshot
                  imageSrc={imageSrc}
                  imageAlt={imageAlt}
                />
              </div>
            )}
          </div>
        </Animate>
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
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const [isAutoExpanded, setIsAutoExpanded] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

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
    if (isMobile || !isSectionVisible) return;

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
  }, [isMobile, isSectionVisible]);

  // Intersection Observer for section visibility
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);

          // Mobile-specific animation
          if (isMobile && !hasAnimatedIn) {
            setHasAnimatedIn(true);
            setExpandedIndex(0); // Auto-expand first value prop
            setIsAutoExpanded(true); // Mark as auto-expanded
          }
        } else {
          setIsSectionVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isMobile, hasAnimatedIn]);

  // Handle scrolling to expanded value prop on mobile
  useEffect(() => {
    if (!isMobile || expandedIndex < 0) return;

    // Only scroll when user intentionally expands (not on auto-expand)
    if (!isAutoExpanded) {
      const valuePropElements = document.querySelectorAll('[data-value-prop]');
      if (valuePropElements[expandedIndex]) {
        const element = valuePropElements[expandedIndex] as HTMLElement;
        const elementTop = element.offsetTop;
        const scrollTop = elementTop - 85

        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }
  }, [expandedIndex, isMobile, isAutoExpanded]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleValuePropClick = useCallback((index: number) => {
    if (isMobile) {
      const newExpandedIndex = expandedIndex === index ? 0 : index;
      setExpandedIndex(newExpandedIndex);
      // Reset auto-expand flag when user manually interacts
      if (newExpandedIndex !== 0) {
        setIsAutoExpanded(false);
      }
    } else {
      setActiveIndex(index);
      setProgress(0);
    }
  }, [isMobile, expandedIndex]);

  const createClickHandler = useCallback((index: number) => {
    return () => handleValuePropClick(index);
  }, [handleValuePropClick]);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderValueProposition = useCallback((prop: Copy['valuePropositions'][0], index: number) => (
    <Animate
      key={index}
      name="fadeIn"
      trigger="onVisible"
      duration={600}
    >
      <ValueProposition
        title={prop.title}
        subtext={prop.subtext}
        isActive={isMobile ? index === expandedIndex : index === activeIndex}
        isExpanded={index === expandedIndex}
        onClick={createClickHandler(index)}
        showImage={isMobile}
        progress={progress}
        isMobile={isMobile}
        imageSrc={prop.imageSrc}
        imageAlt={prop.imageAlt}
        index={index}
      />
    </Animate>
  ), [activeIndex, expandedIndex, createClickHandler, progress, isMobile]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <Animate name="fadeIn" trigger="onVisible" duration={600}>
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {copy.heading.line1}
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
              {copy.heading.line2}
            </h2>
          </div>
        </Animate>

        <Animate name="fadeIn" trigger="onVisible" duration={600}>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {copy.description}
          </p>
        </Animate>
      </div>

      {/* Desktop Layout */}
      {!isMobile && (
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-6 items-stretch">
          {/* Left: Chat Screenshot */}
          <div className="sticky top-8 h-full max-w-sm">
            <Animate
              name="zoomIn"
              key={activeIndex}
              duration={150}
              trigger="onLoad"
              className="rounded-3xl shadow-2xl shadow-white/60 hover:shadow-2xl hover:shadow-white/70 transition-all duration-300 hover:scale-[1.02]"
            >
              <ChatScreenshot
                imageSrc={copy.valuePropositions[activeIndex].imageSrc}
                imageAlt={copy.valuePropositions[activeIndex].imageAlt}
              />
            </Animate>
          </div>

          {/* Right: Value Propositions */}
          <div className="space-y-8">
            {copy.valuePropositions.map(renderValueProposition)}
          </div>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <div className="space-y-8">
          <div className="space-y-8">
            {copy.valuePropositions.map(renderValueProposition)}
          </div>
        </div>
      )}
    </section>
  );
}

export const sectionId = "strategic-ai-partner";
