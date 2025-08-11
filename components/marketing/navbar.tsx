interface NavItem {
    label: string;
    href: string;
}

interface NavbarProps {
    items: NavItem[];
    ctaText?: string;
    ctaHref?: string;
}

export function Navbar({ items, ctaText = "Schedule Demo", ctaHref = "/schedule" }: NavbarProps) {
    return (
        <header className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-semibold">
                subsights
            </a>
            <nav className="flex gap-6 text-sm">
                {items.map((item) => (
                    <a key={item.href} href={item.href}>
                        {item.label}
                    </a>
                ))}
                <a
                    href={ctaHref}
                    className="rounded-lg px-3 py-2 bg-primary text-primary-foreground"
                >
                    {ctaText}
                </a>
            </nav>
        </header>
    );
}
