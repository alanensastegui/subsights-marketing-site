import "@/styles/globals.css";
import "@/styles/theme.css";
import Link from "next/link";
import type { ReactNode } from "react";

export default function DemoLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="h-full">
            <body className="bg-background text-foreground flex flex-col h-full">
                <header className="border-b px-6 py-3 flex items-center justify-between bg-background">
                    <Link href="/" className="flex items-center">
                        <img src="/images/logo/full-logo.svg" alt="Subsights AI" className="h-8 w-auto" />
                    </Link>
                    <div className="text-sm text-muted-foreground">
                        Demo Experience
                    </div>
                </header>
                {children}
                <footer className="border-t px-6 py-3 text-center text-xs">
                    This is a Subsights demo experience •
                    <Link href="/" className="hover:underline ml-1">Learn more about Subsights</Link>
                </footer>
            </body>
        </html>
    );
}
