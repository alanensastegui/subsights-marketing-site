import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DemoNotFoundProps {
    slug: string;
}

export function DemoNotFound({ slug }: DemoNotFoundProps) {
    return (
        <div className="h-[calc(100vh-80px)] flex items-center justify-center" data-testid="demo-not-found">
            <div className="text-center space-y-4">
                <h2 className="text-xl font-semibold">Demo Not Found</h2>
                <p className="text-muted-foreground">The demo &quot;{slug}&quot; could not be found.</p>
                <Button asChild>
                    <Link href="/">
                        Back to Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}
