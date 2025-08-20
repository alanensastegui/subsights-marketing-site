# AutoButtonTracking – Architectural Design & Rollout Plan

**Status:** Approved for implementation
**Owner:** Web Platform / Analytics
**Last updated:** 2025‑08‑19

---

## 1) Executive Summary

**AutoButtonTracking** adds zero‑boilerplate click and conversion analytics to all UI buttons via a single, stable, document‑level listener. It preserves a presentation‑only `<Button>` component (SSR‑friendly) while providing robust, privacy‑aware telemetry that works for native buttons and `asChild` links, across SPA navigation, middle/modified clicks, Shadow DOM/portals, and disabled states. The system is vendor‑agnostic via a `useAnalytics()` provider contract and ships with strict PII guards, consent awareness, and defensive error handling.

**Why now?** Most buttons require tracking; wrappers add maintenance overhead and regressions. Event delegation yields consistent coverage with minimal risk.

---

## 2) Goals & Non‑Goals

**Goals**

* One‑time mount; no per‑button code or wrappers.
* Accurate click attribution for primary, middle, and modified clicks, including SPA `<Link>` navigation where `preventDefault()` is used.
* Optional conversion firing on click or manually after async success.
* Type‑ and privacy‑safe context including size/variant/position and stable IDs.
* Consent‑respecting and resilient: analytics failures never break UX.

**Non‑Goals**

* Tracking of right‑click context menu interactions.
* Automatic tracking of non‑button elements (menus, inputs, etc.).
* Page view tracking or non‑interaction telemetry (handled elsewhere).

---

## 3) High‑Level Design

### 3.1 Architecture

* **Base UI primitive**: `<Button>` remains SSR/presentational, exposing semantic attributes only: `data-slot="button"`, `data-variant`, `data-size`.
* **Global listener**: `<AutoButtonTracking/>` is a small client component mounted once in the root layout. It attaches a document‑level `click` and `auxclick` listener (passive), uses event delegation to find the nearest `[data-slot="button"]`, and sends analytics via `useAnalytics()`.
* **Configuration**: Lightweight compile‑time knobs (constants/env) to control page granularity, dedupe windows, context caps, and query‑param scrubbing.
* **Provider abstraction**: `useAnalytics()` surfaces `trackButtonClick`, `trackConversion`, and optional `isEnabled()`; different environments swap providers (Console, GA4, Ads, Disabled), keeping vendor lock‑in out of UI code.

### 3.2 Data Flow (click path)

1. User clicks anywhere in the document.
2. Listener resolves the target button element (Shadow DOM safe via `event.composedPath()` + `closest("[data-slot='button']")`).
3. Guards run (trusted event, not disabled/fieldset‑disabled, not opted‑out, deduped).
4. Name inferred (`data-analytics-name` → `aria-labelledby` → `aria-label` → innerText/textContent).
5. Page computed using `PAGE_MODE` with query‑param hygiene (drops UTMs, `*clid`, and PII‑like values).
6. Context assembled from dataset (`button_id`, `position`, `size`, `variant`, `open_in_new_tab`) + parsed JSON; sanitized (null‑prototype, reserved‑key guard, PII filters, value truncation, key cap).
7. `trackButtonClick(name, page, context)` invoked (try/catch).
8. If configured (`data-conversion-*` + `conversion_fire=onClick`), `trackConversion(...)` invoked (try/catch).

### 3.3 Conversion Triggers

* **On click:** Set `data-conversion-id`, `data-conversion-label`, optional `value`, `currency`, `conversion_params` JSON.
* **Manual (async success):** Mark element with `data-conversion-fire="manual"`; call `trackConversion(...)` when the operation completes.

---

## 4) Public Interfaces

### 4.1 Element‑level configuration (data attributes)

* `data-analytics-id` — **stable ID** for dashboards/experiments (e.g., `pricing_cta`).
* `data-analytics-name` — human label (defaults to inferred).
* `data-analytics-enabled="false"` — opt‑out for a given element.
* `data-analytics-page` — override page string (default per `PAGE_MODE`).
* `data-analytics-context` — JSON map (sanitized & flattened one level).
* `data-button-position` — free‑form (e.g., `hero`, `footer`).
* **Conversion:** `data-conversion-id`, `data-conversion-label`, `data-conversion-value`, `data-conversion-currency`, `data-conversion-params`, `data-conversion-fire="onClick|manual"`.

### 4.2 Provider contract (minimal)

```ts
interface AnalyticsProvider {
  trackButtonClick(name: string, page?: string, ctx?: Record<string, unknown>): void;
  trackConversion(payload: {
    conversion_id: string;
    conversion_label: string;
    value?: number; currency?: string;
    custom_parameters?: Record<string, unknown>;
  }): void;
  isEnabled?(): boolean; // Optional; consent gate
}
```

---

## 5) Detailed Behavior & Guards

* **Trusted events only:** Ignore programmatic `el.click()` via `event.isTrusted`.
* **Clicks handled:** Primary (`click`, `button===0`) and middle (`auxclick`, `button===1`), plus modified primary (`meta/ctrl/shift/alt`) interpreted as open‑in‑new.
* **Right‑clicks:** Ignored by design; document in team footnotes.
* **Next.js `<Link>` SPA:** Track even if `preventDefault()` was called, **only** if the button is inside an anchor.
* **Disabled states:** Respect `disabled`, case‑normalized `aria-disabled`, and `fieldset[disabled]` ancestry.
* **Shadow DOM & portals:** Use `event.composedPath()` to resolve the button across boundaries.
* **Dedupe:** Per‑element `WeakMap<HTMLElement, number>` with `DEDUPE_WINDOW_MS` (default 400ms).
* **Passive listeners:** `{ passive: true }` for a tiny perf win.
* **Page policy:** `PAGE_MODE="path+query"` by default with query scrubbing; configurable.
* **PII & safety:**

  * Sanitize context keys: regex whitelist, reserved‑key guard (`__proto__`, `prototype`, `constructor`).
  * Null‑prototype output objects.
  * Drop email/phone‑like strings; cap string length to 200 chars.
  * Cap total context keys (`CONTEXT_KEY_CAP`, default 25).
* **Consent:** Use provider `isEnabled()` if present; providers also no‑op under consent mode.
* **Resilience:** `try/catch` around analytics calls ensures no UI breakage.
* **Dev toggle:** `NEXT_PUBLIC_ANALYTICS_DEBUG=1` prints debug payloads.

---

## 6) Configuration & Defaults

* `PAGE_MODE: "path" | "path+query"` → default `"path+query"` with hygiene.
* `DEDUPE_WINDOW_MS: number` → default 400.
* `CONTEXT_KEY_CAP: number` → default 25.
* `DROP_PARAMS: string[]` → includes `utm_*`, `gclid`, `fbclid`, `msclkid`.
* `NEXT_PUBLIC_ANALYTICS_DEBUG: "0" | "1"` → default `"0"`.

---

## 7) Performance Characteristics

* **Mount cost:** O(1); two passive listeners (click/auxclick).
* **Per‑event cost:** O(1) guards + small string ops; single JSON parse for optional context.
* **Memory:** Dedupe `WeakMap` ties lifetimes to DOM elements; no leaks.
* **No rebind churn:** Listener mounted once; latest provider fns kept via `ref`.

---

## 8) Security & Privacy Considerations

* Prototype‑pollution protection via reserved‑key filtering and null‑prototype objects.
* PII minimization (emails/phones) and query‑param scrubbing.
* Consent aware; safe to ship in strict GDPR/EEA modes.
* Analytics never throws into the app surface; exceptions swallowed after debug logging.

---

## 9) Accessibility

* Name inference prioritizes accessible labels (`aria-labelledby` > `aria-label` > visible text) and trims to 120 chars.
* Works for `asChild` links; ensures analytics even with SPA navigation.

---

## 10) Testing Strategy

**Unit (Jest/Vitest + RTL)**

* Trusted events: programmatic `click()` ignored.
* `<Link>` with `preventDefault()` still tracks when inside anchor.
* Disabled states: `disabled`, `aria-disabled`, and `fieldset[disabled]` do not track.
* Dedupe: two rapid clicks emit once (within window).
* Name inference: `aria-labelledby` > `aria-label` > text; trimmed.
* Context sanitation: drops PII‑like strings, reserved keys, caps keys and value length; null‑prototype output.
* Query hygiene: UTMs/`*clid` and PII‑like values scrubbed.
* Provider throws: no uncaught errors; UI proceeds.

**E2E (Playwright)**

* SPA link navigation, middle/modified clicks, disabled/fieldset‑disabled, opt‑out attribute.
* `open_in_new_tab` correctness.
* Shadow DOM (component library slotting) path resolution.

**Cross‑browser checks**

* Safari middle‑click (auxclick best‑effort) + modified primary fallback.
* Chromium/Firefox standard behavior parity.

**Performance**

* Listener count stable across route changes.
* Cold/warm click latency negligible (<1ms handler body on typical hardware).

---

## 11) Observability & QA

* **Dev debug:** `NEXT_PUBLIC_ANALYTICS_DEBUG=1` logs payloads.
* **Console provider:** in dev/stage, surface payloads in devtools.
* **Dashboards:**

  * Button click event volume & unique users.
  * Top `button_id` and `name` (by page).
  * `open_in_new_tab` rate by CTA.
  * Conversion rate for CTAs configured with on‑click conversions.
* **Anomaly alerts:** sudden drop in total button clicks; per‑CTA alerts for marquee buttons.

---

## 12) Rollout Plan

**Time estimate:** \~1–2 hours for initial integration; same‑day validation.

### Steps

1. **Mount once**: Add `<AutoButtonTracking/>` to root layout/providers.
2. **Mark marquee CTAs**: Add `data-analytics-id` to hero/pricing/checkout buttons; optional `data-button-position`.
3. **Decide page policy**: Keep `PAGE_MODE="path+query"` (default) or switch to `"path"`; confirm with analytics team.
4. **Providers**: Use console provider in dev/stage, GA4/Ads in prod; wire consent to `isEnabled()` if available.
5. **Debug toggle**: Set `NEXT_PUBLIC_ANALYTICS_DEBUG=1` in lower envs; validate payloads.
6. **E2E pass**: Validate SPA `<Link>` clicks, middle/modified clicks, disabled and fieldset‑disabled, and per‑element opt‑out.
7. **Staged release**: Roll to a small percentage of traffic (if feasible) or to staging; watch dashboards for 24–48h.
8. **Production rollout**: Enable for all; keep debug off; keep alerts active.

### Acceptance criteria

* No console errors in production.
* Event volumes align with historical tracking (±10–15%) for comparable flows.
* All marquee CTAs report both `button_id` and `name` on expected pages.
* No reported navigation regressions (e.g., SPA link clicks).

### Rollback plan

* Feature‑flag the component mount; unmount `<AutoButtonTracking/>` if anomalies.
* Providers can be switched to Disabled provider without code removal.

---

## 13) Risks & Mitigations

* **Over‑counting from synthetic events** → Guard with `event.isTrusted` (done).
* **Missed SPA clicks due to `preventDefault()`** → Track for anchors despite default prevented (done).
* **Payload bloat** → Key/value caps and parameter scrubbing (done).
* **Prototype pollution via context JSON** → Reserved‑key guard + null‑prototype (done).
* **Auxclick Safari variance** → Also treat modified primary clicks as new‑tab (done).

---

## 14) Migration & Backward Compatibility

* Existing tracked wrappers may remain; they will still fire. Prefer removing wrappers over time to avoid double‑counting (wrap removal can be phased by route/feature flag).
* For manual conversions, no change required; continue calling `trackConversion(...)` on success paths.

---

## 15) Future Work (optional)

* **withTracking HOC** for non‑button components (e.g., cards) while maintaining event delegation as the default.
* **Sampling** or **rate‑limit** for extremely high‑frequency elements (rare for buttons).
* **Auto‑naming heuristics** using DOM ancestry (e.g., include nearest heading or section label) behind a flag.
* **Typed `data-analytics-context` schema** for common contexts (e.g., `experiment`, `variant`).

---

## 16) Appendix A — Reference Implementation Notes

* Stable, passive listeners; single effect with empty deps (functions refreshed via `ref`).
* Per‑element `WeakMap` dedupe window (`400ms`).
* Query hygiene drops common trackers and PII‑ish values; configurable.
* Consent via `isEnabled()`; providers also enforce consent.
* Logs gated behind `NEXT_PUBLIC_ANALYTICS_DEBUG`.

---

## 17) “Pin‑it” Rollout Checklist

* [ ] Mount `<AutoButtonTracking/>` once (root layout/providers).
* [ ] Add `data-analytics-id` to hero/pricing/checkout CTAs.
* [ ] Confirm `PAGE_MODE` and `DROP_PARAMS` with analytics stakeholders.
* [ ] Dev/stage providers set; prod provider configured; consent wired.
* [ ] Enable debug in dev/stage; verify payloads.
* [ ] E2E: SPA `<Link>`, middle/modified clicks, disabled/fieldset‑disabled, opt‑out.
* [ ] Dashboards & alerts in place; thresholds agreed.
* [ ] Progressive rollout or staging soak; then full prod.

---

**Decision:** Proceed. The design is production‑grade, low‑maintenance, and resilient with strong privacy/consent posture. Ship it. 🚀
