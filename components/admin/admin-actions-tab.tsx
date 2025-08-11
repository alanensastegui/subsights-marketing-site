import { DEMO_TARGETS } from "@/lib/demo/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DemoEvent } from "@/lib/demo/analytics";

interface AdminActionsTabProps {
    events: DemoEvent[];
    getSuccessRate: (slug: string) => number;
}

export function AdminActionsTab({ events, getSuccessRate }: AdminActionsTabProps) {
    const getAverageSuccessRate = () => {
        if (DEMO_TARGETS.length === 0) return 100;
        const total = DEMO_TARGETS.reduce((sum, target) => sum + getSuccessRate(target.slug), 0);
        return Math.round(total / DEMO_TARGETS.length);
    };

    const getMostCommonReason = () => {
        if (events.length === 0) return 'N/A';

        const reasonCounts: Record<string, number> = {};
        events.forEach(event => {
            reasonCounts[event.reason] = (reasonCounts[event.reason] || 0) + 1;
        });

        const sorted = Object.entries(reasonCounts)
            .sort(([, a], [, b]) => (b as number) - (a as number));

        return sorted[0]?.[0] || 'N/A';
    };

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
                            <div>Avg Success Rate: {getAverageSuccessRate()}%</div>
                            {events.length > 0 && (
                                <>
                                    <div>Session ID: {events[0]?.sessionId?.slice(-8) || 'N/A'}</div>
                                    <div>Most Common Reason: {getMostCommonReason()}</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
