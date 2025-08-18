// components/sections/strategic-ai-partner/StrategicAIPartner.client.tsx
"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Animate } from "@/components/ui/animate";
import { cn } from "@/lib/cn";

type ValueProp = {
  title: string;
  subtext: string;
  chatEmoji: string;
  imageSrc: string;
  imageAlt: string;
};

type Props = {
  valuePropositions: ValueProp[];
};

const ChatScreenshot = memo(function ChatScreenshot({
  imageSrc,
  imageAlt,
}: {
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <div className="w-full h-full shadow-sm">
      {/* 3D stage (perspective lives on the parent) */}
      <div className="relative w-full h-full [perspective:1600px]">
        <div
          className="
            relative z-[1] isolate overflow-hidden rounded-3xl shadow-2xl shadow-white/60 
            ring-1 ring-black/5 dark:ring-white/5 origin-top will-change-[transform]
            md:tilt-3d md:translate-y-[-5%] md:hover:rotate-y-[0deg] md:hover:rotate-x-[0deg] md:hover:rotate-z-[0deg] md:hover:translate-y-[-5%] md:hover:scale-[1]
            md:transform-style-3d md:transition-transform md:duration-600 md:ease-in-out
            hover:shadow-2xl hover:shadow-white/70
          "
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={400}
            height={300}
            className="w-full h-full object-cover backface-hidden"
            priority
          />
        </div>
      </div>
    </div>
  );
});

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
  index,
}: ValuePropositionProps) => (
  <div className="space-y-4" data-value-prop={index}>
    {/* Divider with progress bar */}
    <div
      className={cn(
        "relative h-1 rounded-full overflow-hidden",
        isActive && isMobile ? "bg-blue-500" : "bg-white"
      )}
    >
      {isActive && !isMobile && (
        <Progress
          // Prevent noisy console warnings if hydration starts mid-animation
          suppressHydrationWarning
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
      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      {/* Subtext - always visible on desktop, conditional on mobile */}
      {(isMobile ? isExpanded : true) && (
        <Animate
          name="slideUp"
          trigger="onLoad"
          duration={800}
          className="overflow-hidden"
          key={isExpanded ? "expanded" : "collapsed"}
        >
          <div>
            <p className="text-gray-300 text-base leading-relaxed">{subtext}</p>

            {/* Mobile: Show image inside each value prop when expanded */}
            {isMobile && showImage && imageSrc && imageAlt && (
              <div className="mt-6">
                <ChatScreenshot imageSrc={imageSrc} imageAlt={imageAlt} />
              </div>
            )}
          </div>
        </Animate>
      )}
    </button>
  </div>
);

export default function StrategicAIPartnerClient({ valuePropositions }: Props) {
  // ===== STATE =====
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const [isAutoExpanded, setIsAutoExpanded] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // ===== REFS =====
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ===== EFFECTS =====

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-play functionality for desktop (when section visible)
  useEffect(() => {
    if (isMobile || !isSectionVisible) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % valuePropositions.length);
        setProgress(0);
      }, 20000);
    };

    const startProgress = () => {
      progressRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.1));
      }, 20);
    };

    startAutoPlay();
    startProgress();

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isMobile, isSectionVisible, valuePropositions.length]);

  // Intersection Observer for section visibility
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
          if (isMobile && !hasAnimatedIn) {
            setHasAnimatedIn(true);
            setExpandedIndex(0);
            setIsAutoExpanded(true);
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

  // Scroll to expanded value prop on mobile
  useEffect(() => {
    if (!isMobile || expandedIndex < 0) return;
    if (!isAutoExpanded) {
      const valuePropElements = document.querySelectorAll("[data-value-prop]");
      const el = valuePropElements[expandedIndex] as HTMLElement | undefined;
      if (el) {
        const elementTop = el.offsetTop;
        const scrollTop = elementTop - 85;
        window.scrollTo({ top: scrollTop, behavior: "smooth" });
      }
    }
  }, [expandedIndex, isMobile, isAutoExpanded]);

  // ===== HANDLERS =====
  const handleValuePropClick = useCallback(
    (index: number) => {
      if (isMobile) {
        const next = expandedIndex === index ? 0 : index;
        setExpandedIndex(next);
        if (next !== 0) setIsAutoExpanded(false);
      } else {
        setActiveIndex(index);
        setProgress(0);
      }
    },
    [isMobile, expandedIndex]
  );

  const createClickHandler = useCallback(
    (index: number) => () => handleValuePropClick(index),
    [handleValuePropClick]
  );

  // ===== RENDER HELPERS =====
  const renderValueProposition = useCallback(
    (prop: ValueProp, index: number) => (
      <Animate key={index} name="fadeIn" trigger="onVisible" duration={600}>
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
    ),
    [activeIndex, expandedIndex, createClickHandler, progress, isMobile]
  );

  // ===== RENDER =====
  return (
    <div ref={sectionRef}>
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
            >
              <ChatScreenshot
                imageSrc={valuePropositions[activeIndex].imageSrc}
                imageAlt={valuePropositions[activeIndex].imageAlt}
              />
            </Animate>
          </div>

          {/* Right: Value Propositions */}
          <div className="space-y-8">
            {valuePropositions.map(renderValueProposition)}
          </div>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <div className="space-y-8">
          <div className="space-y-8">
            {valuePropositions.map(renderValueProposition)}
          </div>
        </div>
      )}
    </div>
  );
}