import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import DemoPageClient from './demo-client-page';
const publicTarget = { slug: 'public-example', label: 'Public Example', url: 'https://example.test/', testMessage: 'Hello', scriptTag: '<script data-workspace="workspace" data-api-key="public-example-key"></script>', variant: 'default' as const, policy: 'default' as const };
import * as config from '@/lib/demo/config';

const analytics = vi.hoisted(() => ({
  trackView: vi.fn(),
  trackSuccess: vi.fn(() => new Promise<void>(() => {})),
  logEvent: vi.fn(async () => {}),
}));
const searchParams = new URLSearchParams();
vi.mock('next/navigation', () => ({ useSearchParams: () => searchParams }));
vi.mock('./hooks/use-demo-analytics', () => ({
  useDemoAnalytics: () => analytics,
}));
vi.mock('./demo-overlay', () => ({ DemoOverlay: () => <p>Loading demo</p> }));

afterEach(() => {
  cleanup();
  searchParams.delete('force');
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

it('keeps initial routing behind the loading screen without loading a target iframe', () => {
  vi.spyOn(config, 'getDemoTarget').mockReturnValue(publicTarget);
  const html = renderToString(<DemoPageClient slug={publicTarget.slug} />);
  expect(html).toContain('Loading demo');
  expect(html).not.toContain('<iframe');
});

it('offers a route home when a preview is no longer available', () => {
  render(<DemoPageClient slug="removed-preview" />);
  expect(screen.getByRole('link', { name: 'Back to Home' }).getAttribute('href')).toBe('/');
  expect(screen.queryByRole('link', { name: 'Ask the assistant' })).toBeNull();
  expect(document.querySelector('iframe')).toBeNull();
});

it('opens the actual assistant while analytics is still pending', async () => {
  vi.spyOn(config, 'getDemoTarget').mockReturnValue(publicTarget);
  render(<DemoPageClient slug={publicTarget.slug} />);
  const frame = await screen.findByTitle('Public Example assistant');
  const link = screen.getByRole('link', {
    name: 'Open assistant in a new tab',
  });
  expect(link.getAttribute('href')).toMatch(
    /^https:\/\/widget\.subsights\.com\/index\.html\?/
  );
  expect(frame.getAttribute('srcdoc')).toContain('data-iframe="true"');
  expect(screen.queryByText('Loading demo')).toBeNull();
  expect(
    document.querySelector('script[src*="widget.subsights.com"]')
  ).toBeNull();
  expect(analytics.trackSuccess).toHaveBeenCalled();
});

it('uses the assistant for an explicit auto policy', async () => {
  const target = publicTarget;
  vi.spyOn(config, 'getDemoTarget').mockReturnValue({ ...target, policy: 'auto' });
  render(<DemoPageClient slug={target.slug} />);
  expect(await screen.findByRole('link', { name: 'Ask the assistant' })).toBeTruthy();
  expect(screen.queryByTestId('demo-iframe')).toBeNull();
});

it.each(['proxy', 'iframe', 'default'] as const)(
  'preserves the explicit %s policy', async (policy) => {
    const target = publicTarget;
    vi.spyOn(config, 'getDemoTarget').mockReturnValue({ ...target, policy });
    render(<DemoPageClient slug={target.slug} />);
    if (policy === 'default') {
      expect(await screen.findByRole('link', { name: 'Ask the assistant' })).toBeTruthy();
      expect(screen.queryByTestId('demo-iframe')).toBeNull();
    } else {
      expect((await screen.findByTestId('demo-iframe')).getAttribute('src')).toBe(
        policy === 'proxy' ? `/api/demo/site/${target.slug}` : target.url
      );
    }
    expect(analytics.trackView).toHaveBeenCalledWith(policy);
  }
);

it.each(['proxy', 'iframe', 'default'] as const)(
  'lets force=%s override an explicit target policy', async (mode) => {
    const target = publicTarget;
    vi.spyOn(config, 'getDemoTarget').mockReturnValue({
      ...target, policy: mode === 'default' ? 'proxy' : 'default',
    });
    searchParams.set('force', mode);
    render(<DemoPageClient slug={target.slug} />);
    if (mode === 'default') {
      expect(await screen.findByRole('link', { name: 'Ask the assistant' })).toBeTruthy();
      expect(screen.queryByTestId('demo-iframe')).toBeNull();
    } else {
      expect((await screen.findByTestId('demo-iframe')).getAttribute('src')).toBe(
        mode === 'proxy' ? `/api/demo/site/${target.slug}` : target.url
      );
    }
    expect(analytics.trackView).toHaveBeenCalledWith(mode);
  }
);

it('preserves the Phoenix presentation', async () => {
  render(<DemoPageClient slug="phoenix-2025" />);
  expect(await screen.findByRole('link', { name: 'Schedule Call' })).toBeTruthy();
  expect(screen.queryByTestId('demo-iframe')).toBeNull();
  expect(screen.queryByText('Loading demo')).toBeNull();
});
