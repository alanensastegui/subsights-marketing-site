// Animate.tsx (Tailwind + CSS scroll-driven animations; no Framer Motion)
import { cn } from "@/lib/cn";
import * as React from "react";

export type AnimationName =
    | "fadeIn"
    | "fadeOut"
    | "slideUp"
    | "zoomIn"
    | "parallax"
    | "typewriter"
    | "scrollReveal"
    | "scaleIn"
    | "bounceIn"
    | "bounceOut";

// TODO: Triggers do not work since the class changed its
// internal implementation to pure css. Need to fix this.
export type Trigger = "onLoad" | "onVisible" | "onScroll";

interface AnimationProps {
    name: AnimationName;
    trigger?: Trigger;
    duration?: number;   // ms
    delay?: number;      // ms
    threshold?: number;  // 0..1 -> used to shape animation-range for onVisible
    rootMargin?: string; // maps to view-timeline-inset (e.g., "0 0 20% 0")
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    as?: keyof React.JSX.IntrinsicElements;
}

const CLASS_MAP: Record<AnimationName, string> = {
    fadeIn: "anim-fade-in",
    fadeOut: "anim-fade-out",
    slideUp: "anim-slide-up",
    zoomIn: "anim-zoom-in",
    parallax: "anim-parallax-y",
    typewriter: "anim-typewriter",
    scrollReveal: "anim-reveal-3d",
    scaleIn: "anim-scale-in",
    bounceIn: "anim-bounce-in",
    bounceOut: "anim-bounce-out",
};

const TRIGGER_MAP: Record<Trigger, string> = {
    onLoad: "",
    onVisible: "on-visible",
    onScroll: "on-scroll",
};

export function Animate({
    name,
    trigger = "onVisible",
    duration = 1700,
    delay = 0,
    threshold = 0.3,
    rootMargin,
    className,
    children,
    disabled = false,
    as = "div",
}: AnimationProps) {
    if (disabled) return <>{children}</>;

    const BaseTag = as as React.ElementType;

    const animClass = CLASS_MAP[name] ?? "";
    let triggerClass = TRIGGER_MAP[trigger] ?? "";

    // Parallax only makes sense with onScroll; coerce if needed
    if (name === "parallax") triggerClass = "on-scroll";

    // "Out" animations work best tied to exit of the view timeline
    const needsExitRange =
        (name === "fadeOut" || name === "bounceOut") && trigger !== "onLoad";
    const exitRangeClass = needsExitRange ? "[animation-range:exit_0%_exit_100%]" : "";

    // Per-instance style overrides
    const style: (React.CSSProperties & Record<string, string | number>) = {};

    if (delay) style.animationDelay = `${delay}ms`;

    if (name === "typewriter") {
        // typewriter keyframes use a CSS var for duration (keeps steps timing correct)
        style["--tw-typewriter"] = `${duration}ms`;
        // Optional: you can set steps via style["--tw-steps"] = 24;
    } else if (duration) {
        style.animationDuration = `${duration}ms`;
    }

    if (trigger === "onVisible") {
        const coverPct = Math.max(0, Math.min(100, Math.round(threshold * 100)));
        // Override default range from the .on-visible helper
        style.animationRange = `entry 0% cover ${coverPct}%`;
        if (rootMargin && rootMargin !== "0px") {
            // Interpreted as view-timeline-inset (top right bottom left)
            style.viewTimelineInset = rootMargin;
        }
    }

    const classes = cn(className, animClass, triggerClass, exitRangeClass)

    return (
        <BaseTag className={classes} style={style}>
            {children}
        </BaseTag>
    );
}
