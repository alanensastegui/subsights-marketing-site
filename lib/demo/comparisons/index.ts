import { ComparisonSchema, type Comparison } from './schema';

// Add a prospect by dropping <slug>.json here and one line below. A file that does not match the schema fails the
// build (the registry test parses every entry), so a half-written comparison never reaches a prospect.
const FILES: Record<string, unknown> = {};

export function getComparison(slug: string): Comparison | null {
  const raw = FILES[slug];
  if (!raw) return null;
  return ComparisonSchema.parse(raw);
}

export const COMPARISON_SLUGS = Object.keys(FILES);
