import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import {
  cleanup,
  render,
  screen,
  act,
  fireEvent,
} from '@testing-library/react';
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
] as const)(
  'opens %s as its labelled sample from a chat link',
  (hash, tab, label) => {
    window.history.replaceState(null, '', '/demo/forks' + hash);
    vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
    render(
      <TeamPreview
        demo={PROSPECT_DEMOS.find((demo) => demo.slug === 'forks')!}
      />
    );
    expect(
      screen.getByRole('tab', { name: tab }).getAttribute('aria-selected')
    ).toBe('true');
    expect(screen.getByLabelText(label)).toBeTruthy();
    expect(screen.getByText(/Your test chat above does/)).toBeTruthy();
  }
);

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

function emitPreview(
  data: unknown,
  origin = 'https://widget.subsights.com',
  source?: Window
) {
  act(() =>
    window.dispatchEvent(new MessageEvent('message', { data, origin, source }))
  );
}

it('applies only this embedded chat’s visual choices, carries a correction, and preserves the frame and draft', () => {
  const demo = PROSPECT_DEMOS.find((demo) => demo.slug === 'forks')!;
  const frame = document.createElement('iframe');
  frame.id = 'demo-assistant-forks';
  document.body.appendChild(frame);
  const draft = document.createElement('input');
  draft.value = 'Keep my next question';
  frame.contentDocument!.body.appendChild(draft);
  const { unmount } = render(<TeamPreview demo={demo} />);
  const message = (preview: object) => ({
    type: 'subsights:demo-preview',
    version: 1,
    preview: { demo_slug: 'forks', ...preview },
  });
  emitPreview(
    message({ sample: 'report', cadence: 'weekly' }),
    undefined,
    frame.contentWindow!
  );
  expect(screen.getByLabelText('Weekly sample report')).toBeTruthy();
  emitPreview(
    message({ sample: 'report', cadence: 'monthly', staff_alerts: false }),
    undefined,
    frame.contentWindow!
  );
  expect(screen.getByLabelText('Monthly sample report')).toBeTruthy();
  expect(screen.getByRole('status').textContent).toContain(
    'monthly report · Staff alerts off'
  );
  // A staff-email example remains illustrative; opening it doesn't enable alerts or reset cadence.
  emitPreview(
    message({ sample: 'notification' }),
    undefined,
    frame.contentWindow!
  );
  expect(screen.getByLabelText('Sample staff notification')).toBeTruthy();
  expect(screen.getByRole('status').textContent).toContain(
    'monthly report · Staff alerts off'
  );
  expect(window.location.hash).toBe(
    '#sample-notification?cadence=monthly&staff-alerts=off'
  );
  expect(frame.contentDocument!.body.contains(draft)).toBe(true);
  expect(draft.value).toBe('Keep my next question');
  expect(screen.getByText(/Not saved or activated/)).toBeTruthy();
  for (const [origin, source, preview] of [
    [
      'https://evil.example',
      frame.contentWindow,
      { sample: 'report', cadence: 'daily' },
    ],
    [
      'https://widget.subsights.com',
      window,
      { sample: 'report', cadence: 'daily' },
    ],
    [
      'https://widget.subsights.com',
      frame.contentWindow,
      { demo_slug: 'onlineu', sample: 'report', cadence: 'daily' },
    ],
    [
      'https://widget.subsights.com',
      frame.contentWindow,
      { sample: 'enable-reports', cadence: 'daily' },
    ],
    [
      'https://widget.subsights.com',
      frame.contentWindow,
      { sample: 'report', staff_alerts: 'false' },
    ],
  ] as const)
    emitPreview(message(preview), origin, source!);
  expect(screen.getByRole('status').textContent).toContain(
    'monthly report · Staff alerts off'
  );
  unmount();
  frame.remove();
});

it('restores a linked monthly/off sample and lets people adjust it without a settings request', () => {
  window.history.replaceState(
    null,
    '',
    '/demo/forks#sample-report?cadence=monthly&staff-alerts=off'
  );
  const send = vi.spyOn(globalThis, 'fetch');
  render(<TeamPreview demo={PROSPECT_DEMOS[0]} />);
  expect(screen.getByLabelText('Monthly sample report')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Daily' }));
  expect(screen.getByLabelText('Daily sample report')).toBeTruthy();
  expect(screen.getByRole('status').textContent).toContain('Staff alerts off');
  fireEvent.click(screen.getByRole('button', { name: 'On' }));
  expect(screen.getByRole('status').textContent).toContain(
    'daily report · Staff alerts on'
  );
  expect(send).not.toHaveBeenCalled();
});
