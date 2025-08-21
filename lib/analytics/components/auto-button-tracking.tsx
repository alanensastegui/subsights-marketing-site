"use client";

import * as React from "react";
import { useAnalytics } from "@/lib/analytics";
import type { ButtonClickParameters, ConversionParameters } from "@/lib/analytics";

// ---- Config ------------------------------------------------------------
const PAGE_MODE: "path" | "path+query" = "path+query";
const DEDUPE_WINDOW_MS = 400;
const SAFE_KEY_REGEX = /^[a-z0-9_]+$/i;
const SUSPICIOUS_KEYS = new Set(["email", "e-mail", "phone", "tel", "address", "ssn", "dob"]);
const RESERVED_KEYS = new Set(["__proto__", "prototype", "constructor"]);
const CONTEXT_KEY_CAP = 25;
const DROP_PARAMS = new Set([
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid", "fbclid", "msclkid",
]);
const DEBUG = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "1";
// -----------------------------------------------------------------------

type AnyEl = HTMLElement & {
  dataset: HTMLElement["dataset"] & {
    analyticsName?: string;
    analyticsId?: string;
    analyticsEnabled?: "true" | "false";
    analyticsPage?: string;
    analyticsContext?: string;

    buttonPosition?: string;
    size?: string;
    variant?: string;

    conversionId?: string;
    conversionLabel?: string;
    conversionValue?: string;
    conversionCurrency?: string;
    conversionParams?: string;
    conversionFire?: "onClick" | "manual" | string;
  };
};

export function AutoButtonTracking() {
  const analytics = useAnalytics();

  // Create wrapper functions that match the expected interface
  const trackButtonClick = (name: string, page?: string, ctx?: Record<string, unknown>) => {
    analytics.trackEvent({
      event_name: "button_click",
      event_category: "button",
      event_label: name,
      custom_parameters: {
        page: page || "",
        ...ctx,
      } as ButtonClickParameters,
    });
  };

  const trackConversion = (payload: {
    conversion_id: string;
    conversion_label: string;
    value?: number;
    currency?: string;
    custom_parameters?: Record<string, unknown>;
  }) => {
    analytics.trackConversion({
      conversion_id: payload.conversion_id,
      conversion_label: payload.conversion_label,
      value: payload.value,
      currency: payload.currency,
      custom_parameters: payload.custom_parameters as ConversionParameters,
    });
  };

  // Keep latest funcs w/o re-binding listeners
  const ref = React.useRef({ trackButtonClick, trackConversion });
  ref.current.trackButtonClick = trackButtonClick;
  ref.current.trackConversion = trackConversion;

  // True per-element dedupe
  const lastFireMap = React.useRef(new WeakMap<HTMLElement, number>()).current;

  React.useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!event.isTrusted) return; // ignore programmatic

      const type = event.type as "click" | "auxclick";
      const isPrimary = type === "click" && event.button === 0;
      const isMiddle = type === "auxclick" && event.button === 1;
      if (!isPrimary && !isMiddle) return; // ignore right-click

      const el = getButtonElementFromEvent(event) as AnyEl | null;
      if (!el) return;

      // Respect disabled fieldsets & aria-disabled/disabled
      const ariaDisabled = (el.getAttribute("aria-disabled") || "").toLowerCase() === "true";
      if (el.closest("fieldset[disabled]")) return;
      if (el.hasAttribute("disabled") || ariaDisabled) return;

      if (el.dataset.analyticsEnabled === "false") return;

      // Next Link SPA: track even if default is prevented, but only for anchors
      const anchor = el.closest("a[href]") as HTMLAnchorElement | null;
      if ((event as MouseEvent & { defaultPrevented?: boolean }).defaultPrevented && !anchor) return;

      // Dedupe per element
      const lastT = lastFireMap.get(el) || 0;
      const now = Date.now();
      if (now - lastT < DEDUPE_WINDOW_MS) return;
      lastFireMap.set(el, now);

      const page = el.dataset.analyticsPage || buildPageFromLocation(location);
      const name = inferName(el);
      const openInNew =
        isMiddle ||
        isModified(event) ||
        el.getAttribute("target") === "_blank" ||
        (anchor?.target === "_blank");

      const context = capKeys(
        sanitizeContext({
          button_id: el.dataset.analyticsId,           // stable ID
          button_position: el.dataset.buttonPosition,
          button_size: el.dataset.size,
          button_variant: el.dataset.variant,
          open_in_new_tab: openInNew,
          ...safeJson(el.dataset.analyticsContext),
        }),
        CONTEXT_KEY_CAP
      );

      if (DEBUG) console.debug("[analytics] button_click", { name, page, context });

      try {
        ref.current.trackButtonClick(name, page, context);
      } catch { /* swallow analytics errors */ }

      // Optional conversion (default onClick)
      const convId = el.dataset.conversionId;
      const convLabel = el.dataset.conversionLabel;
      const convFire = (el.dataset.conversionFire || "onClick").toLowerCase();
      if (convId && convLabel && convFire === "onclick") {
        const payload = {
          conversion_id: convId,
          conversion_label: convLabel,
          value: parseNumber(el.dataset.conversionValue),
          currency: el.dataset.conversionCurrency || undefined,
          custom_parameters: { page, ...safeJson(el.dataset.conversionParams) },
        };
        if (DEBUG) console.debug("[analytics] conversion", payload);
        try {
          ref.current.trackConversion(payload);
        } catch { /* swallow analytics errors */ }
      }
    };

    // Stable mount; passive listeners
    document.addEventListener("click", handler, { capture: false, passive: true });
    document.addEventListener("auxclick", handler as EventListener, { capture: false, passive: true });
    return () => {
      document.removeEventListener("click", handler, { capture: false });
      document.removeEventListener("auxclick", handler as EventListener, { capture: false });
    };
  }, [lastFireMap]);

  return null;
}

// ----------------- helpers -----------------

// Shadow DOM / portals-safe resolution
function getButtonElementFromEvent(e: MouseEvent): HTMLElement | null {
  const path = (e.composedPath?.() || []) as EventTarget[];
  for (const node of [e.target as EventTarget | null, ...path]) {
    if (node instanceof Element) {
      const hit = node.closest?.("[data-slot='button']");
      if (hit) return hit as HTMLElement;
    }
  }
  return null;
}

function buildPageFromLocation(loc: Location) {
  if (PAGE_MODE === "path") return loc.pathname;
  const sp = new URLSearchParams(loc.search);
  for (const k of Array.from(sp.keys())) {
    const v = sp.get(k) || "";
    if (DROP_PARAMS.has(k.toLowerCase()) || containsEmailLike(v) || containsPhoneLike(v)) {
      sp.delete(k);
    }
  }
  const q = sp.toString();
  return q ? `${loc.pathname}?${q}` : loc.pathname;
}

function inferName(el: HTMLElement): string {
  const ds = (el as AnyEl).dataset;
  if (ds.analyticsName) return ds.analyticsName.trim();

  const labelledBy = el.getAttribute("aria-labelledby");
  if (labelledBy) {
    const label = labelledBy
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent?.trim())
      .filter(Boolean)
      .join(" ");
    if (label) return label.slice(0, 120);
  }

  const aria = el.getAttribute("aria-label")?.trim();
  if (aria) return aria;

  const txt =
    (el as HTMLElement & { innerText?: string }).innerText?.replace(/\s+/g, " ").trim() ||
    el.textContent?.replace(/\s+/g, " ").trim();
  return txt && txt.length ? txt.slice(0, 120) : "button";
}

function isModified(e: MouseEvent) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
}

function safeJson(input?: string) {
  if (!input) return Object.create(null);
  try {
    const v = JSON.parse(input);
    return typeof v === "object" && v ? v : Object.create(null);
  } catch {
    return Object.create(null);
  }
}

function parseNumber(v?: string) {
  const n = v ? Number(v) : undefined;
  return Number.isFinite(n) ? (n as number) : undefined;
}

// ---- context sanitation (null-prototype + guards) ---------------------
function createBag(): Record<string, unknown> {
  return Object.create(null);
}

function sanitizeContext(ctx: Record<string, unknown>) {
  const out = createBag();

  for (const [k, v] of Object.entries(ctx || {})) {
    if (!k) continue;
    if (RESERVED_KEYS.has(k)) continue;
    if (!SAFE_KEY_REGEX.test(k)) continue;
    if (SUSPICIOUS_KEYS.has(k.toLowerCase())) continue;

    if (typeof v === "string") {
      const s = v.trim();
      if (!s) continue;
      if (containsEmailLike(s) || containsPhoneLike(s)) continue;
      out[k] = s.length > 200 ? `${s.slice(0, 197)}…` : s;
      continue;
    }

    if (typeof v === "number" || typeof v === "boolean") {
      out[k] = v;
      continue;
    }

    if (v && typeof v === "object" && !Array.isArray(v)) {
      // one-level flatten only
      for (const [ik, iv] of Object.entries(v as Record<string, unknown>)) {
        const key = `${k}_${ik}`;
        if (RESERVED_KEYS.has(key)) continue;
        if (!SAFE_KEY_REGEX.test(key)) continue;
        if (SUSPICIOUS_KEYS.has(ik.toLowerCase())) continue;

        if (typeof iv === "string") {
          const s = iv.trim();
          if (!s || containsEmailLike(s) || containsPhoneLike(s)) continue;
          out[key] = s.length > 200 ? `${s.slice(0, 197)}…` : s;
        } else if (typeof iv === "number" || typeof iv === "boolean") {
          out[key] = iv;
        }
      }
    }
  }

  return out;
}

function containsEmailLike(s: string) {
  return /\S+@\S+\.\S+/.test(s);
}
function containsPhoneLike(s: string) {
  return /(?:\+?\d[\s-]?){7,}/.test(s);
}

function capKeys<T extends Record<string, unknown>>(obj: T, max = 25): T {
  const out: Record<string, unknown> = Object.create(null);
  let i = 0;
  for (const [k, v] of Object.entries(obj)) {
    if (i++ >= max) break;
    out[k] = v;
  }
  return out as T;
}
