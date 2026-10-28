import Link from 'next/link';
import type { ProspectDemo } from '@/lib/demo/config/prospects';
import { TeamPreview } from './team-preview';
import { ConversationExample } from './conversation-example';

export function ProspectDemoPage({ demo }: { demo: ProspectDemo }) {
  return (
    <main className="flex-1 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 lg:py-12">
        <section className="min-w-0 self-start" aria-labelledby="preview-title">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
            A working preview for {demo.label}
          </p>
          <h1
            id="preview-title"
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
          >
            {demo.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            {demo.description}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Ask your own questions in the live chat. Try a follow-up, change
            your plans, or ask for a detail it cannot know. You can also ask
            what is connected, explore the team samples or plan your setup.
          </p>
          <div className="mt-7 hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block">
            <h2 className="font-semibold text-slate-950">
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
              className="inline-flex min-h-11 items-center rounded-xl px-5 py-3 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
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
          <details className="mt-5 rounded-xl border border-slate-200 bg-white p-4 lg:hidden">
            <summary className="cursor-pointer font-medium text-slate-950">
              Questions to try
            </summary>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
              {demo.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </details>
        </section>

        <section
          id="live-assistant"
          className="min-w-0 scroll-mt-5"
          aria-label={`${demo.label} live assistant`}
        >
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-950">
                {demo.label}
              </h2>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
                Live assistant preview
              </span>
            </div>
            <iframe
              id={`demo-assistant-${demo.slug}`}
              src={demo.widgetUrl}
              title={`${demo.label} assistant preview`}
              className="block h-[560px] w-full border-0 sm:h-[620px]"
              referrerPolicy="no-referrer"
              allow="clipboard-write"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
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
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Prepared independently by Subsights from selected public pages. This
            preview is not installed on {demo.label}’s website. Questions in
            this demo are visible to Subsights; please keep personal information
            out of the chat.
          </p>
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
          className="min-w-0 rounded-2xl bg-slate-900 p-6 text-white sm:p-8 lg:col-span-2"
          aria-labelledby="demo-next-step"
        >
          <h2
            id="demo-next-step"
            className="text-2xl font-semibold tracking-tight"
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
              href="#live-assistant"
              className="inline-flex min-h-11 items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4"
              data-slot="button"
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
        </section>
      </div>
    </main>
  );
}
