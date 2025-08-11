import { FALLBACK_MESSAGES } from "@/lib/demo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DemoEvent } from "@/lib/demo/analytics";

interface AdminEventsTabProps {
    events: DemoEvent[];
    eventStats: { total: number; byReason: Record<string, number>; byMode: Record<string, number> } | null;
}

export function AdminEventsTab({ events, eventStats }: AdminEventsTabProps) {
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
}
