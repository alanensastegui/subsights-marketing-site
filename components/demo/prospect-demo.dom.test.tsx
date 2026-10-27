import { expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ProspectDemoPage } from './prospect-demo';
import { PROSPECT_DEMOS } from '@/lib/demo/config/prospects';

it.each(PROSPECT_DEMOS)(
  'keeps the $slug assistant and direct fallback usable before host JavaScript loads',
  (demo) => {
    // This is the server HTML, with no effects, timers, analytics or hydration.
    const document = new DOMParser().parseFromString(
      renderToStaticMarkup(<ProspectDemoPage demo={demo} />), 'text/html'
    );
    const frame = document.querySelector('iframe')!;
    expect(frame.getAttribute('src')).toBe(demo.widgetUrl);
    expect(frame.getAttribute('sandbox')).toContain('allow-scripts');
    expect(frame.getAttribute('sandbox')).not.toContain('allow-top-navigation');
    const fallback = Array.from(document.querySelectorAll('a')).find(
      link => link.textContent === 'Open assistant in a new tab'
    )!;
    expect(fallback.getAttribute('href')).toBe(frame.getAttribute('src'));
    expect(fallback.getAttribute('target')).toBe('_blank');
    expect(fallback.getAttribute('rel')).toContain('noopener');
    expect(document.body.textContent).not.toContain('Preparing your personalized experience');
    expect(document.body.textContent).toContain('Your test chat above does not update them or send a report.');
  }
);
