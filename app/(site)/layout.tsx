'use client';

import "@/styles/theme.css";
import "@/styles/globals.css";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Animate } from "@/components/ui/animate";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  type NavItem,
} from "@/components/ui/navigation-menu";

const navItems: (NavItem & { isButton?: boolean })[] = [
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Partners", href: "/partners" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Get Demo", href: "https://calendly.com/lucas-subsights/subsights-demo", isButton: true },
];

// Floating Orb Component - Simple and Robust
const FloatingOrb = ({
  size,
  blur,
  opacity,
  speed
}: {
  size: 'small' | 'medium' | 'large';
  blur: number;
  opacity: number;
  speed: number;
}) => {
  const orbRef = useRef<HTMLDivElement>(null);
  const animationId = useRef<number | null>(null);
  const startTime = useRef<number>(0);

  const sizeMap = {
    small: { classes: 'w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48', radius: 120 },
    medium: { classes: 'w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56', radius: 160 },
    large: { classes: 'w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72', radius: 200 }
  };

  const { classes, radius } = sizeMap[size];

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!startTime.current) startTime.current = currentTime;

      const elapsed = currentTime - startTime.current;
      const progress = (elapsed * speed) / 1000; // Convert to seconds

      // Create organic, seemingly random floating motion
      // Each orb has different patterns with added noise and variation
      let x, y;
      if (size === 'small') {
        // Small orb: fast, erratic movement with noise
        const baseX = Math.sin(-progress * 0.4) * radius * 0.5;
        const baseY = Math.cos(progress * 0.6) * radius * 0.3;
        const noiseX = Math.sin(progress * 2.1) * radius * 0.15;
        const noiseY = Math.cos(progress * 1.8) * radius * 0.12;
        x = baseX + noiseX;
        y = baseY + noiseY;
      } else if (size === 'medium') {
        // Medium orb: balanced movement with subtle variation
        const baseX = Math.sin(progress * 0.3) * radius * 0.6;
        const baseY = Math.cos(-progress * 0.5) * radius * 0.4;
        const noiseX = Math.sin(progress * 1.5) * radius * 0.2;
        const noiseY = Math.cos(progress * 1.2) * radius * 0.18;
        x = baseX + noiseX;
        y = baseY + noiseY;
      } else {
        // Large orb: slow, majestic movement with gentle drift
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
  }, [radius, speed]);

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

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          src="https://widget.subsights.com/chatbot.js"
          data-workspace="0XvceSLk1j"
          data-api-key="s7qSTe7OKtqvuUoT3q7MWg578XTB1vET"
        />
      </head>
      <body className="bg-background text-foreground h-full">
        {/* Global Background Orbs */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          <div className="absolute left-[10%] top-[15%]">
            <FloatingOrb
              size="large"
              blur={40}
              opacity={0.4}
              speed={1}
            />
          </div>
          <div className="absolute right-[20%] top-[25%]">
            <FloatingOrb
              size="small"
              blur={40}
              opacity={0.4}
              speed={1.2}
            />
          </div>
          <div className="absolute left-[40%] top-[40%]">
            <FloatingOrb
              size="medium"
              blur={40}
              opacity={0.40}
              speed={1.6}
            />
          </div>
        </div>

        <Animate name="fadeIn" trigger="onLoad">
          <header className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <img src="/images/logo/full-logo.svg" alt="Subsights AI" className="h-12 w-auto" />
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  'children' in item ? (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {item.children.map((child) => (
                            <NavigationMenuLink key={child.label} href={child.href}>
                              {child.label}
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.label}>
                      {item.isButton ? (
                        <Button asChild size="sm">
                          <a href={item.href} target="_blank" rel="noopener noreferrer">
                            {item.label}
                          </a>
                        </Button>
                      ) : (
                        <NavigationMenuLink href={item.href} className={item.className}>
                          {item.label}
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  )
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </header>
        </Animate>
        <main className="mx-auto max-w-6xl px-6">{children}</main>
        <footer className="mx-auto max-w-6xl px-6 py-12 text-sm opacity-70">© {new Date().getFullYear()} Subsights</footer>
      </body>
    </html>
  );
}
