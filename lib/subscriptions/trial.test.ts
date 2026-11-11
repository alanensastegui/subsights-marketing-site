import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FREE_TRIAL_DAYS } from "./plans";

// The site assistant answers trial questions from these files, so they must
// promise the trial length checkout actually gives.
const ASSISTANT_SOURCES = [
  "lib/site-assistant/content/pricing.txt",
  "lib/site-assistant/content/destinations.txt",
  "lib/site-assistant/system.txt",
];

const TRIAL_LENGTH = /trial[^.\d]{0,12}(\d+)[- ]days?|(\d+)[- ]days?[^.\d]{0,25}trial/gi;

const trialLengths = (text: string) =>
  [...text.matchAll(TRIAL_LENGTH)].map((m) => Number(m[1] ?? m[2]));

describe("free trial length", () => {
  it("is one month", () => {
    expect(FREE_TRIAL_DAYS).toBe(30);
  });

  it("reads trial lengths from ordinary wording", () => {
    expect(trialLengths("General free trial: 14 days, no card.")).toEqual([14]);
    expect(trialLengths("The general trial is 30 days without payment.")).toEqual([30]);
    expect(trialLengths("not the 14-day self-serve trial.")).toEqual([14]);
  });

  it.each(ASSISTANT_SOURCES)("%s states the current trial length", (path) => {
    const lengths = trialLengths(readFileSync(join(process.cwd(), path), "utf8"));
    expect(lengths.length).toBeGreaterThan(0);
    expect(new Set(lengths)).toEqual(new Set([FREE_TRIAL_DAYS]));
  });
});
