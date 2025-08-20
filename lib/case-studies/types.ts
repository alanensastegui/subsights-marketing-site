import { z } from 'zod';

// Zod schema for case study overview
const CaseStudyOverviewSchema = z.object({
  slug: z.string(),
  company: z.string(),
  logo: z.string(),
  industry: z.string(),
  website: z.string(),
  overview: z.object({
    challenge: z.string(),
    solution: z.string(),
    keyResults: z.array(z.string()),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
      change: z.string(),
    })).optional(),
  }),
});

// Derive TypeScript types from Zod schemas
export type CaseStudyOverview = z.infer<typeof CaseStudyOverviewSchema>;

export interface CaseStudy extends CaseStudyOverview {
  content: string;
  htmlContent: string;
}

// Export the schema for validation in utilities
export { CaseStudyOverviewSchema };
