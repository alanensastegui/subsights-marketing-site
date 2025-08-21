import "@/styles/globals.css";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    icons: {
        icon: '/images/logo/small-logo.svg',
        shortcut: '/images/logo/small-logo.svg',
        apple: '/images/logo/small-logo.svg',
    },
    openGraph: {
        images: [
            {
                url: '/images/logo/small-logo.svg',
                width: 500,
                height: 500,
                alt: 'Subsights AI Logo',
            },
        ],
    },
    twitter: {
        images: ['/images/logo/small-logo.svg'],
    },
};

export default function DemoLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="h-full">
            <body className="bg-background text-foreground flex flex-col h-full">
                <header className="border-b px-6 py-3 flex items-center justify-between bg-background">
                    {/* TODO: Switch back to internal Link when main site is ready */}
                    <Link href="/" className="flex items-center">
                        <Image src="/images/logo/full-logo.svg" alt="Subsights AI" width={80} height={32} className="h-8 w-auto" />
                    </Link>
                    <div className="text-sm text-muted-foreground">
                        Demo Experience
                    </div>
                </header>
                {children}
                <footer className="border-t px-6 py-3 text-center text-xs">
                    This is a Subsights demo experience •
                    {/* TODO: Switch back to internal Link when main site is ready */}
                    <Link href="/" className="hover:underline ml-1">Learn more</Link>
                </footer>
            </body>
        </html>
    );
}
