'use client';

import { useState } from 'react';
import type { ProspectDemo } from '@/lib/demo/config/prospects';

type UpdateRoute = 'website' | 'assistant';
type Stage = 'correction' | 'review' | 'retested';

export function AnswerImprovementPreview({ demo }: { demo: ProspectDemo }) {
  const [route, setRoute] = useState<UpdateRoute>('website');
  const [stage, setStage] = useState<Stage>('correction');
  const example = demo.conversation.turns[0];

  function changeRoute(value: UpdateRoute) {
    setRoute(value);
    setStage('correction');
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">
          Proposed workflow · Interactive example
        </p>
        <h3
          id="answer-improvement-title"
          tabIndex={-1}
          className="mt-2 scroll-mt-6 text-xl font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          A missing answer becomes a better next conversation.
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
          Start with useful answers, tested against your visitors’ real
          questions. When something is missing or wrong, your team can supply
          the right information. See the proposed review and retest below.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          This is a fictional gap, not a failure observed in {demo.label}’s
          assistant. The controls replay a written example; they do not send a
          request or change any live chatbot.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <article className="min-w-0 self-start rounded-xl border border-amber-200 bg-amber-50/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">
            1. Spot the gap
          </p>
          <h4 className="mt-3 font-semibold text-slate-950">
            A question to review
          </h4>
          <dl className="mt-4 space-y-4 text-sm leading-relaxed">
            <div>
              <dt className="font-medium text-slate-500">Visitor</dt>
              <dd className="mt-1 text-slate-800">{example.question}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">
                Example incomplete answer
              </dt>
              <dd className="mt-1 text-slate-700">
                I don’t have enough information to answer that yet.
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-slate-600">
            Reports can surface unanswered questions. Staff can also review
            conversations and flag a confident answer that got something wrong.
            A real limit, such as live availability or an approval decision,
            still needs an honest explanation rather than a guessed answer.
          </p>
        </article>

        <div className="min-w-0 space-y-5">
          <article className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              2. Supply the missing information
            </p>
            <fieldset className="mt-4 space-y-3">
              <legend className="mb-3 text-sm font-semibold text-slate-950">
                Where should the correction live?
              </legend>
              {(
                [
                  [
                    'website',
                    'On our website',
                    'Publish the information, then refresh the chatbot’s sources.',
                  ],
                  [
                    'assistant',
                    'In the chatbot’s knowledge',
                    'No website edit. The assistant may still share this information in visitor answers.',
                  ],
                ] as const
              ).map(([value, title, description]) => (
                <label
                  key={value}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm ${route === value ? 'border-slate-800 bg-slate-50' : 'border-slate-200'}`}
                >
                  <input
                    type="radio"
                    name={`correction-route-${demo.slug}`}
                    value={value}
                    checked={route === value}
                    onChange={() => changeRoute(value)}
                    className="mt-1 accent-slate-900"
                  />
                  <span>
                    <span className="block font-semibold text-slate-950">
                      {title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-600">
                      {description}
                    </span>
                  </span>
                </label>
              ))}
            </fieldset>
            <p className="mt-5 text-xs font-medium text-slate-500">
              Sample team correction
            </p>
            <blockquote className="mt-2 border-l-2 border-slate-200 pl-4 text-sm leading-relaxed text-slate-700">
              {example.answer}
            </blockquote>
            <a
              href={example.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold underline underline-offset-4"
              style={{ color: demo.accent }}
            >
              Check the example source: {example.source.label}
            </a>
            {stage === 'correction' && (
              <button
                type="button"
                onClick={() => setStage('review')}
                className="mt-3 block min-h-11 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Use example correction
              </button>
            )}
          </article>

          <article
            className="rounded-xl border border-slate-200 bg-white p-5"
            aria-label="Example correction review"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              3. Check it. Ask again.
            </p>
            <p
              className="mt-3 text-sm font-semibold text-slate-950"
              role="status"
            >
              {stage === 'correction'
                ? 'Choose a route and use the example correction.'
                : stage === 'review'
                  ? 'Sample correction ready for review. No live change.'
                  : 'Sample retest complete. No live change.'}
            </p>
            {stage !== 'correction' && (
              <>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {route === 'website'
                    ? 'The team publishes the correction. Subsights refreshes the source and checks that the new information was imported.'
                    : 'The team provides the correction in Subsights. We check the source and update only this chatbot’s knowledge.'}{' '}
                  Then we replay the original question and related follow-ups
                  before marking the gap resolved. Requests that need
                  engineering get scoped separately.
                </p>
                {stage === 'review' && (
                  <button
                    type="button"
                    onClick={() => setStage('retested')}
                    className="mt-4 min-h-11 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    Replay example question
                  </button>
                )}
              </>
            )}
            {stage === 'retested' && (
              <div
                className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
                aria-label="Illustrative retested answer"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
                  Illustrative retest · Resolved in this example
                </p>
                <p className="mt-3 text-sm font-medium text-slate-950">
                  {example.question}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {example.answer}
                </p>
                <button
                  type="button"
                  onClick={() => setStage('correction')}
                  className="mt-3 min-h-11 text-sm font-semibold text-slate-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  Restart example
                </button>
              </div>
            )}
          </article>
        </div>
      </div>
      <p className="rounded-xl border border-slate-200 bg-white p-4 text-xs leading-relaxed text-slate-600">
        Coming soon: submit a correction in Subsights, track its review and see
        the retested result in the same place.
      </p>
    </div>
  );
}
