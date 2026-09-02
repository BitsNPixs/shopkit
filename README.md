# ShopKit

**The e-commerce design system you can copy-paste.** HTML + CSS authored in SCSS,
with token-driven **runtime theming**, first-class **dark mode**, and **multi-brand**
support on a single page — no recompile. The optional React layer
([`@shopkit/react`](react/)) reuses the exact same tokens and class names, with a
parity guard so the two can never drift.

> **Status: Phases 1–8 complete.** Foundation, utilities, the full Core-UI + e-commerce
> component set, the storefront layout sections, the formal variant/size/state API
> ([`VARIANT-API.md`](VARIANT-API.md)), the token-driven motion system ([`MOTION.md`](MOTION.md)),
> a drift-guarded **React parity layer** ([`@shopkit/react`](react/)), and a **docs site + floating
> theme customizer** ([`docs/landing.html`](docs/landing.html)) all ship. Release infra (Phase 9) is
> next. **Full plan & progress → [`PHASES.md`](PHASES.md).**

Compiled core today: **20.1 KB gzip** (min) — 67% of the 30 KB budget, ~35 components +
a typed React layer.

---

## Quick start

### CDN (just paste a link)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/shopkit/dist/shopkit.min.css">
```
```html
<section class="sk-section sk-section--alt">
  <div class="sk-container">
    <div class="sk-product-grid"> … </div>
  </div>
</section>
```

### SCSS (npm)
```scss
// pull in the whole library …
@use "shopkit/scss/shopkit";
```
```bash
npm install    # dart-sass + stylelint (logical-properties guard)
npm run build  # -> dist/shopkit.css + dist/shopkit.min.css
npm run lint   # fail the build on any physical (non-logical) property → RTL-safe
npm run size   # gzip budget report
```

---

## Architecture at a glance

| Decision | What it is | Problem it solves |
|---|---|---|
| **3-tier tokens** | primitives → semantic → component | no magic numbers; reskin = remap the semantic tier |
| **Semantic, not literal** | components read `--sk-color-primary`, never `--sk-indigo-600` | swap a brand without touching a component |
| **Runtime theming via CSS vars** | dark + brand are attribute-scoped variable overrides | change brand / add a 3rd brand **at runtime**, no rebuild |
| **First-class dark** | `[data-theme]` + `prefers-color-scheme`, token-driven | dark isn't a bolted-on stylesheet |
| **`@layer` cascade** | `reset → tokens → base → layout → components → utilities` | consumer (unlayered) CSS always wins — no specificity wars |
| **Zero `!important`** | flat, low-specificity selectors throughout | overrides are predictable |
| **Logical properties** | `margin-inline`, `inset-inline-start`, … everywhere | `dir="rtl"` just works |
| **One source of truth** | React (later) emits the same classes + reads the same vars | CSS and framework can't drift |
| **Small, purgeable core** | tree-shakeable SCSS partials, prefixed classes | you pay only for what you use |

---

## Naming convention

BEM-ish, namespaced, low-specificity:

```
.sk-block               component root         .sk-product-card
.sk-block__element       part of a component    .sk-product-card__price
.sk-block--modifier      variant / state        .sk-product-card--horizontal
.sk-utility              single-purpose helper  .sk-mt-4  .sk-flex
--sk-token               design token           --sk-color-primary
[data-theme] [data-brand] runtime theme scopes
```

Everything is prefixed `sk` (configurable in `scss/_config.scss`) so nothing collides
with your own CSS.

---

## Token tiers

**Tier 1 — Primitives** (private): raw ramps and scales — `--sk-indigo-600`,
`--sk-space-6`, `--sk-radius-md`, `--sk-text-3xl`, `--sk-shadow-lg`. You rarely touch
these directly.

**Tier 2 — Semantic** (the public theming API): intent-named tokens that map to
primitives and change per theme/brand:

```
--sk-color-bg / -surface / -surface-alt / -surface-sunken / -surface-inverse
--sk-color-text / -text-muted / -text-subtle / -text-inverse
--sk-color-primary / -primary-hover / -primary-active / -primary-contrast / -primary-soft
--sk-color-accent / -link / -border / -border-strong / -border-subtle
--sk-color-price / -sale / -star / -out-of-stock
--sk-color-badge-new / -badge-sale / -badge-bestseller / -badge-contrast
--sk-color-success / -danger / -warning / -info (+ *-soft)
--sk-radius  --sk-shadow-*  --sk-font-body  --sk-font-heading
--sk-space-section  --sk-space-gutter  --sk-container-max  --sk-focus-ring-*
--sk-dur-fast/base/slow  --sk-ease-standard/out/spring
```

**Tier 3 — Component** (per-component override surface): each component reads the
semantic layer but exposes its own tokens that **fall back to** a semantic default:

```css
.sk-btn { --sk-btn-radius: var(--sk-radius); border-radius: var(--sk-btn-radius); }

/* narrow a change to one component … */
.sk-btn { --sk-btn-radius: 0; }
/* … or reskin everything by moving the semantic token */
:root { --sk-radius: 2px; }
```

---

## Theming

### Light / dark / system
Light is the `:root` default. Dark is honoured two ways:

```html
<html data-theme="dark">   <!-- explicit, wins everywhere -->
<html>                      <!-- no attribute → follows prefers-color-scheme -->
```
`data-theme` also works on **any wrapper**, so you can dark-mode a subtree.

### Multi-brand (zero recompile)
Scope any subtree with `data-brand` (or `.theme-x`). Brands re-point the brand/accent
ramps; the semantic layer is re-derived in-scope, so **brand × mode composes
automatically** — a `verde` panel inside a dark theme picks the correct dark step on
its own.

```html
<section data-brand="verde"> …emerald… </section>
<section data-brand="ember"> …rose… </section>
```
Built-in brands: `aurora` (indigo), `verde` (emerald), `ember` (rose). Add your own by
following the pattern in `scss/tokens/_semantic.scss`.

### Rebrand in ~15 variables
The fastest reskin overrides only the semantic anchors at runtime — no build step:

```css
:root {
  --sk-brand-500:  #e14b8a;   --sk-brand-600: #d21f6b;   --sk-brand-700: #b0125a;
  --sk-accent-600: #7c3aed;
  --sk-color-price: #101828;  --sk-color-sale: #e11d48;  --sk-color-star: #f59e0b;
  --sk-color-bg: #fbfbfd;     --sk-color-surface: #fff;  --sk-color-text: #101828;
  --sk-radius: 12px;
  --sk-font-body: "Inter", sans-serif;  --sk-font-heading: "Space Grotesk", sans-serif;
  --sk-container-max: 1200px;
  --sk-space-section: clamp(3rem, 6vw, 7rem);  --sk-space-gutter: 1.5rem;
}
```

---

## Customization API — two surfaces

1. **Build-time** — `scss/_config.scss`: structural knobs (prefix, breakpoints, grid
   columns, the numeric spacing/radius/type scales). Recompile after editing.
2. **Runtime** — the Tier-2 CSS variables above: colours, modes, radius, fonts,
   spacing rhythm, motion. Toggle an attribute or call `style.setProperty()`; no build.

---

## Motion (token-driven, reduced-motion first)

All motion reads `--sk-dur-*` / `--sk-ease-*`. Users who prefer reduced motion have those
durations zeroed automatically (no `!important`), so every transition and animation goes
still — and you can force a mode:

```html
<html data-motion="off">    <!-- or data-motion="full" to opt back in -->
```

Author transitions with the `transition()` mixin and drop in enter animations with the
`.sk-animate-*` utilities (`fade` · `fade-up` · `fade-down` · `scale-in` · `spin` · `pulse`).
Full contract in **[`MOTION.md`](MOTION.md)**.

---

## Accessibility & i18n

- Token-driven focus ring on every interactive element (`outline`-based → follows
  border-radius, survives `overflow:hidden`, maps to a system colour in forced-colors).
- Colour steps chosen per mode so key pairings (text, primary label, sale, badges)
  meet WCAG 2.2 AA in **both** light and dark — see the live contrast panel in the demo.
- Tap targets: default interactive controls (buttons, inputs, stepper, nav icons) are
  ≥44px via `--sk-control-height: 2.75rem`. Compact variants (small buttons, pagination,
  tabs, swatches) meet the **WCAG 2.2 AA** minimum target size (SC 2.5.8, 24×24px); the
  44px figure is the **AAA** target (SC 2.5.5), not a blanket guarantee.
- Logical properties throughout → `dir="rtl"` flips layout with no extra CSS.
- `.sk-sr-only`, `.sk-sr-only-focusable`, `.sk-skip-link` provided.

---

## File structure

```
shopkit/
  scss/
    _config.scss          build-time knobs
    _tools.scss           sass helpers (fluid clamp, name helpers)
    _layers.scss          @layer order (emitted first)
    tokens/               primitives · semantic · component
    base/                 mixins · reset · typography · a11y
    layout/               container · grid · section
    components/           (Phase 2+)
    utilities/            (Phase 2+)
    shopkit.scss          entry
  dist/                   compiled + minified CSS
  docs/                   index.html (live theming demo) + preview.html
  scripts/size.cjs        gzip budget report
```

---

## Demo

`docs/preview.html` is a standalone, token-driven page (open it in a browser). The
control deck flips mode, brand, radius, gutter, section rhythm, motion, and text
direction — everything re-skins live, proving the token system needs no rebuild. It
also shows a live contrast check and a paste-ready "copy your theme" block (the seed of
the Phase 8 floating customizer). Persistence (`localStorage`) is intentionally omitted
in this preview.

## Roadmap

Tracked in detail (with checkboxes) in **[`PHASES.md`](PHASES.md)**.

1. **Foundation** ✅ tokens, layers, reset, type, layout, dark + multi-brand
2. **Utilities + core UI** ✅ spacing/display/flex utilities · button, button-group, forms, badge, alert, modal, tabs, accordion, skeleton, tooltip
3. **E-commerce components** ✅ product card, price, rating, swatches, stepper, wishlist, breadcrumb, pagination, facets, empty
4. **Commerce flows & layout sections** ✅ navbar/mega-menu/drawer, hero, cart + order summary, checkout stepper, footer, announcement, menu (multiple variants each)
5. **Variant system** ✅ formal variant/size/state API — [`VARIANT-API.md`](VARIANT-API.md) + `base/_variants.scss`
6. **Motion system** ✅ token-driven transitions + `.sk-animate-*` utilities, reduced-motion first — [`MOTION.md`](MOTION.md)
7. **React parity layer** ✅ [`@shopkit/react`](react/) — same classes + tokens, a `parity` guard proves no drift
8. **Docs site + floating customizer** ✅ [landing page](docs/landing.html) + drop-in [`customizer.js`](docs/customizer.js) (persisted, copy-CSS)
9. GitHub Pages + npm/jsDelivr + size CI + full storefront demo

## Browser support

ShopKit targets **evergreen browsers** and uses modern CSS with no polyfills:
`color-mix()`, `:has()`, `@starting-style` / `transition-behavior: allow-discrete`,
logical properties, and cascade `@layer`. Practical baseline:

- **Chrome / Edge 111+**
- **Safari 16.4+**
- **Firefox 128+**

These cover the core primitives (`color-mix`: Chrome 111 · Safari 16.2 · Firefox 113;
`:has`: Chrome 105 · Safari 15.4 · Firefox 121; `@layer` and logical properties are
older still). `@starting-style` enter-transitions land a little later (Chrome 117 ·
Safari 17.5 · Firefox 129) — hence Firefox 128+ as the combined floor.

On older engines the library **degrades gracefully**: `color-mix()`-based soft tints and
`@starting-style` enter-transitions no-op, but components stay fully functional — layout,
states, and focus behaviour are unaffected; only decorative motion is skipped.

## License
MIT
