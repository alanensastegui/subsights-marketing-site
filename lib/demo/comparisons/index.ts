import { ComparisonSchema, type Comparison } from './schema';
import secretBurgerKitchen from './secret-burger-kitchen.json';
import studioEast from './studio-east.json';
import bellevue from './bellevue.json';
import issaquah from './issaquah.json';
import rhawa from './rhawa.json';
import wmba from './wmba.json';
import crewSeattle from './crew-seattle.json';
import wmfha from './wmfha.json';
import bellevueRotary from './bellevue-rotary.json';
import kirklandRotary from './kirkland-rotary.json';
import seattleChamber from './seattle-chamber.json';
import sunriseRotary from './bellevue-sunrise-rotary.json';
import redmondRotary from './redmond-rotary.json';
import seattleRotary from './seattle-4-rotary.json';
import startup425 from './startup425.json';
import gsba from './gsba.json';
import kidder from './kidder-simon-anderson.json';
import oneRedmond from './oneredmond.json';
import creda from './creda.json';
import reaps from './reaps.json';
import northmarq from './northmarq.json';

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
  'bellevue-rotary': bellevueRotary,
  'kirkland-rotary': kirklandRotary,
  'seattle-chamber': seattleChamber,
  'bellevue-sunrise-rotary': sunriseRotary,
  'redmond-rotary': redmondRotary,
  'seattle-4-rotary': seattleRotary,
  startup425,
  'gsba-business-support': gsba,
  'kidder-simon-anderson': kidder,
  oneredmond: oneRedmond,
  creda,
  reaps,
  northmarq,
};

export function getComparison(slug: string): Comparison | null {
  const raw = FILES[slug];
  if (!raw) return null;
  return ComparisonSchema.parse(raw);
}

export const COMPARISON_SLUGS = Object.keys(FILES);
