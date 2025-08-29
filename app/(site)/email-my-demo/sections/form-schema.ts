import { z } from "zod";

export function normalizeWebsite(value: unknown) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed);
  return hasScheme ? trimmed : `https://${trimmed}`;
}

function emptyStringToUndefined(value: unknown) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

export const EmailMyDemoSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().min(1, "Required").email("Enter a valid email (e.g., you@example.com)"),
  company: z.preprocess(emptyStringToUndefined, z.string().min(1, "Required").optional()),
  website: z.preprocess(
    (v) => normalizeWebsite(emptyStringToUndefined(v)),
    z.url("Enter a valid URL (e.g., https://example.com)").optional()
  ),
  marketingOptIn: z.boolean().optional().default(false),
});

export type EmailMyDemoInput = z.infer<typeof EmailMyDemoSchema>;
