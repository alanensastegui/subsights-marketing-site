'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { Animate } from "@/components/ui/animate";
import Image from "next/image";
import { cn } from "@/lib/cn";

// ============================================================================
// CONSTANTS
// ============================================================================

const ANIMATION_SPEED = 1; // px per frame

// ============================================================================
// TYPES & COPY
// ============================================================================

type Copy = {
  heading: string;
  logos: Array<{
    logoSrc: string;
    logoAlt: string;
    websiteUrl: string;
  }>;
};

const copy = {
  heading: "Trusted By",
  logos: [
    {
      logoSrc: "/images/client-logos/vsv.avif",
      logoAlt: "VSV company logo",
      websiteUrl: "https://visitsunvalley.com"
    },
    {
      logoSrc: "/images/client-logos/dylan's tours.avif",
      logoAlt: "Dylan's Tours company logo",
      websiteUrl: "https://www.dylanstours.com/"
    },
    {
      logoSrc: "/images/client-logos/intrust.avif",
      logoAlt: "Intrust company logo",
      websiteUrl: "https://intrustfunding.com/"
    },
    {
      logoSrc: "/images/client-logos/allied-health.svg",
      logoAlt: "Allied Health company logo",
      websiteUrl: "https://www.allalliedhealthschools.com/"
    },
  ],
} satisfies Copy;

// ============================================================================
// COMPONENT DEFINITIONS
// ============================================================================

const LogoItem = ({ logo, index }: { logo: Copy['logos'][0]; index: number }) => (
  <div
    key={`${logo.logoSrc}-${index}`}
    className="flex-shrink-0 text-center w-50"
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

export default function TrustedBy() {
  // ============================================================================
  // STATE
  // ============================================================================

  const [x, setX] = useState(0);
  const [loopWidth, setLoopWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const n = copy.logos.length;

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
        const currentSpeed = isHovered ? 0 : ANIMATION_SPEED;
        const next = prev - currentSpeed;
        return next <= -loopWidth ? 0 : next;
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loopWidth, isHovered]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <Animate name="fadeIn" trigger="onVisible">
      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {copy.heading}
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={carouselRef}
            className="flex items-center gap-8 md:gap-16 will-change-transform"
            style={{ transform: `translate3d(${x}px, 0, 0)`, transition: "none" }}
            aria-hidden={true}
          >
            {/* Double sequence for seamless loop */}
            {[...copy.logos, ...copy.logos].map((logo, i) => (
              <LogoItem key={`${logo.logoSrc}-${i}`} logo={logo} index={i} />
            ))}
          </div>

          {/* Edge gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background via-background/50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background via-background/50 to-transparent pointer-events-none" />
        </div>
      </section>
    </Animate>
  );
}

export const sectionId = "trusted-by";