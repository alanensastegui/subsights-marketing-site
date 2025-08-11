interface HeroProps {
    title: string;
    subtitle: string;
    primaryAction?: {
        text: string;
        href: string;
    };
    secondaryAction?: {
        text: string;
        href: string;
    };
}

export function Hero({ title, subtitle, primaryAction, secondaryAction }: HeroProps) {
    return (
        <section className="text-center space-y-8 py-20">
            <h1 className="text-5xl font-bold tracking-tight">
                {title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
            </p>
            {(primaryAction || secondaryAction) && (
                <div className="flex gap-4 justify-center">
                    {primaryAction && (
                        <a
                            href={primaryAction.href}
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                        >
                            {primaryAction.text}
                        </a>
                    )}
                    {secondaryAction && (
                        <a
                            href={secondaryAction.href}
                            className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            {secondaryAction.text}
                        </a>
                    )}
                </div>
            )}
        </section>
    );
}
