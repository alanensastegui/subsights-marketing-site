// components/sections/strategic-ai-partner/StrategicAIPartner.client.tsx
'use client';

import { useState, useEffect, useCallback, useRef, memo } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/cn';

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
            md:transition-transform md:duration-600 md:ease-in-out
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
        'relative h-0.25 rounded-none overflow-hidden',
        isActive && isMobile ? 'bg-primary' : 'bg-white'
      )}
    >
      {isActive && !isMobile && (
        <Progress
          // Prevent noisy console warnings if hydration starts mid-animation
          suppressHydrationWarning
          value={progress}
          className="absolute inset-0 h-0.5 bg-transparent [&>div]:bg-primary rounded-none"
        />
      )}
    </div>

    {/* Entire Value Proposition Content - Clickable */}
    <button
      onClick={onClick}
      className={cn(
        'text-left w-full transition-colors duration-200 cursor-pointer p-4 rounded-lg hover:bg-white/5 text-foreground'
      )}
      type="button"
      aria-label={title}
      aria-expanded={isMobile ? isExpanded : undefined}
    >
      <h3
        className={cn(
          'text-xl font-semibold mb-3',
          isActive ? 'text-muted-foreground' : 'text-foreground'
        )}
      >
        {title}
      </h3>

      {/* Subtext - always visible on desktop, conditional on mobile */}
      {(isMobile ? isExpanded : true) && (
        <div className="overflow-hidden">
          <div>
            <p className="text-gray-300 text-base leading-relaxed">{subtext}</p>

            {/* Mobile: Show image inside each value prop when expanded */}
            {isMobile && showImage && imageSrc && imageAlt && (
              <div className="mt-6">
                <ChatScreenshot imageSrc={imageSrc} imageAlt={imageAlt} />
              </div>
            )}
          </div>
        </div>
      )}
    </button>
  </div>
);

export default function StrategicAIPartnerClient({ valuePropositions }: Props) {
  // ===== STATE =====
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // ===== REFS =====
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasSelectedRef = useRef(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ===== EFFECTS =====

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll to expanded value prop on mobile
  useEffect(() => {
    if (!isMobile || !hasSelectedRef.current) return;
    const el = sectionRef.current?.querySelector<HTMLElement>(
      `[data-value-prop="${expandedIndex}"]`
    );
    if (el) {
      const top = window.scrollY + el.getBoundingClientRect().top - 85;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [expandedIndex, isMobile]);

  // ===== HANDLERS =====
  const handleValuePropClick = useCallback(
    (index: number) => {
      if (isMobile) {
        hasSelectedRef.current = true;
        setExpandedIndex(index);
      } else {
        setActiveIndex(index);
        setProgress(0);
      }
    },
    [isMobile]
  );

  const createClickHandler = useCallback(
    (index: number) => () => handleValuePropClick(index),
    [handleValuePropClick]
  );

  // ===== RENDER HELPERS =====
  const renderValueProposition = useCallback(
    (prop: ValueProp, index: number) => (
      <ValueProposition
        key={index}
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
            <ChatScreenshot
              imageSrc={valuePropositions[activeIndex].imageSrc}
              imageAlt={valuePropositions[activeIndex].imageAlt}
            />
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
