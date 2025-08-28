"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type StatCounterProps = {
  target: number;
  from?: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  suffixOnCompleteOnly?: boolean;
  label?: string;
  className?: string;
  format?: Intl.NumberFormatOptions;
  locale?: string;
  onComplete?: () => void;
};

export function StatCounter({
  target,
  from = 0,
  durationMs = 1500,
  prefix,
  suffix,
  suffixOnCompleteOnly,
  label,
  className,
  format,
  locale,
  onComplete,
}: StatCounterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLSpanElement | null>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(from === target);

  // --- STABLE REFS (avoid re-running effect) ---
  const startedRef = useRef(false);      // ensures we only start once
  const completedRef = useRef(false);    // ensures we only complete once
  const runRef = useRef<symbol | null>(null); // current animation token

  const onCompleteRef = useRef(onComplete);
  useEffect(() => void (onCompleteRef.current = onComplete), [onComplete]);

  const formatRef = useRef(format);
  useEffect(() => void (formatRef.current = format), [format]);

  const localeRef = useRef(locale);
  useEffect(() => void (localeRef.current = locale), [locale]);

  const ssrFormatter = useMemo(
    () => new Intl.NumberFormat(locale, { ...format }),
    [locale, format]
  );

  // Respect prefers-reduced-motion
  const reduceMotionRef = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => (reduceMotionRef.current = mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // Start when visible — guarded so it can only flip once
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          setHasStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Animation — only depends on hasStarted (one run per mount)
  useEffect(() => {
    if (!hasStarted || completedRef.current) return;

    const el = numberRef.current;
    if (!el) return;

    const duration = Math.max(200, durationMs);
    const startValue = from;
    const endValue = target;

    const fmt = new Intl.NumberFormat(localeRef.current, {
      ...formatRef.current,
    });

    // Create a unique run token; cancel any old run
    const runId = Symbol("stat-counter-run");
    runRef.current = runId;

    // Snap for reduced motion or trivial cases
    if (reduceMotionRef.current || duration === 0 || startValue === endValue) {
      el.textContent = fmt.format(endValue);
      if (!completedRef.current) {
        completedRef.current = true;
        setIsComplete(true);
        onCompleteRef.current?.();
      }
      return () => {
        if (runRef.current === runId) runRef.current = null;
      };
    }

    el.textContent = fmt.format(startValue);

    let raf = 0;
    let lastRendered = Number.NaN;
    const t0 = performance.now();

    const tick = (now: number) => {
      // If a newer run started or we unmounted, bail.
      if (runRef.current !== runId) return;

      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(startValue + (endValue - startValue) * eased);

      if (current !== lastRendered) {
        el.textContent = fmt.format(current);
        lastRendered = current;
      }

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!completedRef.current) {
        completedRef.current = true;
        setIsComplete(true);
        onCompleteRef.current?.();
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      // cancel this run
      if (runRef.current === runId) runRef.current = null;
      cancelAnimationFrame(raf);
    };
  }, [hasStarted, durationMs, from, target]); // include key inputs; internal refs prevent unnecessary reruns

  return (
    <div ref={containerRef} className={cn("flex flex-col items-center", className)}>
      <div className="text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums relative">
        {prefix ? <span>{prefix}</span> : null}
        {/* SSR-safe initial content */}
        <span ref={numberRef}>{ssrFormatter.format(from)}</span>
        {suffix ? (
          <span
            className={cn(
              "absolute left-full top-0 transition-opacity duration-1000",
              suffixOnCompleteOnly ? (isComplete ? "" : "opacity-0") : ""
            )}
          >
            {suffix}
          </span>
        ) : null}
      </div>
      {label ? (
        <div className="text-sm md:text-base text-muted-foreground mt-1">{label}</div>
      ) : null}
    </div>
  );
}