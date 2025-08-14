import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { Animate } from "@/components/ui/animate";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface DefaultDemoProps {
    targetLabel: string;
    scriptTag?: string;
}

export function DefaultDemo({ scriptTag }: DefaultDemoProps) {
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
        <div className="min-h-full flex flex-col bg-gradient-to-br from-background via-muted to-ring">
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
                                Welcome to Your
                                <span className="block text-primary">AI-Powered Future</span>
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
                                This is a demonstration of how Subsights transforms your website into a 24/7 expert that qualifies, guides, and converts visitors.
                            </p>
                        </Animate>
                    </section>

                    {/* 2. PROBLEMS WE SOLVE SECTION */}
                    <section className="space-y-8 sm:space-y-12">
                        <Animate name="fadeIn" trigger="onVisible" className="text-center">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                                The Problems We Solve
                            </h2>
                            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
                                Traditional customer service is broken
                            </p>
                        </Animate>

                        {/* Desktop: 3-column grid */}
                        <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8">
                            <Animate name="fadeIn" trigger="onVisible" delay={100}>
                                <Card className="border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                                    <CardHeader className="flex-shrink-0">
                                        <div className="h-16 w-16 rounded-xl bg-red-500/20 flex items-center justify-center mb-4">
                                            <Image
                                                src="/images/low-battery.svg"
                                                alt="Low battery icon representing limited resources"
                                                width={32}
                                                height={32}
                                                className="w-8 h-8"
                                            />
                                        </div>
                                        <CardTitle className="text-red-300 text-xl">Expensive & Limited Support</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col">
                                        <p className="text-card-foreground leading-relaxed flex-1">
                                            High staffing costs, limited hours, and overwhelmed teams during peak times. Customers wait hours for responses.
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className="mt-4 border-red-500/30 text-red-300 bg-red-500/20 text-xs"
                                        >
                                            High operational costs
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </Animate>

                            <Animate name="fadeIn" trigger="onVisible" delay={200}>
                                <Card className="border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                                    <CardHeader className="flex-shrink-0">
                                        <div className="h-16 w-16 rounded-xl bg-red-500/20 flex items-center justify-center mb-4">
                                            <Image
                                                src="/images/alert-triangle.svg"
                                                alt="Alert triangle icon representing problems"
                                                width={32}
                                                height={32}
                                                className="w-8 h-8"
                                            />
                                        </div>
                                        <CardTitle className="text-red-300 text-xl">Inconsistent Experience</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col">
                                        <p className="text-card-foreground leading-relaxed flex-1">
                                            Different agents provide varying service quality. Customers get frustrated and leave without solutions.
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className="mt-4 border-red-500/30 text-red-300 bg-red-500/20 text-xs"
                                        >
                                            Angry customers
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </Animate>

                            <Animate name="fadeIn" trigger="onVisible" delay={300}>
                                <Card className="border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                                    <CardHeader className="flex-shrink-0">
                                        <div className="h-16 w-16 rounded-xl bg-red-500/20 flex items-center justify-center mb-4">
                                            <Image
                                                src="/images/trending-down.svg"
                                                alt="Trending down icon representing declining performance"
                                                width={32}
                                                height={32}
                                                className="w-8 h-8"
                                            />
                                        </div>
                                        <CardTitle className="text-red-300 text-xl">Missed Revenue</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col">
                                        <p className="text-card-foreground leading-relaxed flex-1">
                                            Agents miss upsell chances and can&apos;t handle multiple conversations simultaneously. Revenue leaks through the cracks.
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className="mt-4 border-red-500/30 text-red-300 bg-red-500/20 text-xs"
                                        >
                                            Lost sales opportunities
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
                                    <Card className="border-red-500/20 bg-red-500/5">
                                        <CardHeader className="flex-shrink-0">
                                            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl bg-red-500/20 flex items-center justify-center mb-3 sm:mb-4">
                                                <Image
                                                    src="/images/low-battery.svg"
                                                    alt="Low battery icon representing limited resources"
                                                    width={32}
                                                    height={32}
                                                    className="w-6 h-6 sm:w-8 sm:h-8"
                                                />
                                            </div>
                                            <CardTitle className="text-red-300 text-lg sm:text-xl">Expensive & Limited Support</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-card-foreground leading-relaxed text-sm sm:text-base">
                                                High staffing costs, limited hours, and overwhelmed teams during peak times. Customers wait hours for responses.
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className="mt-3 sm:mt-4 border-red-500/30 text-red-300 bg-red-500/20 text-xs"
                                            >
                                                High operational costs
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                </Animate>

                                <div className="flex justify-center">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                </div>

                                <p className="text-center text-muted-foreground text-xs sm:text-sm font-medium">
                                    Here&apos;s how we fix it
                                </p>

                                <Animate name="fadeIn" trigger="onVisible" delay={150}>
                                    <Card className="border-green-500/20 bg-green-500/5">
                                        <CardHeader className="flex-shrink-0">
                                            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl bg-green-500/20 flex items-center justify-center mb-3 sm:mb-4">
                                                <Image
                                                    src="/images/full-battery.svg"
                                                    alt="Full battery icon representing unlimited capacity"
                                                    width={32}
                                                    height={32}
                                                    className="w-6 h-6 sm:w-8 sm:h-8"
                                                />
                                            </div>
                                            <CardTitle className="text-green-300 text-lg sm:text-xl">24/7 Automated Excellence</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-card-foreground leading-relaxed text-sm sm:text-base">
                                                AI handles unlimited conversations simultaneously, never takes breaks, and provides instant expert responses.
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className="mt-3 sm:mt-4 border-green-500/30 text-green-300 bg-green-500/20 text-xs"
                                            >
                                                Significant cost savings
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
                                    <Card className="border-red-500/20 bg-red-500/5">
                                        <CardHeader className="flex-shrink-0">
                                            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl bg-red-500/20 flex items-center justify-center mb-3 sm:mb-4">
                                                <Image
                                                    src="/images/alert-triangle.svg"
                                                    alt="Alert triangle icon representing problems"
                                                    width={32}
                                                    height={32}
                                                    className="w-6 h-6 sm:w-8 sm:h-8"
                                                />
                                            </div>
                                            <CardTitle className="text-red-300 text-lg sm:text-xl">Inconsistent Experience</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-card-foreground leading-relaxed text-sm sm:text-base">
                                                Different agents provide varying service quality. Customers get frustrated and leave without solutions.
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className="mt-3 sm:mt-4 border-red-500/30 text-red-300 bg-red-500/20 text-xs"
                                            >
                                                Angry customers
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                </Animate>

                                <div className="flex justify-center">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                </div>

                                <p className="text-center text-muted-foreground text-xs sm:text-sm font-medium">
                                    Here&apos;s how we fix it
                                </p>

                                <Animate name="fadeIn" trigger="onVisible" delay={250}>
                                    <Card className="border-green-500/20 bg-green-500/5">
                                        <CardHeader className="flex-shrink-0">
                                            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl bg-green-500/20 flex items-center justify-center mb-3 sm:mb-4">
                                                <Image
                                                    src="/images/checkmark-circle.svg"
                                                    alt="Check circle icon representing success"
                                                    width={32}
                                                    height={32}
                                                    className="w-6 h-6 sm:w-8 sm:h-8"
                                                />
                                            </div>
                                            <CardTitle className="text-green-300 text-lg sm:text-xl">Consistent, Expert-Level Service</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-card-foreground leading-relaxed text-sm sm:text-base">
                                                Every customer gets the same high-quality, knowledgeable experience. No more inconsistent service quality.
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className="mt-3 sm:mt-4 border-green-500/30 text-green-300 bg-green-500/20 text-xs"
                                            >
                                                Happy customers
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
                                    <Card className="border-red-500/20 bg-red-500/5">
                                        <CardHeader className="flex-shrink-0">
                                            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl bg-red-500/20 flex items-center justify-center mb-3 sm:mb-4">
                                                <Image
                                                    src="/images/trending-down.svg"
                                                    alt="Trending down icon representing declining performance"
                                                    width={32}
                                                    height={32}
                                                    className="w-6 h-6 sm:w-8 sm:h-8"
                                                />
                                            </div>
                                            <CardTitle className="text-red-300 text-lg sm:text-xl">Missed Revenue</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-card-foreground leading-relaxed text-sm sm:text-base">
                                                Agents miss upsell chances and can&apos;t handle multiple conversations simultaneously. Revenue leaks through the cracks.
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className="mt-3 sm:mt-4 border-red-500/30 text-red-300 bg-red-500/20 text-xs"
                                            >
                                                Lost sales opportunities
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                </Animate>

                                <div className="flex justify-center">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                </div>

                                <p className="text-center text-muted-foreground text-xs sm:text-sm font-medium">
                                    Here&apos;s how we fix it
                                </p>

                                <Animate name="fadeIn" trigger="onVisible" delay={350}>
                                    <Card className="border-green-500/20 bg-green-500/5">
                                        <CardHeader className="flex-shrink-0">
                                            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl bg-green-500/20 flex items-center justify-center mb-3 sm:mb-4">
                                                <Image
                                                    src="/images/trending-up.svg"
                                                    alt="Trending up icon representing growth"
                                                    width={32}
                                                    height={32}
                                                    className="w-6 h-6 sm:w-8 sm:h-8"
                                                />
                                            </div>
                                            <CardTitle className="text-green-300 text-lg sm:text-xl">Revenue Optimization</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-card-foreground leading-relaxed text-sm sm:text-base">
                                                AI intelligently identifies upsell opportunities, applies strategic discounts, and maximizes every customer interaction.
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className="mt-3 sm:mt-4 border-green-500/30 text-green-300 bg-green-500/20 text-xs"
                                            >
                                                Increased conversions
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
                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                                        <svg
                                            className="w-6 h-6 text-primary"
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
                                <p className="text-lg text-muted-foreground mb-8">
                                    Here&apos;s how we fix it
                                </p>
                            </div>
                        </Animate>

                        {/* After Subsights Solutions - Desktop Only */}
                        <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8">
                            <Animate name="fadeIn" trigger="onVisible" delay={500}>
                                <Card className="border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                                    <CardHeader className="flex-shrink-0">
                                        <div className="h-16 w-16 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                                            <Image
                                                src="/images/full-battery.svg"
                                                alt="Full battery icon representing unlimited capacity"
                                                width={32}
                                                height={32}
                                                className="w-8 h-8"
                                            />
                                        </div>
                                        <CardTitle className="text-green-300 text-xl">24/7 Automated Excellence</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col">
                                        <p className="text-card-foreground leading-relaxed flex-1">
                                            AI handles unlimited conversations simultaneously, never takes breaks, and provides instant expert responses.
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className="mt-4 border-green-500/30 text-green-300 bg-green-500/20 text-xs"
                                        >
                                            Significant cost savings
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </Animate>

                            <Animate name="fadeIn" trigger="onVisible" delay={600}>
                                <Card className="border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                                    <CardHeader className="flex-shrink-0">
                                        <div className="h-16 w-16 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                                            <Image
                                                src="/images/checkmark-circle.svg"
                                                alt="Check circle icon representing success"
                                                width={32}
                                                height={32}
                                                className="w-8 h-8"
                                            />
                                        </div>
                                        <CardTitle className="text-green-300 text-xl">Consistent, Expert-Level Service</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col">
                                        <p className="text-card-foreground leading-relaxed flex-1">
                                            Every customer gets the same high-quality, knowledgeable experience. No more inconsistent service quality.
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className="mt-4 border-green-500/30 text-green-300 bg-green-500/20 text-xs"
                                        >
                                            Happy customers
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </Animate>

                            <Animate name="fadeIn" trigger="onVisible" delay={700}>
                                <Card className="border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                                    <CardHeader className="flex-shrink-0">
                                        <div className="h-16 w-16 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                                            <Image
                                                src="/images/trending-up.svg"
                                                alt="Trending up icon representing growth"
                                                width={32}
                                                height={32}
                                                className="w-8 h-8"
                                            />
                                        </div>
                                        <CardTitle className="text-green-300 text-xl">Revenue Optimization</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col">
                                        <p className="text-card-foreground leading-relaxed flex-1">
                                            AI intelligently identifies upsell opportunities, applies strategic discounts, and maximizes every customer interaction.
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className="mt-4 border-green-500/30 text-green-300 bg-green-500/20 text-xs"
                                        >
                                            Increased conversions
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
                            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
                                Subsights AI is your strategic partner for website conversion optimization
                            </p>
                        </Animate>

                        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                            <Animate name="fadeIn" trigger="onVisible" delay={100}>
                                <div className="space-y-6 sm:space-y-8">
                                    <div className="space-y-4 sm:space-y-6">
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
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
                                                    Filter & Qualify Every Lead
                                                </h3>
                                                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                                    Our AI filters for intent, budget, and custom rules, so your sales team only engages with prospects ready to convert.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 sm:space-y-6">
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
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
                                                    Provide Expert, Nuanced Answers
                                                </h3>
                                                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                                    Go beyond FAQs. Our AI handles complex, multi-step questions with the nuance of a human expert, building customer trust around the clock.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 sm:space-y-6">
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
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
                                                    Drive Revenue & Strategic Goals
                                                </h3>
                                                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                                    Our AI intelligently upsells services, applies strategic discounts, and guides every user toward your most important business goals.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Animate>

                            <Animate name="fadeIn" trigger="onVisible" delay={200}>
                                <Card className="border-blue-500/20 bg-blue-500/5 p-4 sm:p-8">
                                    <div className="space-y-4 sm:space-y-6">
                                        <div className="text-center">
                                            <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Trusted By Industry Leaders</h4>
                                            <div className="flex justify-center items-center gap-4 sm:gap-6">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-foreground/10 rounded-lg flex items-center justify-center p-1">
                                                    <Image
                                                        src="/images/client-logos/vsv.avif"
                                                        alt="VSV company logo"
                                                        width={72}
                                                        height={72}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-foreground/10 rounded-lg flex items-center justify-center p-1">
                                                    <Image
                                                        src="/images/client-logos/dylan's tours.avif"
                                                        alt="Dylan&apos;s Tours company logo"
                                                        width={72}
                                                        height={72}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-foreground/10 rounded-lg flex items-center justify-center p-1">
                                                    <Image
                                                        src="/images/client-logos/intrust.avif"
                                                        alt="Intrust company logo"
                                                        width={72}
                                                        height={72}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
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
                            <div className="relative isolate bg-gradient-to-br from-background via-muted/80 to-muted-foreground/30 rounded-2xl sm:rounded-3xl p-8 sm:p-20">
                                <div className="text-center space-y-8 sm:space-y-12">
                                    <Animate name="fadeIn" trigger="onVisible">
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                                            Ready to Transform Your Website?
                                        </h2>
                                        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
                                            Join forward-thinking businesses already converting visitors with Subsights AI
                                        </p>
                                    </Animate>

                                    <Animate name="fadeIn" trigger="onVisible" delay={200}>
                                        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                                            <div className="space-y-3 sm:space-y-4">
                                                <Button size="lg" className="mx-auto min-w-[140px] w-full sm:w-auto">
                                                    Schedule a Call
                                                </Button>
                                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                                    Book a personalized consultation to discuss your specific needs
                                                </p>
                                            </div>

                                            <div className="space-y-3 sm:space-y-4">
                                                <Button variant="outline" size="lg" className="mx-auto min-w-[140px] w-full sm:w-auto">
                                                    Start Free Trial
                                                </Button>
                                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
