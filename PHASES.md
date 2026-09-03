# ShopKit — Build Plan & Progress Tracker

The single source of truth for **what's built, what's next, and how to build it**.
Pair this with [`README.md`](README.md) (the *what & why* of the architecture); this
file is the *plan & checklist*. Update the checkboxes here whenever a piece ships.

**Legend:** ✅ done · 🚧 in progress · ⬜ not started

---

## Status snapshot

| | |
|---|---|
| **Date** | 2026-09-02 |
| **Current phase** | Phase 8.5 — Coverage fill + system audit (✅ complete) · Phase 9 next |
| **Compiled core** | **20.1 KB gzip** (min) · budget 30 KB · **67% used** |
| **Guards passing** | `lint` (logical-props) ✅ · `size` (budget) ✅ · `parity` (React↔CSS) ✅ |

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
├── base/             reset · typography · a11y · _mixins (focus-ring…) · _variants (variant/size/state) · _motion (transition())
├── layout/           container · grid (12-col · cols-{n} · auto · dense) · shell · section · stack · cluster
├── components/       ✅ Core UI: button · button-group · form · badge · alert · modal · tabs · accordion · skeleton · tooltip
│                      ✅ Commerce: price · rating · swatch · stepper · wishlist · product-card · breadcrumb · pagination · facets · empty
│                      ✅ Sections: announcement · navbar · menu · mega-menu · drawer · hero · cart · checkout-steps · footer
│                      ✅ Coverage fill: toast · table · progress · input-group · spinner · close
│                      ✅ Nav: sidenav
├── utilities/        ✅ spacing · ✅ display · ✅ flex · ✅ animation (motion) · ✅ grid (placement)
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

### Phase 4 — Commerce flows & layout sections ✅  *(multiple layouts per section)*
- [x] **Navbar** (`.sk-navbar`) — brand/nav/search/actions, cart-count bubble, mobile toggle;
      variants `--centered` (centered logo) · `--sticky` (frosted, pinned)
- [x] **Mega-menu** (`.sk-mega`) & **mobile drawer** (`.sk-drawer`, native `<dialog>`, start/`--end` edge)
- [x] **Hero** (`.sk-hero`) — variants `--split` · `--centered` · `--minimal` · `--image` (scrim + inverse ink)
- [x] **Cart** (`.sk-cart` drawer on `<dialog>`) + line items (`.sk-cart-item`) · **Order summary** (`.sk-order-summary`)
- [x] **Checkout stepper** (`.sk-steps`) — done/current states, connector fill, class **or** aria-driven
- [x] **Footer** (`.sk-footer`) — variants `--minimal` · multi-column (default) · `--newsletter` · `--inverse`
- [x] **Announcement bar** (`.sk-announcement` + `--primary`) · **Account/profile menu** (`.sk-menu`)

### Phase 5 — Variant system ✅
- [x] Formalise the variant/size/state token API across all components — the contract is
      codified as a Sass toolkit [`scss/base/_variants.scss`](scss/base/_variants.scss)
      (`$sizes`, `$status`, `enabled`, `disabled`, `control-sizes`) and written up in
      [`VARIANT-API.md`](VARIANT-API.md) with a per-component matrix
- [x] Audit confirmed conformance (focus ring on every interactive element; disabled guards
      match element type); adopted the `enabled`/`disabled` mixins in button/wishlist/stepper
      with **byte-identical** compiled output (verified against the pre-refactor build)
- [x] Docs: "Variant · size · state system" section — one status intent across components, one
      aligned size scale

### Phase 6 — Motion system ✅
- [x] `transition()` mixin ([`scss/base/_motion.scss`](scss/base/_motion.scss)) — token-driven,
      reduced-motion-first; adopted in the button with **byte-identical** output
- [x] Animation utilities ([`scss/utilities/_animation.scss`](scss/utilities/_animation.scss),
      gated on `$utilities-enabled.motion`) — `.sk-animate-fade / -fade-up / -fade-down /
      -scale-in / -spin / -pulse` + `-fast` / `-slow`; RTL-safe keyframes
- [x] Reduced-motion is automatic via the existing duration-token zeroing (respects
      `data-motion="off"` / `"full"`); no per-component `@media`. Written up in [`MOTION.md`](MOTION.md)
- [x] Docs: "Motion system" section — replayable enter animations + live loops

### Phase 7 — React parity layer ✅
- [x] `@shopkit/react` ([`react/`](react/)) — thin, typed, forwardRef components emitting the exact
      same `sk-` classes and reading the same tokens; TypeScript, ESM + `.d.ts` via `tsc`
- [x] **One class contract** ([`react/src/classes.ts`](react/src/classes.ts)) — no component inlines
      a `sk-` literal; variant/size unions are `keyof typeof cls.*`
- [x] **Parity guard** ([`scripts/parity.mjs`](scripts/parity.mjs), `npm run parity`) — asserts every
      class + attribute the React layer emits exists in `dist/shopkit.css` (123 classes, 0 drift)
- [x] Core UI + e-commerce widgets (Button, Badge, Alert, Modal, Tabs, Accordion, Skeleton, forms;
      Price, Rating, Swatch, Stepper, Wishlist, ProductCard, Breadcrumb, Pagination); controlled +
      uncontrolled state where relevant. Verified by a server-render smoke test.
- [x] `npm run verify` runs build · lint · size · react:build · parity end-to-end

### Phase 8 — Docs site + floating customizer ✅
- [x] **Floating theme customizer** ([`docs/customizer.js`](docs/customizer.js)) — a self-injecting,
      zero-dependency drop-in: FAB → panel controlling mode · brand · radius · gutter · section ·
      motion · direction, persisted to `localStorage`, with a paste-ready copy-CSS block. Writes only
      the public theming hooks (`data-theme`/`data-brand`/`data-motion`/`dir` + a few semantic vars).
- [x] **Landing page** ([`docs/landing.html`](docs/landing.html)) — marketing page that dogfoods only
      real `sk-` components (navbar, hero, product cards, multi-brand panels, footer) + embeds the
      customizer; offline-safe (emoji/gradient placeholders).
- [x] Docs site wired: landing ⇄ [component showcase](docs/index.html) cross-linked.

### Phase 8.5 — Coverage fill + system audit ✅
Closed the highest-value gaps from the Bootstrap-class coverage review ([`COVERAGE.md`](COVERAGE.md)),
each following the standard recipe (tokens → partial → showcase → guards):
- [x] **Toast** — `.sk-toasts` region + `.sk-toast` (status variants, enter motion, token-driven)
      · React `<Toast>`/`<ToastRegion>` with pause-on-hover auto-dismiss
- [x] **Table** — `.sk-table` (+`--striped/--hover/--bordered/--compact`) + `.sk-table-wrap` scroll escape
- [x] **Progress** — `.sk-progress`, one custom property drives the bar (rating-stars idiom); forced-colors safe
- [x] **Input group** — `.sk-input-group` fused control row (btn-group mechanics)
- [x] **Range + file** — `.sk-range` (native, `accent-color`-tinted) · styled `::file-selector-button`
- [x] **Spinner** — `.sk-spinner` (+ React `<Spinner>`) · **Close** — shared `.sk-close`
- [x] **Dedup** — one `close-button` mixin now feeds modal/drawer/cart closes + `.sk-close`
- [x] **Fixes** — `$prefix` interpolated in every `@layer` (was hardcoded in 84 blocks);
      nested `[data-theme]` scopes re-anchor inherited text colour; select chevron token
      moved onto theme scopes (correct in every nesting combo)

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
