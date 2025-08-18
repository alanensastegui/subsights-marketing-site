import React from "react";
import type { Category } from "./meta";

export type FAQ = {
  id: string;
  category: Category | string;
  question: string;
  answer: string;
};

export const getCategories = (faqs: FAQ[]) =>
  [...new Set(faqs.map(f => f.category))].sort();

export const groupByCategory = (faqs: FAQ[]) =>
  faqs.reduce<Record<string, FAQ[]>>((acc, f) => {
    (acc[f.category] ??= []).push(f);
    return acc;
  }, {});

export const highlight = (text: string, q: string): React.ReactNode => {
  if (!q || !q.trim()) return text;

  const query = q.trim();
  const words = query.split(/\s+/).filter(word => word.length > 0);

  if (words.length === 0) return text;

  // Create a regex pattern that matches any of the search words
  const escapedWords = words.map(word =>
    word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`(${escapedWords.join('|')})`, 'ig');

  return text.split(pattern).map((part, i) => {
    // Check if this part matches any of our search words
    const isMatch = words.some(word =>
      part.toLowerCase() === word.toLowerCase()
    );

    return isMatch ? (
      <mark key={i} className="bg-muted-foreground text-black rounded px-0.5 font-medium">
        {part}
      </mark>
    ) : part;
  });
};