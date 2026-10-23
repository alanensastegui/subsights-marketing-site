import { z } from 'zod';

export function normalizeWebsite(value: unknown) {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
}

function emptyStringToUndefined(value: unknown) {
  if (typeof value !== 'string') return value;
  return value.trim() === '' ? undefined : value.trim();
}

export const EmailMyDemoSchema = z.object({
  firstName: z.string().trim().min(1, 'Enter your first name').max(80),
  lastName: z.string().trim().min(1, 'Enter your last name').max(80),
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email')
    .email('Enter a valid email')
    .max(254),
  company: z.preprocess(emptyStringToUndefined, z.string().max(160).optional()),
  website: z.preprocess(
    (value) => normalizeWebsite(emptyStringToUndefined(value)),
    z
      .url('Enter a valid website (e.g., example.com)')
      .max(500)
      .refine(
        (value) => !/\s/.test(value),
        'Remove spaces from the website address'
      )
      .refine(
        (value) => /^https?:\/\//i.test(value),
        'Use an http or https website'
      )
      .optional()
  ),
  industry: z
    .enum(['destinations', 'lenders', 'publishers', 'other'])
    .optional(),
  customerQuestion: z.string().trim().max(600).optional(),
  marketingOptIn: z.boolean().optional().default(false),
});

export type EmailMyDemoInput = z.infer<typeof EmailMyDemoSchema>;
