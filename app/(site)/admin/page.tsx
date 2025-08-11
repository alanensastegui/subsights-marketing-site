"use client";

import { useState, useEffect } from "react";
import { DEMO_TARGETS } from "@/lib/demo/config";
import { getDemoEvents, clearDemoEvents, getEventStats, type DemoEvent } from "@/lib/demo/analytics";
import { FALLBACK_MESSAGES } from "@/lib/demo/fallback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

/**
 * Demo Admin Dashboard
 * 
 * IMPORTANT: This dashboard only shows LOCAL browser data stored in localStorage.
 * Each user/device will see their own demo events. This is intentional for:
 * - Zero backend complexity
 * - Privacy compliance
 * - Immediate MVP functionality
 * - Individual testing/debugging
 */
export default function AdminPage() {
    const [events, setEvents] = useState<DemoEvent[]>([]);
    const [eventStats, setEventStats] = useState<{ total: number; byReason: Record<string, number>; byMode: Record<string, number> } | null>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState("targets");

    useEffect(() => {
        // Simple password protection - in production, use proper auth
        const stored = localStorage.getItem("admin_authorized");
        if (stored === "true") {
            setIsAuthorized(true);
            loadEvents();
        }
    }, []);

    const loadEvents = () => {
        const demoEvents = getDemoEvents();
        const stats = getEventStats();
        setEvents(demoEvents);
        setEventStats(stats);
    };

    const handleLogin = () => {
        const correctPassword = "subsights2025!";

        if (password === correctPassword) {
            setIsAuthorized(true);
            localStorage.setItem("admin_authorized", "true");
            loadEvents();
        } else {
            alert("Invalid password");
        }
    };

    const handleClearEvents = () => {
        if (confirm("Clear all demo events?")) {
            clearDemoEvents();
            setEvents([]);
            setEventStats({ total: 0, byReason: {}, byMode: {} });
        }
    };

    const testDemo = async (slug: string, mode: string) => {
        const url = `/demo/${slug}?force=${mode}`;
        window.open(url, "_blank");
    };

    if (!isAuthorized) {
        return (
            <div className="py-20">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Demo Admin</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && handleLogin()}
                            />
                        </div>
                        <Button onClick={handleLogin} className="w-full">
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const eventsBySlug = events.reduce((acc, event) => {
        const slug = event.slug || "unknown";
        if (!acc[slug]) acc[slug] = [];
        acc[slug].push(event);
        return acc;
    }, {} as Record<string, DemoEvent[]>);

    const getSuccessRate = (slug: string) => {
        const slugEvents = eventsBySlug[slug] || [];
        const total = slugEvents.length;
        const failures = slugEvents.filter((e: DemoEvent) => e.reason !== "force-policy").length;
        return total > 0 ? Math.round(((total - failures) / total) * 100) : 100;
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "targets":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Demo Targets</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {DEMO_TARGETS.length} configured demo targets
                            </p>
                        </CardHeader>
                        <CardContent className="divide-y">
                            {DEMO_TARGETS.map((target) => (
                                <div key={target.slug} className="py-4 first:pt-0 last:pb-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium">{target.label}</h3>
                                            <p className="text-sm text-muted-foreground">{target.url}</p>
                                            <div className="flex gap-2 mt-1">
                                                <Badge variant="secondary">
                                                    {target.policy || "auto"}
                                                </Badge>
                                                {target.allowIframe === false && (
                                                    <Badge variant="destructive">
                                                        iframe disabled
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-lg font-semibold">
                                                    {getSuccessRate(target.slug)}%
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    success rate
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => testDemo(target.slug, "proxy")}
                                                    className="text-xs h-6 px-2"
                                                >
                                                    Proxy
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => testDemo(target.slug, "iframe")}
                                                    className="text-xs h-6 px-2"
                                                >
                                                    Iframe
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => testDemo(target.slug, "default")}
                                                    className="text-xs h-6 px-2"
                                                >
                                                    Default
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                );
            case "events":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Events</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {events.length} events tracked in this browser only
                            </p>
                            {eventStats && (
                                <div className="mt-2 grid grid-cols-3 gap-4 text-xs">
                                    <div className="bg-accent/20 border border-accent/30 rounded-lg p-2 text-center">
                                        <div className="font-semibold">{eventStats.total}</div>
                                        <div className="text-muted-foreground">Total Events</div>
                                    </div>
                                    <div className="bg-accent/20 border border-accent/30 rounded-lg p-2 text-center">
                                        <div className="font-semibold">{Object.keys(eventStats.byReason).length}</div>
                                        <div className="text-muted-foreground">Fallback Reasons</div>
                                    </div>
                                    <div className="bg-accent/20 border border-accent/30 rounded-lg p-2 text-center">
                                        <div className="font-semibold">{Object.keys(eventStats.byMode).length}</div>
                                        <div className="text-muted-foreground">Demo Modes</div>
                                    </div>
                                </div>
                            )}
                            <div className="mt-2 text-xs text-muted-foreground bg-accent/20 border border-accent/30 rounded-lg p-2">
                                💡 <strong>Local Data Only:</strong> These events are stored in your browser&apos;s local storage.
                                Other team members will see their own events on their devices.
                            </div>
                        </CardHeader>
                        <CardContent className="max-h-96 overflow-y-auto">
                            {events.length === 0 ? (
                                <div className="py-8 text-center text-muted-foreground">
                                    No events recorded yet. Visit some demo pages to see data here.
                                </div>
                            ) : (
                                <div className="divide-y">
                                    {events.slice(0, 50).map((event, index) => (
                                        <div key={index} className="py-3 first:pt-0 last:pb-0">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{event.slug}</span>
                                                        <Badge variant={
                                                            event.chosenMode === "proxy" ? "default" :
                                                                event.chosenMode === "iframe" ? "secondary" :
                                                                    "outline"
                                                        }>
                                                            {event.chosenMode}
                                                        </Badge>
                                                        {event.sessionId && (
                                                            <Badge variant="outline" className="text-xs">
                                                                {event.sessionId.slice(-8)}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {FALLBACK_MESSAGES[event.reason as keyof typeof FALLBACK_MESSAGES] || event.reason}
                                                    </p>
                                                    {event.performance?.loadTime && (
                                                        <p className="text-xs text-muted-foreground">
                                                            Load time: {event.performance.loadTime}ms
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-right text-xs text-muted-foreground">
                                                    {new Date(event.timestamp).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                );
            case "actions":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-medium mb-2">Test All Demos</h3>
                                    <div className="space-y-2">
                                        {DEMO_TARGETS.map((target) => (
                                            <div key={target.slug} className="flex items-center gap-2">
                                                <span className="text-sm min-w-0 flex-1 truncate">{target.label}</span>
                                                <Button
                                                    size="sm"
                                                    asChild
                                                    className="text-xs h-6 px-2"
                                                >
                                                    <a
                                                        href={`/demo/${target.slug}`}
                                                        target="_blank"
                                                    >
                                                        Test
                                                    </a>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">System Info</h3>
                                    <div className="text-sm space-y-1">
                                        <div>Total Targets: {DEMO_TARGETS.length}</div>
                                        <div>Total Events: {events.length}</div>
                                        <div>Avg Success Rate: {
                                            DEMO_TARGETS.length > 0
                                                ? Math.round(DEMO_TARGETS.reduce((sum, target) => sum + getSuccessRate(target.slug), 0) / DEMO_TARGETS.length)
                                                : 100
                                        }%</div>
                                        {eventStats && (
                                            <>
                                                <div>Session ID: {eventStats.total > 0 ? events[0]?.sessionId?.slice(-8) : 'N/A'}</div>
                                                <div>Most Common Reason: {
                                                    Object.entries(eventStats.byReason)
                                                        .sort(([, a], [, b]) => (b as number) - (a as number))[0]?.[0] || 'N/A'
                                                }</div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <div className="py-12 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Demo Admin</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        📍 Local browser data only - not shared across devices or users
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={loadEvents}>
                        Refresh
                    </Button>
                    <Button variant="destructive" onClick={handleClearEvents}>
                        Clear Events
                    </Button>
                </div>
            </div>

            <Separator />

            {/* Tab Navigation */}
            <NavigationMenu className="w-full">
                <NavigationMenuList className="grid w-full grid-cols-3">
                    <NavigationMenuItem className="w-full">
                        <NavigationMenuTrigger
                            className={`w-full ${activeTab === "targets" ? "bg-accent" : ""}`}
                            onClick={() => setActiveTab("targets")}
                        >
                            Demo Targets
                        </NavigationMenuTrigger>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="w-full">
                        <NavigationMenuTrigger
                            className={`w-full ${activeTab === "events" ? "bg-accent" : ""}`}
                            onClick={() => setActiveTab("events")}
                        >
                            Recent Events
                        </NavigationMenuTrigger>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="w-full">
                        <NavigationMenuTrigger
                            className={`w-full ${activeTab === "actions" ? "bg-accent" : ""}`}
                            onClick={() => setActiveTab("actions")}
                        >
                            Quick Actions
                        </NavigationMenuTrigger>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            {/* Tab Content */}
            {renderTabContent()}
        </div>
    );
}
