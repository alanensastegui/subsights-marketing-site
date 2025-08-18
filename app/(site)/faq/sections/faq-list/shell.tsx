"use client";

import { useEffect, useMemo, useState } from "react";
import FAQListClient from "./client";
import type { FAQ } from "./faq-utils";

type Props = { copy: { faqs: FAQ[] }; children: React.ReactNode };

export default function FAQShell({ copy, children }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const overlayActive = useMemo(
    () => Boolean(searchQuery || selectedCategory),
    [searchQuery, selectedCategory]
  );

  useEffect(() => {
    const el = document.getElementById("faq-server");
    if (!el) return;
    el.toggleAttribute("hidden", overlayActive);
    el.setAttribute("aria-hidden", String(overlayActive));
    el.toggleAttribute("inert", overlayActive);
  }, [overlayActive]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <FAQListClient
        copy={copy}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
      />
      {children}
    </section>
  );
}