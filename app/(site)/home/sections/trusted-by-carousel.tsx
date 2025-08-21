'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

// ============================================================================
// CONSTANTS
// ============================================================================

const ANIMATION_SPEED = 1; // px per frame
const HOVER_SPEED = 0.1; // px per frame when hovered
const SPEED_TRANSITION_RATE = 0.05; // How fast speed changes (0-1)

// ============================================================================
// TYPES
// ============================================================================

type Logo = {
  logoSrc: string;
  logoAlt: string;
  websiteUrl: string;
};

interface TrustedByCarouselProps {
  logos: Logo[];
}

interface LogoItemProps {
  logo: Logo;
  index: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// ============================================================================
// COMPONENT DEFINITIONS
// ============================================================================

const LogoItem = ({ logo, index, onMouseEnter, onMouseLeave }: LogoItemProps) => (
  <div
    key={`${logo.logoSrc}-${index}`}
    className="flex-shrink-0 text-center w-50"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="h-32 mx-auto flex items-center justify-center">
      <a
        href={logo.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
        aria-label={`Visit ${logo.logoAlt.replace(' company logo', '')} website`}
      >
        <Image
          src={logo.logoSrc}
          alt={logo.logoAlt}
          width={80}
          height={80}
          className={cn(
            "object-contain h-full w-auto",
            logo.logoSrc.includes("allied-health") && "grayscale brightness-150 filter"
          )}
        />
      </a>
    </div>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function TrustedByCarousel({ logos }: TrustedByCarouselProps) {
  // ============================================================================
  // STATE
  // ============================================================================

  const [x, setX] = useState(0);
  const [loopWidth, setLoopWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(ANIMATION_SPEED);
  const carouselRef = useRef<HTMLDivElement>(null);
  const n = logos.length;

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleLogoMouseEnter = () => {
    setIsHovered(true);
  };

  const handleLogoMouseLeave = () => {
    setIsHovered(false);
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Measure the exact seam: distance from first item in set A to first item in set B.
  const measure = useCallback(() => {
    const el = carouselRef.current;
    if (!el || el.children.length < n + 1) return;

    const prevTransform = el.style.transform;
    el.style.transform = "translateX(0px)"; // neutralize transform for geometry

    const first = el.children[0] as HTMLElement;
    const firstOfSecondSet = el.children[n] as HTMLElement;

    const seam = firstOfSecondSet.offsetLeft - first.offsetLeft;

    el.style.transform = prevTransform;

    if (seam > 0) {
      setLoopWidth(seam);
      // Keep current scroll consistent with the new seam measurement
      setX((prev) => -(((-prev) % seam)));
    }
  }, [n]);

  useEffect(() => {
    measure();

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    const el = carouselRef.current;
    const ro = new ResizeObserver(() => measure());
    if (el) {
      ro.observe(el);
      Array.from(el.children).forEach((child) => ro.observe(child as Element));
    }

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [measure]);

  // Speed transition effect
  useEffect(() => {
    const targetSpeed = isHovered ? HOVER_SPEED : ANIMATION_SPEED;

    let raf = 0;

    const updateSpeed = () => {
      setCurrentSpeed((prevSpeed) => {
        const diff = targetSpeed - prevSpeed;

        // If we're close enough to target, snap to it
        if (Math.abs(diff) < 0.01) {
          return targetSpeed;
        }

        // Otherwise, move towards target speed
        return prevSpeed + diff * SPEED_TRANSITION_RATE;
      });

      raf = requestAnimationFrame(updateSpeed);
    };

    raf = requestAnimationFrame(updateSpeed);

    return () => cancelAnimationFrame(raf);
  }, [isHovered]);

  // Animation loop
  useEffect(() => {
    if (!loopWidth) return;

    if (typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let raf = 0;

    const tick = () => {
      setX((prev) => {
        const next = prev - currentSpeed;
        return next <= -loopWidth ? 0 : next;
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loopWidth, currentSpeed]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="relative overflow-hidden">
      <div
        ref={carouselRef}
        className="flex items-center gap-8 md:gap-16 will-change-transform"
        style={{ transform: `translate3d(${x}px, 0, 0)`, transition: "none" }}
        aria-hidden={true}
      >
        {/* Double sequence for seamless loop */}
        {[...logos, ...logos].map((logo, i) => (
          <LogoItem
            key={`${logo.logoSrc}-${i}`}
            logo={logo}
            index={i}
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
          />
        ))}
      </div>

      {/* Edge gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background via-background/50 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background via-background/50 to-transparent pointer-events-none" />
    </div>
  );
}
