interface DemoToolbarProps {
    label: string;
    originalUrl: string;
    mode: "iframe" | "proxy" | "default";
}

export function DemoToolbar({ label, originalUrl, mode }: DemoToolbarProps) {
    return (
        <div className="border-b px-4 py-2 flex items-center gap-3 text-sm bg-background">
            <span className="font-medium">{label}</span>
            <a
                className="underline opacity-70 hover:opacity-100"
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                Open origin
            </a>
            <span className="ml-auto opacity-60">Mode: {mode}</span>
        </div>
    );
}
