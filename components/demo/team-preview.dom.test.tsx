import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen, act } from '@testing-library/react';
import { TeamPreview } from './team-preview';
import { PROSPECT_DEMOS } from '@/lib/demo/config/prospects';

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  cleanup();
  window.history.replaceState(null, '', '/');
  vi.restoreAllMocks();
});

it.each([
  ['#sample-report', 'Email report', 'Weekly sample report'],
  ['#sample-notification', 'Staff email', 'Sample staff notification'],
  ['#sample-improvement', 'Improve answers', 'Example correction review'],
] as const)('opens %s as its labelled sample from a chat link', (hash, tab, label) => {
  window.history.replaceState(null, '', '/demo/forks' + hash);
  vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
  render(<TeamPreview demo={PROSPECT_DEMOS.find(demo => demo.slug === 'forks')!} />);
  expect(screen.getByRole('tab', { name: tab }).getAttribute('aria-selected')).toBe('true');
  expect(screen.getByLabelText(label)).toBeTruthy();
  expect(screen.getByText(/Your test chat above does/)).toBeTruthy();
});

it('handles later sample navigation and removes the listener on unmount', () => {
  vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
  const remove = vi.spyOn(window, 'removeEventListener');
  const { unmount } = render(<TeamPreview demo={PROSPECT_DEMOS[0]} />);
  act(() => {
    window.history.replaceState(null, '', '#sample-report');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
  expect(screen.getByLabelText('Weekly sample report')).toBeTruthy();
  unmount();
  expect(remove).toHaveBeenCalledWith('hashchange', expect.any(Function));
});
