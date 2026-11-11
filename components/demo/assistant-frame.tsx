'use client';

import { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

// The live assistant panel. Full screen restyles this same panel to cover the viewport, the way the
// Subsights widget's own expand does, so the iframe is never reloaded and the conversation carries over.
export function AssistantFrame({
  slug,
  label,
  widgetUrl,
  panel,
}: {
  slug: string;
  label: string;
  widgetUrl: string;
  panel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const root = document.documentElement;
    const previous = { root: root.style.overflow, body: document.body.style.overflow };
    root.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      root.style.overflow = previous.root;
      document.body.style.overflow = previous.body;
      openButton.current?.focus();
    };
  }, [expanded]);

  return (
    <div
      className={
        expanded
          ? 'fixed inset-0 z-[100] flex h-[100dvh] flex-col bg-white'
          : `overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/60 ${panel}`
      }
      role={expanded ? 'dialog' : undefined}
      aria-modal={expanded ? true : undefined}
      aria-label={expanded ? `${label} assistant, full screen` : undefined}
    >
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 py-1 pl-4 pr-1">
        <h2 className="min-w-0 truncate text-sm font-semibold text-slate-950">{label}</h2>
        <div className="flex shrink-0 items-center gap-1">
          <span className="hidden rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 sm:inline">
            Live preview
          </span>
          {expanded ? (
            <button
              ref={closeButton}
              type="button"
              onClick={() => setExpanded(false)}
              className="inline-flex min-h-11 items-center gap-1.5 px-3 text-sm font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <X aria-hidden="true" className="h-5 w-5" />
              Close
            </button>
          ) : (
            <button
              ref={openButton}
              type="button"
              onClick={() => setExpanded(true)}
              aria-label="Expand chat to full screen"
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-slate-700 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Maximize2 aria-hidden="true" className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      <iframe
        id={`demo-assistant-${slug}`}
        src={widgetUrl}
        title={`${label} assistant preview`}
        className={`block w-full border-0 ${expanded ? 'min-h-0 flex-1' : 'h-[clamp(26rem,72svh,44rem)] sm:h-[620px]'}`}
        referrerPolicy="no-referrer"
        allow="clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
