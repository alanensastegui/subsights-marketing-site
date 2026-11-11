import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { ProspectDemo } from '@/lib/demo/config/prospects';
import { getFreeTrialUrl } from '@/lib/subscriptions';
import { TeamPreview } from './team-preview';
import { ConversationExample } from './conversation-example';

// Their heading type and corners when the demo config names them; the Subsights defaults otherwise.
function themeStyles(demo: ProspectDemo) {
  const theme = demo.theme ?? {};
  const heading: CSSProperties = theme.headingFont
    ? { fontFamily: 'var(--font-prospect-heading), system-ui, sans-serif', fontWeight: 500, color: demo.accent }
    : {};
  const corners = theme.square ? 'rounded-none' : 'rounded-xl';
  const panel = theme.square ? 'rounded-sm' : 'rounded-2xl';
  const button = theme.headingFont ? 'uppercase tracking-wide' : '';
  return { theme, heading, corners, panel, button };
}

export function ProspectDemoPage({ demo }: { demo: ProspectDemo }) {
  const { theme, heading, corners, panel, button } = themeStyles(demo);
  return (
    <main className="flex-1 bg-slate-50">
      <div className={`mx-auto grid max-w-7xl px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 lg:py-12 ${demo.entry ? 'gap-4 py-4' : 'gap-8 py-8'}`}>
        <section className="min-w-0 self-start" aria-labelledby="preview-title">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {demo.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={demo.logo.src}
                alt={demo.logo.alt}
                width={demo.logo.width}
                height={demo.logo.height}
                className="h-10 w-auto"
              />
            )}
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
              A Subsights preview for {demo.label}
            </p>
          </div>
          {theme.highlight && (
            <span
              aria-hidden="true"
              className="mt-2 block h-1 w-12"
              style={{ backgroundColor: theme.highlight }}
            />
          )}
          <h1
            id="preview-title"
            className={`font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl ${demo.entry ? 'mt-2 text-2xl lg:mt-4' : 'mt-4 text-3xl'}`}
            style={heading}
          >
            {demo.headline}
          </h1>
          <p className={`mt-5 max-w-xl text-lg leading-relaxed text-slate-600 ${demo.entry ? 'hidden lg:block' : ''}`}>
            {demo.description}
          </p>
          {!demo.entry && (
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Ask your own questions in the live chat. Try a follow-up, change
              your plans, or ask for a detail it cannot know. You can also ask
              what is connected, explore the team samples or plan your setup.
            </p>
          )}
          <div className={`mt-7 hidden border border-slate-200 bg-white p-5 lg:block ${panel}`}>
            <h2 className="font-semibold text-slate-950" style={heading}>
              A few questions to try
            </h2>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
              {demo.questions.map((question) => (
                <li
                  key={question}
                  className="border-l-2 pl-3"
                  style={{ borderColor: demo.accent }}
                >
                  {question}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 hidden flex-wrap items-center gap-x-5 gap-y-3 lg:flex">
            <a
              href="#live-assistant"
              className={`inline-flex min-h-11 items-center px-5 py-3 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${corners} ${button}`}
              style={{ backgroundColor: demo.accent }}
            >
              Try the assistant ↓
            </a>
            <a
              href="#team-preview"
              className="inline-flex min-h-11 items-center text-sm font-medium text-slate-700 underline underline-offset-4"
            >
              See the team view ↓
            </a>
          </div>
        </section>

        <section
          id="live-assistant"
          className="min-w-0 scroll-mt-5"
          aria-label={`${demo.label} live assistant`}
        >
          {demo.entry && (
            <dl
              id="preview-entry"
              className="mb-3 space-y-1 text-sm leading-5 text-slate-600"
            >
              {demo.entry.map((item) => (
                <div key={item.label}>
                  <dt className="inline font-semibold text-slate-950">
                    {item.label}:
                  </dt>{' '}
                  <dd className="inline">{item.text}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className={`overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/60 ${panel}`}>
            <div className={`flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3 ${demo.entry ? 'hidden sm:flex' : 'flex'}`}>
              <h2 className="text-sm font-semibold text-slate-950">
                {demo.label}
              </h2>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
                Live preview
              </span>
            </div>
            <iframe
              id={`demo-assistant-${demo.slug}`}
              src={demo.widgetUrl}
              title={`${demo.label} assistant preview`}
              className={`block w-full border-0 sm:h-[620px] ${demo.entry ? 'h-[320px] max-sm:h-[clamp(18rem,calc(100svh_-_29rem),35rem)]' : 'h-[560px]'}`}
              referrerPolicy="no-referrer"
              allow="clipboard-write"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Prepared independently by Subsights, not affiliated with{' '}
            {demo.label}. AI answers can be wrong; confirm on the official page.
            Subsights keeps these chats for 90 days with an approximate
            location, so please leave out personal details.{' '}
            <Link href="/legal/privacy" className="underline underline-offset-2">
              Privacy
            </Link>{' '}
            ·{' '}
            <Link href="/legal/terms" className="underline underline-offset-2">
              Terms
            </Link>
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-5 gap-y-1 text-sm">
            <p className="text-slate-600">Prefer a larger chat?</p>
            <a
              href={demo.widgetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ color: demo.accent }}
            >
              Open assistant in a new tab
            </a>
          </div>
          {demo.tools && (
            <section
              className={`mt-5 border border-slate-200 bg-white p-4 ${panel}`}
              aria-labelledby="preview-tools"
            >
              <h2
                id="preview-tools"
                className="text-sm font-semibold text-slate-950"
                style={heading}
              >
                Try the tools
              </h2>
              <ul className="mt-2 divide-y divide-slate-100">
                {demo.tools.map((tool) => (
                  <li
                    key={tool.name}
                    className="flex flex-wrap items-center justify-between gap-x-4 py-2"
                  >
                    <p className="min-w-0 text-sm text-slate-600">
                      <span className="font-semibold text-slate-950">
                        {tool.name}.
                      </span>{' '}
                      {tool.text}
                    </p>
                    <a
                      href={tool.href}
                      className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4"
                      style={{ color: demo.accent }}
                    >
                      {tool.action}
                    </a>
                  </li>
                ))}
              </ul>
              {demo.toolsComingSoon && (
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {demo.toolsComingSoon}
                </p>
              )}
            </section>
          )}
          <details className={`mt-5 border border-slate-200 bg-white p-4 lg:hidden ${panel}`}>
            <summary className="cursor-pointer font-medium text-slate-950">
              Questions to try
            </summary>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
              {demo.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </details>
          {demo.publishedLinks && (
            <aside className="mt-4 rounded-xl border border-slate-200 bg-white p-4" aria-label="Published guide links">
              <p className="text-sm font-medium text-slate-950">Published next steps</p>
              <ul className="mt-2 space-y-2 text-sm">
                {demo.publishedLinks.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4" style={{ color: demo.accent }}>{link.label}</a>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">These destinations are published in the guide, which discloses affiliate links. Opening them does not reserve a room or confirm a rate.</p>
            </aside>
          )}
        </section>

        <div className="min-w-0 lg:col-span-2">
          <TeamPreview demo={demo} />
        </div>
        <div className="min-w-0 lg:col-span-2">
          <ConversationExample demo={demo} />
        </div>

        <section
          className="min-w-0 border-t border-slate-200 pt-6 lg:col-span-2"
          aria-labelledby="preview-sources"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <h2
                id="preview-sources"
                className="text-sm font-semibold text-slate-950"
              >
                Built from their public content
              </h2>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                {demo.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:no-underline"
                      style={{ color: demo.accent }}
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-950">
                What this preview covers
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {demo.scope}
              </p>
            </div>
          </div>
        </section>
        <section
          className={`min-w-0 bg-slate-900 p-6 text-white sm:p-8 lg:col-span-2 ${panel}`}
          style={theme.highlight ? { backgroundColor: demo.accent } : undefined}
          aria-labelledby="demo-next-step"
        >
          <h2
            id="demo-next-step"
            className="text-2xl font-semibold tracking-tight"
            style={theme.headingFont ? { ...heading, color: undefined } : undefined}
          >
            Make it useful for your visitors. Make it yours.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
            We work with your team on the content, appearance and real questions
            before launch, including the difficult follow-ups. Then we use what
            people ask to keep improving the experience. A gap can become a
            website update or better chatbot knowledge, with the answer checked
            again after the change.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
            Start in the chat with “Help me plan setup.” Describe your goals and
            correct a preference as you go. These are proposals in the
            conversation; applying settings, connecting sources and choosing
            staff recipients happens in your authenticated Subsights workspace.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-5">
            <a
              href={getFreeTrialUrl()}
              className={`inline-flex min-h-11 items-center px-5 py-3 text-sm font-semibold hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 ${corners} ${button}`}
              style={{
                backgroundColor: theme.highlight ?? '#ffffff',
                color: theme.highlightInk ?? '#020617',
              }}
              data-slot="button"
              data-analytics-id={`demo_${demo.slug.replaceAll('-', '_')}_signup`}
              data-analytics-name="Start free trial (Prospect Demo)"
            >
              Start your free trial
            </a>
            <a
              href="#live-assistant"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-white underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
              data-analytics-id={`demo_${demo.slug.replaceAll('-', '_')}_contact`}
              data-analytics-name="Plan setup in the chat (Prospect Demo)"
            >
              Plan setup in the chat ↑
            </a>
            {demo.industryHref && (
              <Link
                href={demo.industryHref}
                className="inline-flex min-h-11 items-center text-sm font-medium text-white underline underline-offset-4"
              >
                Subsights for chambers and associations
              </Link>
            )}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/80">
            Your own Subsights account and workspace, free for 1 month. No
            card needed.{' '}
            <Link href="/pricing" className="underline underline-offset-2">
              See pricing
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
