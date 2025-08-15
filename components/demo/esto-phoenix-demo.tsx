"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { Animate } from "@/components/ui/animate";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface EstoPhoenixDemoProps {
  targetLabel: string;
  scriptTag?: string;
}

export function EstoPhoenixDemo({ scriptTag }: EstoPhoenixDemoProps) {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (scriptTag && !mountedRef.current) {
      mountedRef.current = true;

      try {
        // Create a temporary container to parse the script tag
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = scriptTag;
        const scriptElement = tempDiv.querySelector('script');

        if (scriptElement) {
          // Clone the script element to avoid DOM manipulation issues
          const newScript = document.createElement('script');
          newScript.src = scriptElement.src || '';
          newScript.setAttribute('data-workspace', scriptElement.getAttribute('data-workspace') || '');
          newScript.setAttribute('data-api-key', scriptElement.getAttribute('data-api-key') || '');

          // Append the script to the document head
          document.head.appendChild(newScript);
        }
      } catch (error) {
        console.error('Failed to load widget:', error);
      }
    }
  }, [scriptTag]);


  return (
    <div className="min-h-full flex flex-col bg-gradient-to-br from-[#d87651] via-[#c86a4a] via-30% to-[#561f37] overflow-auto h-full">
      {/* Demo Content */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-12 sm:space-y-20">

          {/* 1. WELCOME SECTION */}
          <section className="text-center space-y-6 sm:space-y-8">
            <Animate name="fadeIn" trigger="onVisible">
              <Badge variant="secondary" className="mb-4 sm:mb-6 bg-green-500/20 text-green-300 border-green-500/30 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-[pulse_3s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-green-300/40 to-green-400/20 animate-[pulse_3s_ease-in-out_infinite]"></div>
                <span className="relative z-10 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">Demo Mode Active</span>
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
                Hello DMO Leaders
                <span className="block text-[#561f37]">Need help getting around?</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-[#F5E6D3] max-w-4xl mx-auto leading-relaxed px-2">
                {/* This is a demonstration of how Subsights greets travelers, answers with local expertise, and routes them to stays, experiences, and events. */}
                Subsights greets travelers, answers with local insight, and routes to stays, experiences, events
              </p>
            </Animate>
          </section>

          {/* 2. PROBLEMS WE SOLVE SECTION */}
          <section className="space-y-8 sm:space-y-12">
            <Animate name="fadeIn" trigger="onVisible" className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                The Problems We Solve
              </h2>
              <p className="text-base sm:text-lg text-[#F5E6D3] mb-6 sm:mb-8">
                Old support models can&apos;t keep up with today&apos;s traveler
              </p>
            </Animate>

            {/* Desktop: 3-column grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8">
              <Animate name="fadeIn" trigger="onVisible" delay={100}>
                <Card className="border-[#DC143C]/30 bg-[#DC143C]/10 hover:bg-[#DC143C]/15 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-xl bg-[#DC143C]/20 flex items-center justify-center mb-4">
                      <Image
                        src="/images/low-battery.svg"
                        alt="Low battery icon representing limited resources"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <CardTitle className="text-[#FFFF00] text-xl font-bold drop-shadow-sm">Limited Hours & Staffing</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-card-foreground leading-relaxed flex-1">
                      Visitor centers and web teams can&apos;t be everywhere at once, especially during peaks and after hours.
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-4 border-red-500/30 text-[#FFFF00] bg-red-500/20 text-xs font-bold"
                    >
                      Limited coverage
                    </Badge>
                  </CardContent>
                </Card>
              </Animate>

              <Animate name="fadeIn" trigger="onVisible" delay={200}>
                <Card className="border-[#DC143C]/30 bg-[#DC143C]/10 hover:bg-[#DC143C]/15 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-xl bg-[#DC143C]/20 flex items-center justify-center mb-4">
                      <Image
                        src="/images/alert-triangle.svg"
                        alt="Alert triangle icon representing problems"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <CardTitle className="text-[#FFFF00] text-xl font-bold drop-shadow-sm">Inconsistent Answers</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-card-foreground leading-relaxed flex-1">
                      Information varies across partners and pages; planners bounce when they can&apos;t find what they need.
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-4 border-red-500/30 text-[#FFFF00] bg-red-500/20 text-xs font-bold"
                    >
                      Information gaps
                    </Badge>
                  </CardContent>
                </Card>
              </Animate>

              <Animate name="fadeIn" trigger="onVisible" delay={300}>
                <Card className="border-[#DC143C]/30 bg-[#DC143C]/10 hover:bg-[#DC143C]/15 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-xl bg-[#DC143C]/20 flex items-center justify-center mb-4">
                      <Image
                        src="/images/trending-down.svg"
                        alt="Trending down icon representing declining performance"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <CardTitle className="text-[#FFFF00] text-xl font-bold drop-shadow-sm">Leaky Demand</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-card-foreground leading-relaxed flex-1">
                      Trip planners drift to OTAs or competitor destinations before they discover your itineraries and partners.
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-4 border-red-500/30 text-[#FFFF00] bg-red-500/20 text-xs font-bold"
                    >
                      Lost visitors
                    </Badge>
                  </CardContent>
                </Card>
              </Animate>
            </div>

            {/* Mobile: Problem → Arrow → Solution flow */}
            <div className="md:hidden space-y-6 sm:space-y-8">
              {/* Problem 1 → Solution 1 */}
              <div className="space-y-3 sm:space-y-4">
                <Animate name="fadeIn" trigger="onVisible" delay={100}>
                  <Card className="border-[#DC143C]/30 bg-[#DC143C]/10">
                    <CardHeader className="flex-shrink-0">
                      <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl bg-[#DC143C]/20 flex items-center justify-center mb-3 sm:mb-4">
                        <Image
                          src="/images/low-battery.svg"
                          alt="Low battery icon representing limited resources"
                          width={32}
                          height={32}
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <CardTitle className="text-[#FFFF00] text-lg sm:text-xl font-bold drop-shadow-sm">Limited Hours & Staffing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-card-foreground leading-relaxed text-sm sm:text-base">
                        Visitor centers and web teams can&apos;t be everywhere at once, especially during peaks and after hours.
                      </p>
                      <Badge
                        variant="outline"
                        className="mt-3 sm:mt-4 border-red-500/30 text-[#FFFF00] bg-red-500/20 text-xs font-bold"
                      >
                        Limited coverage
                      </Badge>
                    </CardContent>
                  </Card>
                </Animate>

                <div className="flex justify-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#561f37]/20 rounded-full flex items-center justify-center border border-[#561f37]/30">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#561f37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>

                <p className="text-center text-[#F5E6D3] text-xs sm:text-sm font-medium">
                  How we fix it
                </p>

                <Animate name="fadeIn" trigger="onVisible" delay={150}>
                  <Card className="border-green-500/40 bg-green-500/15">
                    <CardHeader className="flex-shrink-0">
                      <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl bg-green-500/30 flex items-center justify-center mb-3 sm:mb-4">
                        <Image
                          src="/images/full-battery.svg"
                          alt="Full battery icon representing unlimited capacity"
                          width={32}
                          height={32}
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <CardTitle className="text-green-300 text-lg sm:text-xl">Always-On Coverage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-card-foreground leading-relaxed text-sm sm:text-base">
                        Every visitor gets instant, expert help, 24/7, at any volume and in any season.
                      </p>
                      <Badge
                        variant="outline"
                        className="mt-3 sm:mt-4 border-green-500/40 text-green-300 bg-green-500/25 text-xs"
                      >
                        Unlimited availability
                      </Badge>
                    </CardContent>
                  </Card>
                </Animate>
              </div>

              {/* Divider */}
              <Separator className="bg-foreground/50" />

              {/* Problem 2 → Solution 2 */}
              <div className="space-y-3 sm:space-y-4">
                <Animate name="fadeIn" trigger="onVisible" delay={200}>
                  <Card className="border-[#DC143C]/30 bg-[#DC143C]/10">
                    <CardHeader className="flex-shrink-0">
                      <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl bg-[#DC143C]/20 flex items-center justify-center mb-3 sm:mb-4">
                        <Image
                          src="/images/alert-triangle.svg"
                          alt="Alert triangle icon representing problems"
                          width={32}
                          height={32}
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <CardTitle className="text-[#FFFF00] text-lg sm:text-xl font-bold drop-shadow-sm">Inconsistent Answers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-card-foreground leading-relaxed text-sm sm:text-base">
                        Information varies across partners and pages; planners bounce when they can&apos;t find what they need.
                      </p>
                      <Badge
                        variant="outline"
                        className="mt-3 sm:mt-4 border-red-500/30 text-[#FFFF00] bg-red-500/20 text-xs font-bold"
                      >
                        Information gaps
                      </Badge>
                    </CardContent>
                  </Card>
                </Animate>

                <div className="flex justify-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#561f37]/20 rounded-full flex items-center justify-center border border-[#561f37]/30">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#561f37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>

                <p className="text-center text-[#F5E6D3] text-xs sm:text-sm font-medium">
                  How we fix it
                </p>

                <Animate name="fadeIn" trigger="onVisible" delay={250}>
                  <Card className="border-green-500/40 bg-green-500/15">
                    <CardHeader className="flex-shrink-0">
                      <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl bg-green-500/30 flex items-center justify-center mb-3 sm:mb-4">
                        <Image
                          src="/images/checkmark-circle.svg"
                          alt="Check circle icon representing success"
                          width={32}
                          height={32}
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <CardTitle className="text-green-300 text-lg sm:text-xl">Consistent, Brand-Safe Guidance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-card-foreground leading-relaxed text-sm sm:text-base">
                        The assistant speaks in your destination&apos;s voice and stays aligned with your official content.
                      </p>
                      <Badge
                        variant="outline"
                        className="mt-3 sm:mt-4 border-green-500/40 text-green-300 bg-green-500/25 text-xs"
                      >
                        Brand consistency
                      </Badge>
                    </CardContent>
                  </Card>
                </Animate>
              </div>

              {/* Divider */}
              <Separator className="bg-foreground/50" />

              {/* Problem 3 → Solution 3 */}
              <div className="space-y-3 sm:space-y-4">
                <Animate name="fadeIn" trigger="onVisible" delay={300}>
                  <Card className="border-[#DC143C]/30 bg-[#DC143C]/10">
                    <CardHeader className="flex-shrink-0">
                      <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl bg-[#DC143C]/20 flex items-center justify-center mb-3 sm:mb-4">
                        <Image
                          src="/images/trending-down.svg"
                          alt="Trending down icon representing declining performance"
                          width={32}
                          height={32}
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <CardTitle className="text-[#FFFF00] text-lg sm:text-xl font-bold drop-shadow-sm">Leaky Demand</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-card-foreground leading-relaxed text-sm sm:text-base">
                        Trip planners drift to OTAs or competitor destinations before they discover your itineraries and partners.
                      </p>
                      <Badge
                        variant="outline"
                        className="mt-3 sm:mt-4 border-red-500/30 text-[#FFFF00] bg-red-500/20 text-xs font-bold"
                      >
                        Lost visitors
                      </Badge>
                    </CardContent>
                  </Card>
                </Animate>

                <div className="flex justify-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#561f37]/20 rounded-full flex items-center justify-center border border-[#561f37]/30">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#561f37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>

                <p className="text-center text-[#F5E6D3] text-xs sm:text-sm font-medium">
                  How we fix it
                </p>

                <Animate name="fadeIn" trigger="onVisible" delay={350}>
                  <Card className="border-green-500/40 bg-green-500/15">
                    <CardHeader className="flex-shrink-0">
                      <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl bg-green-500/30 flex items-center justify-center mb-3 sm:mb-4">
                        <Image
                          src="/images/trending-up.svg"
                          alt="Trending up icon representing growth"
                          width={32}
                          height={32}
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <CardTitle className="text-green-300 text-lg sm:text-xl">Demand Captured & Routed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-card-foreground leading-relaxed text-sm sm:text-base">
                        Subsights guides planners to priority actions; lodging pages, deals, partner listings, and themed itineraries.
                      </p>
                      <Badge
                        variant="outline"
                        className="mt-3 sm:mt-4 border-green-500/40 text-green-300 bg-green-500/25 text-xs"
                      >
                        Increased visitation
                      </Badge>
                    </CardContent>
                  </Card>
                </Animate>
              </div>
            </div>

            {/* Desktop: Arrow and text above solutions */}
            <Animate name="fadeIn" trigger="onVisible" delay={400} className="hidden md:block">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[#561f37]/20 rounded-full flex items-center justify-center border border-[#561f37]/30">
                    <svg
                      className="w-6 h-6 text-[#561f37]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-lg text-[#F5E6D3] mb-8">
                  Here&apos;s how we fix it
                </p>
              </div>
            </Animate>

            {/* After Subsights Solutions - Desktop Only */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8">
              <Animate name="fadeIn" trigger="onVisible" delay={500}>
                <Card className="border-green-500/40 bg-green-500/15 hover:bg-green-500/25 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-xl bg-green-500/30 flex items-center justify-center mb-4">
                      <Image
                        src="/images/full-battery.svg"
                        alt="Full battery icon representing unlimited capacity"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <CardTitle className="text-green-300 text-xl">Always-On Coverage</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-card-foreground leading-relaxed flex-1">
                      Every visitor gets instant, expert help, 24/7, at any volume and in any season.
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-4 border-green-500/40 text-green-300 bg-green-500/25 text-xs"
                    >
                      Unlimited availability
                    </Badge>
                  </CardContent>
                </Card>
              </Animate>

              <Animate name="fadeIn" trigger="onVisible" delay={600}>
                <Card className="border-green-500/40 bg-green-500/15 hover:bg-green-500/25 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-xl bg-green-500/30 flex items-center justify-center mb-4">
                      <Image
                        src="/images/checkmark-circle.svg"
                        alt="Check circle icon representing success"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <CardTitle className="text-green-300 text-xl">Consistent, Brand-Safe Guidance</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-card-foreground leading-relaxed flex-1">
                      The assistant speaks in your destination&apos;s voice and stays aligned with your official content.
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-4 border-green-500/40 text-green-300 bg-green-500/25 text-xs"
                    >
                      Brand consistency
                    </Badge>
                  </CardContent>
                </Card>
              </Animate>

              <Animate name="fadeIn" trigger="onVisible" delay={700}>
                <Card className="border-green-500/40 bg-green-500/15 hover:bg-green-500/25 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-xl bg-green-500/30 flex items-center justify-center mb-4">
                      <Image
                        src="/images/trending-up.svg"
                        alt="Trending up icon representing growth"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <CardTitle className="text-green-300 text-xl">Demand Captured & Routed</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-card-foreground leading-relaxed flex-1">
                      Subsights guides planners to priority actions; lodging pages, deals, partner listings, and themed itineraries.
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-4 border-green-500/40 text-green-300 bg-green-500/25 text-xs"
                    >
                      Increased visitation
                    </Badge>
                  </CardContent>
                </Card>
              </Animate>
            </div>
          </section>

          {/* 3. WHO WE ARE SECTION */}
          <section className="space-y-8 sm:space-y-12">
            <Animate name="fadeIn" trigger="onVisible" className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                Who We Are
              </h2>
              <p className="text-lg sm:text-xl text-[#F5E6D3] max-w-3xl mx-auto px-2">
                Subsights AI is your strategic partner for converting trip planners and driving visitation
              </p>
            </Animate>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <Animate name="fadeIn" trigger="onVisible" delay={100}>
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#561f37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/images/suitcase.svg"
                          alt="Suitcase icon representing business solutions"
                          width={32}
                          height={32}
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3">
                          Qualify Trip Intent & Route to Partners
                        </h3>
                        <p className="text-[#F5E6D3] leading-relaxed text-sm sm:text-base">
                          Our AI gauges timing, interests, and budget, then routes planners to the right stays, experiences, neighborhoods, and events.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#561f37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/images/map-with-pins.svg"
                          alt="Map with pins icon representing expert guidance"
                          width={32}
                          height={32}
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3">
                          Provide Expert, On-Brand Local Answers
                        </h3>
                        <p className="text-[#F5E6D3] leading-relaxed text-sm sm:text-base">
                          Our AI answers complex planning in your brand voice, deep-links to the right page or event, and updates hourly via sitemap sync.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="h-12 w-12 sm:h-16 sm:w-16 bg-[#561f37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/images/sales-funnel.svg"
                          alt="Sales funnel icon representing lead qualification"
                          width={32}
                          height={32}
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3">
                          Drive Visitation & Strategic Objectives
                        </h3>
                        <p className="text-[#F5E6D3] leading-relaxed text-sm sm:text-base">
                          Our AI captures post-click demand, drives referrals, itinerary views, and bookings, and nudges shoulder-season travel and feeder markets.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Animate>

              <Animate name="fadeIn" trigger="onVisible" delay={200}>
                <Card className="border-[#561f37]/30 bg-[#561f37]/15 p-4 sm:p-8">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center">
                      <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Trusted By Industry Leaders</h4>
                      <div className="flex justify-center items-center gap-4 sm:gap-6">
                        <a
                          href="https://visitsunvalley.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-16 h-16 sm:w-20 sm:h-20 bg-foreground/10 rounded-lg flex items-center justify-center p-1 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-label="Visit VSV website"
                        >
                          <Image
                            src="/images/client-logos/vsv.avif"
                            alt="VSV company logo"
                            width={72}
                            height={72}
                            className="w-full h-full object-contain"
                          />
                        </a>
                        <a
                          href="https://www.dylanstours.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-16 h-16 sm:w-20 sm:h-20 bg-foreground/10 rounded-lg flex items-center justify-center p-1 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-label="Visit Dylan's Tours website"
                        >
                          <Image
                            src="/images/client-logos/dylan's tours.avif"
                            alt="Dylan&apos;s Tours company logo"
                            width={72}
                            height={72}
                            className="w-full h-full object-contain"
                          />
                        </a>
                        <a
                          href="https://intrustfunding.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-16 h-16 sm:w-20 sm:h-20 bg-foreground/10 rounded-lg flex items-center justify-center p-1 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-label="Visit Intrust website"
                        >
                          <Image
                            src="/images/client-logos/intrust.avif"
                            alt="Intrust company logo"
                            width={72}
                            height={72}
                            className="w-full h-full object-contain"
                          />
                        </a>
                        <a
                          href="https://www.allalliedhealthschools.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-16 h-16 sm:w-20 sm:h-20 bg-foreground/10 rounded-lg flex items-center justify-center p-1 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-label="Visit Allied Health website"
                        >
                          <Image
                            src="/images/client-logos/allied-health.svg"
                            alt="Allied Health company logo"
                            width={72}
                            height={72}
                            className="w-full h-full object-contain grayscale brightness-150 filter"
                          />
                        </a>
                      </div>
                    </div>

                    <div className="text-center p-4 sm:p-6 bg-foreground/5 rounded-xl border border-foreground/10">
                      <blockquote className="text-card-foreground italic leading-relaxed text-sm sm:text-base">
                        &ldquo;Subsights has been a game-changer. Our AI assistant handles the vast majority of our online inquiries, which has freed up our team to focus on providing exceptional in-person guest services.&rdquo;
                      </blockquote>
                      <cite className="text-foreground font-medium not-italic mt-3 sm:mt-4 block text-sm sm:text-base">
                        — Intrust Funding Principal
                      </cite>
                    </div>
                  </div>
                </Card>
              </Animate>
            </div>
          </section>

          {/* 4. CALL TO ACTION SECTION */}
          <section className="py-12 sm:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="relative isolate bg-gradient-to-br from-[#d87651] via-[#c86a4a] via-30% to-[#561f37] rounded-2xl sm:rounded-3xl p-8 sm:p-20">
                <div className="text-center space-y-8 sm:space-y-12">
                  <Animate name="fadeIn" trigger="onVisible">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                      Ready to Drive Visitation?
                    </h2>
                    <p className="text-lg sm:text-xl text-[#F5E6D3] max-w-3xl mx-auto px-2">
                      Join DMOs guiding planners to stays, experiences, and events—automatically, 24/7
                    </p>
                  </Animate>

                  <Animate name="fadeIn" trigger="onVisible" delay={200}>
                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                      <div className="space-y-3 sm:space-y-4">
                        <Button size="lg" className="mx-auto min-w-[140px] w-full sm:w-auto bg-[#561f37] hover:bg-[#561f37]/90">
                          Schedule Call
                        </Button>
                        <p className="text-xs sm:text-sm text-[#F5E6D3] leading-relaxed">
                          Book a personalized consultation to discuss your specific needs
                        </p>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <Button variant="outline" size="lg" className="mx-auto min-w-[140px] w-full sm:w-auto bg-[#F5E6D3] text-[#561f37] border-[#F5E6D3] hover:bg-[#F5E6D3]/90 hover:text-[#561f37]">
                          Start Free Trial
                        </Button>
                        <p className="text-xs sm:text-sm text-[#F5E6D3] leading-relaxed">
                          Try Subsights free for 30 days. No credit card required
                        </p>
                      </div>
                    </div>
                  </Animate>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
