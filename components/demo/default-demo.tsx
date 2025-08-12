import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";

interface DefaultDemoProps {
    targetLabel: string;
    scriptTag?: string;
}

export function DefaultDemo({ targetLabel, scriptTag }: DefaultDemoProps) {
    const [widgetStatus, setWidgetStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const mountedRef = useRef(false);

    useEffect(() => {
        if (scriptTag && !mountedRef.current) {
            mountedRef.current = true;
            setWidgetStatus('loading');

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

                    // Handle script load events
                    newScript.onload = () => setWidgetStatus('loaded');
                    newScript.onerror = () => setWidgetStatus('error');

                    // Append the script to the document head
                    document.head.appendChild(newScript);
                } else {
                    setWidgetStatus('error');
                }
            } catch (error) {
                console.error('Failed to load widget:', error);
                setWidgetStatus('error');
            }
        }
    }, [scriptTag]);

    const renderWidgetStatus = () => {
        switch (widgetStatus) {
            case 'loading':
                return (
                    <div className="flex items-center justify-center text-gray-500">
                        <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2" />
                        Loading chat widget...
                    </div>
                );
            case 'loaded':
                return (
                    <div className="flex items-center justify-center text-green-600">
                        <span className="mr-2">✅</span>
                        Chat widget loaded successfully!
                    </div>
                );
            case 'error':
                return (
                    <div className="flex items-center justify-center text-red-600">
                        <span className="mr-2">❌</span>
                        Failed to load chat widget
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-full flex flex-col">
            {/* Demo Content */}
            <div className="flex-1">
                <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
                    {/* Hero Section */}
                    <section className="text-center space-y-6">
                        <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                            🚀 Demo Mode Active
                        </Badge>
                        <h1 className="text-4xl font-bold">
                            Welcome to {targetLabel}
                        </h1>
                        <p className="text-xl max-w-2xl mx-auto">
                            This is a demonstration of how Subsights integrates seamlessly with your website
                            to provide powerful insights and conversion optimization.
                        </p>
                    </section>

                    {/* Widget Demo Section */}
                    {scriptTag && (
                        <section className="text-center space-y-4">
                            <h2 className="text-2xl font-bold">Live Chat Widget Demo</h2>
                            <p className="text-muted-foreground">
                                The Subsights chat widget is now active on this page! Look for the chat icon in the bottom-right corner.
                            </p>
                            <div className="py-4">
                                {renderWidgetStatus()}
                            </div>
                            {widgetStatus === 'loaded' && (
                                <p className="text-sm text-green-600">
                                    🎉 Chat widget is now active! Click the chat icon to start a conversation.
                                </p>
                            )}
                        </section>
                    )}

                    {/* Feature Preview */}
                    <section className="grid md:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                                    <span className="text-blue-600 text-xl">📊</span>
                                </div>
                                <CardTitle>Real-time Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">
                                    Track visitor behavior, page views, and engagement metrics in real-time.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                                    <span className="text-green-600 text-xl">🎯</span>
                                </div>
                                <CardTitle>Smart Targeting</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">
                                    Show personalized content based on visitor behavior and preferences.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                                    <span className="text-purple-600 text-xl">📈</span>
                                </div>
                                <CardTitle>Conversion Optimization</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">
                                    A/B test different experiences to maximize conversion rates.
                                </p>
                            </CardContent>
                        </Card>
                    </section>

                    <Card>
                        <CardContent className="pt-8">
                            <h2 className="text-2xl font-bold">About Our Company</h2>
                            <div className="prose prose-gray max-w-none">
                                <p>
                                    We&apos;re a leading company in our industry, dedicated to providing exceptional
                                    value to our customers. Our team of experts works tirelessly to deliver
                                    innovative solutions that drive results.
                                </p>
                                <p>
                                    With years of experience and a track record of success, we&apos;ve helped thousands
                                    of businesses achieve their goals and grow their revenue.
                                </p>

                                <h3>Our Services</h3>
                                <ul>
                                    <li>Comprehensive analytics and reporting</li>
                                    <li>Custom solution development</li>
                                    <li>24/7 customer support</li>
                                    <li>Expert consultation and strategy</li>
                                </ul>

                                <div className="rounded-lg bg-secondary p-6 not-prose">
                                    <h4 className="font-semibold">Ready to get started?</h4>
                                    <p className="mb-4">
                                        Contact us today to learn more about how we can help your business grow.
                                    </p>
                                    <Button>
                                        Contact Us
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
