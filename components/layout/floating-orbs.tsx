'use client';

import { useRef, useEffect } from "react";

const ORB_CONFIGS = {
  small: { classes: 'w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48', radius: 120 },
  medium: { classes: 'w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56', radius: 160 },
  large: { classes: 'w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72', radius: 200 }
} as const;

const FloatingOrbs = ({
  size,
  blur,
  opacity,
  speed
}: {
  size: keyof typeof ORB_CONFIGS;
  blur: number;
  opacity: number;
  speed: number;
}) => {
  const orbRef = useRef<HTMLDivElement>(null);
  const animationId = useRef<number | null>(null);
  const startTime = useRef<number>(0);

  const { classes, radius } = ORB_CONFIGS[size];

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!startTime.current) startTime.current = currentTime;

      const elapsed = currentTime - startTime.current;
      const progress = (elapsed * speed) / 1000;

      let x, y;
      if (size === 'small') {
        const baseX = Math.sin(-progress * 0.4) * radius * 0.5;
        const baseY = Math.cos(progress * 0.6) * radius * 0.3;
        const noiseX = Math.sin(progress * 2.1) * radius * 0.15;
        const noiseY = Math.cos(progress * 1.8) * radius * 0.12;
        x = baseX + noiseX;
        y = baseY + noiseY;
      } else if (size === 'medium') {
        const baseX = Math.sin(progress * 0.3) * radius * 0.6;
        const baseY = Math.cos(-progress * 0.5) * radius * 0.4;
        const noiseX = Math.sin(progress * 1.5) * radius * 0.2;
        const noiseY = Math.cos(progress * 1.2) * radius * 0.18;
        x = baseX + noiseX;
        y = baseY + noiseY;
      } else {
        const baseX = Math.sin(-progress * 0.2) * radius * 0.7;
        const baseY = Math.cos(-progress * 0.4) * radius * 0.5;
        const driftX = Math.sin(progress * 0.1) * radius * 0.25;
        const driftY = Math.cos(progress * 0.15) * radius * 0.2;
        x = baseX + driftX;
        y = baseY + driftY;
      }

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      animationId.current = requestAnimationFrame(animate);
    };

    animationId.current = requestAnimationFrame(animate);
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [radius, speed, size]);

  return (
    <div
      ref={orbRef}
      className={`absolute ${classes} rounded-full`}
      style={{
        filter: `blur(${blur}px)`,
        background: `radial-gradient(circle, rgba(31, 43, 243, ${opacity}) 0%, rgba(31, 43, 243, ${opacity * 0.75}) 30%, rgba(31, 43, 243, ${opacity * 0.5}) 60%, rgba(31, 43, 243, ${opacity * 0.25}) 85%, transparent 100%)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

export default FloatingOrbs;
