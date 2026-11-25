import { afterEach, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';
import { PRIVATE_DEMO_IDENTITIES } from '@/lib/demo/config/private-identities';
const key = 'isolated-private-capability';
afterEach(() => vi.unstubAllGlobals());
function request(slug = 'forks', authorization: string | null = `Basic ${key}`) {
  return new NextRequest('https://example.test/api/demo/access', { method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(authorization ? { authorization } : {}) }, body: JSON.stringify({ slug }) });
}
it.each([['forks', null], ['missing', `Basic ${key}`], ['__proto__', `Basic ${key}`]])('reveals no catalog for %s without a valid capability', async (slug, authorization) => {
  const upstream = vi.fn(); vi.stubGlobal('fetch', upstream);
  const response = await POST(request(slug!, authorization));
  expect(response.status).toBe(404); expect(await response.json()).toEqual({ message: 'Demo unavailable.' });
  expect(response.headers.get('cache-control')).toContain('no-store'); expect(upstream).not.toHaveBeenCalled();
});
it.each([401, 403, 404])('keeps a rejected capability private when native access returns %s', async status => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status })));
  expect((await POST(request())).status).toBe(404);
});
it('selects its own bot identity, does not mint a session, and sends credentials only in headers/fragments', async () => {
  const identity = PRIVATE_DEMO_IDENTITIES.forks;
  const upstream = vi.fn(async (url: string) => new Response(JSON.stringify(url.includes('/demo/access?')
    ? { workspace: identity.workspace, chatbot: identity.bot }
    : { conversations: 2, clicks: 1, measured_since: '2026-11-14' }), { status: 200 }));
  vi.stubGlobal('fetch', upstream);
  const response = await POST(request()); const value = await response.json();
  expect(response.status).toBe(200); expect(value.prospect.slug).toBe('forks');
  expect(value.measured.conversations).toBe(2);
  const widget = new URL(value.widgetUrl); expect(widget.searchParams.has('api_key')).toBe(false);
  expect(new URLSearchParams(widget.hash.slice(1)).get('api_key')).toBe(key);
  for (const [url, options] of upstream.mock.calls as unknown as [string, RequestInit][]) {
    expect(url).not.toContain(key); expect(url).not.toContain('/auth/');
    expect(options.cache).toBe('no-store'); expect(options.headers).toEqual({ Authorization: `Basic ${key}`, Workspace: identity.workspace });
  }
  expect(upstream.mock.calls[0][0]).toContain(`bot=${identity.bot}`);
});
it('rejects a response belonging to a different bot or workspace', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ chatbot: 'foreign', workspace: 'foreign' }))));
  expect((await POST(request())).status).toBe(404);
});
it('removes a previously accepted capability on the next request without caching it', async () => {
  const identity = PRIVATE_DEMO_IDENTITIES.forks;
  const upstream = vi.fn(async (url: string) => new Response(JSON.stringify(url.includes('/demo/access?') ? { workspace: identity.workspace, chatbot: identity.bot } : {})));
  vi.stubGlobal('fetch', upstream); expect((await POST(request())).status).toBe(200);
  upstream.mockImplementation(async () => new Response('{}', { status: 404 }));
  const revoked = await POST(request()); expect(revoked.status).toBe(404); expect(await revoked.json()).toEqual({ message: 'Demo unavailable.' });
});

it.each([429, 500, 503])('keeps temporary native failure %s retryable', async status => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status })));
  const response = await POST(request()); expect(response.status).toBe(503); expect(response.headers.get('cache-control')).toContain('no-store');
});
it('keeps network failure retryable without returning private content', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('network'); }));
  const response = await POST(request()); expect(response.status).toBe(503); expect(await response.json()).toEqual({ message: 'Demo temporarily unavailable.' });
});
it('keeps the existing Postcards demo reachable with its exact native identity', async () => {
 const identity = PRIVATE_DEMO_IDENTITIES['postcards-to-seattle'];
 vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ workspace: identity.workspace, chatbot: identity.bot }))));
 const response = await POST(request('postcards-to-seattle')); expect(response.status).toBe(200); expect((await response.json()).prospect.slug).toBe('postcards-to-seattle');
});

const warm = [
  ['kirkland-community-foundation', 'oBgDPkFN3tlQ'],
  ['simply-bold-design', 'jcptvP98MPg2'],
  ['captured-by-bernadette', 'hH7wwZywyDip'],
] as const;
it.each(warm)('authorizes %s only through its exact native identity', async (slug, bot) => {
  const upstream = vi.fn<(url: string) => Promise<Response>>(async () => new Response(JSON.stringify({ workspace: '0XvceSLk1j', chatbot: bot })));
  vi.stubGlobal('fetch', upstream);
  const response = await POST(request(slug));
  expect(response.status).toBe(200);
  const value = await response.json();
  expect(value.prospect.slug).toBe(slug);
  expect(value.prospect.conversation).toBeUndefined();
  expect(value.prospect.teamView).toEqual([]);
  expect(value.comparison).toBeNull();
  const widget = new URL(value.prospect.widgetUrl);
  expect(widget.searchParams.get('workspace_id')).toBe('0XvceSLk1j');
  expect(widget.searchParams.has('api_key')).toBe(false);
  expect(new URLSearchParams(widget.hash.slice(1)).get('api_key')).toBe(key);
  expect(upstream.mock.calls[0][0]).toContain(`bot=${bot}`);
});
it.each([...warm, ['bellevue', 'gDz1Noxsjr9U'] as const, ['issaquah', 'Cz8TTZvCk7fF'] as const, ['rhawa', 'OW45SH6wfmwS'] as const, ['wmba', 'yXI0jDaoHyCa'] as const, ['crew-seattle', 'tvROp0BfgdvA'] as const, ['wmfha', 'EIMt8YnHb0OK'] as const, ['bellevue-sunrise-rotary', '2CEkfrLiLRKh'] as const, ['redmond-rotary', 'AHp9JueXRvcA'] as const, ['seattle-4-rotary', 'gTNatsF2teOw'] as const])('does not disclose %s for missing, blank, wrong or stale authorization', async (slug, bot) => {
  const upstream = vi.fn(); vi.stubGlobal('fetch', upstream);
  for (const authorization of [null, '', 'Basic ', 'Basic short']) {
    expect((await POST(request(slug, authorization))).status).toBe(404);
  }
  expect(upstream).not.toHaveBeenCalled();
  for (const verified of [
    { chatbot: 'another-warm-bot', workspace: '0XvceSLk1j' },
    { chatbot: bot, workspace: 'another-workspace' },
  ]) {
    upstream.mockResolvedValue(new Response(JSON.stringify(verified)));
    const denied = await POST(request(slug));
    expect(denied.status).toBe(404);
    expect(await denied.json()).toEqual({ message: 'Demo unavailable.' });
  }
  upstream.mockImplementation(async () => new Response(JSON.stringify({ chatbot: bot, workspace: '0XvceSLk1j' })));
  expect((await POST(request(slug))).status).toBe(200);
  upstream.mockImplementation(async () => new Response('{}', { status: 404 }));
  const revoked = await POST(request(slug));
  expect(revoked.status).toBe(404);
  expect(await revoked.json()).toEqual({ message: 'Demo unavailable.' });
});
it.each(['forks', 'kirkland-chamber', 'visit-kitsap-peninsula', 'cascara-capital', 'onlineu', 'secret-burger-kitchen', 'studio-east'])('preserves the existing %s private demo', async slug => {
  const identity = PRIVATE_DEMO_IDENTITIES[slug];
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ workspace: identity.workspace, chatbot: identity.bot }))));
  const response = await POST(request(slug));
  expect(response.status).toBe(200);
  expect((await response.json()).prospect.slug).toBe(slug);
});

it.each([['bellevue', 'gDz1Noxsjr9U'], ['issaquah', 'Cz8TTZvCk7fF'], ['rhawa', 'OW45SH6wfmwS'], ['wmba', 'yXI0jDaoHyCa'], ['crew-seattle', 'tvROp0BfgdvA'], ['wmfha', 'EIMt8YnHb0OK'], ['bellevue-sunrise-rotary', '2CEkfrLiLRKh'], ['redmond-rotary', 'AHp9JueXRvcA'], ['seattle-4-rotary', 'gTNatsF2teOw']])('keeps %s recorded evidence and native assistant on the same authorized identity', async (slug, bot) => {
  const upstream = vi.fn<(url: string) => Promise<Response>>(async () => new Response(JSON.stringify({ workspace: '0XvceSLk1j', chatbot: bot })));
  vi.stubGlobal('fetch', upstream);
  const response = await POST(request(slug));
  expect(response.status).toBe(200);
  const value = await response.json();
  expect(value.prospect.slug).toBe(slug);
  expect(value.prospect.conversation).toBeUndefined();
  expect(value.prospect.teamView).toEqual([]);
  expect(value.comparison.slug).toBe(slug);
  expect(new URL(value.widgetUrl).searchParams.get('workspace_id')).toBe('0XvceSLk1j');
  expect(upstream.mock.calls[0][0]).toContain(`bot=${bot}`);
});
