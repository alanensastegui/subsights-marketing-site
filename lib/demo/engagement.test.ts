import { expect, it } from 'vitest';
import { readEngagement } from './engagement';

it('accepts aggregate counts without ever passing caller-supplied destinations to the view', () => {
  expect(readEngagement({
    measured_since: '2026-11-09', conversations: 4, clicks: 23,
    link_clicks: [{ link: 'https://example.org/private?token=private-value', clicks: 2 },
                  { link: 'mailto:visitor@example.org', clicks: 1 }, { link: 'attacker text', clicks: 1 }],
  })).toEqual({ measuredSince: '2026-11-09', conversations: 4, clicks: 23 });
  expect(readEngagement({ measured_since: '2026-11-09', conversations: 4, clicks: 0 })?.clicks).toBe(0);
});

it('keeps samples when measurements are empty, incomplete or malformed rather than inventing zero clicks', () => {
  for (const clicks of [undefined, null, '4', -1, 1.5, NaN, Infinity]) {
    expect(readEngagement({ measured_since: '2026-11-09', conversations: 4, clicks })).toBeNull();
  }
  expect(readEngagement({ measured_since: null, conversations: 0, clicks: 0 })).toBeNull();
  expect(readEngagement({ measured_since: '2026-11-09', conversations: '4', clicks: 2 })).toBeNull();
  expect(readEngagement(null)).toBeNull();
});
