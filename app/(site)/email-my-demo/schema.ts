import { z } from "zod";

export function normalizeWebsite(value: unknown) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed);
  return hasScheme ? trimmed : `https://${trimmed}`;
}

export const EmailMyDemoSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  company: z.string().min(1, "Required"),
  website: z.preprocess(normalizeWebsite, z.url("Enter a valid URL (e.g., https://example.com)")),
  marketingOptIn: z.boolean().optional().default(false),
});

export type EmailMyDemoInput = z.infer<typeof EmailMyDemoSchema>;
