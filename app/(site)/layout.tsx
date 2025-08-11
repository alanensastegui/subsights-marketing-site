import "@/styles/theme.css";
import "@/styles/globals.css";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  type NavItem,
} from "@/components/ui/navigation-menu";

const navItems: NavItem[] = [
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
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                'children' in item ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {item.children.map((child) => (
                          <NavigationMenuLink key={child.label} href={child.href}>
                            {child.label}
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink href={item.href} className={item.className}>
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </header>
        <main className="mx-auto max-w-6xl px-6">{children}</main>
        <footer className="mx-auto max-w-6xl px-6 py-12 text-sm opacity-70">© {new Date().getFullYear()} Subsights</footer>
      </body>
    </html>
  );
}
