import { DEMO_TARGETS } from "@/lib/demo/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminTargetsTabProps {
    getSuccessRate: (slug: string) => number;
}

export function AdminTargetsTab({ getSuccessRate }: AdminTargetsTabProps) {
    const testDemo = async (slug: string, mode: string) => {
        const url = `/demo/${slug}?force=${mode}`;
        window.open(url, "_blank");
    };

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
}
