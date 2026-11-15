import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { PrivateDemoPage } from './private-demo-page';
import { shareKey } from '@/lib/demo/share-link';
vi.mock('./prospect-demo', () => ({ ProspectDemoPage: ({ demo }: { demo: { label: string } }) => <div>{demo.label}<a href="#team-preview">Team sample</a><div id="team-preview" /></div> }));
const preview = { prospect: null, target: { label: 'Authorized Organization', url: 'https://example.test/' }, widgetUrl: 'https://widget.example.test/index.html?workspace_id=isolated#api_key=isolated-capability', comparison: null, measured: null };
afterEach(() => { cleanup(); vi.unstubAllGlobals(); window.history.replaceState(null, '', '/'); document.title = ''; });
it('server-renders only a generic shell, even with a known private slug', () => {
  const html = renderToString(<PrivateDemoPage slug="forks" />);
  expect(html).not.toContain('Authorized Organization'); expect(html).not.toContain('<iframe'); expect(html).not.toContain('api_key');
});
it('keeps an old predictable URL neutral without requesting customer data', async () => {
  const upstream = vi.fn(); vi.stubGlobal('fetch', upstream);
  render(<PrivateDemoPage slug="forks" />);
  expect(await screen.findByRole('heading', { name: 'Demo unavailable' })).toBeTruthy(); expect(upstream).not.toHaveBeenCalled(); expect(document.querySelector('iframe')).toBeNull();
});
it('opens the authorized parent-owned chat from a fragment and removes it when revoked', async () => {
  window.history.replaceState(null, '', '/demo/forks#share?key=isolated-capability');
  const upstream = vi.fn(async () => new Response(JSON.stringify(preview)));
  vi.stubGlobal('fetch', upstream); render(<PrivateDemoPage slug="forks" />);
  const frame = await screen.findByTitle('Authorized Organization assistant preview');
  expect(frame.getAttribute('src')).toBe(preview.widgetUrl); expect(frame.getAttribute('srcdoc')).toBeNull(); expect(frame.getAttribute('referrerpolicy')).toBe('no-referrer');
  const [url, options] = upstream.mock.calls[0] as unknown as [string, RequestInit];
  expect(url).toBe('/api/demo/access'); expect(options.method).toBe('POST'); expect(options.body).toBe(JSON.stringify({ slug: 'forks' }));
  expect((options.headers as Record<string,string>).Authorization).toBe('Basic isolated-capability');
  upstream.mockImplementation(async () => new Response('{}', { status: 404 }));
  fireEvent.focus(window); expect(await screen.findByRole('heading', { name: 'Demo unavailable' })).toBeTruthy(); expect(document.querySelector('iframe')).toBeNull(); expect(document.title).toBe('Subsights demo');
});
it('keeps the share capability through preview navigation and reauthorizes Back/reload state', async () => {
  window.history.replaceState(null, '', '/demo/forks#share?key=isolated-capability');
  HTMLElement.prototype.scrollIntoView = vi.fn();
  const upstream = vi.fn(async () => new Response(JSON.stringify({ ...preview, prospect: { label: 'Authorized Organization' } })));
  vi.stubGlobal('fetch', upstream); render(<PrivateDemoPage slug="forks" />);
  fireEvent.click(await screen.findByRole('link', { name: 'Team sample' }));
  expect(window.location.hash).toContain('team-preview'); expect(shareKey(window.location.hash)).toBe('isolated-capability');
  window.history.replaceState(null, '', '/demo/forks'); fireEvent.popState(window);
  await screen.findByRole('heading', { name: 'Demo unavailable' }); expect(document.querySelector('iframe')).toBeNull();
});
it('does not let an older successful authorization reopen a newly denied page', async () => {
  window.history.replaceState(null, '', '/demo/forks#share?key=isolated-capability');
  let release!: (response: Response) => void;
  const upstream = vi.fn().mockImplementationOnce(() => new Promise<Response>(resolve => { release = resolve; })).mockResolvedValue(new Response('{}', { status: 404 }));
  vi.stubGlobal('fetch', upstream); render(<PrivateDemoPage slug="forks" />);
  fireEvent.focus(window); await screen.findByRole('heading', { name: 'Demo unavailable' });
  release(new Response(JSON.stringify(preview))); await waitFor(() => expect(document.querySelector('iframe')).toBeNull());
});

it.each(['503', 'network'])('preserves an authorized chat on a temporary %s recheck', async kind => {
 window.history.replaceState(null, '', '/demo/forks#share?key=isolated-capability');
 const upstream = vi.fn(async () => new Response(JSON.stringify(preview))); vi.stubGlobal('fetch', upstream);
 render(<PrivateDemoPage slug="forks" />); const frame = await screen.findByTitle('Authorized Organization assistant preview');
 upstream.mockImplementation(async () => { if (kind === 'network') throw new Error('network'); return new Response('{}', { status: 503 }); });
 fireEvent.focus(window); await waitFor(() => expect(upstream).toHaveBeenCalledTimes(2));
 expect(document.querySelector('iframe')).toBe(frame); expect(document.title).toBe('Authorized Organization');
});
it('offers a working retry after a temporary first-open failure', async () => {
 window.history.replaceState(null, '', '/demo/forks#share?key=isolated-capability');
 const upstream = vi.fn().mockResolvedValueOnce(new Response('{}', { status: 503 })).mockImplementation(async () => new Response(JSON.stringify(preview))); vi.stubGlobal('fetch', upstream);
 render(<PrivateDemoPage slug="forks" />); fireEvent.click(await screen.findByRole('button', { name: 'Try again' }));
 expect(await screen.findByTitle('Authorized Organization assistant preview')).toBeTruthy();
});
it('does not preserve the previous demo after changing capability during an outage', async () => {
 window.history.replaceState(null, '', '/demo/forks#share?key=isolated-capability');
 const upstream = vi.fn(async () => new Response(JSON.stringify(preview))); vi.stubGlobal('fetch', upstream);
 render(<PrivateDemoPage slug="forks" />); await screen.findByTitle('Authorized Organization assistant preview');
 upstream.mockImplementation(async () => new Response('{}', { status: 503 }));
 window.history.replaceState(null, '', '/demo/forks#share?key=different-capability'); fireEvent(window, new HashChangeEvent('hashchange'));
 await screen.findByRole('button', { name: 'Try again' }); expect(document.querySelector('iframe')).toBeNull();
});
