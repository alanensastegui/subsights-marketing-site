'use client';

import { useEffect, useMemo, useRef } from 'react';

const ORB_CONFIGS = {
  small: { classes: 'w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48', radius: 120 },
  medium: { classes: 'w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56', radius: 160 },
  large: { classes: 'w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72', radius: 200 },
} as const;

type Size = keyof typeof ORB_CONFIGS;

// Exact fundamental period (in "progress" units) for each size's frequency set
const PERIOD_PROGRESS: Record<Size, number> = {
  small: 20 * Math.PI,   // works for 0.4, 0.6, 2.1, 1.8
  medium: 20 * Math.PI,  // works for 0.3, 0.5, 1.5, 1.2
  large: 40 * Math.PI,   // works for 0.2, 0.4, 0.1, 0.15
};

// How many samples to generate per full period.
// 480 is usually more than enough; bump if you ever see straight-line artifacts.
const SAMPLES_PER_CYCLE = 480;

function computeXY(size: Size, radius: number, progress: number) {
  if (size === 'small') {
    const baseX = Math.sin(-progress * 0.4) * radius * 0.5;
    const baseY = Math.cos(progress * 0.6) * radius * 0.3;
    const noiseX = Math.sin(progress * 2.1) * radius * 0.15;
    const noiseY = Math.cos(progress * 1.8) * radius * 0.12;
    return { x: baseX + noiseX, y: baseY + noiseY };
  } else if (size === 'medium') {
    const baseX = Math.sin(progress * 0.3) * radius * 0.6;
    const baseY = Math.cos(-progress * 0.5) * radius * 0.4;
    const noiseX = Math.sin(progress * 1.5) * radius * 0.2;
    const noiseY = Math.cos(progress * 1.2) * radius * 0.18;
    return { x: baseX + noiseX, y: baseY + noiseY };
  } else {
    const baseX = Math.sin(-progress * 0.2) * radius * 0.7;
    const baseY = Math.cos(-progress * 0.4) * radius * 0.5;
    const driftX = Math.sin(progress * 0.1) * radius * 0.25;
    const driftY = Math.cos(progress * 0.15) * radius * 0.2;
    return { x: baseX + driftX, y: baseY + driftY };
  }
}

export default function FloatingOrbs({
  size,
  blur,
  opacity,
  speed,
}: {
  size: Size;
  blur: number;
  opacity: number;
  speed: number; // same meaning as before
}) {
  const orbRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);

  const { classes, radius } = ORB_CONFIGS[size];
  const periodProgress = PERIOD_PROGRESS[size];

  // Build the (static) gradient string once per opacity change
  const background = useMemo(
    () =>
      `radial-gradient(circle,
        rgba(31,43,243, ${opacity}) 0%,
        rgba(31,43,243, ${opacity * 0.75}) 30%,
        rgba(31,43,243, ${opacity * 0.5}) 60%,
        rgba(31,43,243, ${opacity * 0.25}) 85%,
        transparent 100%)`,
    [opacity]
  );

  // Create/replace the WAAPI animation when size or radius change
  useEffect(() => {
    const el = orbRef.current;
    if (!el) return;

    // Accessibility: respect reduced motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      animRef.current?.cancel();
      el.style.transform = 'translate3d(0,0,0)';
      return;
    }

    // Compositor hint
    el.style.willChange = 'transform';

    // Generate one full cycle of keyframes (exact period) and let WAAPI loop it
    const frames: Keyframe[] = [];
    for (let i = 0; i <= SAMPLES_PER_CYCLE; i++) {
      const t = (i / SAMPLES_PER_CYCLE) * periodProgress; // "progress" domain
      const { x, y } = computeXY(size, radius, t);
      frames.push({
        transform: `translate3d(${x}px, ${y}px, 0)`,
        offset: i / SAMPLES_PER_CYCLE, // precise distribution; avoids float drift
      });
    }

    // Base duration corresponds to speed = 1
    const durationMs = periodProgress * 1000;

    // Replace any existing animation
    animRef.current?.cancel();
    const anim = el.animate(frames, {
      duration: durationMs,
      iterations: Infinity,
      easing: 'linear',
      fill: 'both',
    });
    anim.updatePlaybackRate(speed); // apply current speed without regenerating
    animRef.current = anim;

    // Save battery in background tabs
    const onVis = () => {
      if (!animRef.current) return;
      if (document.visibilityState === 'hidden') {
        animRef.current.pause();
      } else {
        animRef.current.play();
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      document.removeEventListener('visibilitychange', onVis);
      anim.cancel();
      animRef.current = null;
    };
  }, [size, radius, periodProgress, speed]);

  // React to speed changes without rebuilding keyframes
  useEffect(() => {
    animRef.current?.updatePlaybackRate(speed || 0);
  }, [speed]);

  return (
    <div
      ref={orbRef}
      className={`absolute ${classes} rounded-full pointer-events-none`}
      style={{
        filter: `blur(${blur}px)`,
        background,
        // No transition on transform — WAAPI drives it
      }}
    />
  );
}
