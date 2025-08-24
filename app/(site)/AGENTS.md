
# AGENTS.md --- Pages & Sections Standards (app/(site)/**)

## Scope & Intent
Applies to:
- Page composers: `app/(site)/**/page.tsx`
- Section files: `app/(site)/**/sections/*.tsx`
- Interactive elements tracked by the site-wide **AutoButtonTracking** (via `data-slot="button"`)

Codex should follow these rules when creating or updating pages/sections. Use minimal diffs, keep pages as server components unless interactivity is required in a section.

---

## Analytics --- Event ID & Name Guidelines
Use these attributes on the element that has `data-slot="button"` (this includes any <Button />):

- **`data-analytics-id`** --- Stable, machine-friendly ID
  - format: lowercase `snake_case`; allowed: `[a-z0-9_]`; ≤ 64 chars
  - pattern: `[surface]_[action][_variant][_qualifiers]`
  - must be stable across copy changes (do **not** include display text)
  - common surfaces: `nav_desktop`, `nav_mobile`, `home_hero`, `home_call_to_action`, `case_studies_hero`, `case_studies_call_to_action`, `case_study_call_to_action`, `pricing_cta_{plan_key}_{billing}`
  - common actions: `demo`, `signup`, `contact_sales`, `learn_more`
  - dynamics:
    - pricing: `pricing_cta_{plan_key}_{billing}` where `plan_key` is snake_case (e.g., `professional_plus`), `billing` in `annual|monthly|custom`
    - A/B: append `_v{n}` or `_variant_{key}`
    - locale: append `_{locale}` (e.g., `_en`, `_es`)

- **`data-analytics-name`** --- Human label
  - format: `{Action Label} (Surface Label)`
  - keep short; don't encode params (put those in context)
  - examples: `Book Demo (Nav)`, `Book Demo (Home Hero)`, `Professional (Pricing)`

- **`data-analytics-context`** --- Small JSON string with structured params
  - common fields: `source` (e.g., `pricing`, `home_hero`), `section` (e.g., `hero`, `call-to-action`), `plan`, `billing`, optional `variant`, `ab_test`, `ab_group`, `locale`
  - example: `{"source":"pricing","section":"pricing","plan":"professional","billing":"annual"}`

**Implementation note:** auto-tracker reads
`data-analytics-id` → `button_id`; `data-analytics-name` → event label; `data-analytics-context` (parsed JSON) → merged into event context.

**Do/Don't**
- ✅ Keep IDs immutable across copy tweaks; keep Names readable; put parameters in **context**.
- ❌ No spaces/punctuation or display text in IDs; don't duplicate params in the Name.

---

## Page Composer --- explicit order + SEO metadata
**Keep the page a server component** (do **not** add `'use client'` to `page.tsx`). Client sections render inside.

**Imports**
```ts
import HeroPromo from "./sections/hero-promo";
import FeatureGrid from "./sections/feature-grid";
// import type { Metadata } from "next"; // if you need types
```

-   Use readable relative aliases for sections.

-   Avoid wildcard/glob imports and barrels (order must be explicit and visible).

**Composition pattern (required)**

```
export default function Page() {
  const Sections = [HeroPromo, FeatureGrid /*, ...*/];
  return <main>{Sections.map((S, i) => <S key={i} />)}</main>;
}
```

-   Use array position to control placement.

-   Don't pass props to sections; each reads its local copy.

**Metadata (Next.js Metadata API)**

-   Use buildMetadata from "@/lib/seo" for all pages. Prefer static export const metadata; use generateMetadata only when values depend on params/request.

-   Required per page: title, description (~140--160 chars), path (route starting with /).

-   Recommended: image (social card).

-   Notes: nearest layout.tsx holds site defaults (metadataBase, title.template, icons). buildMetadata sets canonical from path. Use ogType: "article" for blogs/docs, else default is "website". Use noindex: true only for gated/duplicate pages.

**Static example**

```
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description: "Transparent, flexible plans for teams of any size.",
  path: "/pricing",
  image: "/og/pricing.png",
});
```

**Dynamic example (slugs)**

```
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildMetadata({
    title: `Docs -- ${params.slug}`,
    description: `Documentation for ${params.slug}.`,
    path: `/docs/${params.slug}`,
    image: `/og/docs/${params.slug}.png`,
    ogType: "article",
  });
}
```

**Composer preflight**

-   Server component (no 'use client').

-   Imports from ./sections/*; no globs/barrels.

-   Sections array reflects intended order.

-   metadata present (static or generated) with title, description, path (canonical auto).

-   Social cards configured or intentionally inherited.

-   Lint/typecheck clean; run Prettier.

* * * * *

**Sections --- base standards (every section file)**
--------------------------------------------------

**Contract**

-   Local type Copy.

-   **SECTION COPY REGION**  copy object (satisfies Copy).

-   export const sectionId = "<slug>" (kebab-case; must match filename).

-   export default function Section() reads from copy.

-   Heading hierarchy: **use h2** for section titles (avoid multiple h1 on pages).

**Allowed imports (strict)**

-   react

-   next/link (default export Link)

-   next/image (default export Image)

-   { cn } from "@/lib/cn"

-   UI primitives from "@/components/ui/*" (e.g., button, badge, card, accordion, etc.)

-   { Animate } from "@/components/ui/animate"

**Forbidden**

-   dangerouslySetInnerHTML, eval, new Function, direct window/document access (beyond what <Animate> abstracts), network calls, external <script>/<style>.

**Routing**

-   Internal: <Link href="/path">...</Link>

-   External/downloads: <a href="https://..." target="_blank" rel="noopener noreferrer">...</a> or <a download>.

-   With UI primitives that support asChild:

```
<Button asChild><Link href="/path">Label</Link></Button>
```

-   Do **not** nest <a> inside <Link>.

**Server/Client boundaries**

-   Render all text content on the **server** for SEO.

-   If you need hooks/handlers/refs or DOM access, split into two files:

    -   ./<slug>.tsx (server): headings/copy; renders the client component and passes props.

    -   ./<slug>-client.tsx (client): 'use client'; interactive logic.

**Styling & A11y**

-   Tailwind + design tokens (text-primary, bg-secondary, border-muted, etc.).

-   Semantic HTML; labeled controls; keyboard-friendly; logical heading order.

-   Images require meaningful alt. If Image uses fill, include sizes.

**Naming & collisions**

-   Filename is kebab-case human slug (e.g., hero-promo.tsx). No numeric prefixes.

-   If slug exists, choose a new meaningful slug. Do not rename existing files.

* * * * *

**Task recipes**
----------------

### **A) Create a new section**

> Start your reply with: **"I am going to be following the create task recipe."**

**Goal**

-   Create a self-contained file: /app/(site)/<page>/sections/<slug>.tsx.

-   Update the page composer to include the new section in explicit order.

-   Follow base standards and composer rules. Keep design consistent (scan one or two nearby sections first).

**Steps**

1.  **Infer slug**: lowercase → trim → replace spaces/punct/emoji with - → collapse repeats → strip leading/trailing -. If taken, pick a different sensible slug (don't rename existing files).

2.  **Create file** with required contract. Allowed imports only. Add 'use client' **only if** you use hooks/handlers/refs.

3.  **Populate minimal copy** with real-sounding placeholders. For unresolved items add TODOs **with resolution prompts** near copy:

    -   // TODO: confirm href → Ask: "What page should this link to?"

    -   // TODO: confirm image → Ask: "What image should be used? (describe or provide path)"

    -   // TODO: confirm copy → Ask: "What should this text say?"

4.  **Animation (optional)**: wrap with <Animate ...> using names/props from "@/components/ui/animate". If unspecified/invalid, default to fadeInStagger.

5.  **Images**: meaningful alt; if fill, set sizes.

6.  **Update composer**: import newly created section into page.tsx and insert into the Sections array at the requested position (append if unspecified). If the page composer is missing, bootstrap it and set minimal metadata via buildMetadata.

**Static template**

```
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Copy = {
  title: string;
  sub?: string;
  badge?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: { src: string; alt: string };
};

export const sectionId = "<slug>";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Your headline here", // TODO: confirm headline
  sub: "A short supporting sentence that explains the value.", // TODO: confirm subtext
  badge: "New Feature", // TODO: confirm badge (or remove)
  primaryCta: { label: "Get started", href: "/signup" }, // TODO: confirm primary CTA
  secondaryCta: { label: "Learn more", href: "/docs" }, // TODO: confirm secondary CTA
  image: { src: "/images/placeholder.png", alt: "Product UI" } // TODO: confirm image
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Section() {
  const c = copy;
  return (
    <section className={cn("relative isolate bg-background text-foreground")}>
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            {c.badge && <Badge variant="secondary" className="text-sm">{c.badge}</Badge>}
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{c.title}</h2>
            {c.sub && <p className="max-w-prose text-muted-foreground">{c.sub}</p>}
            <div className="flex flex-wrap gap-4">
              {c.primaryCta && (
                <Button asChild><Link href={c.primaryCta.href}>{c.primaryCta.label}</Link></Button>
              )}
              {c.secondaryCta && (
                <Button variant="ghost" asChild><Link href={c.secondaryCta.href}>{c.secondaryCta.label}</Link></Button>
              )}
            </div>
          </div>

          {c.image && (
            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-border/50">
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

**Animated template**

```
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animate } from "@/components/ui/animate";

type Copy = {
  title: string;
  sub?: string;
  badge?: string;
  ctas?: { label: string; href: string }[];
  image?: { src: string; alt: string };
};

export const sectionId = "<slug>";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Launch faster with polished sections", // TODO: confirm headline
  sub: "Single-file sections with great defaults.", // TODO: confirm subtext
  badge: "Launching Soon", // TODO: confirm badge
  ctas: [
    { label: "Try it free", href: "/signup" }, // TODO
    { label: "Watch demo", href: "/#tour" } // TODO
  ],
  image: { src: "/images/hero-ui.png", alt: "Product UI" } // TODO
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Section() {
  const c = copy;
  return (
    <section className={cn("relative isolate bg-neutral-950 text-white")}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Animate name="fadeInStagger" trigger="onVisible" as="div" className="space-y-6">
            {c.badge && (
              <Badge variant="outline" className="animate-item text-sm border-white/20 text-white">{c.badge}</Badge>
            )}
            <h2 className="animate-item text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{c.title}</h2>
            {c.sub && <p className="animate-item max-w-prose text-neutral-300">{c.sub}</p>}
            {c.ctas && (
              <div className="animate-item flex flex-wrap gap-4">
                {c.ctas.map((cta, i) => (
                  <Button key={i} asChild><Link href={cta.href}>{cta.label}</Link></Button>
                ))}
              </div>
            )}
          </Animate>

          {c.image && (
            <Animate name="parallax" trigger="onScroll" durationMs={1200} easing="ease-out" as="div" className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-white/10">
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Animate>
          )}
        </div>
      </div>
    </section>
  );
}
```

**Composer update (insert new section)**

```
import NewSection from "./sections/<slug>";

export default function Page() {
  const Sections = [NewSection /*, existing sections...*/];
  return <main>{Sections.map((S, i) => <S key={i} />)}</main>;
}
```

**Composer bootstrap (if page.tsx missing)**

```
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import NewSection from "./sections/<slug>";

export const metadata: Metadata = buildMetadata({
  title: "Page Title", // TODO: confirm title
  description: "One-sentence summary for SEO.", // TODO: confirm description
  path: "/<page>", // TODO: confirm path
  image: "/og/<page>.png", // TODO: confirm OG image
});

export default function Page() {
  const Sections = [NewSection];
  return <main>{Sections.map((S, i) => <S key={i} />)}</main>;
}
```

**Create preflight**

-   Allowed imports only;

-   sectionId matches filename slug.

-   copy typed and satisfies Copy.

-   Images have alt; sizes set when fill.

-   Internal links via <Link>; external links use <a target="_blank" rel="noopener noreferrer">.

-   Composer import added and placed correctly (or composer bootstrapped with metadata).

-   Minimal diffs; Prettier; no unused imports.

**Create TODO resolution prompts**

-   Metadata: title/description/path/image/ogType.

-   Section order/placement.

-   Copy, CTAs (text + href), image choice.

-   Animation name/timing/trigger if requested.

* * * * *

### **B) Update / enhance an existing section**

> Start your reply with: **"I am going to be following the update/enhance task recipe."**

**Guardrails**

-   Keep **stable identity**: same filename + export const sectionId.

-   Allowed imports only;

-   Maintain semantic HTML/a11y; no forbidden APIs/external scripts/styles.

**Change tiers**

1.  **Copy-only** --- edit just the **SECTION COPY REGION**.

2.  **Visual** --- Tailwind classes, spacing/typography/colors, grid/flex, reorder existing blocks.

3.  **Behavioral** --- handlers, small client state, <Animate> animations, swap/add UI primitives.

4.  **Structural** --- add fields to Copy and adjust markup.

**Steps**

1.  Open app/(site)/<page>/sections/<slug>.tsx; confirm sectionId equals <slug>.

2.  Apply the minimal tier needed.

3.  If changing schema: update type Copy (required fields by default), supply defaults in copy; mark optional fields only when truly conditional and guard rendering.

4.  Keep exports the same; remove unused imports.

5.  A11y pass: headings, labels/aria-*, keyboard, focus, alt text; if Image uses fill, set sizes.

6.  Only touch the page composer if explicitly asked to reorder/replace.

**Update TODO prompts (use when unclear)**

-   Layout/grid/spacing/responsive behavior.

-   Color scheme or component variants (default to theme colors/primary variants if unspecified).

-   Animation effect/timing/trigger.

-   Exact copy, CTA text + link, image choice.

**Update preflight**

-   Filename and sectionId unchanged; default export still Section.

-   Imports allowlisted;

-   If schema changed: new fields required unless truly conditional; copy provides sane defaults and satisfies Copy.

-   A11y verified; Image fill → sizes provided.

-   No forbidden APIs; no external <script>/<style>.

-   Composer untouched unless reorder/replace was requested.

* * * * *

**Animation usage**
-------------------

-   Use <Animate> from "@/components/ui/animate"; treat it as the source of truth for valid names/props (don't duplicate enums here).

-   If an animation isn't specified, use library defaults; if an invalid name is given, fall back to fadeInStagger.

* * * * *

**Installing new **
-------------------

**shadcn/ui**
-------------

** components**
---------------

1.  Check if it already exists under @/components/ui/*.

2.  If missing, install via CLI:

```
npx shadcn@latest add <component-name>
```

1.  Import from @/components/ui/<component-name>; apply documented variants/props and accessibility.

2.  Prefer existing primitives for consistency; build custom only for truly unique needs.

* * * * *

**Agent behavior (editing etiquette)**
--------------------------------------

-   Make **small, atomic diffs**; don't churn unrelated imports/formatting.

-   Preserve public surface (exports, props) unless intentionally refactoring.

-   Ask **specific** questions only when needed (use the TODO prompts above).

-   Run format/lint/typecheck locally and leave the tree clean.
