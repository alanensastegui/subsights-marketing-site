"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { NavItem } from "@/components/ui/navigation-menu";

type ExtendedNavItem = NavItem & { isButton?: boolean };

interface MobileNavigationProps {
  navItems: ExtendedNavItem[];
}

export default function MobileNavigation({ navItems }: MobileNavigationProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemLabel: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemLabel)) {
        newSet.delete(itemLabel);
      } else {
        newSet.add(itemLabel);
      }
      return newSet;
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="sm" className="p-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle mobile menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-transparent backdrop-blur-xl overflow-y-auto scrollbar-hide z-[10000000] border-l-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="flex flex-col gap-4 mt-8 px-6 pb-8">
          {navItems.map((item) => (
            <div key={item.label}>
              {'children' in item ? (
                <div className="space-y-2">
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className="flex items-center justify-between w-full font-medium text-foreground py-3 px-2 rounded-lg hover:bg-primary/5 hover:text-primary transition-all duration-200 ease-out group"
                  >
                    <span className="transition-colors duration-200">{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-all duration-300 ease-out group-hover:scale-110 ${expandedItems.has(item.label) ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${expandedItems.has(item.label)
                      ? 'max-h-96 opacity-100 translate-y-0'
                      : 'max-h-0 opacity-0 -translate-y-2'
                      }`}
                  >
                    <div className="space-y-1 pt-1">
                      {item.mainItem && (
                        <>
                          <SheetClose asChild>
                            <Link
                              href={item.mainItem.href}
                              className="block py-2.5 pl-6 pr-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 ease-out transform hover:translate-x-1"
                            >
                              {item.mainItem.label}
                            </Link>
                          </SheetClose>
                          <Separator className="my-3 mx-2 bg-foreground/20" />
                        </>
                      )}
                      {item.children.map((child, index) => (
                        <SheetClose asChild key={child.label}>
                          <Link
                            href={child.href}
                            className="block py-2.5 pl-6 pr-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 ease-out transform hover:translate-x-1"
                            style={{
                              animationDelay: expandedItems.has(item.label) ? `${index * 50}ms` : '0ms'
                            }}
                          >
                            {child.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                </div>
              ) : item.isButton ? (
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg"
                    data-analytics-id="nav_mobile_demo"
                    data-analytics-name="Email My Demo (Nav Mobile)"
                    data-analytics-context='{"source":"nav_mobile","location":"header"}'
                  >
                    <Link href={item.href}>
                      {item.label}
                    </Link>
                  </Button>
                </SheetClose>
              ) : (
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className="block py-3 px-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 ease-out transform hover:translate-x-1"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
