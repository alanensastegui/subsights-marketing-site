"use client";

import { useEffect, useMemo, useState } from "react";
import { Animate } from "@/components/ui/animate";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Search, MessageCircle, X } from "lucide-react";
import { getCategories, groupByCategory, highlight, type FAQ } from "./faq-utils";
import { getMeta } from "./meta";
import FAQAccordionList from "./faq-accordion-list";
import FAQCategoryHeader from "./faq-category-header";

type ControlledProps = {
  searchQuery?: string;
  selectedCategory?: string | null;
  onSearchChange?: (v: string) => void;
  onCategoryChange?: (v: string | null) => void;
};

export default function FAQListClient({
  copy,
  searchQuery: qProp,
  selectedCategory: cProp,
  onSearchChange,
  onCategoryChange,
}: { copy: { faqs: FAQ[] } } & ControlledProps) {
  const [qState, setQState] = useState(qProp ?? "");
  const [cState, setCState] = useState<string | null>(cProp ?? null);

  const searchQuery = qProp ?? qState;
  const selectedCategory = cProp ?? cState;

  const setSearch = (v: string) => (onSearchChange ? onSearchChange(v) : setQState(v));
  const setCategory = (v: string | null) => (onCategoryChange ? onCategoryChange(v) : setCState(v));

  // Improved Fuse.js configuration
  const [fuse, setFuse] = useState<import("fuse.js").default<FAQ> | null>(null);
  useEffect(() => {
    (async () => {
      const Fuse = (await import("fuse.js")).default;
      setFuse(new Fuse(copy.faqs, {
        keys: [
          { name: "question", weight: 0.7 },
          { name: "answer", weight: 0.3 },
          { name: "category", weight: 0.1 }
        ],
        threshold: 0.3, // More strict threshold
        distance: 100,   // Shorter distance for more precise matches
        ignoreLocation: false, // Consider location for better word matching
        useExtendedSearch: true,
        minMatchCharLength: 3, // Require longer matches
        shouldSort: true,
        includeScore: true,
        includeMatches: true,
        findAllMatches: false // Only return best matches
      }));
    })();
  }, [copy.faqs]);

  // Open an item by hash on load
  const [openedId, setOpenedId] = useState<string | undefined>(undefined);
  useEffect(() => {
    const id = window.location.hash?.slice(1);
    if (id) setOpenedId(id);
  }, []);

  const categories = useMemo(() => getCategories(copy.faqs), [copy.faqs]);

  // Improved search logic with multiple fallback strategies
  const filtered = useMemo(() => {
    const base = selectedCategory ? copy.faqs.filter(f => f.category === selectedCategory) : copy.faqs;
    if (!searchQuery.trim()) return base;

    const query = searchQuery.trim().toLowerCase();

    // Use Fuse.js for fuzzy search
    if (fuse) {
      // Search the full dataset first, then filter by category
      const results = fuse.search(query);
      const matchedItems = results.map((r) => r.item);

      // If a category is selected, filter the results
      if (selectedCategory) {
        return matchedItems.filter((f: FAQ) => f.category === selectedCategory);
      }

      return matchedItems;
    }

    // If Fuse.js isn't loaded yet, return base (no filtering)
    return base;
  }, [copy.faqs, selectedCategory, searchQuery, fuse]);

  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);

  const clearFilters = () => {
    setSearch("");
    setCategory(null);
    setOpenedId(undefined);
  };

  return (
    <div className="mb-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 mb-8">
        <Animate name="fadeInStagger" trigger="onVisible">
          <div className="animate-item relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="text"
              placeholder="Search questions and answers..."
              value={searchQuery}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-base sm:text-lg border-white/10 bg-white/5 text-white placeholder:text-gray-400 focus:border-white/20 focus:ring-white/20"
              aria-label="Search FAQs"
            />
          </div>

          <div className="animate-item flex flex-wrap gap-2 sm:gap-3 justify-center">
            <Badge
              variant="outline"
              className={`cursor-pointer transition-all hover:scale-105 text-xs sm:text-sm ${selectedCategory === null
                ? "bg-white/10 text-white border-white/20"
                : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              onClick={() => setCategory(null)}
            >
              All Categories
            </Badge>

            {categories.map((c) => {
              const meta = getMeta(c);
              const active = selectedCategory === c;
              return (
                <Badge
                  key={c}
                  variant="outline"
                  className={`cursor-pointer transition-all hover:scale-105 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm ${active
                    ? meta.badgeClass
                    : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  onClick={() => setCategory(c)}
                >
                  <meta.Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  {c}
                </Badge>
              );
            })}
          </div>
        </Animate>

        {(searchQuery || selectedCategory) && filtered.length > 0 && (
          <Animate name="fadeIn" trigger="onVisible" delay={200}>
            <div className="text-center space-y-3">
              <p className="text-gray-400 text-sm sm:text-base">
                Found {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="border-white/20 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all text-xs sm:text-sm"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                Clear filters
              </Button>
            </div>
          </Animate>
        )}
      </div>

      {(searchQuery || selectedCategory) && (
        filtered.length > 0 ? (
          <Animate name="fadeInStagger" trigger="onVisible">
            <div className="max-w-4xl mx-auto">
              {Object.entries(grouped).map(([category, faqs]) => (
                <div key={category} className="animate-item mb-8">
                  <FAQCategoryHeader
                    category={category}
                    faqCount={faqs.length}
                  />

                  <FAQAccordionList
                    faqs={faqs}
                    searchQuery={searchQuery}
                    openedId={openedId}
                    onValueChange={setOpenedId}
                    highlight={highlight}
                  />
                </div>
              ))}
            </div>
          </Animate>
        ) : (
          <Animate name="fadeIn" trigger="onVisible">
            <div className="text-center py-8 sm:py-12">
              <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">No results found</h3>
              <p className="text-gray-500 mb-4 text-sm sm:text-base">Try adjusting your search terms or category filter</p>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="border-white/20 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all text-xs sm:text-sm"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                Clear filters
              </Button>
            </div>
          </Animate>
        )
      )}
    </div>
  );
}
