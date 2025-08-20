"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/cn";

interface ScrollToTopProps {
  className?: string;
}

export function ScrollToTop({ className }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user has scrolled past the main content area
      // This typically means they've engaged with the page content
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show when user has scrolled past 1.5x viewport height or 600px, whichever is greater
      const showThreshold = Math.max(600, windowHeight * 1.5);

      if (scrollY > showThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      className={cn(
        "fixed right-6 top-12 z-40 h-12 w-12 rounded-full shadow-lg transition-all duration-300 ease-in-out",
        "backdrop-blur-lg border-border/50 hover:card",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "shadow-[0_0_30px_color-mix(in_srgb,var(--ring)_35%,_transparent)] hover:shadow-[0_0_40px_color-mix(in_srgb,var(--ring)_70%,_transparent)]",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
        className
      )}
      aria-label="Scroll to top of page"
      title="Scroll to top"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
}
