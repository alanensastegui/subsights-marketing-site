"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Rect = { top: number; left: number; width: number; height: number };
type Pos = { top: number; left: number };

interface GuideStep {
  id: string;
  message: string;
  position: "top" | "left";
  ctaButton: { text: string; action: "click" | "sendMessage"; target: string; value?: string };
}

interface GuideSequenceProps {
  steps: GuideStep[];
  onComplete: () => void;
  anchorSelector?: string; // default "#subsights-chatbot-app-container"
  iframeSelector?: string;
  msgNamespace?: string; // default "subsights:anchor"
  targetOrigin?: string | string[];
}

type AnchorReq = { ns: string; type: "GET_RECT"; selector: string; requestId: string };
type AnchorRes = { ns: string; type: "RECT"; requestId: string; rect: Rect | null };

const OFFSET = 20;  // gap between bubble and target
const PADDING = 8;  // viewport padding when clamping
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const sameOriginDoc = (f: HTMLIFrameElement): Document | null => {
  try { return f.contentDocument ?? null; } catch { return null; }
};
const arrowClasses = (pos: "top" | "left") =>
  pos === "top"
    ? "top-full left-1/2 -translate-x-1/2 border-t-8 border-l-8 border-r-8 border-transparent border-t-background"
    : "left-full top-1/2 -translate-y-1/2 border-l-8 border-t-8 border-b-8 border-transparent border-l-background";

export function GuideSequence({
  steps,
  onComplete,
  anchorSelector = "#subsights-chatbot-app-container",
  iframeSelector,
  msgNamespace = "subsights:anchor",
  targetOrigin,
}: GuideSequenceProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [pos, setPos] = useState<Pos>({ top: 0, left: 0 });
  const advancedForStepRef = useRef(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const pending = useRef(new Map<string, (r: Rect | null) => void>()); // postMessage resolvers
  const crossOriginActive = useRef(false);

  useEffect(() => setMounted(true), []);

  // Replies from child frames
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

  // DOM helpers
  const allIframes = useCallback(
    (): HTMLIFrameElement[] => Array.from(document.querySelectorAll("iframe")),
    []
  );

  const getSameOriginDocs = useCallback((): Document[] => {
    return [document, ...allIframes().map(sameOriginDoc).filter((d): d is Document => !!d)];
  }, [allIframes]);

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
    else win.postMessage(data, "*"); // dev / permissive
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
          iframeEl.contentWindow && postToChild(iframeEl.contentWindow, req);
        } catch {
          finalize(null);
          return;
        }

        const t = setTimeout(() => {
          if (pending.current.has(requestId)) finalize(null);
        }, timeoutMs);
      });
    },
    [msgNamespace, postToChild]
  );

  // Resolve widget rect (parent → same-origin iframe → cross-origin via bridge → iframe rect)
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

  // Compute bubble position
  const positionBubble = useCallback(async () => {
    const rect = await resolveWidgetRect();
    if (!rect) return;

    const step = steps[stepIndex];
    const bubbleRect = wrapperRef.current?.getBoundingClientRect() ?? ({ width: 0, height: 0 } as DOMRect);

    if (step.position === "top") {
      let left = rect.left + rect.width / 2;
      let top = rect.top - OFFSET - bubbleRect.height;
      left = clamp(left, PADDING + bubbleRect.width / 2, window.innerWidth - PADDING - bubbleRect.width / 2);
      top = Math.max(PADDING, top);
      setPos({ top, left });
    } else {
      let left = rect.left - OFFSET - bubbleRect.width;
      let top = rect.top + rect.height / 2;
      top = clamp(top, PADDING + bubbleRect.height / 2, window.innerHeight - PADDING - bubbleRect.height / 2);
      left = Math.max(PADDING, left);
      setPos({ top, left });
    }
  }, [resolveWidgetRect, stepIndex, steps]);

  // Initial + re-measure after paint (double RAF)
  useEffect(() => {
    if (!mounted) return;
    setVisible(true);
    positionBubble();
    requestAnimationFrame(() => requestAnimationFrame(positionBubble));
  }, [mounted, positionBubble]);

  // Update on step change
  useEffect(() => {
    if (mounted) positionBubble();
  }, [positionBubble, mounted]);

  // Update on viewport changes
  useEffect(() => {
    const onResize = () => void positionBubble();
    const onScroll = () => void positionBubble();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [positionBubble]);

  // Lightweight polling if cross-origin (child may scroll internally)
  useEffect(() => {
    const id = setInterval(() => {
      if (crossOriginActive.current) void positionBubble();
    }, 500);
    return () => clearInterval(id);
  }, [positionBubble]);

  // Execute CTA action (parent + same-origin only)
  const executeAction = useCallback(async (step: GuideStep) => {
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
        if (form) {
          const submitButton = form.querySelector(".chatbot-submit") as HTMLButtonElement | null;
          if (submitButton) {
            setTimeout(() => submitButton.click(), 500);
          }
        }
      }
      return true;
    } catch {
      return false;
    }
  }, [getSameOriginDocs]);

  const advance = useCallback(async (performAction: boolean) => {
    if (advancedForStepRef.current) return;
    advancedForStepRef.current = true;

    if (performAction) {
      await executeAction(steps[stepIndex]);
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      setVisible(false);
      setTimeout(onComplete, 300);
    }
  }, [executeAction, onComplete, stepIndex, steps]);

  const nextStep = () => advance(true);

  // Auto-advance when user performs the action (parent + same-origin only)
  useEffect(() => {
    if (!mounted || stepIndex >= steps.length) return;

    advancedForStepRef.current = false;

    const step = steps[stepIndex];
    const selector = step.ctaButton.target;

    const docs = getSameOriginDocs();
    const cleanups: Array<() => void> = [];
    const add = (doc: Document, type: string, handler: EventListener, options?: boolean | AddEventListenerOptions) => {
      doc.addEventListener(type as any, handler, options);
      cleanups.push(() => doc.removeEventListener(type as any, handler, options as any));
    };

    if (step.ctaButton.action === "click") {
      const onClick: EventListener = (e) => {
        if (!e.isTrusted) return;
        const target = e.target as Element | null;
        if (target?.closest(selector)) advance(false);
      };
      docs.forEach((d) => add(d, "click", onClick, true)); // capture phase
    }

    if (step.ctaButton.action === "sendMessage") {
      // Form submit
      const onSubmit: EventListener = (e) => {
        if (!e.isTrusted) return;
        const form = e.target as Element | null;
        if (form?.querySelector(selector)) advance(false);
      };
      docs.forEach((d) => add(d, "submit", onSubmit, true));

      // Explicit click on submit button (non-form UIs)
      const onClickSubmit: EventListener = (e) => {
        if (!e.isTrusted) return;
        const t = e.target as Element | null;
        const btn = t?.closest(".chatbot-submit");
        if (!btn) return;
        const container = (btn as Element).closest(".chatbot-input-form");
        if (container?.querySelector(selector)) advance(false);
      };
      docs.forEach((d) => add(d, "click", onClickSubmit, true));

      // Enter key in the target input (no-form UIs)
      const onEnterKey: EventListener = (evt) => {
        const ke = evt as KeyboardEvent;
        if (!ke.isTrusted) return;
        if (ke.key !== "Enter" || ke.shiftKey || ke.ctrlKey || ke.metaKey || ke.altKey) return;
        const active = (evt.currentTarget as Document).activeElement as Element | null;
        if ((active as any)?.matches?.(selector)) advance(false);
      };
      docs.forEach((d) => add(d, "keydown", onEnterKey, true));
    }

    return () => { cleanups.forEach((fn) => fn()); };
  }, [mounted, stepIndex, steps, getSameOriginDocs, advance]);

  if (!mounted || !visible || stepIndex >= steps.length) return null;

  const step = steps[stepIndex];
  const wrapperTranslate = step.position === "top" ? "transform -translate-x-1/2" : "transform -translate-y-1/2";

  const overlay = (
    <div className="fixed inset-0 pointer-events-none z-[2147483647]">
      <AnimatePresence mode="wait">
        <div
          ref={wrapperRef}
          className={cn("absolute max-w-sm pointer-events-auto", wrapperTranslate)}
          style={{ top: pos.top, left: pos.left }}
        >
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-background border border-border rounded-lg shadow-lg p-4"
          >
            <p className="text-sm text-foreground mb-3">{step.message}</p>
            <Button size="sm" onClick={nextStep} className="w-full">
              {step.ctaButton.text}
            </Button>
            <div className={cn("absolute", arrowClasses(step.position))} />
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );

  return createPortal(overlay, document.body);
}
