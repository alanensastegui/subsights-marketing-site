import { expect, it } from 'vitest';
import { shareKey, withShareKey, canonicalShareUrl } from './share-link';
it('preserves a private capability while switching local preview state and sharing', () => {
  const key = 'isolated-key';
  const hash = withShareKey('#sample-report?cadence=monthly&staff-alerts=on', key);
  expect(shareKey(hash)).toBe(key);
  expect(hash).toContain('cadence=monthly'); expect(hash).toContain('staff-alerts=on');
  expect(canonicalShareUrl('https://example.test/demo/example?force=proxy' + hash)).toBe('https://example.test/demo/example#share?key=isolated-key');
});
it('does not add capabilities to ordinary public links', () => {
  expect(withShareKey('#sample-report', '')).toBe('#sample-report');
  expect(canonicalShareUrl('https://example.test/demo/public?force=default#chat')).toBe('https://example.test/demo/public?force=default#chat');
});
