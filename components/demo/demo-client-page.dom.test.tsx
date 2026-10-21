import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import DemoPageClient from './demo-client-page';

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

afterEach(cleanup);

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
