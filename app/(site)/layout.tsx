import "@/styles/globals.css";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Animate } from "@/components/ui/animate";
import MobileNavigation from "@/components/layout/mobile-navigation";
import DesktopNavigation from "@/components/layout/desktop-navigation";
import FloatingOrb from "@/components/layout/floating-orb";
import { GoogleAnalytics } from "@/lib/analytics/components/google-analytics";
import { PageViewTracker } from "@/lib/analytics/components/page-view-tracker";
import { DevAnalyticsDashboard } from "@/lib/analytics/components/dev-analytics-dashboard";
import { ConsentBanner } from "@/lib/analytics/components/consent-banner";
import { AnalyticsProvider } from "@/lib/analytics/context";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { AutoButtonTracking } from "@/lib/analytics/components/auto-button-tracking";
import { ApolloTracker } from "@/components/layout/apollo-tracker";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllFeatureMetadata } from "@/lib/features/registry";
import type { NavItem } from "@/components/ui/navigation-menu";

function buildNavigationItems() {
  const caseStudies = getAllCaseStudies();
  const features = getAllFeatureMetadata();

  const caseStudiesNavItem: NavItem = {
    label: "Case Studies",
    mainItem: { label: "All Case Studies", href: "/case-studies" },
    children: caseStudies.map(study => ({
      label: study.company,
      href: `/case-studies/${study.slug}`
    }))
  };

  const featuresNavItem: NavItem = {
    label: "Features",
    mainItem: { label: "All Features", href: "/features" },
    children: features.map(feature => ({
      label: feature.title,
      href: `/features/${feature.id}`
    }))
  };

  return [
    featuresNavItem,
    caseStudiesNavItem,
    { label: "Pricing", href: "/pricing" },
    { label: "Partners", href: "/partners" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Sign In", href: "https://app.subsights.com", isButton: true },
    { label: "Email My Demo", href: "/email-my-demo", isButton: true },
  ] as (NavItem & { isButton?: boolean })[];
}


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

const navItems = buildNavigationItems();

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

          <header className="sticky top-0 z-50 backdrop-blur-md shadow-sm transition-[background,backdrop-filter,box-shadow] duration-200 ease-out hover:backdrop-blur-xl hover:shadow-lg [animation:header-fade-in_linear_both] [animation-timeline:scroll(root)] [animation-range:0_100px] supports-[animation-timeline:scroll(root)]:animate-none">
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
                <DesktopNavigation navItems={navItems} />
                <MobileNavigation navItems={navItems} />
              </div>
            </Animate>
          </header>

          <main className="mx-auto max-w-6xl px-6 pt-14">{children}</main>
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
