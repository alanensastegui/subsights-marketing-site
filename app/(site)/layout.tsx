import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/theme.css";
import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Partners", href: "/partners" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Schedule Demo", href: "/schedule", className: "rounded-lg px-3 py-2 text-primary-foreground bg-primary" },
];

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-background text-foreground h-full">
        <header className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">
            subsights
          </Link>
          <nav className="flex gap-6 text-sm">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className={cn("flex items-center", item.className)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-6">{children}</main>
        <footer className="mx-auto max-w-6xl px-6 py-12 text-sm opacity-70">© {new Date().getFullYear()} Subsights</footer>
      </body>
    </html>
  );
}
