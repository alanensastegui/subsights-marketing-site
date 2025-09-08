"use client";

import { useMemo, useState } from "react";
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

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 sm:py-12">
      <FAQListClient
        copy={copy}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
      />
      {!overlayActive && children}
    </section>
  );
}