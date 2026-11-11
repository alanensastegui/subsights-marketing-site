// Measured activity on a Subsights demo page, read from bot-api's counts-only endpoint. No transcripts, names or
// locations ever reach this site. Any failure, or no visitor conversations yet, means the page keeps its samples.
export type DemoEngagement = {
  measuredSince: string;
  conversations: number;
  linkClicks: { link: string; clicks: number }[];
};

const BOT_API_URL = process.env.SUBSIGHTS_BOT_API_URL || 'https://bot-api.subsights.com';

export function readEngagement(body: unknown): DemoEngagement | null {
  if (!body || typeof body !== 'object') return null;
  const value = body as Record<string, unknown>;
  const conversations = value.conversations;
  const since = value.measured_since;
  if (typeof conversations !== 'number' || !Number.isInteger(conversations) || conversations < 1) return null;
  if (typeof since !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(since)) return null;
  const links = Array.isArray(value.link_clicks) ? value.link_clicks : [];
  const linkClicks = links.flatMap((row) => {
    const { link, clicks } = (row ?? {}) as Record<string, unknown>;
    if (typeof link !== 'string' || !/^https?:\/\//.test(link)) return [];
    if (typeof clicks !== 'number' || !Number.isInteger(clicks) || clicks < 1) return [];
    return [{ link, clicks }];
  });
  return { measuredSince: since, conversations, linkClicks };
}

export async function getDemoEngagement(slug: string): Promise<DemoEngagement | null> {
  try {
    const response = await fetch(`${BOT_API_URL}/demo/engagement?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(1500),
    });
    if (!response.ok) return null;
    return readEngagement(await response.json());
  } catch {
    return null;
  }
}

export function formatMeasuredSince(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
