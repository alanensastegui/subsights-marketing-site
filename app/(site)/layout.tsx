'use client';

import "@/styles/theme.css";
import "@/styles/globals.css";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Animate } from "@/components/ui/animate";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  type NavItem,
} from "@/components/ui/navigation-menu";

// Constants
const SCROLL_THRESHOLD = 100;
const ORB_CONFIGS = {
  small: { classes: 'w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48', radius: 120 },
  medium: { classes: 'w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56', radius: 160 },
  large: { classes: 'w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72', radius: 200 }
} as const;

const navItems: (NavItem & { isButton?: boolean })[] = [
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Partners", href: "/partners" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Get Demo", href: "https://calendly.com/lucas-subsights/subsights-demo", isButton: true },
];

// Floating Orb Component
const FloatingOrb = ({
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

// Navigation Components
const DesktopNavigation = () => (
  <NavigationMenu className="hidden md:block">
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
);

const MobileNavigation = () => (
  <Sheet>
    <SheetTrigger asChild className="md:hidden">
      <Button variant="ghost" size="sm" className="p-2">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle mobile menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
      <nav className="flex flex-col gap-4 mt-8 px-6">
        {navItems.map((item) => (
          <div key={item.label}>
            {'children' in item ? (
              <div className="space-y-2">
                <div className="font-medium text-foreground py-2">{item.label}</div>
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="block py-2 pl-4 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : item.isButton ? (
              <Button asChild className="w-full">
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </Button>
            ) : (
              <Link
                href={item.href}
                className="block py-2 text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </SheetContent>
  </Sheet>
);

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      const isScrollingDown = currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD;

      if (isScrollingUp) {
        setIsHeaderVisible(true);
      } else if (isScrollingDown) {
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          <div className="absolute left-[10%] top-[15%]">
            <FloatingOrb size="large" blur={40} opacity={0.4} speed={1} />
          </div>
          <div className="absolute right-[20%] top-[25%]">
            <FloatingOrb size="small" blur={40} opacity={0.4} speed={1.2} />
          </div>
          <div className="absolute left-[40%] top-[40%]">
            <FloatingOrb size="medium" blur={40} opacity={0.40} speed={1.6} />
          </div>
        </div>

        <header className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
          <Animate name="fadeIn" trigger="onLoad">
            <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <img src="/images/logo/full-logo.svg" alt="Subsights AI" className="h-12 w-auto" />
              </Link>
              <DesktopNavigation />
              <MobileNavigation />
            </div>
          </Animate>
        </header>

        <main className="mx-auto max-w-6xl px-6 pt-20">{children}</main>
        <footer className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center space-y-6 text-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img src="/images/logo/full-logo.svg" alt="Subsights AI" className="h-16 w-auto opacity-80" />
            </Link>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/data-processing" className="hover:text-foreground transition-colors">
                Data Processing
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Subsights AI. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
