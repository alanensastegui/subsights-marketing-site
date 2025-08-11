"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useAdminAuth, useAdminEvents } from "@/components/admin/hooks";
import { AdminHeader, AdminTargetsTab, AdminEventsTab, AdminActionsTab } from "@/components/admin";

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



    const renderTabContent = () => {
        switch (activeTab) {
            case "targets":
                return <AdminTargetsTab getSuccessRate={getSuccessRate} />;
            case "events":
                return <AdminEventsTab events={events} eventStats={eventStats} />;
            case "actions":
                return <AdminActionsTab events={events} getSuccessRate={getSuccessRate} />;
            default:
                return null;
        }
    };

    return (
        <div className="py-12 space-y-8">
            <AdminHeader onRefresh={loadEvents} onClearEvents={handleClearEvents} />

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
