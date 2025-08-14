"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Rect = { top: number; left: number; width: number; height: number };
type Pos = { top: number; left: number };

interface WalkthroughStep {
  id: string;
  message: string;
  position: "top" | "left";
  ctaButton: {
    text: string;
    action: "click" | "sendMessage";
    target: string;
    value?: string;
  };
}

interface WalkthroughProps {
  steps: WalkthroughStep[];
  onComplete: () => void;
  anchorSelector?: string; // default "#subsights-chatbot-app-container"
  iframeSelector?: string;
  msgNamespace?: string;   // default "subsights:anchor"
  targetOrigin?: string | string[];
  isDefaultMode?: boolean; // default false
}

type AnchorReq = { ns: string; type: "GET_RECT"; selector: string; requestId: string };
type AnchorRes = { ns: string; type: "RECT"; requestId: string; rect: Rect | null };

const OFFSET = 20;
const PADDING = 8;
const READ_WPM = 200;
const CAP_MS = 30_000;    // max countdown 30s
const FINAL_DELAY_MS = 3_000; // wait 3s after ai message received before showing final bubble
const TIMER_DELAY_MS = 3_000;   // wait 3s after final bubble shows before starting timer

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const sameOriginDoc = (f: HTMLIFrameElement): Document | null => {
  try { return f.contentDocument ?? null; } catch { return null; }
};
const arrowClass = (pos: "top" | "left") =>
  pos === "top"
    ? "top-full left-1/2 -translate-x-1/2 border-t-8 border-l-8 border-r-8 border-transparent border-t-gray-200/60"
    : "left-full top-1/2 -translate-y-1/2 border-l-8 border-t-8 border-b-8 border-transparent border-l-gray-200/60";

/** Find a likely chat container in the current document or any same-origin iframe. */
function findChatContainer(): Element | null {
  const selectors = [
    "#subsights-chatbot-app-container",
    ".subsights-chatbot-app-container",
    "[data-subsights-chatbot]",
    ".chatbot-container",
  ];
  for (const s of selectors) {
    const el = document.querySelector(s);
    if (el) return el;
  }
  const iframes = document.querySelectorAll("iframe");
  for (const iframe of iframes) {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) continue;
      for (const s of selectors) {
        const el = doc.querySelector(s);
        if (el) return el;
      }
    } catch { }
  }
  return null;
}

export function Walkthrough({
  steps,
  onComplete,
  anchorSelector = "#subsights-chatbot-app-container",
  iframeSelector,
  msgNamespace = "subsights:anchor",
  targetOrigin,
  isDefaultMode,
}: WalkthroughProps) {
  const [positioned, setPositioned] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [pos, setPos] = useState<Pos>({ top: 0, left: 0 });
  const [appliedPosition, setAppliedPosition] = useState<"top" | "left">("top");
  const [walkthroughCompleted, setWalkthroughCompleted] = useState(false);
  const [aiMessageReceived, setAiMessageReceived] = useState(false);

  // Final/countdown state & refs
  const [finalRemainingSec, setFinalRemainingSec] = useState<number | null>(null); // null until timer starts (after delay)
  const finalDeadlineRef = useRef<number | null>(null);
  const finalTimeoutRef = useRef<number | null>(null);      // per-second tick
  const finalDelayTimeoutRef = useRef<number | null>(null); // initial 5s delay
  const finalAutoClickedRef = useRef(false);
  const finalTimerStartedRef = useRef(false);
  const finalPlannedMsRef = useRef<number | null>(null);    // reading time (capped), computed from AI msg

  const wrapperRef = useRef<HTMLDivElement>(null);
  const crossOriginActive = useRef(false);
  const advancedForStepRef = useRef(false);
  const pending = useRef(new Map<string, (r: Rect | null) => void>());

  // ----- cross-window RECT replies -----
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const msg = e.data as AnchorRes | undefined;
      if (!msg || msg.ns !== msgNamespace || msg.type !== "RECT" || !msg.requestId) return;
      const resolve = pending.current.get(msg.requestId);
      if (!resolve) return;
      pending.current.delete(msg.requestId);
      resolve(msg.rect ?? null);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [msgNamespace]);

  // ----- DOM helpers -----
  const allIframes = useCallback((): HTMLIFrameElement[] => Array.from(document.querySelectorAll("iframe")), []);
  const getSameOriginDocs = useCallback(
    (): Document[] => [document, ...allIframes().map(sameOriginDoc).filter((d): d is Document => !!d)],
    [allIframes]
  );

  const chooseIframe = useCallback((): HTMLIFrameElement | null => {
    const frames = allIframes();
    if (!frames.length) return null;
    if (iframeSelector) {
      const specific = frames.find((f) => f.matches(iframeSelector));
      if (specific) return specific;
    }
    const visible = frames.filter((f) => {
      const r = f.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    if (!visible.length) return null;
    return visible.reduce((a, b) => {
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      return ra.width * ra.height >= rb.width * rb.height ? a : b;
    });
  }, [allIframes, iframeSelector]);

  const postToChild = useCallback((win: Window, data: AnchorReq) => {
    if (Array.isArray(targetOrigin)) targetOrigin.forEach((o) => win.postMessage(data, o));
    else if (typeof targetOrigin === "string") win.postMessage(data, targetOrigin);
    else win.postMessage(data, "*");
  }, [targetOrigin]);

  const requestRectFromIframe = useCallback(
    (iframeEl: HTMLIFrameElement, selector: string, timeoutMs = 700): Promise<Rect | null> => {
      const requestId = Math.random().toString(36).slice(2);
      const req: AnchorReq = { ns: msgNamespace, type: "GET_RECT", selector, requestId };
      return new Promise<Rect | null>((resolve) => {
        const finalize = (r: Rect | null) => {
          clearTimeout(t);
          pending.current.delete(requestId);
          resolve(r);
        };
        pending.current.set(requestId, finalize);
        try {
          if (iframeEl.contentWindow) {
            postToChild(iframeEl.contentWindow, req);
          }
        }
        catch { finalize(null); return; }
        const t = setTimeout(() => { if (pending.current.has(requestId)) finalize(null); }, timeoutMs);
      });
    },
    [msgNamespace, postToChild]
  );

  // Anchor rect resolver (parent → same-origin iframe → cross-origin bridge)
  const resolveWidgetRect = useCallback(async (): Promise<Rect | null> => {
    const parentEl = document.querySelector(anchorSelector)?.children[0] as HTMLElement | null;
    if (parentEl) {
      crossOriginActive.current = false;
      const r = parentEl.getBoundingClientRect();
      return { top: r.top, left: r.left, width: r.width, height: r.height };
    }
    for (const frame of allIframes()) {
      const doc = sameOriginDoc(frame);
      if (!doc) continue;
      const el = doc.querySelector(anchorSelector)?.children[0] as HTMLElement | null;
      if (el) {
        crossOriginActive.current = false;
        const inner = el.getBoundingClientRect();
        const outer = frame.getBoundingClientRect();
        return { top: outer.top + inner.top, left: outer.left + inner.left, width: inner.width, height: inner.height };
      }
    }
    const xFrame = chooseIframe();
    if (xFrame) {
      const outer = xFrame.getBoundingClientRect();
      const inner = await requestRectFromIframe(xFrame, anchorSelector);
      if (inner) {
        crossOriginActive.current = true;
        return { top: outer.top + inner.top, left: outer.left + inner.left, width: inner.width, height: inner.height };
      }
      crossOriginActive.current = false;
      return { top: outer.top, left: outer.left, width: outer.width, height: outer.height };
    }
    return null;
  }, [anchorSelector, allIframes, chooseIframe, requestRectFromIframe]);

  // ----- positioning (steps + final) -----
  const positionBubble = useCallback(
    async (overridePosition?: "top" | "left") => {
      const rect = await resolveWidgetRect();
      if (!rect) return;

      const step = steps[stepIndex];
      const bubbleRect = wrapperRef.current?.getBoundingClientRect() ?? ({ width: 0, height: 0 } as DOMRect);

      let position: "top" | "left" = overridePosition ?? step.position;

      // auto-flip on tight space
      const needLeft = bubbleRect.width + OFFSET + PADDING;
      const haveLeft = rect.left;
      const needTop = bubbleRect.height + OFFSET + PADDING;
      const haveTop = rect.top;

      if (position === "left" && haveLeft < needLeft) position = "top";
      else if (position === "top" && haveTop < needTop) position = "left";

      if (position === "top") {
        let left = rect.left + rect.width / 2;
        let top = rect.top - OFFSET - bubbleRect.height;
        left = clamp(left, PADDING + bubbleRect.width / 2, window.innerWidth - PADDING - bubbleRect.width / 2);
        top = Math.max(PADDING, top);
        setPos({ top, left });
      } else {
        let left = rect.left - OFFSET - bubbleRect.width;
        let top = rect.top + rect.height / 2;
        left = clamp(left, PADDING, window.innerWidth - PADDING - bubbleRect.width);
        top = clamp(top, PADDING + bubbleRect.height / 2, window.innerHeight - PADDING - bubbleRect.height / 2);
        setPos({ top, left });
      }

      setAppliedPosition(position);
      setPositioned(true);
    },
    [resolveWidgetRect, stepIndex, steps]
  );

  const schedulePosition = useCallback((override?: "top" | "left") => {
    positionBubble(override);
    requestAnimationFrame(() => requestAnimationFrame(() => positionBubble(override)));
  }, [positionBubble]);

  const isFinal = walkthroughCompleted && aiMessageReceived;

  useEffect(() => {
    schedulePosition(isFinal ? "left" : undefined);
  }, [stepIndex, isFinal, schedulePosition]);

  useEffect(() => {
    const onResize = () => schedulePosition(isFinal ? "left" : undefined);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [schedulePosition, isFinal]);

  useEffect(() => {
    const id = setInterval(() => {
      if (crossOriginActive.current) schedulePosition(isFinal ? "left" : undefined);
    }, 500);
    return () => clearInterval(id);
  }, [schedulePosition, isFinal]);

  // ----- countdown helpers (minimal renders) -----
  const clearFinalTimer = useCallback(() => {
    if (finalTimeoutRef.current != null) {
      clearTimeout(finalTimeoutRef.current);
      finalTimeoutRef.current = null;
    }
  }, []);

  // Helper function to handle chatbot toggle in default mode
  const handleChatbotToggle = useCallback(() => {
    if (isDefaultMode) {
      const chatbotToggle = document.querySelector('.logo-toggle') as HTMLElement;

      if (chatbotToggle) {
        chatbotToggle.click();
      }
    }
  }, [isDefaultMode]);

  // Smooth first-second UX: fixed 1s cadence after showing the initial seconds
  const startFinalTimer = useCallback((ms: number) => {
    if (finalTimeoutRef.current != null || finalTimerStartedRef.current) return;
    finalTimerStartedRef.current = true;

    const capped = Math.min(ms, CAP_MS);
    finalDeadlineRef.current = Date.now() + capped;

    // Show initial seconds immediately (e.g., "12s")
    setFinalRemainingSec(Math.ceil(capped / 1000));

    const tick = () => {
      const deadline = finalDeadlineRef.current ?? Date.now();
      const remaining = Math.max(0, deadline - Date.now());
      const sec = Math.ceil(remaining / 1000);
      setFinalRemainingSec(sec);

      if (remaining <= 0) {
        if (!finalAutoClickedRef.current) {
          finalAutoClickedRef.current = true;
          // Handle chatbot toggle in default mode before completing
          handleChatbotToggle();
          onComplete();
        }
        clearFinalTimer();
        return;
      }
      // fixed 1s cadence avoids “fast first second”
      finalTimeoutRef.current = window.setTimeout(tick, 1000);
    };

    // first decrement ~1s after number appears
    finalTimeoutRef.current = window.setTimeout(tick, 1000);
  }, [clearFinalTimer, onComplete, handleChatbotToggle]);

  // ----- detect first AI message (compute reading time only) -----
  useEffect(() => {
    if (!walkthroughCompleted) return;
    const container = findChatContainer();
    if (!container) return;

    const toWordCount = (txt: string) => (txt.trim().match(/\S+/g)?.length ?? 0);

    const getAiElementFromNode = (node: Element): Element | null => {
      if (node.classList?.contains("chatbot-message-ai")) return node;
      return (
        node.querySelector?.(".chatbot-message-ai") ||
        node.querySelector?.(".chatbot-message-container.justify-start .chatbot-message-ai")
      );
    };

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type !== "childList") continue;
        for (const node of m.addedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          const el = node as Element;
          const aiEl = getAiElementFromNode(el);
          if (!aiEl) continue;

          const text = aiEl.textContent ?? "";
          const words = toWordCount(text);
          const rawMs = Math.ceil((words / READ_WPM) * 60_000);

          window.setTimeout(() => {
            finalPlannedMsRef.current = Math.min(rawMs, CAP_MS); // store for later
            // final bubble can show when timeout is hit
            setAiMessageReceived(true);
          }, FINAL_DELAY_MS);
          return;
        }
      }
    });

    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [walkthroughCompleted]);

  // ----- start the timer 5s AFTER the final bubble is shown -----
  useEffect(() => {
    if (!isFinal || !positioned) return;

    // avoid duplicate delays
    if (finalDelayTimeoutRef.current != null || finalTimerStartedRef.current) return;

    finalDelayTimeoutRef.current = window.setTimeout(() => {
      finalDelayTimeoutRef.current = null;
      const planned = finalPlannedMsRef.current ?? CAP_MS; // fallback if text missing
      startFinalTimer(planned);
    }, TIMER_DELAY_MS);

    return () => {
      if (finalDelayTimeoutRef.current != null) {
        clearTimeout(finalDelayTimeoutRef.current);
        finalDelayTimeoutRef.current = null;
      }
    };
  }, [isFinal, positioned, startFinalTimer]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (finalDelayTimeoutRef.current != null) {
        clearTimeout(finalDelayTimeoutRef.current);
        finalDelayTimeoutRef.current = null;
      }
      clearFinalTimer();
    };
  }, [clearFinalTimer]);

  // ----- CTA execution (same-origin only) -----
  const executeAction = useCallback(async (step: WalkthroughStep) => {
    try {
      let el: Element | null = null;
      let doc: Document = document;

      for (const d of getSameOriginDocs()) {
        const candidate = d.querySelector(step.ctaButton.target);
        if (candidate) { el = candidate; doc = d; break; }
      }
      if (!el) return false;

      if (step.ctaButton.action === "click") {
        (el as HTMLElement).click();
      } else if (step.ctaButton.action === "sendMessage" && step.ctaButton.value != null) {
        const input = el as HTMLInputElement | HTMLTextAreaElement;
        input.value = step.ctaButton.value;

        const Ev = (doc.defaultView?.Event ?? window.Event) as typeof Event;
        input.dispatchEvent(new Ev("input", { bubbles: true }));
        input.dispatchEvent(new Ev("change", { bubbles: true }));

        const form = input.closest(".chatbot-input-form");
        const submitButton = form?.querySelector(".chatbot-submit") as HTMLButtonElement | null;
        if (submitButton) setTimeout(() => submitButton.click(), 500);
      }
      return true;
    } catch {
      return false;
    }
  }, [getSameOriginDocs]);

  // Step advancement + end-of-walkthrough transition
  const advance = useCallback(async (performAction: boolean) => {
    if (advancedForStepRef.current) return;
    advancedForStepRef.current = true;

    if (performAction) await executeAction(steps[stepIndex]);

    const isLast = stepIndex >= steps.length - 1;
    setExiting(true);
    setTimeout(() => {
      setExiting(false);
      setPositioned(false);
      if (!isLast) {
        setStepIndex((i) => i + 1);
      } else {
        setWalkthroughCompleted(true);
      }
    }, 300);
  }, [executeAction, stepIndex, steps]);

  const nextStep = () => advance(true);

  // Auto-advance when the user triggers the step’s action (same-origin only)
  useEffect(() => {
    if (stepIndex >= steps.length) return;

    advancedForStepRef.current = false;

    const step = steps[stepIndex];
    const selector = step.ctaButton.target;
    const docs = getSameOriginDocs();

    const cleanups: Array<() => void> = [];
    const add = (doc: Document, type: string, handler: EventListener, options?: boolean | AddEventListenerOptions) => {
      doc.addEventListener(type, handler, options);
      cleanups.push(() => doc.removeEventListener(type, handler, options));
    };

    if (step.ctaButton.action === "click") {
      const onClick: EventListener = (e) => {
        if (!(e as Event & { isTrusted?: boolean }).isTrusted) return;
        const target = e.target as Element | null;
        if (target?.closest(selector)) advance(false);
      };
      docs.forEach((d) => add(d, "click", onClick, true));
    } else if (step.ctaButton.action === "sendMessage") {
      const onSubmit: EventListener = (e) => {
        if (!(e as Event & { isTrusted?: boolean }).isTrusted) return;
        const form = e.target as Element | null;
        if (form?.querySelector(selector)) advance(false);
      };
      docs.forEach((d) => add(d, "submit", onSubmit, true));

      const onClickSubmit: EventListener = (e) => {
        if (!(e as Event & { isTrusted?: boolean }).isTrusted) return;
        const t = e.target as Element | null;
        const btn = t?.closest(".chatbot-submit");
        if (!btn) return;
        const container = (btn as Element).closest(".chatbot-input-form");
        if (container?.querySelector(selector)) advance(false);
      };
      docs.forEach((d) => add(d, "click", onClickSubmit, true));

      const onEnterKey: EventListener = (evt) => {
        const ke = evt as KeyboardEvent;
        if (ke.key !== "Enter" || ke.shiftKey || ke.ctrlKey || ke.metaKey || ke.altKey) return;
        const active = (evt.currentTarget as Document).activeElement as Element | null;
        if (active?.matches?.(selector)) advance(false);
      };
      docs.forEach((d) => add(d, "keydown", onEnterKey, true));
    }

    return () => { cleanups.forEach((fn) => fn()); };
  }, [stepIndex, steps, getSameOriginDocs, advance]);

  // ----- render gates -----
  if (stepIndex >= steps.length && !walkthroughCompleted) return null;
  if (walkthroughCompleted && !aiMessageReceived) return null;
  if (!positioned) return null;

  const isShowingFinal = walkthroughCompleted && aiMessageReceived;
  const step = steps[stepIndex];
  const activePosition = appliedPosition || (isShowingFinal ? "left" : step.position);
  const wrapperTranslate = activePosition === "top" ? "transform -translate-x-1/2" : "transform -translate-y-1/2";

  const message = isShowingFinal ? "Click here to finish the demo" : step.message;

  // Show countdown ONLY after the 5s delay has elapsed (i.e., after timer actually started).
  const buttonText = isShowingFinal
    ? `Finish Demo${finalRemainingSec != null && finalRemainingSec > 0 ? ` (${finalRemainingSec}s)` : ""}`
    : step.ctaButton.text;



  const handleFinalClick = () => {
    // Cancel both the delay and the ticking timer
    if (finalDelayTimeoutRef.current != null) {
      clearTimeout(finalDelayTimeoutRef.current);
      finalDelayTimeoutRef.current = null;
    }
    finalTimerStartedRef.current = true; // prevent later auto-starts
    clearFinalTimer();
    finalAutoClickedRef.current = true;

    // Handle chatbot toggle in default mode
    handleChatbotToggle();

    onComplete();
  };

  const onClick = isShowingFinal ? handleFinalClick : nextStep;
  const animateKey = isShowingFinal ? `final-${exiting ? "exit" : "enter"}` : `${step.id}-${exiting ? "exit" : "enter"}`;

  const overlay = (
    <div className="fixed inset-0 pointer-events-none z-[2147483647]">
      <div
        ref={wrapperRef}
        className={cn("absolute max-w-sm pointer-events-auto", wrapperTranslate)}
        style={{
          top: pos.top,
          left: pos.left,
          maxWidth: `calc(100vw - ${PADDING * 2}px)`,
        }}
      >
        <Animate name={exiting ? "fadeOut" : "fadeIn"} trigger="onLoad" duration={300} key={animateKey}>
          <div className="relative bg-primary/30 border border-gray-200/50 rounded-xl shadow-2xl p-6 backdrop-blur-md max-w-xs">
            {/* Progress indicator for multi-step walkthroughs */}
            {!isShowingFinal && steps.length > 1 && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-primary to-purple-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-foreground dark:text-gray-400 font-medium">
                  {stepIndex + 1}/{steps.length}
                </span>
              </div>
            )}

            <p className="text-sm text-foreground leading-relaxed mb-4">{message}</p>
            <div className={cn(isShowingFinal && "flex justify-center")}>
              <Button
                size="sm"
                onClick={onClick}
                className={cn(
                  "font-semibold relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 text-foreground shadow-lg hover:shadow-xl hover:from-primary hover:to-purple-700 transform hover:scale-105 transition-all duration-200 border-0 active:scale-95",
                  isShowingFinal ? "w-36" : "w-full",
                  !isShowingFinal && "animate-pulse overflow-hidden"
                )}
              >
                {buttonText}
                {!isShowingFinal && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
                )}
              </Button>
            </div>
            <div className={cn("absolute", arrowClass(activePosition))} />
          </div>
        </Animate>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
