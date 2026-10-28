'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  previewHash,
  readPreviewHash,
  readPreviewMessage,
  type DemoPreview,
  type PreviewChange,
} from '@/lib/demo/preview';
import type { ProspectDemo } from '@/lib/demo/config/prospects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnswerImprovementPreview } from './answer-improvement-preview';

type Cadence = 'Daily' | 'Weekly' | 'Monthly';
const reports: Record<
  Cadence,
  { conversations: number; messages: number; clicks: number; period: string }
> = {
  Daily: { conversations: 4, messages: 24, clicks: 2, period: 'Example day' },
  Weekly: {
    conversations: 24,
    messages: 144,
    clicks: 9,
    period: 'Example week',
  },
  Monthly: {
    conversations: 96,
    messages: 576,
    clicks: 36,
    period: 'Example month',
  },
};
const activity = [2, 5, 3, 4, 2, 5, 3];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Metrics({ values }: { values: (typeof reports)[Cadence] }) {
  return (
    <dl className="grid grid-cols-3 gap-2 sm:gap-4">
      {[
        ['Conversations', values.conversations],
        ['Messages', values.messages],
        ['Link clicks', values.clicks],
      ].map(([label, value]) => (
        <div
          key={label}
          className="min-w-0 rounded-xl border border-slate-200 bg-white p-2 sm:p-5"
        >
          <dt className="text-[11px] font-medium text-slate-500 sm:text-sm">
            {label}
          </dt>
          <dd className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function TeamPreview({ demo }: { demo: ProspectDemo }) {
  const [preview, setPreview] = useState<DemoPreview>({
    sample: 'analytics',
    cadence: 'weekly',
    staff_alerts: null,
  });
  const previewRef = useRef(preview);
  const cadence = (preview.cadence[0].toUpperCase() +
    preview.cadence.slice(1)) as Cadence;
  const tab = preview.sample;
  const changePreview = useCallback(
    (change: PreviewChange, navigate = false) => {
      const next = { ...previewRef.current, ...change };
      previewRef.current = next;
      setPreview(next);
      // Only local visual choices live in this URL. No settings request or recipient data.
      window.history.replaceState(window.history.state, '', previewHash(next));
      if (navigate)
        requestAnimationFrame(() => {
          document
            .getElementById('team-preview')
            ?.scrollIntoView({ block: 'start' });
        });
    },
    []
  );

  useEffect(() => {
    function selectSample() {
      const change = readPreviewHash(window.location.hash);
      if (change) changePreview(change, true);
    }
    function receivePreview(event: MessageEvent) {
      const frame = document.getElementById(
        `demo-assistant-${demo.slug}`
      ) as HTMLIFrameElement | null;
      if (
        !frame?.contentWindow ||
        event.source !== frame.contentWindow ||
        event.origin !== new URL(demo.widgetUrl).origin
      )
        return;
      const change = readPreviewMessage(event.data, demo.slug);
      if (change) changePreview(change, true);
    }
    selectSample();
    window.addEventListener('hashchange', selectSample);
    window.addEventListener('popstate', selectSample);
    window.addEventListener('message', receivePreview);
    return () => {
      window.removeEventListener('hashchange', selectSample);
      window.removeEventListener('popstate', selectSample);
      window.removeEventListener('message', receivePreview);
    };
  }, [demo.slug, demo.widgetUrl, changePreview]);

  function openImprovement() {
    changePreview({ sample: 'improvement' });
    requestAnimationFrame(() => {
      document.getElementById('answer-improvement-title')?.focus();
    });
  }
  const report = reports[cadence];
  return (
    <section
      id="team-preview"
      aria-labelledby="team-preview-title"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      <div className="border-b border-slate-200 p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Your team’s view
          </p>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
            Sample data
          </span>
        </div>
        <h2
          id="team-preview-title"
          className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
        >
          Good answers. A clearer picture of your customers.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
          Track activity, read the conversations behind it and see which links
          people follow. Bring the useful questions and next steps to your inbox
          with scheduled reports. Spot missing information and use it to make
          the next answer better.
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-slate-500">
          These product illustrations use fictional numbers and example
          questions, not results from {demo.label}. Your test chat above does
          not populate these examples or send a report. Chat preview choices
          only change the illustration.
        </p>
      </div>
      <div className="space-y-3 border-b border-slate-200 bg-slate-50 p-5 sm:px-7">
        <p className="text-sm font-semibold text-slate-950" role="status">
          Preview choices: {cadence.toLowerCase()} report · Staff alerts{' '}
          {preview.staff_alerts === null
            ? 'not chosen'
            : preview.staff_alerts
              ? 'on'
              : 'off'}
        </p>
        <p className="text-xs leading-relaxed text-slate-600">
          Not saved or activated. No email is sent. Apply your choices in your
          authenticated Subsights workspace.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div
            role="group"
            aria-label="Staff alerts in this preview"
            className="flex flex-wrap items-center gap-1"
          >
            <span className="mr-2 text-xs font-medium text-slate-700">
              Staff alerts
            </span>
            {([true, false] as const).map((value) => (
              <button
                key={String(value)}
                type="button"
                aria-pressed={preview.staff_alerts === value}
                onClick={() =>
                  changePreview({ sample: tab, staff_alerts: value })
                }
                className={`min-h-11 rounded-lg px-4 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${preview.staff_alerts === value ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'}`}
              >
                {value ? 'On' : 'Off'}
              </button>
            ))}
          </div>
          <a
            href="#live-assistant"
            className="inline-flex min-h-11 items-center text-xs font-semibold text-slate-700 underline underline-offset-4"
          >
            Back to the chat ↑
          </a>
        </div>
      </div>
      <Tabs
        value={tab}
        onValueChange={(sample) =>
          changePreview({ sample: sample as DemoPreview['sample'] })
        }
        className="gap-0"
      >
        <div className="border-b border-slate-200 px-3 pt-3 sm:px-7">
          <TabsList
            aria-label="Explore the team view"
            className="grid h-auto w-full grid-cols-2 justify-start gap-1 rounded-none bg-white p-0 text-slate-500 sm:flex sm:w-auto"
          >
            {[
              ['analytics', 'Analytics'],
              ['report', 'Email report'],
              ['notification', 'Staff email'],
              ['improvement', 'Improve answers'],
            ].map(([value, label]) => (
              <TabsTrigger
                key={value}
                value={value}
                className="min-h-11 flex-1 rounded-b-none px-3 text-sm text-slate-500 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-950 data-[state=active]:shadow-none sm:flex-none"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent
          value="analytics"
          className="space-y-5 bg-slate-50 p-4 sm:p-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-slate-950">
              Activity at a glance
            </h3>
            <span className="text-xs text-slate-500">
              Example week · 7 days
            </span>
          </div>
          <Metrics values={reports.Weekly} />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
              <h4 className="text-sm font-semibold text-slate-950">
                Conversations over time
              </h4>
              <div
                className="mt-5 flex h-36 items-end gap-3"
                role="img"
                aria-label="Sample conversations: Monday 2, Tuesday 5, Wednesday 3, Thursday 4, Friday 2, Saturday 5, Sunday 3. Total 24."
              >
                {activity.map((count, index) => (
                  <div
                    key={days[index]}
                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                    aria-hidden="true"
                  >
                    <span className="text-xs text-slate-500">{count}</span>
                    <div
                      className="w-full max-w-10 rounded-t-md opacity-85"
                      style={{
                        height: `${count * 18}px`,
                        backgroundColor: demo.accent,
                      }}
                    />
                    <span className="text-[10px] text-slate-500 sm:text-xs">
                      {days[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
              <h4 className="text-sm font-semibold text-slate-950">
                Links people followed
              </h4>
              <table className="mt-4 w-full table-fixed text-left text-sm">
                <caption className="sr-only">
                  Sample link activity, 9 clicks in total
                </caption>
                <thead className="text-xs text-slate-500">
                  <tr>
                    <th scope="col" className="pb-2 font-medium">
                      Page
                    </th>
                    <th
                      scope="col"
                      className="w-12 pb-2 text-right font-medium"
                    >
                      Clicks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {demo.sources.slice(0, 3).map((source, index) => (
                    <tr key={source.url} className="border-t border-slate-100">
                      <td className="break-words py-3 pr-3">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4"
                          style={{ color: demo.accent }}
                        >
                          {source.label}
                        </a>
                      </td>
                      <td className="py-3 text-right font-medium text-slate-700">
                        {[4, 3, 2][index]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            <h4 className="text-sm font-semibold text-slate-950">
              Open a conversation. Understand the question.
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              The numbers tell you when people engage. Conversation history
              shows what they needed, what the assistant said and which details
              shaped the answer.
            </p>
            <a
              href="#conversation-example"
              className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4"
              style={{ color: demo.accent }}
            >
              Read an example conversation ↓
            </a>
          </div>
          <p className="text-xs leading-relaxed text-slate-500">
            Messages include visitor and assistant messages. A link click shows
            interest in a page; it does not establish a booking, application or
            sale.
          </p>
        </TabsContent>
        <TabsContent
          value="report"
          className="space-y-5 bg-slate-50 p-4 sm:p-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-950">
                A useful summary, on your schedule.
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Choose the cadence and recipients during setup. Switch between
                sample reports below.
              </p>
            </div>
            <div
              className="flex rounded-xl border border-slate-200 bg-white p-1"
              role="group"
              aria-label="Sample report cadence"
            >
              {(Object.keys(reports) as Cadence[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={cadence === value}
                  onClick={() =>
                    changePreview({
                      sample: 'report',
                      cadence: value.toLowerCase() as DemoPreview['cadence'],
                    })
                  }
                  className={`min-h-11 rounded-lg px-3 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${cadence === value ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <article
            className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            aria-label={`${cadence} sample report`}
          >
            <div className="border-b border-slate-200 px-5 py-4 text-xs leading-relaxed text-slate-500">
              <p>From: Subsights reports</p>
              <p className="mt-1">To: Your selected team</p>
              <p className="mt-1 font-medium text-slate-700">
                Subject: Your {cadence.toLowerCase()} assistant report
              </p>
            </div>
            <div className="space-y-6 p-5 sm:p-7" aria-live="polite">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {report.period} · Illustrative report
                </p>
                <h4 className="mt-2 text-xl font-semibold text-slate-950">
                  Here’s what people wanted to know.
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {report.conversations} conversations, {report.messages}{' '}
                  messages and {report.clicks} link clicks in this sample
                  period. Read the questions behind the activity and use them to
                  make the next visit easier.
                </p>
              </div>
              <Metrics values={report} />
              <div>
                <h5 className="font-semibold text-slate-950">
                  What people asked about
                </h5>
                <ul className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
                  {demo.teamView.map((item) => (
                    <li
                      key={item.question}
                      className="border-l-2 border-slate-200 pl-3"
                    >
                      {item.question}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                <h5 className="font-semibold text-slate-950">
                  Unanswered question · Sample gap
                </h5>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {demo.conversation.turns[0].question}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  In this fictional example, the assistant lacked the
                  information to answer. Review the conversation and supply what
                  is missing. This is not a measured failure from the live demo.
                </p>
                <button
                  type="button"
                  onClick={openImprovement}
                  className="mt-3 min-h-11 text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                  style={{ color: demo.accent }}
                >
                  Preview how to improve this answer →
                </button>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <h5 className="font-semibold text-slate-950">
                  Worth acting on
                </h5>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {demo.teamView[0].insight}
                </p>
              </div>
              <a
                href="#conversation-example"
                className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4"
                style={{ color: demo.accent }}
              >
                Explore an example conversation ↓
              </a>
            </div>
          </article>
        </TabsContent>
        <TabsContent value="notification" className="bg-slate-50 p-4 sm:p-7">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-950">
                A follow-up can start with the context.
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                With lead collection configured, a visitor can leave contact
                details. The selected staff receive an email with those details,
                a conversation summary and a link to review the conversation.
              </p>
              <p className="text-sm leading-relaxed text-slate-600">
                Most visitors can get the information they need in the chat. A
                lead email gives your team a path to follow up when someone
                wants the next conversation.
              </p>
              <p className="text-xs leading-relaxed text-slate-500">
                This is an example of configured lead forwarding. Opening it
                sends nothing. Report emails and lead forwarding are not
                connected to the live preview above.
              </p>
            </div>
            <article
              className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white"
              aria-label="Sample staff notification"
            >
              <div className="border-b border-slate-200 px-5 py-4 text-xs text-slate-500">
                Example staff email · Fictional contact
              </div>
              <div className="space-y-4 p-5">
                <h4 className="font-semibold text-slate-950">
                  New website inquiry
                </h4>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-medium text-slate-500">Name</dt>
                    <dd className="mt-1 text-slate-700">Alex Example</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-slate-500">
                      Email
                    </dt>
                    <dd className="mt-1 break-all text-slate-700">
                      alex@example.test
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-slate-500">
                      Conversation summary
                    </dt>
                    <dd className="mt-1 leading-relaxed text-slate-700">
                      The visitor asked: “{demo.teamView[0].question}” They
                      requested a follow-up after exploring the information.
                    </dd>
                  </div>
                </dl>
                <a
                  href="#conversation-example"
                  className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4"
                  style={{ color: demo.accent }}
                >
                  View example conversation ↓
                </a>
              </div>
            </article>
          </div>
        </TabsContent>
        <TabsContent value="improvement" className="bg-slate-50 p-4 sm:p-7">
          <AnswerImprovementPreview key={demo.slug} demo={demo} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
