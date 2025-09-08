"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface CarouselItem {
  id: string;
  content: React.ReactNode;
}

export interface CarouselProps {
  items: CarouselItem[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
  showNavigation?: boolean;
  showIndicators?: boolean;
  slideWidth?: string; // CSS class like "w-5/6"
  gap?: string; // CSS class like "px-2"
}

export default function Carousel({
  items,
  currentIndex,
  onIndexChange,
  className,
  showNavigation = true,
  showIndicators = true,
  slideWidth = "w-5/6",
  gap = "px-2",
}: CarouselProps) {
  // Refs and measurements for precise centering
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const firstSlideRef = useRef<HTMLDivElement | null>(null);
  const [measurements, setMeasurements] = useState<{
    wrapperWidth: number;
    slideWidth: number;
    stepWidth: number;
  } | null>(null);

  useEffect(() => {
    const measure = () => {
      const wrapper = wrapperRef.current;
      const firstSlide = firstSlideRef.current;
      if (!wrapper || !firstSlide) {
        setMeasurements(null);
        return;
      }
      const wrapperWidth = wrapper.getBoundingClientRect().width;
      const slideWidth = firstSlide.getBoundingClientRect().width;
      // Step equals slide width including padding since spacing is via padding
      const stepWidth = slideWidth;
      setMeasurements({ wrapperWidth, slideWidth, stepWidth });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  const nextItem = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    onIndexChange(nextIndex);
  };

  const prevItem = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onIndexChange(prevIndex);
  };

  const goToItem = (index: number) => {
    onIndexChange(index);
  };


  if (items.length === 0) return null;

  return (
    <div className={cn("relative", className)}>
      {/* Navigation Arrows */}
      {showNavigation && items.length > 1 && (
        <>
          <button
            onClick={prevItem}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 shadow-lg hover:bg-background hover:border-border hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 flex items-center justify-center group"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          <button
            onClick={nextItem}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 shadow-lg hover:bg-background hover:border-border hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 flex items-center justify-center group"
            aria-label="Next item"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </>
      )}

      {/* Carousel Container */}
      <div
        className="overflow-hidden"
        ref={wrapperRef}
      >
        <div
          className={cn(
            "flex transform-gpu will-change-transform motion-reduce:transition-none",
            measurements?.slideWidth ? "transition-transform duration-500 ease-in-out" : ""
          )}
          style={{
            transform: (() => {
              if (!measurements?.slideWidth) {
                // Initial positioning: center the first slide
                return `translate3d(8.33%, 0, 0)`;
              }
              const offset = (measurements.wrapperWidth - measurements.slideWidth) / 2 - currentIndex * measurements.stepWidth;
              return `translate3d(${offset}px, 0, 0)`;
            })(),
          }}
        >
          {items.map((item, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + items.length) % items.length;
            const isNext = index === (currentIndex + 1) % items.length;

            return (
              <div
                key={item.id}
                className={cn("flex-shrink-0", slideWidth, gap)}
                ref={(el) => {
                  if (index === 0) firstSlideRef.current = el;
                }}
              >
                <div className={cn(
                  "transition-all duration-500 ease-in-out motion-reduce:transition-none",
                  isActive
                    ? "scale-100 opacity-100"
                    : isPrev || isNext
                      ? "scale-95 opacity-40"
                      : "scale-90 opacity-20"
                )}>
                  {/* Render item content */}
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Item Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToItem(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300 ease-out",
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
