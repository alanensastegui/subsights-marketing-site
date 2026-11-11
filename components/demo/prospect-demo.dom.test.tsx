import { expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ProspectDemoPage } from './prospect-demo';
import { PROSPECT_DEMOS, getProspectDemo } from '@/lib/demo/config/prospects';
import { readPreviewHash } from '@/lib/demo/preview';

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
    expect(document.body.textContent).toContain('Your test chat above does not populate these examples or send a report.');
  }
);

it.each(PROSPECT_DEMOS)('keeps $slug setup in the same chat without a save claim', (demo) => {
  const document = new DOMParser().parseFromString(
    renderToStaticMarkup(<ProspectDemoPage demo={demo} />), 'text/html'
  );
  const link = Array.from(document.querySelectorAll('a')).find(
    link => link.textContent?.includes('Plan setup in the chat')
  )!;
  expect(link.getAttribute('href')).toBe('#live-assistant');
  expect(document.body.textContent).toContain('These are proposals in the');
  expect(document.querySelectorAll('iframe')).toHaveLength(1);
  expect(document.querySelector('script[src*="chatbot.js"]')).toBeNull();
});

it('publishes the Postcards preview only with an existing embed key and preserves its exact destinations', () => {
  expect(getProspectDemo('postcards-to-seattle', '')).toBeNull();
  expect(getProspectDemo('postcards-to-seattle', '   ')).toBeNull();
  const demo = getProspectDemo('postcards-to-seattle', 'controlled-public-embed-key')!;
  const url = new URL(demo.widgetUrl);
  expect(url.origin).toBe('https://widget.subsights.com');
  expect(url.searchParams.get('workspace_id')).toBe('0XvceSLk1j');
  expect(url.searchParams.get('view')).toBe('inline');
  expect(url.searchParams.get('api_key')).toBe('controlled-public-embed-key');
  const document = new DOMParser().parseFromString(renderToStaticMarkup(<ProspectDemoPage demo={demo} />), 'text/html');
  expect(document.querySelectorAll('iframe')).toHaveLength(1);
  expect(document.querySelector('#demo-assistant-postcards-to-seattle')).not.toBeNull();
  expect(Array.from(document.querySelectorAll('aside a')).map(a => a.getAttribute('href'))).toEqual([
    'https://postcardstoseattle.com/where-to-stay-san-juan-islands/',
    'https://www.booking.com/hotel/us/earthbox-inn-amp-spa.html',
    'https://www.booking.com/hotel/us/bird-rock.html',
  ]);
  expect(document.body.textContent).toContain('Your test chat above does not populate these examples or send a report.');
  expect(document.body.textContent).toContain('Opening them does not reserve a room or confirm a rate.');
});

it.each(PROSPECT_DEMOS)('states who runs the $slug preview and links the policies beside the chat', (demo) => {
  const document = new DOMParser().parseFromString(
    renderToStaticMarkup(<ProspectDemoPage demo={demo} />), 'text/html'
  );
  const notice = document.querySelector('#live-assistant iframe')!.parentElement!.nextElementSibling!;
  expect(notice.textContent).toContain(`Prepared independently by Subsights, not affiliated with ${demo.label}`);
  expect(notice.textContent).toContain('AI answers can be wrong');
  expect(notice.textContent).toContain('Subsights keeps these chats for 90 days');
  const hrefs = Array.from(notice.querySelectorAll('a')).map(a => a.getAttribute('href'));
  expect(hrefs).toEqual(['/legal/privacy', '/legal/terms']);
});

it.each(PROSPECT_DEMOS)('starts $slug sign-up on the real free-trial checkout route', (demo) => {
  const document = new DOMParser().parseFromString(
    renderToStaticMarkup(<ProspectDemoPage demo={demo} />), 'text/html'
  );
  const signup = Array.from(document.querySelectorAll('a')).find(a => a.textContent === 'Start your free trial')!;
  const url = new URL(signup.getAttribute('href')!);
  expect(url.pathname).toBe('/auth/signup');
  expect(url.searchParams.get('is_free_trial')).toBe('true');
  expect(url.searchParams.get('price_id')).toMatch(/^price_/);
});

it('gives every Kirkland tool a working target in the page or the chat', () => {
  const demo = getProspectDemo('kirkland-chamber')!;
  const document = new DOMParser().parseFromString(
    renderToStaticMarkup(<ProspectDemoPage demo={demo} />), 'text/html'
  );
  const actions = Array.from(document.querySelectorAll('#preview-tools ~ ul a'));
  expect(actions).toHaveLength(demo.tools!.length);
  for (const action of actions) {
    const href = action.getAttribute('href')!;
    expect(href === '#live-assistant' || readPreviewHash(href) !== null).toBe(true);
  }
  expect(document.body.textContent).toContain('Coming soon:');
  expect(document.querySelector('img[src*="kirklandchamber"]')).toBeNull();
});
