"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export default function PricingToggle({ isAnnual }: { isAnnual: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localIsAnnual, setLocalIsAnnual] = useState(isAnnual);

  // Sync local state with URL params
  useEffect(() => {
    setLocalIsAnnual(isAnnual);
  }, [isAnnual]);

  const handleToggle = () => {
    const newIsAnnual = !localIsAnnual;
    setLocalIsAnnual(newIsAnnual);

    // Update URL without causing page reload
    const params = new URLSearchParams(searchParams);
    if (newIsAnnual) {
      params.set("billing", "annual");
    } else {
      params.set("billing", "monthly");
    }

    // Use replace to avoid adding to browser history
    router.replace(`/pricing?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4 relative">
        <div className="relative">
          <Button
            variant="ghost"
            className={cn(
              "text-sm px-3 py-2 rounded-md transition-colors",
              localIsAnnual
                ? "text-foreground font-medium bg-primary/10"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => {
              setLocalIsAnnual(true);
              router.replace("/pricing?billing=annual", { scroll: false });
            }}
          >
            Annual
            {/* Discount label positioned relative to the Annual text */}
            {localIsAnnual && (
              <div className="absolute left-1/2 -top-8 -translate-x-1/2">
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full whitespace-nowrap">
                  Save {Math.floor(2 / 12 * 100)}%
                </span>
              </div>
            )}
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className="relative p-1 hover:bg-transparent"
        >
          <div className="w-12 h-6 bg-muted rounded-full p-1 cursor-pointer hover:bg-muted/80 transition-colors">
            <div className={cn(
              "w-4 h-4 bg-primary rounded-full transition-transform duration-200 ease-in-out",
              localIsAnnual ? "translate-x-0" : "translate-x-6"
            )} />
          </div>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "text-sm px-3 py-2 rounded-md transition-colors",
            !localIsAnnual
              ? "text-foreground font-medium bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => {
            setLocalIsAnnual(false);
            router.replace("/pricing?billing=monthly", { scroll: false });
          }}
        >
          Monthly
        </Button>
      </div>
    </div>
  );
}
