import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import DemoPageClient from './demo-client-page';
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
  const html = renderToString(<DemoPageClient slug="modesto" />);
  expect(html).toContain('Loading demo');
  expect(html).not.toContain('<iframe');
});

it('opens the actual assistant while analytics is still pending', async () => {
  render(<DemoPageClient slug="modesto" />);
  const frame = await screen.findByTitle('Visit Modesto assistant');
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

it.each(config.DEMO_TARGETS.filter(target => target.variant !== 'estoPhoenix').map(target => target.slug))(
  'makes %s usable without waiting for the customer site', async (slug) => {
  render(<DemoPageClient slug={slug} />);

  expect(
    await screen.findByRole('link', { name: 'Ask the assistant' })
  ).toBeTruthy();
  expect(
    screen.getByRole('link', { name: 'Open assistant in a new tab' })
  ).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Share' })).toBeTruthy();
  expect(screen.getByRole('link', { name: 'Open origin' })).toBeTruthy();
  expect(screen.queryByTestId('demo-iframe')).toBeNull();
  expect(screen.queryByText('Loading demo')).toBeNull();
});

it('uses the assistant for an explicit auto policy', async () => {
  const target = config.getDemoTarget('growing-contigo')!;
  vi.spyOn(config, 'getDemoTarget').mockReturnValue({ ...target, policy: 'auto' });
  render(<DemoPageClient slug={target.slug} />);
  expect(await screen.findByRole('link', { name: 'Ask the assistant' })).toBeTruthy();
  expect(screen.queryByTestId('demo-iframe')).toBeNull();
});

it.each(['proxy', 'iframe', 'default'] as const)(
  'preserves the explicit %s policy', async (policy) => {
    const target = config.getDemoTarget('growing-contigo')!;
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
    const target = config.getDemoTarget('modesto')!;
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
