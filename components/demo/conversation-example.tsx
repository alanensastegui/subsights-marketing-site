import type { ProspectDemo } from '@/lib/demo/config/prospects';

export function ConversationExample({ demo }: { demo: ProspectDemo }) {
  return (
    <section
      id="conversation-example"
      aria-labelledby="conversation-example-title"
      className="scroll-mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      <div className="border-b border-slate-200 p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          A conversation worth having
        </p>
        <h2
          id="conversation-example-title"
          className="mt-3 text-2xl font-semibold tracking-tight text-slate-950"
        >
          {demo.conversation.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
          An illustrative conversation written from the linked public pages. It
          shows the kind of follow-up we test for, not a recording of a visitor
          or a transcript from the live demo above.
        </p>
      </div>
      <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
        <ol className="min-w-0 space-y-6" aria-label="Example conversation">
          {demo.conversation.turns.map((turn, index) => (
            <li key={turn.question} className="space-y-3">
              <div className="ml-6 rounded-2xl rounded-tr-sm bg-slate-900 p-4 text-sm leading-relaxed text-white sm:ml-12">
                <p className="mb-1 text-xs font-medium text-slate-300">
                  Visitor · {index + 1}
                </p>
                <p>{turn.question}</p>
              </div>
              <div className="mr-3 rounded-2xl rounded-tl-sm bg-slate-100 p-4 text-sm leading-relaxed text-slate-700 sm:mr-8">
                <p className="mb-1 text-xs font-semibold text-slate-500">
                  Assistant
                </p>
                <p>{turn.answer}</p>
                <a
                  href={turn.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-9 items-center text-xs font-semibold underline underline-offset-4"
                  style={{ color: demo.accent }}
                >
                  {turn.source.label} ↗
                </a>
              </div>
            </li>
          ))}
        </ol>
        <aside className="min-w-0 self-start rounded-xl border border-slate-200 p-5">
          <h3 className="text-lg font-semibold text-slate-950">
            What makes the answer useful
          </h3>
          <ol className="mt-5 space-y-5 text-sm leading-relaxed text-slate-600">
            <li>
              <strong className="block font-semibold text-slate-950">
                01 · Keep the context
              </strong>
              Use the details the visitor has already shared. Adapt when their
              plans change.
            </li>
            <li>
              <strong className="block font-semibold text-slate-950">
                02 · Find the relevant information
              </strong>
              Bring the useful parts of your content together and link to the
              source.
            </li>
            <li>
              <strong className="block font-semibold text-slate-950">
                03 · Give a practical next step
              </strong>
              Help the person move forward and be clear when live information or
              a decision sits elsewhere.
            </li>
          </ol>
          <div className="mt-6 border-t border-slate-200 pt-5">
            <h3 className="font-semibold text-slate-950">
              What your team learns
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {demo.conversation.takeaway}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
