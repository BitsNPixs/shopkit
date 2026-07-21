# ShopKit — Build Plan & Progress Tracker

The single source of truth for **what's built, what's next, and how to build it**.
Pair this with [`README.md`](README.md) (the *what & why* of the architecture); this
file is the *plan & checklist*. Update the checkboxes here whenever a piece ships.

**Legend:** ✅ done · 🚧 in progress · ⬜ not started

---

## Status snapshot

| | |
|---|---|
| **Date** | 2026-07-21 |
| **Current phase** | Phase 3 — E-commerce components (✅ complete) · Phase 4 next |
| **Compiled core** | **15.8 KB gzip** (min) · budget 30 KB · **53% used** |
| **Guards passing** | `npm run lint` (logical-props) ✅ · `npm run size` (budget) ✅ |

---

## Non-negotiable rules (every phase obeys these)

These are the guardrails that make ShopKit re-themeable, RTL-safe, and override-friendly.
They are partly **enforced by tooling** — a change that breaks them fails the build.

1. **Semantic tokens only.** Components read `var(--sk-color-primary)`, never a raw hex or a
   primitive ramp (`--sk-indigo-600`). Spacing/type/radius read their scale tokens.
2. **Zero `!important`.** Everything is in an `@layer`, so consumer (unlayered) CSS always wins.
3. **Logical properties only.** `margin-inline`, `inset-block-start`, `border-inline-start` — never
   `margin-left`/`top`/`text-align: left`. → **Enforced by `npm run lint`** (`stylelint-use-logical`).
4. **Prefixed** (`sk-` / `--sk-`), configurable in [`scss/_config.scss`](scss/_config.scss).
5. **Tier-3 pattern.** Each component exposes `--sk-<cmp>-*` tokens that fall back to a semantic
   token (see the [button](scss/components/_button.scss) as the reference implementation).
6. **Accessible by default.** 44px min target, `:focus-visible` ring, ARIA, keyboard, WCAG 2.2 AA
   contrast in light **and** dark.
7. **Dark + multi-brand + RTL** must keep working for anything you add.
8. **Budget.** Keep the min+gzip core under 30 KB. → **Checked by `npm run size`**.

---

## Architecture map

```
scss/
├── _config.scss      build-time knobs: prefix, breakpoints, scales, $utilities-enabled
├── _tools.scss       Sass helpers (fluid clamp, v(), cls()) — no CSS output
├── _layers.scss      @layer order (emitted first): reset→tokens→base→layout→components→utilities
├── tokens/           Tier 1 primitives · Tier 2 semantic · Tier 3 component metrics
├── base/             reset · typography · a11y · _mixins (focus-ring, visually-hidden…)
├── layout/           container · grid · section · stack · cluster
├── components/       ✅ Core UI: button · button-group · form · badge · alert · modal · tabs · accordion · skeleton · tooltip
│                      ✅ Commerce: price · rating · swatch · stepper · wishlist · product-card · breadcrumb · pagination · facets · empty
├── utilities/        ✅ spacing · ✅ display · ✅ flex · (more as needed)
└── shopkit.scss      entry — @use of each layer in cascade order
```

Cascade layer order (later wins; all library CSS is layered so unlayered consumer CSS beats it):
`sk.reset → sk.tokens → sk.base → sk.layout → sk.components → sk.utilities`

---

## Phases

### Phase 1 — Foundation ✅
- [x] Cascade `@layer` order
- [x] 3-tier token system (primitives → semantic → component metrics)
- [x] Reset, typography, a11y base, shared mixins
- [x] Layout primitives: container, 12-col grid, product-grid, section, stack, cluster
- [x] Light / dark / system + multi-brand (aurora / verde / ember), RTL plumbing
- [x] Motion kill-switches (tokens ready; full system = Phase 6)
- [x] `docs/index.html` live theming demo · `scripts/size.cjs` budget report

### Phase 2 — Utilities + Core UI 🚧
**Utilities** (`scss/utilities/`, `@layer sk.utilities`, config-gated via `$utilities-enabled`)
- [x] **Spacing** — margin/padding (all logical sides) · negative margins · curated responsive
- [x] **Display** — block/inline/flex/… + responsive show-hide + `[hidden]` guard
- [x] **Flex** — direction/wrap/justify/items/self/grow/shrink · `gap` · curated responsive
- [ ] *(optional, add on demand)* text/color/border/width utilities — only if components need them

**Core UI components** (`scss/components/`, `@layer sk.components`)
- [x] **Button** — `.sk-btn` + variants (accent/secondary/outline/ghost/soft/danger/success/link),
      sizes (sm/lg), modifiers (block/pill/icon/loading), full a11y
- [x] **Button group** — `.sk-btn-group` segmented / attached buttons (horizontal + vertical)
- [x] **Form controls** — `.sk-input`/`.sk-textarea`/`.sk-select`, `.sk-checkbox`/`.sk-radio`/`.sk-switch`,
      `.sk-label`/`.sk-help`/`.sk-error`, `.sk-fieldset`/`.sk-legend`; focus/invalid/disabled states
- [x] **Badge / Tag / Chip** — `.sk-badge` (soft status + solid commerce flags) · `.sk-chip` (removable)
- [x] **Alert / Callout** — `.sk-alert` info/success/warning/danger, icon + title + dismiss
- [x] **Modal / Dialog** — `.sk-modal` native `<dialog>`, `@starting-style` motion, backdrop token
- [x] **Tabs** — `.sk-tabs` styles the ARIA pattern (underline + pill variants); JS roving-tabindex in demo
- [x] **Accordion / Disclosure** — `.sk-accordion` native `<details>`-based, rotating marker
- [x] **Skeleton** — `.sk-skeleton` (text/title/circle/block), reduced-motion static fallback
- [x] **Tooltip** — `[data-sk-tooltip]` zero-JS, hover + `:focus-visible`, 4 placements

### Phase 3 — E-commerce components ✅
- [x] Product card (`.sk-product-card` + `--horizontal` / `--compact` / `--flat`, stretched-link) ·
      Price (`.sk-price` regular/sale/range/off) · Rating stars (`.sk-rating`, fractional, mask-driven)
- [x] Colour / size swatches (`.sk-swatch(es)` + `--size`, selected/out-of-stock) · Product badges
      (via `.sk-badge--sale/--new/--bestseller`) · Quantity stepper (`.sk-stepper`)
- [x] Product grid states — loading (compose `.sk-skeleton`) · empty (`.sk-empty`) · Facets / filters
      sidebar (`.sk-facets` / `.sk-facet`)
- [x] Breadcrumbs (`.sk-breadcrumb`) · Pagination (`.sk-pagination`) · Wishlist button (`.sk-wishlist`)

### Phase 4 — Commerce flows & layout sections ⬜  *(multiple layouts per section)*
- [ ] **Navbar** — variants: simple · centered-logo · with-search · with-mega-menu · sticky/condensing
- [ ] **Mega-menu** & **mobile drawer** nav
- [ ] **Hero** — variants: split · centered · with-image · minimal
- [ ] **Cart** — drawer + full-page line items · **Order summary**
- [ ] **Checkout stepper** (multi-step progress)
- [ ] **Footer** — variants: minimal · multi-column · with-newsletter
- [ ] Announcement bar · Account/profile menu

### Phase 5 — Variant system ⬜
- [ ] Formalise the variant/size/state token API across all components (§16)

### Phase 6 — Motion system ⬜
- [ ] Full transition/animation system on `--sk-dur-*` / `--sk-ease-*`, reduced-motion first (§18)

### Phase 7 — React parity layer ⬜
- [ ] React components emitting the same `sk-` classes + reading the same tokens (no drift)

### Phase 8 — Docs site + floating customizer ⬜
- [ ] Docs site, landing page, live floating theme customizer grown from the demo deck (§17)

### Phase 9 — Release infrastructure ⬜
- [ ] GitHub Pages · npm/jsDelivr publish · size CI gate · full storefront demo

---

## Recipe — add a new component

Follow the [button](scss/components/_button.scss) as the canonical example.

1. **Create** `scss/components/_<name>.scss`. Start with the layer + Tier-3 tokens:
   ```scss
   @use "../config" as *;
   @use "../base/mixins" as *;            // if you need focus-ring / truncate / etc.

   @layer sk.components {
     .sk-<name> {
       --sk-<name>-bg: var(--sk-color-surface);   // default → semantic token
       // …structure using ONLY logical properties + semantic/token vars…
     }
   }
   ```
2. **Rules to keep:** semantic tokens (no raw hex), logical properties, `:focus-visible` ring on
   interactives, disabled via `:disabled` **and** `[aria-disabled="true"]`, works in dark + RTL.
3. **Register** it: add `@forward "<name>";` to [`scss/components/_index.scss`](scss/components/_index.scss).
4. **Verify:** `npm run build && npm run lint && npm run size` — all three must pass.
5. **Document/demo:** add a showcase block to [`docs/index.html`](docs/index.html) that uses the real
   classes (dogfood, no inline styles).
6. **Track:** tick the checkbox in this file.

**Utilities** follow the same shape but live in `scss/utilities/`, use `@layer sk.utilities`, guard
their output on `@if map.get($utilities-enabled, "<group>")`, and add the key to `$utilities-enabled`
in `_config.scss`.

---

## Command reference

```bash
npm install       # dart-sass + stylelint toolchain
npm run build     # → dist/shopkit.css (expanded) + dist/shopkit.min.css (compressed)
npm run watch     # rebuild dist/shopkit.css on change
npm run lint      # FAIL on any physical (non-logical) property  → RTL-safe guarantee
npm run lint:fix  # autofix logical-property violations
npm run size      # gzip budget report (fails if min+gzip > 30 KB)
```

Preview: open [`docs/index.html`](docs/index.html) in a browser — the control deck flips
mode / brand / radius / gutter / section / motion / direction live.
