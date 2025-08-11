import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AdminHeaderProps {
    onRefresh: () => void;
    onClearEvents: () => void;
}

export function AdminHeader({ onRefresh, onClearEvents }: AdminHeaderProps) {
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Demo Admin</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        📍 Local browser data only - not shared across devices or users
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={onRefresh}>
                        Refresh
                    </Button>
                    <Button variant="destructive" onClick={onClearEvents}>
                        Clear Events
                    </Button>
                </div>
            </div>

            <Separator />
        </>
    );
}
