import { expect, it } from 'vitest';
import { readEngagement } from './engagement';

it('accepts measured counts and drops anything that is not a count or a link', () => {
  expect(readEngagement({
    measured_since: '2026-11-09', conversations: 4, through: 'x',
    link_clicks: [{ link: 'https://example.org/join', clicks: 2 }, { link: 'javascript:alert(1)', clicks: 1 }, { link: 'https://example.org/x', clicks: 0 }],
  })).toEqual({ measuredSince: '2026-11-09', conversations: 4, linkClicks: [{ link: 'https://example.org/join', clicks: 2 }] });
});

it('keeps the samples when nothing was measured or the reply is malformed', () => {
  expect(readEngagement({ measured_since: null, conversations: 0, link_clicks: [] })).toBeNull();
  expect(readEngagement({ measured_since: '2026-11-09', conversations: '4' })).toBeNull();
  expect(readEngagement(null)).toBeNull();
});
