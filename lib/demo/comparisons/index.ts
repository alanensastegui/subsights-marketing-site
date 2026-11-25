import { ComparisonSchema, type Comparison } from './schema';
import secretBurgerKitchen from './secret-burger-kitchen.json';
import studioEast from './studio-east.json';
import bellevue from './bellevue.json';
import issaquah from './issaquah.json';
import rhawa from './rhawa.json';
import wmba from './wmba.json';
import crewSeattle from './crew-seattle.json';
import wmfha from './wmfha.json';
import sunriseRotary from './bellevue-sunrise-rotary.json';

// Add a prospect by dropping <slug>.json here and one line below. A file that does not match the schema fails the
// build (the registry test parses every entry), so a half-written comparison never reaches a prospect.
const FILES: Record<string, unknown> = {
  'secret-burger-kitchen': secretBurgerKitchen,
  'studio-east': studioEast,
  bellevue,
  issaquah,
  rhawa,
  wmba,
  'crew-seattle': crewSeattle,
  wmfha,
  'bellevue-sunrise-rotary': sunriseRotary,
};

export function getComparison(slug: string): Comparison | null {
  const raw = FILES[slug];
  if (!raw) return null;
  return ComparisonSchema.parse(raw);
}

export const COMPARISON_SLUGS = Object.keys(FILES);
