import { z } from 'zod';

// Zod schema for legal page overview
const LegalPageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  lastUpdated: z.string(),
});

// Derive TypeScript types from Zod schemas
export type LegalPageOverview = z.infer<typeof LegalPageSchema>;

export interface LegalPage extends LegalPageOverview {
  content: string;
  htmlContent: string;
}

// Export the schema for validation in utilities
export { LegalPageSchema };
