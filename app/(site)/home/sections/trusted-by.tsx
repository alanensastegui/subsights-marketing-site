'use client';

import { useEffect, useRef, useState } from "react";
import { Animate } from "@/components/ui/animate";

type Copy = {
  heading: string;
  logos: Array<{
    name: string;
    emoji: string;
  }>;
};

const copy = {
  heading: "Trusted By",
  logos: [
    { name: "TechCorp", emoji: "🔧" },
    { name: "InnovateLab", emoji: "🚀" },
    { name: "GlobalSoft", emoji: "🌍" },
    { name: "FutureTech", emoji: "⚡" },
  ],
} satisfies Copy;

export default function TrustedBy() {
  const [x, setX] = useState(0);
  const [loopWidth, setLoopWidth] = useState(0); // measured seam distance
  const carouselRef = useRef<HTMLDivElement>(null);
  const n = copy.logos.length;

  // Measure the exact seam: distance from first item in set A to first item in set B.
  const measure = () => {
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
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  // Animation loop
  useEffect(() => {
    if (!loopWidth) return;

    if (typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const speed = 1; // px per frame
    let raf = 0;

    const tick = () => {
      setX((prev) => {
        const next = prev - speed;
        return next <= -loopWidth ? 0 : next;
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loopWidth]);

  return (
    <Animate name="fadeIn" trigger="onVisible">
      <section className="max-w-6xl mx-auto px-6 py-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {copy.heading}
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex items-center gap-16 will-change-transform"
            style={{ transform: `translate3d(${x}px, 0, 0)`, transition: "none" }}
            aria-hidden={true}
          >
            {/* Double sequence for seamless loop */}
            {[...copy.logos, ...copy.logos].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex-shrink-0 text-center"
                style={{ width: 200 }} // keep the old look (but logic is width-agnostic)
              >
                <div className="w-32 h-32 mx-auto bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                  <span className="text-4xl">{logo.emoji}</span>
                </div>
                <p className="text-sm text-gray-400 mt-3 font-medium">
                  {logo.name}
                </p>
              </div>
            ))}
          </div>

          {/* Edge gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0E086A] via-[#0E086A]/50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0E086A] via-[#0E086A]/50 to-transparent pointer-events-none" />
        </div>
      </section>
    </Animate>
  );
}

export const sectionId = "trusted-by";