"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAdminAuth, useAdminEvents } from "@/components/admin/hooks";
import { AdminHeader, AdminTargetsTab, AdminEventsTab, AdminActionsTab } from "@/components/admin";

/**
 * Demo Admin Dashboard Client Component
 * 
 * IMPORTANT: This dashboard only shows LOCAL browser data stored in localStorage.
 * Each user/device will see their own demo events. This is intentional for:
 * - Zero backend complexity
 * - Privacy compliance
 * - Immediate MVP functionality
 * - Individual testing/debugging
 */
export default function AdminPageClient() {
    const { isAuthorized, password, setPassword, handleLogin } = useAdminAuth();
    const { events, eventStats, loadEvents, handleClearEvents, getSuccessRate } = useAdminEvents();
    const [activeTab, setActiveTab] = useState("targets");

    useEffect(() => {
        // Load events when authorized
        if (isAuthorized) {
            loadEvents();
        }
    }, [isAuthorized, loadEvents]);

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

    return (
        <div className="py-12 space-y-8">
            <AdminHeader onRefresh={loadEvents} onClearEvents={handleClearEvents} />

            {/* 
              💡 Tab Variants Demo:
              - Current: variant="default" (rounded, muted background)
              - Try: variant="underline" for clean underline tabs
              - Try: size="sm" or size="lg" for different sizes
              
              Example: <TabsList variant="underline" size="lg">
            */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="targets">Demo Targets</TabsTrigger>
                    <TabsTrigger value="events">Recent Events</TabsTrigger>
                    <TabsTrigger value="actions">Quick Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="targets" className="mt-6">
                    <AdminTargetsTab getSuccessRate={getSuccessRate} />
                </TabsContent>

                <TabsContent value="events" className="mt-6">
                    <AdminEventsTab events={events} eventStats={eventStats} />
                </TabsContent>

                <TabsContent value="actions" className="mt-6">
                    <AdminActionsTab events={events} getSuccessRate={getSuccessRate} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
