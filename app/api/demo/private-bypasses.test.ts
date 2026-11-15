import { afterEach, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET as site } from './site/[slug]/route';
import { GET as probe } from './probe/route';
import { GET as relay } from './relay/route';
import { PRIVATE_DEMO_IDENTITIES } from '@/lib/demo/config/private-identities';
afterEach(() => vi.unstubAllGlobals());
it.each(Object.keys(PRIVATE_DEMO_IDENTITIES))('does not expose %s through the old site/probe/relay URLs', async slug => {
  const upstream = vi.fn(); vi.stubGlobal('fetch', upstream);
  const unknown = 'no-such-demo';
  for (const name of [slug, unknown]) {
    const response = await site(new NextRequest(`https://example.test/api/demo/site/${name}?force=proxy`), { params: Promise.resolve({ slug: name }) });
    expect(response.status).toBe(404);
    expect((await probe(new NextRequest(`https://example.test/api/demo/probe?slug=${name}`))).status).toBe(404);
    expect((await relay(new NextRequest(`https://example.test/api/demo/relay?slug=${name}&url=https%3A%2F%2Fexample.test%2F`))).status).toBe(404);
  }
  expect(upstream).not.toHaveBeenCalled();
});
