import { z } from 'zod';

// One prospect's side-by-side, written by the Subsights prospect audit tooling. Answers are verbatim: theirs from
// their own chat or what their site makes a visitor do, ours from the demo assistant. Nothing is reworded.
export const TIERS = ['common', 'decisive', 'harmful_if_wrong'] as const;
export type Tier = (typeof TIERS)[number];

const text = z.string().trim().min(1);
const seconds = z.number().nonnegative().max(600).nullable().optional();

export const ComparisonSchema = z.object({
  schema: z.literal('subsights.prospect.comparison.v1'),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  theirs: z.object({ label: text, kind: z.enum(['chat', 'site']), name: text.optional() }),
  asked: z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), note: text.optional() }),
  questions: z
    .array(
      z.object({
        id: text,
        tier: z.enum(TIERS),
        q: text,
        theirs: text,
        // Where "theirs" came from when it differs from the page-level label, e.g. the site when their chat was not asked.
        theirs_source: text.optional(),
        theirs_seconds: seconds,
        ours: text,
        ours_seconds: seconds,
        outcome: text,
        verdict: z.enum(['both_right', 'ours_better', 'theirs_better']).optional(),
      })
    )
    .min(1),
  // "What we found on your site today", stated kindly: what they run, FAQ coverage, the one thing a visitor can't do.
  found: z
    .object({
      tools: z.array(text).min(1),
      faq: text.optional(),
      gap: text.optional(),
      noticed: z.array(text).optional(),
    })
    .optional(),
  cost: z
    .object({
      today: z.array(z.object({ label: text, amount: text, note: text.optional() })).min(1),
      ours: z.object({ plan: text, price: text, includes: text.optional() }),
      timing: z.array(z.object({ label: text, value: text })).optional(),
      tradeoff: text.optional(),
    })
    .optional(),
  partner: z.object({ points: z.array(z.object({ title: text, text })).min(1) }).optional(),
  reliability: z
    .object({
      suite: text,
      checked: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      cases: z.number().int().positive(),
      passed: z.number().int().nonnegative(),
      harmful_if_wrong_failures: z.number().int().nonnegative(),
    })
    .refine((r) => r.passed <= r.cases, 'passed cannot exceed cases')
    .optional(),
});

export type Comparison = z.infer<typeof ComparisonSchema>;
