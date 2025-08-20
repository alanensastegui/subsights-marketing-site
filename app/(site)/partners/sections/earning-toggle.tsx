"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export default function EarningToggle({ isFoundersClub }: { isFoundersClub: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localIsFoundersClub, setLocalIsFoundersClub] = useState(isFoundersClub);

  // Sync local state with URL params
  useEffect(() => {
    setLocalIsFoundersClub(isFoundersClub);
  }, [isFoundersClub]);

  const handleToggle = () => {
    const newIsFoundersClub = !localIsFoundersClub;
    setLocalIsFoundersClub(newIsFoundersClub);

    // Update URL without causing page reload
    const params = new URLSearchParams(searchParams);
    if (newIsFoundersClub) {
      params.set("tier", "founders");
    } else {
      params.set("tier", "standard");
    }

    // Use replace to avoid adding to browser history
    router.replace(`/partners?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4 relative">
        <div className="relative">
          <Button
            variant="ghost"
            className={cn(
              "text-sm px-3 py-2 rounded-md transition-colors",
              localIsFoundersClub
                ? "text-foreground font-medium bg-primary/10"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => {
              setLocalIsFoundersClub(true);
              router.replace("/partners?tier=founders", { scroll: false });
            }}
          >
            Founders Club
            {/* Premium label positioned relative to the Founders Club text */}
            {localIsFoundersClub && (
              <div className="absolute left-1/2 -top-8 -translate-x-1/2">
                <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap border border-primary/20">
                  Premium Rates
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
              localIsFoundersClub ? "translate-x-0" : "translate-x-6"
            )} />
          </div>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "text-sm px-3 py-2 rounded-md transition-colors",
            !localIsFoundersClub
              ? "text-foreground font-medium bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => {
            setLocalIsFoundersClub(false);
            router.replace("/partners?tier=standard", { scroll: false });
          }}
        >
          Standard Partner
        </Button>
      </div>
    </div>
  );
}
