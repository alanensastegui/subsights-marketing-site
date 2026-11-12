import { describe, expect, it } from 'vitest';
import { buildMetadata, SITE_URL } from './seo';

describe('public discovery metadata', () => {
  it.each(['/', '/destinations', 'chambers', '/features/knowledge-base'])(
    'keeps canonical and social identity on the published host: %s',
    (path) => {
      const m = buildMetadata({
        title: 'A useful page',
        description: 'Details',
        path,
      });
      const expected = new URL(
        path.startsWith('/') ? path : '/' + path,
        SITE_URL
      ).href;
      expect(m.alternates?.canonical).toBe(expected);
      expect(m.openGraph?.url).toBe(expected);
    }
  );
  it('retains explicit noindex and supported nested overrides', () => {
    const m = buildMetadata({
      title: 'Private page',
      description: 'Details',
      path: '/demo/example',
      noindex: true,
      overrides: {
        robots: { follow: false },
        openGraph: { siteName: 'Subsights AI' },
      },
    });
    expect(m.robots).toMatchObject({ index: false, follow: false });
    expect(m.openGraph).toMatchObject({
      url: 'https://subsights.com/demo/example',
      siteName: 'Subsights AI',
    });
  });
});
