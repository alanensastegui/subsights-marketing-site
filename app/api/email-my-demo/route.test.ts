import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const environment = vi.hoisted(() => ({
  webhook: 'https://example.test/webhook' as string | undefined,
}));
vi.mock('@/lib/env', () => ({
  getEnvVar: () => environment.webhook,
  isProd: true,
}));

import { POST } from './route';

const payload = {
  firstName: 'Example',
  lastName: 'Visitor',
  email: 'visitor@example.test',
  website: 'example.test',
  industry: 'lenders',
  customerQuestion: 'Does this project fit?',
  marketingOptIn: false,
};
const request = (body = payload) =>
  new Request('https://subsights.test/api/email-my-demo', {
    method: 'POST',
    body: JSON.stringify(body),
  });

beforeEach(() => {
  environment.webhook = 'https://example.test/webhook';
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('website inquiry delivery', () => {
  it('carries the industry and question to the existing delivery path before confirming success', async () => {
    const delivery = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', delivery);
    expect((await POST(request())).status).toBe(200);
    const sent = JSON.parse(delivery.mock.calls[0][1].body);
    expect(sent.content).toContain('Industry: lenders');
    expect(sent.content).toContain('Visitor question: Does this project fit?');
    expect(sent.content).toContain('Website: https://example.test');
    expect(sent.allowed_mentions).toEqual({ parse: [] });
  });
  it('does not claim success when delivery is unavailable', async () => {
    environment.webhook = undefined;
    const delivery = vi.fn();
    vi.stubGlobal('fetch', delivery);
    expect((await POST(request())).status).toBe(503);
    expect(delivery).not.toHaveBeenCalled();
  });
  it.each([false, 'network'])(
    'does not claim success on delivery failure: %s',
    async (failure) => {
      vi.stubGlobal(
        'fetch',
        failure === 'network'
          ? vi.fn().mockRejectedValue(new Error('offline'))
          : vi.fn().mockResolvedValue({ ok: false })
      );
      expect((await POST(request())).status).toBe(503);
    }
  );
  it('rejects invalid inquiries before delivery', async () => {
    const delivery = vi.fn();
    vi.stubGlobal('fetch', delivery);
    expect((await POST(request({ ...payload, email: 'invalid' }))).status).toBe(
      400
    );
    expect(delivery).not.toHaveBeenCalled();
  });
});
