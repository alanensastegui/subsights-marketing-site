interface DemoLoadingProps {
    message?: string;
}

export function DemoLoading({ message = "Loading demo..." }: DemoLoadingProps) {
    return (
        <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-10"
            aria-busy
            role="status"
            aria-live="polite"
            data-testid="demo-loading"
        >
            <div className="text-center space-y-2">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                <p className="text-sm text-muted-foreground">{message}</p>
            </div>
        </div>
    );
}
