"use client";
import { useEffect, useState } from 'react';
import type { ProspectDemo } from '@/lib/demo/config/prospects';
import type { Comparison } from '@/lib/demo/comparisons/schema';
import type { DemoEngagement } from '@/lib/demo/engagement';
import { shareKey, withShareKey } from '@/lib/demo/share-link';
import { ProspectDemoPage } from './prospect-demo';
import { AssistantFrame } from './assistant-frame';
import { FloatingShareButton } from './floating-share-button';
type Preview = { prospect: ProspectDemo | null; target: { label: string; url: string } | null; widgetUrl: string; comparison: Comparison | null; measured: DemoEngagement | null };
export function PrivateDemoPage({ slug }: { slug: string }) {
  const [state, setState] = useState<Preview | 'loading' | 'retry' | null>('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    let controller: AbortController | null = null;
    let sequence = 0;
    let currentKey = '';
    let authorizedKey = '';
    async function authorize() {
      const requestId = ++sequence;
      controller?.abort();
      controller = new AbortController();
      const key = shareKey(window.location.hash);
      if (key !== currentKey) { setState('loading'); document.title = 'Subsights demo'; }
      currentKey = key;
      if (!key) { if (active) { setState(null); document.title = 'Subsights demo'; } return; }
      try {
        const response = await fetch('/api/demo/access', { method: 'POST', cache: 'no-store', signal: controller.signal,
          headers: { Authorization: `Basic ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ slug }) });
        if (![200, 401, 403, 404].includes(response.status)) throw new Error('Temporary access failure');
        const preview = response.ok ? await response.json() as Preview : null;
        if (active && requestId === sequence) { authorizedKey = preview ? key : ''; setState(preview); document.title = preview?.prospect?.label || preview?.target?.label || 'Subsights demo'; }
      } catch { if (active && requestId === sequence) {
        setState(previous => authorizedKey === key && previous && typeof previous === 'object' ? previous : 'retry');
        if (authorizedKey !== key) document.title = 'Subsights demo';
      } }
    }
    function keyChanged() { if (shareKey(window.location.hash) !== currentKey) void authorize(); }
    void authorize();
    window.addEventListener('focus', authorize);
    window.addEventListener('popstate', authorize);
    window.addEventListener('hashchange', keyChanged);
    return () => { active = false; controller?.abort(); window.removeEventListener('focus', authorize); window.removeEventListener('popstate', authorize); window.removeEventListener('hashchange', keyChanged); };
  }, [slug, attempt]);
  if (state === 'loading') return <main className="flex-1 p-8" role="status">Opening demo…</main>;
  if (state === 'retry') return <main className="flex-1 p-8"><h1 className="text-2xl font-semibold">Couldn’t open the demo</h1><p className="mt-3">Try again in a moment.</p><button className="mt-4 rounded border px-4 py-2" onClick={() => { setState('loading'); setAttempt(value => value + 1); }}>Try again</button></main>;
  if (!state) return <main className="flex-1 p-8"><h1 className="text-2xl font-semibold">Demo unavailable</h1><p className="mt-3">Ask the person who shared this demo for a current link.</p></main>;
  const label = state.prospect?.label || state.target!.label;
  return <div className="flex flex-1 flex-col" onClickCapture={event => {
    const anchor = (event.target as HTMLElement).closest('a');
    const href = anchor?.getAttribute('href');
    if (!href?.startsWith('#')) return;
    event.preventDefault();
    window.history.pushState(null, '', withShareKey(href, shareKey(window.location.hash)));
    document.getElementById(href.slice(1).split('?')[0])?.scrollIntoView();
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }}>
    <FloatingShareButton />
    {state.prospect ? <ProspectDemoPage demo={state.prospect} comparison={state.comparison} measured={state.measured} /> :
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-8 p-6 lg:grid-cols-2"><section><h1 className="text-3xl font-semibold">Try the {label} assistant</h1><p className="mt-4">Ask a question, then try a follow-up.</p><a href={state.target!.url} target="_blank" rel="noreferrer" className="mt-4 inline-block underline">Visit the official website</a></section><AssistantFrame slug={slug} label={label} widgetUrl={state.widgetUrl} panel="rounded-2xl" /></main>}
  </div>;
}
