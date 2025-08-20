"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, BarChart3, Eye, MousePointer, DollarSign, Clock, AlertTriangle, User, Globe, Shield, CheckSquare } from "lucide-react";
import { isConsentRequired, getConsentState } from "@/lib/analytics/consent";
import { RUNTIME } from "@/lib/analytics/config";
import { analyticsEventQueue } from "@/lib/analytics/event-queue";

// Event queue item type (matching the one in event-queue.ts)
type EventQueueItem = {
  type: string;
  data: Record<string, unknown>;
  timestamp: string;
  eventCount: number;
};

// ============================================================================
// DEVELOPMENT ANALYTICS DASHBOARD
// ============================================================================

interface AnalyticsEvent {
  id: string;
  type: string;
  timestamp: Date;
  data: Record<string, unknown>;
  url: string;
  userAgent: string;
}

export function DevAnalyticsDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [stats, setStats] = useState({
    pageViews: 0,
    customEvents: 0,
    conversions: 0,
    timing: 0,
    exceptions: 0,
    userProperties: 0,
  });

  useEffect(() => {
    // Register with event queue instead of window events
    const handleAnalyticsEvent = (eventDetail: EventQueueItem) => {
      const newEvent: AnalyticsEvent = {
        id: crypto.randomUUID(),
        type: eventDetail.type,
        timestamp: new Date(),
        data: eventDetail.data,
        url: window.location.href,
        userAgent: navigator.userAgent,
      };

      setEvents(prev => [newEvent, ...prev.slice(0, 49)]); // Keep last 50 events
      updateStats(newEvent.type);
    };

    // Register listener
    analyticsEventQueue.addListener(handleAnalyticsEvent);

    // Mark as ready to flush any queued events
    analyticsEventQueue.ready();

    return () => {
      analyticsEventQueue.removeListener(handleAnalyticsEvent);
    };
  }, []);

  const updateStats = (eventType: string) => {
    setStats(prev => ({
      ...prev,
      [eventType]: prev[eventType as keyof typeof prev] + 1,
    }));
  };

  const clearEvents = () => {
    setEvents([]);
    setStats({
      pageViews: 0,
      customEvents: 0,
      conversions: 0,
      timing: 0,
      exceptions: 0,
      userProperties: 0,
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'pageViews': return <Eye className="h-4 w-4" />;
      case 'customEvents': return <MousePointer className="h-4 w-4" />;
      case 'conversions': return <DollarSign className="h-4 w-4" />;
      case 'timing': return <Clock className="h-4 w-4" />;
      case 'exceptions': return <AlertTriangle className="h-4 w-4" />;
      case 'userProperties': return <User className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'pageViews': return 'bg-blue-500';
      case 'customEvents': return 'bg-green-500';
      case 'conversions': return 'bg-yellow-500';
      case 'timing': return 'bg-purple-500';
      case 'exceptions': return 'bg-red-500';
      case 'userProperties': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsVisible(!isVisible)}
          size="sm"
          className="rounded-full w-12 h-12 shadow-lg"
        >
          <BarChart3 className="h-5 w-5" />
        </Button>
      </div>

      {/* Dashboard Panel */}
      {isVisible && (
        <div className="fixed top-20 left-4 z-50 w-96 max-h-96 bg-background border border-border rounded-lg shadow-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Analytics Dashboard</h3>
              <Badge variant="secondary" className="text-xs">DEV</Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
            {/* Environment Info */}
            <Card className="p-3">
              <CardContent className="p-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-xs font-medium">Environment</p>
                    <p className="text-xs text-muted-foreground">{RUNTIME}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-xs font-medium">Consent Required</p>
                    <p className="text-xs text-muted-foreground">
                      {isConsentRequired() ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                {isConsentRequired() && (
                  <div className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="text-xs font-medium">Analytics Consent</p>
                      <p className="text-xs text-muted-foreground">
                        {getConsentState().analytics ? "Granted" : "Denied"}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(stats).map(([key, value]) => (
                <Card key={key} className="p-2">
                  <CardContent className="p-2 flex items-center gap-2">
                    <div className={`p-1 rounded ${getEventColor(key)}`}>
                      {getEventIcon(key)}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="font-semibold text-sm">{value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Events */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Recent Events</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearEvents}
                  className="text-xs"
                >
                  Clear
                </Button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {events.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    No events tracked yet. Try navigating or clicking buttons.
                  </p>
                ) : (
                  events.map((event) => (
                    <Card key={event.id} className="p-2">
                      <CardContent className="p-2">
                        <div className="flex items-start gap-2">
                          <div className={`p-1 rounded ${getEventColor(event.type)}`}>
                            {getEventIcon(event.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium capitalize">
                              {event.type.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {event.timestamp.toLocaleTimeString()}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {event.url}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
