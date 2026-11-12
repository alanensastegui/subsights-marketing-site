import type { CSSProperties, ReactNode } from 'react';
import type { Comparison, Tier } from '@/lib/demo/comparisons/schema';

// The side-by-side on a prospect's demo page: the same visitor questions, what a visitor gets today and what the
// demo assistant answers, both verbatim, grouped by what the question means to the business. Fair wording: it
// describes what the visitor gets, never the product or people behind it.
const TIER_COPY: Record<Tier, { title: string; intro?: string }> = {
  common: { title: 'Questions most visitors ask' },
  decisive: { title: 'Questions that win or lose a customer' },
  harmful_if_wrong: {
    title: 'Where a wrong answer costs more than no answer',
    intro:
      'Wrong hours or directions, a made-up price or policy, an allergy answer or a request that goes nowhere can cost more than having no chat at all.',
  },
};

const DEFAULT_PARTNER = [
  { title: 'Set up with your team', text: 'We work with you on the content, appearance and real questions before launch, including the difficult follow-ups.' },
  { title: 'Tested on the questions that matter', text: 'Before it goes live we ask it your visitors’ real questions, including the ones where a wrong answer would cost you.' },
  { title: 'Keeps improving', text: 'We read what people ask. A gap becomes a website update or better assistant knowledge, and the answer is checked again after the change.' },
  { title: 'Fully managed', text: 'No prompts or settings for your staff to maintain. Tell us what changed and we update it.' },
];

const seconds = (value?: number | null) => (value == null ? null : `${value < 10 ? value.toFixed(1) : Math.round(value)} s`);

export function ProspectComparison({
  comparison,
  accent,
  heading,
  panel,
}: {
  comparison: Comparison;
  accent: string;
  heading: CSSProperties;
  panel: string;
}) {
  const tiers = (['common', 'decisive', 'harmful_if_wrong'] as const).filter((tier) =>
    comparison.questions.some((question) => question.tier === tier)
  );
  const partner = comparison.partner?.points ?? DEFAULT_PARTNER;
  const reliability = comparison.reliability;
  return (
    <section id="comparison" className="scroll-mt-5" aria-labelledby="comparison-title">
      <h2 id="comparison-title" className="text-2xl font-semibold tracking-tight text-slate-950" style={heading}>
        The same questions, side by side
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
        Asked {formatDate(comparison.asked.date)} as an anonymous visitor. Each answer is shown exactly as it was given.
        {comparison.asked.note ? ` ${comparison.asked.note}` : ''}
      </p>

      {comparison.found && (
        <div className={`mt-5 border border-slate-200 bg-white p-5 ${panel}`} aria-labelledby="found-title">
          <h3 id="found-title" className="text-base font-semibold text-slate-950">
            What we found on your site today
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-600">
            {comparison.found.tools.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {comparison.found.faq && <p className="mt-3 text-sm leading-relaxed text-slate-600"><span className="font-semibold text-slate-900">FAQ:</span> {comparison.found.faq}</p>}
          {comparison.found.gap && <p className="mt-2 text-sm leading-relaxed text-slate-600"><span className="font-semibold text-slate-900">What a visitor can’t do yet:</span> {comparison.found.gap}</p>}
          {comparison.found.noticed && comparison.found.noticed.length > 0 && (
            <details className="mt-3 text-sm text-slate-600">
              <summary className="cursor-pointer font-medium text-slate-900">Small things we noticed</summary>
              <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
                {comparison.found.noticed.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      {tiers.map((tier) => (
        <div key={tier} className="mt-6" data-tier={tier}>
          <h3 className="text-base font-semibold text-slate-950">{TIER_COPY[tier].title}</h3>
          {TIER_COPY[tier].intro && <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-600">{TIER_COPY[tier].intro}</p>}
          <ul className="mt-3 space-y-4">
            {comparison.questions
              .filter((question) => question.tier === tier)
              .map((question) => (
                <li key={question.id} className={`border border-slate-200 bg-white p-4 ${panel}`}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-medium text-slate-950">“{question.q}”</p>
                    {question.verdict && <Verdict verdict={question.verdict} />}
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Answer label={question.theirs_source ?? comparison.theirs.label} text={question.theirs} time={seconds(question.theirs_seconds)} tone="theirs" />
                    <Answer label="With Subsights" text={question.ours} time={seconds(question.ours_seconds)} tone="ours" accent={accent} />
                  </div>
                  <p className="mt-3 text-sm text-slate-700">
                    <span className="font-semibold">What it means:</span> {question.outcome}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      ))}

      {reliability && (
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-700" data-testid="reliability">
          Our own check on {formatDate(reliability.checked)}: {reliability.passed} of {reliability.cases} test questions
          answered correctly, with {reliability.harmful_if_wrong_failures === 0 ? 'no' : reliability.harmful_if_wrong_failures}{' '}
          wrong {reliability.harmful_if_wrong_failures === 1 ? 'answer' : 'answers'} where a mistake would hurt.
        </p>
      )}

      {comparison.cost && (
        <div className={`mt-8 grid gap-4 border border-slate-200 bg-white p-5 sm:grid-cols-2 ${panel}`} aria-label="Cost and timing">
          <div>
            <h3 className="text-sm font-semibold text-slate-950">Today</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              {comparison.cost.today.map((item) => (
                <li key={item.label}>
                  <span className="font-medium text-slate-900">{item.label}:</span> {item.amount}
                  {item.note && <span className="block text-xs text-slate-500">{item.note}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-950">With Subsights</h3>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-medium text-slate-900">{comparison.cost.ours.plan}:</span> {comparison.cost.ours.price}
              {comparison.cost.ours.includes && <span className="block text-xs text-slate-500">{comparison.cost.ours.includes}</span>}
            </p>
            {comparison.cost.tradeoff && <p className="mt-2 text-sm text-slate-600"><span className="font-medium text-slate-900">Honest tradeoff:</span> {comparison.cost.tradeoff}</p>}
            {comparison.cost.timing && (
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {comparison.cost.timing.map((item) => (
                  <li key={item.label}>
                    <span className="font-medium text-slate-900">{item.label}:</span> {item.value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="mt-8" aria-labelledby="partner-title">
        <h3 id="partner-title" className="text-base font-semibold text-slate-950">
          A fully managed AI partner
        </h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {partner.map((point) => (
            <li key={point.title} className="border-l-2 pl-3 text-sm leading-relaxed text-slate-600" style={{ borderColor: accent }}>
              <span className="font-semibold text-slate-950">{point.title}.</span> {point.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Answer({ label, text, time, tone, accent }: { label: string; text: string; time: string | null; tone: 'theirs' | 'ours'; accent?: string }) {
  return (
    <figure className={`rounded-md p-3 ${tone === 'ours' ? 'bg-slate-50' : 'bg-slate-100'}`} style={tone === 'ours' && accent ? { boxShadow: `inset 3px 0 0 ${accent}` } : undefined}>
      <figcaption className="flex items-baseline justify-between gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span>{label}</span>
        {time && <span className="font-normal normal-case tracking-normal">{time}</span>}
      </figcaption>
      <blockquote className="mt-1 space-y-1 text-sm leading-relaxed text-slate-800">{renderAnswer(text)}</blockquote>
    </figure>
  );
}

const VERDICT: Record<string, string> = { both_right: 'Both right', ours_better: 'Ours went further', theirs_better: 'Theirs was better' };
function Verdict({ verdict }: { verdict: string }) {
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${verdict === 'both_right' ? 'bg-slate-100 text-slate-700' : verdict === 'ours_better' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
      {VERDICT[verdict]}
    </span>
  );
}

// Answers are stored as the assistant gave them, with light Markdown: lines, "- " bullets, **bold** and https links.
// Rendered as React text; nothing is set as HTML.
export function renderAnswer(text: string): ReactNode[] {
  return text.split(/\n+/).filter((line) => line.trim()).map((line, index) => {
    const bullet = /^\s*[-*]\s+/.test(line);
    const body = inline(line.replace(/^\s*[-*]\s+/, ''));
    return bullet ? <p key={index} className="pl-3 -indent-3">• {body}</p> : <p key={index}>{body}</p>;
  });
}
function inline(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g;
  let last = 0;
  for (const match of line.matchAll(re)) {
    if (match.index! > last) out.push(line.slice(last, match.index));
    if (match[1]) out.push(<strong key={match.index}>{match[1]}</strong>);
    else out.push(<a key={match.index} href={match[3]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{match[2]}</a>);
    last = match.index! + match[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
