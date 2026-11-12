import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { ProspectComparison } from './prospect-comparison';
import { ComparisonSchema, type Comparison } from '@/lib/demo/comparisons/schema';
import { COMPARISON_SLUGS, getComparison } from '@/lib/demo/comparisons';
import { PROSPECT_DEMOS } from '@/lib/demo/config/prospects';

const trackEvent = vi.fn(async (_event: { event_name: string; event_label?: string }) => {});
vi.mock('@/lib/analytics', () => ({ useAnalytics: () => ({ trackEvent }) }));
import { ChatEngagementTracker } from './chat-engagement-tracker';

afterEach(() => {
  cleanup();
  trackEvent.mockClear();
});

const base: Comparison = {
  schema: 'subsights.prospect.comparison.v1',
  slug: 'example-camps',
  theirs: { label: 'Their chat today', kind: 'chat' },
  asked: { date: '2026-11-11' },
  questions: [
    { id: 'h', tier: 'harmful_if_wrong', q: 'Are fryers shared?', theirs: 'Call the store.', theirs_seconds: 1.6, ours: 'Yes, fryers are shared.', ours_seconds: 3.2, outcome: 'A guest with an allergy gets the warning.' },
    { id: 'c', tier: 'common', q: 'What are your hours?', theirs: 'Open 11 to 10.', ours: 'Open 11 AM to 10:30 PM today.', outcome: 'Same answer.' },
  ],
};
const show = (comparison: Comparison) => render(<ProspectComparison comparison={comparison} accent="#123456" heading={{}} panel="rounded-xl" />);

it('groups questions by tier, common first, and shows both answers verbatim with their times', () => {
  show(base);
  const tiers = [...document.querySelectorAll('[data-tier]')].map((el) => el.getAttribute('data-tier'));
  expect(tiers).toEqual(['common', 'harmful_if_wrong']);
  const harmful = document.querySelector('[data-tier="harmful_if_wrong"]') as HTMLElement;
  expect(within(harmful).getByText(/costs more than no answer/)).toBeTruthy();
  expect(within(harmful).getByText('Call the store.')).toBeTruthy();
  expect(within(harmful).getByText('Yes, fryers are shared.')).toBeTruthy();
  expect(within(harmful).getByText('1.6 s')).toBeTruthy();
  expect(within(harmful).getByText(/A guest with an allergy gets the warning/)).toBeTruthy();
  expect(screen.getByText(/November 11, 2026/)).toBeTruthy();
});

it('leaves out what the data file does not have, and keeps the managed-partner section', () => {
  show(base);
  expect(screen.queryByLabelText('Cost and timing')).toBeNull();
  expect(screen.queryByTestId('reliability')).toBeNull();
  expect(screen.getByText('A fully managed AI partner')).toBeTruthy();
  cleanup();
  show({ ...base, cost: { today: [{ label: 'Staff email', amount: 'about 5 hours a week' }], ours: { plan: 'Professional', price: '$199 a month' } }, reliability: { suite: 's', checked: '2026-11-10', cases: 96, passed: 94, harmful_if_wrong_failures: 0 } });
  expect(screen.getByLabelText('Cost and timing').textContent).toContain('$199 a month');
  expect(screen.getByTestId('reliability').textContent).toMatch(/94 of 96 .* with no wrong answers/);
});

it('refuses a data file that would show something false or incomplete', () => {
  expect(ComparisonSchema.safeParse({ ...base, questions: [{ ...base.questions[0], ours: '' }] }).success).toBe(false);
  expect(ComparisonSchema.safeParse({ ...base, questions: [{ ...base.questions[0], tier: 'urgent' }] }).success).toBe(false);
  expect(ComparisonSchema.safeParse({ ...base, reliability: { suite: 's', checked: '2026-11-10', cases: 10, passed: 11, harmful_if_wrong_failures: 0 } }).success).toBe(false);
});

it('every registered comparison parses and belongs to a demo page', () => {
  for (const slug of COMPARISON_SLUGS) {
    expect(getComparison(slug)?.slug).toBe(slug);
    expect(PROSPECT_DEMOS.some((demo) => demo.slug === slug)).toBe(true);
  }
  expect(getComparison('no-such-demo')).toBeNull();
});

it('records one chat engagement when the visitor moves into the demo assistant', () => {
  document.body.innerHTML = '<section id="live-assistant"><iframe title="chat"></iframe></section><button>other</button>';
  render(<ChatEngagementTracker slug="example-camps" />);
  (document.querySelector('button') as HTMLButtonElement).focus();
  window.dispatchEvent(new Event('blur'));
  expect(trackEvent).not.toHaveBeenCalled();
  (document.querySelector('iframe') as HTMLIFrameElement).focus();
  window.dispatchEvent(new Event('blur'));
  window.dispatchEvent(new Event('blur'));
  expect(trackEvent).toHaveBeenCalledTimes(1);
  expect(trackEvent.mock.calls[0][0]).toMatchObject({ event_name: 'demo_chat_engaged', event_label: 'example-camps' });
});

it('shows what we found, verdicts, the source of their answer and the honest tradeoff', () => {
  show({
    ...base,
    found: { tools: ['No chat on the site'], faq: 'Good policy FAQ.', gap: 'Find the right class in one place.', noticed: ['A draft page is public.'] },
    questions: [{ ...base.questions[1], verdict: 'both_right', theirs_source: 'On the website' }],
    cost: { today: [{ label: 'Today', amount: 'Staff time' }], ours: { plan: 'Standard', price: '$199 a month' }, tradeoff: 'Theirs answers faster.' },
  });
  expect(screen.getByText('What we found on your site today')).toBeTruthy();
  expect(screen.getByText('No chat on the site')).toBeTruthy();
  expect(screen.getByText('Both right')).toBeTruthy();
  expect(screen.getByText('On the website')).toBeTruthy();
  expect(screen.getByText(/Theirs answers faster/)).toBeTruthy();
});

it('renders bold, bullets and https links from an answer, and never a script link', () => {
  show({ ...base, questions: [{ ...base.questions[1], ours: 'Open **today**.\n- [Menu](https://example.test/menu)\n- [bad](javascript:alert(1))' }] });
  expect(screen.getByText('today').tagName).toBe('STRONG');
  expect(screen.getByRole('link', { name: 'Menu' }).getAttribute('href')).toBe('https://example.test/menu');
  expect(screen.queryByRole('link', { name: 'bad' })).toBeNull();
});
