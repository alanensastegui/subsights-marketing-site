import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
  type NavItem,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
type ExtendedNavItem = NavItem & { isButton?: boolean };

interface DesktopNavigationProps {
  navItems: ExtendedNavItem[];
}

export default function DesktopNavigation({ navItems }: DesktopNavigationProps) {

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        {navItems.map((item) => (
          'children' in item ? (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex w-[500px] gap-6 p-4 md:w-[600px]">
                  {/* Main item in first column if it exists */}
                  {item.mainItem && (
                    <>
                      <div className="flex-shrink-0">
                        <NavigationMenuLink
                          href={item.mainItem.href}
                          className="group relative block w-full rounded-lg p-3 text-sm font-medium leading-none no-underline outline-none transition-all duration-200 ease-out hover:bg-primary/80 hover:text-foreground focus:bg-primary/10 focus:text-foreground hover:scale-[1.02] hover:shadow-sm"
                        >
                          <span className="relative z-10">{item.mainItem.label}</span>
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </NavigationMenuLink>
                      </div>
                      <div className="flex items-center">
                        <Separator orientation="vertical" className="h-16 bg-foreground/20" />
                      </div>
                    </>
                  )}

                  {/* Children items in a grid layout */}
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    {item.children.map((child) => (
                      <NavigationMenuLink
                        key={child.label}
                        href={child.href}
                        className="group relative block w-full rounded-lg p-3 text-sm font-medium leading-none no-underline outline-none transition-all duration-200 ease-out hover:bg-primary/80 hover:text-foreground focus:bg-primary/10 focus:text-foreground hover:scale-[1.02] hover:shadow-sm"
                      >
                        <span className="relative z-10">{child.label}</span>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.label}>
              {item.isButton ? (
                <Button
                  asChild
                  size="sm"
                  data-analytics-id="nav_desktop_demo"
                  data-analytics-name="Email My Demo (Nav)"
                  data-analytics-context='{"source":"nav_desktop","location":"header"}'
                >
                  <Link href={item.href}>
                    {item.label}
                  </Link>
                </Button>
              ) : (
                <NavigationMenuLink
                  href={item.href}
                  className="group relative inline-flex h-10 w-max items-center justify-center rounded-lg bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 ease-out hover:bg-accent/80 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:scale-[1.02] hover:shadow-sm"
                >
                  {item.label}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          )
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
