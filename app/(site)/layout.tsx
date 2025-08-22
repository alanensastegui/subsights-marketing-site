import "@/styles/globals.css";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/config";
import { Animate } from "@/components/ui/animate";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
  type NavItem,
} from "@/components/ui/navigation-menu";
import FloatingOrb from "@/components/layout/floating-orb";
import { GoogleAnalytics } from "@/lib/analytics/components/google-analytics";
import { PageViewTracker } from "@/lib/analytics/components/page-view-tracker";
import { DevAnalyticsDashboard } from "@/lib/analytics/components/dev-analytics-dashboard";
import { ConsentBanner } from "@/lib/analytics/components/consent-banner";
import { AnalyticsProvider } from "@/lib/analytics/context";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { getAllCaseStudies } from "@/lib/case-studies";
import { AutoButtonTracking } from "@/lib/analytics/components/auto-button-tracking";
import { ApolloTracker } from "@/components/layout/apollo-tracker";

function buildNavigationItems() {
  const caseStudies = getAllCaseStudies();

  const caseStudiesNavItem: NavItem = {
    label: "Case Studies",
    children: [
      { label: "All Case Studies", href: "/case-studies" },
      ...caseStudies.map(study => ({
        label: study.company,
        href: `/case-studies/${study.slug}`
      }))
    ]
  };

  return [
    caseStudiesNavItem,
    { label: "Pricing", href: "/pricing" },
    { label: "Partners", href: "/partners" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Book Demo", href: CALENDLY_URL, isButton: true },
  ] as (NavItem & { isButton?: boolean })[];
}

// Navigation Components
const DesktopNavigation = () => {
  const navItems = buildNavigationItems();

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        {navItems.map((item) => (
          'children' in item ? (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {item.children.map((child) => (
                    <NavigationMenuLink
                      key={child.label}
                      href={child.href}
                      className="group relative block w-full rounded-lg p-3 text-sm font-medium leading-none no-underline outline-none transition-all duration-200 ease-out hover:bg-primary/80 hover:text-foreground focus:bg-primary/10 focus:text-foreground hover:scale-[1.02] hover:shadow-sm"
                    >
                      <span className="relative z-10">{child.label}</span>
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.label}>
              {item.isButton ? (
                <Button
                  asChild
                  size="sm"
                  data-analytics-id="nav_desktop_demo"
                  data-analytics-name="Book Demo (Nav)"
                  data-analytics-context='{"source":"nav_desktop","location":"header"}'
                >
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </Button>
              ) : (
                <NavigationMenuLink
                  href={item.href}
                  className="group relative inline-flex h-10 w-max items-center justify-center rounded-lg bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 ease-out hover:bg-accent/80 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:scale-[1.02] hover:shadow-sm"
                >
                  {item.label}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          )
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const MobileNavigation = () => {
  const navItems = buildNavigationItems();

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="sm" className="p-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle mobile menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-transparent backdrop-blur-xl border-l border-border/50">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="flex flex-col gap-4 mt-8 px-6">
          {navItems.map((item) => (
            <div key={item.label}>
              {'children' in item ? (
                <div className="space-y-2">
                  <div className="font-medium text-foreground py-2">{item.label}</div>
                  {item.children.map((child) => (
                    <SheetClose asChild key={child.label}>
                      <Link
                        href={child.href}
                        className="block py-2 pl-4 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              ) : item.isButton ? (
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full"
                    data-analytics-id="nav_mobile_demo"
                    data-analytics-name="Book Demo (Nav Mobile)"
                    data-analytics-context='{"source":"nav_mobile","location":"sheet"}'
                  >
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  </Button>
                </SheetClose>
              ) : (
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className="group relative block py-2 text-foreground hover:text-foreground transition-all duration-200 ease-out rounded-lg hover:bg-primary/10"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.subsights.com'),
  title: {
    template: '%s | Subsights AI',
    default: 'Subsights AI - AI-Powered Website Conversion',
  },
  description: 'Transform your website with AI-powered conversion tools. Increase leads, bookings, and revenue automatically.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.subsights.com',
    siteName: 'Subsights AI',
    images: [
      {
        url: '/images/logo/small-logo.svg',
        width: 1200,
        height: 630,
        alt: 'Subsights AI Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@subsights',
    images: ['/images/logo/small-logo.svg'],
  },
};

export default function SiteLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/images/logo/small-logo.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/images/logo/small-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/logo/small-logo.svg" />
        <ApolloTracker appId={process.env.NEXT_PUBLIC_APOLLO_APP_ID} />
        <script
          src="https://widget.subsights.com/chatbot.js"
          data-workspace="0XvceSLk1j"
          data-api-key="s7qSTe7OKtqvuUoT3q7MWg578XTB1vET"
          async
        />
      </head>
      <body className="bg-background text-foreground h-full">
        <AnalyticsProvider>
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
            <div className="absolute left-[10%] top-[15%]">
              <FloatingOrb size="large" blur={40} opacity={0.4} speed={1} />
            </div>
            <div className="absolute right-[20%] top-[25%]">
              <FloatingOrb size="small" blur={40} opacity={0.4} speed={1.1} />
            </div>
            <div className="absolute left-[40%] top-[40%]">
              <FloatingOrb size="medium" blur={40} opacity={0.40} speed={1.2} />
            </div>
          </div>

          <header className="sticky top-0 z-50 border-b border-border/40  backdrop-blur-md shadow-sm transition-[background,backdrop-filter,box-shadow] duration-200 ease-out hover:backdrop-blur-xl hover:shadow-lg [animation:header-fade-in_linear_both] [animation-timeline:scroll(root)] [animation-range:0_100px] supports-[animation-timeline:scroll(root)]:animate-none">
            <Animate name="fadeIn" trigger="onLoad">
              <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center group rounded-lg transition-colors duration-150 ease-out hover:bg-white/10">
                  <Image
                    src="/images/logo/full-logo.svg"
                    alt="Subsights AI"
                    width={120}
                    height={48}
                    className="h-12 w-auto"
                  />
                </Link>
                <DesktopNavigation />
                <MobileNavigation />
              </div>
            </Animate>
          </header>

          <main className="mx-auto max-w-6xl px-6 pt-20">{children}</main>
          <ScrollToTop />
          <footer className="mx-auto max-w-6xl px-6 py-12">
            <div className="flex flex-col items-center space-y-6 text-center">
              {/* Logo */}
              <Link href="/" className="flex items-center group rounded-lg transition-colors duration-150 ease-out hover:bg-white/10">
                <Image
                  src="/images/logo/full-logo.svg"
                  alt="Subsights AI"
                  width={160}
                  height={64}
                  className="h-16 w-auto opacity-80 hover:opacity-100"
                />
              </Link>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <Link href="/legal/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/legal/data-processing" className="hover:text-foreground transition-colors">
                  Data Processing
                </Link>
              </div>

              {/* Copyright */}
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Subsights AI. All rights reserved.
              </div>
            </div>
          </footer>

          {/* Google Analytics Script Loader */}
          <GoogleAnalytics />
          <Suspense fallback={null}>
            <PageViewTracker />
            <ConsentBanner />
            <AutoButtonTracking />
          </Suspense>

          {/* Development Analytics Dashboard */}
          <DevAnalyticsDashboard />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
