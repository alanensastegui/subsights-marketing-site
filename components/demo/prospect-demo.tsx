import Link from 'next/link';
import type { ProspectDemo } from '@/lib/demo/config/prospects';

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
            your plans, or ask for a detail it cannot know.
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
          <a
            href={`mailto:team@subsights.com?subject=${encodeURIComponent(`${demo.label} assistant preview`)}`}
            className="mt-6 inline-flex min-h-11 items-center rounded-xl px-5 py-3 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ backgroundColor: demo.accent }}
            data-slot="button"
            data-button-id={`demo-${demo.slug}-contact`}
            data-button-name="Talk through this demo"
            data-button-location="prospect-demo"
          >
            Talk through this demo
          </a>
          {demo.industryHref && (
            <p className="mt-4 text-sm">
              <Link
                href={demo.industryHref}
                className="font-medium text-slate-700 underline underline-offset-4"
              >
                Subsights for chambers and associations
              </Link>
            </p>
          )}
          <details className="mt-6 rounded-xl border border-slate-200 bg-white p-4 lg:hidden">
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
          className="min-w-0"
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
              src={demo.widgetUrl}
              title={`${demo.label} assistant preview`}
              className="block h-[650px] w-full border-0 sm:h-[700px]"
              referrerPolicy="no-referrer"
              allow="clipboard-write"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-600">
            Prepared independently by Subsights from selected public pages. This
            preview is not installed on {demo.label}’s website. Questions in
            this demo are visible to Subsights; please keep personal information
            out of the chat.
          </p>
        </section>

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
        {demo.teamView && (
          <section
            className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 lg:col-span-2"
            aria-labelledby="team-insights"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
              Beyond the answer
            </p>
            <h2
              id="team-insights"
              className="mt-3 text-2xl font-semibold text-slate-950"
            >
              Learn what your community needs.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
              Conversation history can help your team spot unclear benefits,
              event questions and member-service needs. These examples
              illustrate what to look for; they are not measured Chamber results
              or an active report subscription.
            </p>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {demo.teamView.map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold leading-relaxed text-slate-950">
                    “{item.question}”
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.insight}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
