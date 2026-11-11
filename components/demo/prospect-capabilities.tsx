import type { CSSProperties } from 'react';
import { CALENDLY_URL } from '@/lib/config';
import type { Capability, ProspectDemo } from '@/lib/demo/config/prospects';

type Look = { heading: CSSProperties; panel: string };

function CapabilityItem({ item, demo, heading }: { item: Capability; demo: ProspectDemo; heading: CSSProperties }) {
  return (
    <li className="flex min-w-0 flex-col">
      <h4 className="font-semibold text-slate-950" style={heading}>
        {item.name}
      </h4>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.text}</p>
      <a
        href="#live-assistant"
        className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
        style={{ color: demo.accent }}
      >
        Ask “{item.ask}” ↑
      </a>
      {item.comingSoon && (
        <p className="text-xs leading-relaxed text-slate-600">{item.comingSoon}</p>
      )}
    </li>
  );
}

// What the live assistant does for this organization, each with a question to try in the chat above.
export function ProspectCapabilities({ demo, heading, panel }: { demo: ProspectDemo } & Look) {
  const capabilities = demo.capabilities;
  if (!capabilities) return null;
  return (
    <section
      id="capabilities"
      className={`scroll-mt-6 border border-slate-200 bg-white p-5 sm:p-7 ${panel}`}
      aria-labelledby="capabilities-title"
    >
      <h2
        id="capabilities-title"
        className="text-2xl font-semibold tracking-tight text-slate-950"
        style={heading}
      >
        {capabilities.title}
      </h2>
      {capabilities.tested && (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          {capabilities.tested}
        </p>
      )}
      <h3 className="mt-6 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Tools
      </h3>
      <ul className="mt-3 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.tools.map((item) => (
          <CapabilityItem key={item.name} item={item} demo={demo} heading={heading} />
        ))}
      </ul>
      <h3 className="mt-7 border-t border-slate-100 pt-6 text-xs font-semibold uppercase tracking-widest text-slate-500">
        How it answers
      </h3>
      <ul className="mt-3 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.habits.map((item) => (
          <CapabilityItem key={item.name} item={item} demo={demo} heading={heading} />
        ))}
      </ul>
    </section>
  );
}

// Needs we can shape the assistant around beyond this preview, and one way to talk it through.
export function ProspectBuiltFor({ demo, heading, panel }: { demo: ProspectDemo } & Look) {
  const builtFor = demo.builtFor;
  if (!builtFor) return null;
  return (
    <section
      id="built-for"
      className={`scroll-mt-6 border border-slate-200 bg-white p-5 sm:p-7 ${panel}`}
      aria-labelledby="built-for-title"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
        <div className="min-w-0">
          <h2
            id="built-for-title"
            className="text-2xl font-semibold tracking-tight text-slate-950"
            style={heading}
          >
            {builtFor.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{builtFor.text}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-950">{builtFor.invite}</p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ color: demo.accent }}
            data-analytics-id={`demo_${demo.slug.replaceAll('-', '_')}_talk`}
            data-analytics-name="Talk it through (Prospect Demo)"
          >
            Book a call with us ↗
          </a>
        </div>
        <ul className="grid min-w-0 gap-x-8 gap-y-4 sm:grid-cols-2">
          {builtFor.ideas.map((idea) => (
            <li key={idea.name} className="border-l-2 pl-3" style={{ borderColor: demo.accent }}>
              <p className="text-sm font-semibold text-slate-950">{idea.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{idea.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
