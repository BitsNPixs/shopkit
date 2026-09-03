# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

ShopKit is a copy-paste e-commerce design system: SCSS-authored CSS with runtime theming
(light/dark/multi-brand/RTL, no recompile), plus a thin typed React layer that emits the
exact same classes. There is no application here — the deliverables are `dist/shopkit.css`
and the `@shopkit/react` package.

Phases 1–8 are complete (see `PHASES.md`). Only Phase 9 (release infra: GitHub Pages,
npm/jsDelivr publish, size CI gate, storefront demo) is open.

## Commands

```bash
npm install && npm --prefix react install   # BOTH trees; node_modules is untracked
npm run verify      # build → lint → size → react:build → parity (run this before finishing)
npm run watch       # rebuild dist/shopkit.css on change
npm run lint:fix    # autofix logical-property violations
```

**There is no test suite.** `npm run verify` is the test — five stages, each a real gate:

| Stage | What it proves | Fails when |
|---|---|---|
| `build` | Sass compiles | syntax/`@use` error |
| `lint` | RTL-safety | any physical property (`margin-left`, `top`, `text-align: left`) |
| `size` | core stays small | min+gzip > 30 KB (currently ~19 KB) |
| `react:build` | types are sound | `tsc` error under `strict` |
| `parity` | React ↔ CSS can't drift | a contract class is missing from the CSS, or a `.tsx` hardcodes an `sk-` class |

Order matters: `parity` imports `react/dist/classes.js`, so **`react:build` must run before
`parity`**. Running `parity` against a stale `react/dist` gives a meaningless pass.

To preview, open `docs/landing.html` or `docs/index.html` in a browser. If this repo sits
in a WAMP/Apache docroot it is already served (e.g. `http://localhost/shopkit/docs/`);
otherwise open the files directly — they need no server.

## Architecture

### Cascade layers are the override strategy

`scss/_layers.scss` emits the layer order first in the output:
`reset → tokens → base → layout → components → utilities`. **Every** library rule is inside
a layer, so a consumer's unlayered CSS always wins. This is what buys the zero-`!important`
rule — never reach for `!important` or specificity hacks; if an override isn't landing, the
layer is wrong.

### Three token tiers (`scss/tokens/`)

1. **Primitives** (`_primitives.scss`) — raw ramps and scales (`--sk-indigo-600`, `--sk-space-6`).
   Private. **A component must never reference one.**
2. **Semantic** (`_semantic.scss`) — the public theming API (`--sk-color-primary`,
   `--sk-color-surface`). Components read only this tier.
3. **Component** (`_component.scss` + each component partial) — `--sk-<cmp>-*` tokens that
   *fall back to* a semantic token.

The payoff: move a semantic token → everything reskins; set a `--sk-<cmp>-*` token → one
component changes; set it inline → one element changes.

### The non-obvious part: why the semantic layer is re-emitted per scope

Brand colors derive from *pointer* ramps (`--sk-brand-*`, `--sk-accent-*`) that each brand
scope re-aliases. The `brand()` derivation is then **re-declared inside every scope** rather
than once at `:root`. That looks redundant but is load-bearing: `var()` substitutes at the
element where the declaration lives, so re-emitting is the only way `data-brand="verde"`
nested inside `data-theme="dark"` resolves both axes correctly. Read the header comment in
`_semantic.scss` before touching that file — a "simplification" here silently breaks nested
brand × mode.

### Motion is token-driven, not media-query-driven

Every duration is a `--sk-dur-*` token, and the token layer zeroes those tokens under
`prefers-reduced-motion` (unless a subtree sets `data-motion="full"`). So reduced-motion
support is automatic for anything built with the `transition()` mixin in `base/_motion.scss`.

**Never hard-code a `ms` value.** That is the single mechanism the reduced-motion and
`data-motion` kill switches hook into; a literal duration silently opts out of both.
Contract: `MOTION.md`.

### The variant/size/state contract

`base/_variants.scss` emits no CSS — it codifies conventions so components can't drift:

- **Variant** (`.sk-btn--ghost`) remaps *color* tokens only, never structure.
- **Size** (`--sm`/`--lg`) remaps *metric* tokens onto the shared control scale.
- **State** hangs off the real DOM signal — `:disabled`/`[aria-disabled]`, `[aria-selected]`,
  `[aria-current]`, `[open]` — never a styling-only class (`--loading` is the one exception,
  since no DOM signal exists).

This orthogonality is why `sk-btn sk-btn--ghost sk-btn--lg sk-btn--block` composes. Full
matrix: `VARIANT-API.md`. Reference implementation: `scss/components/_button.scss`.

### React layer (`react/`)

`react/src/classes.ts` is the **single source of every `sk-` class** the layer can emit.
Components build `className` strings only from `cls` via `cx()` — they never inline an
`sk-` literal, and `scripts/parity.mjs` enforces both directions of that. Most components
are thin `forwardRef` wrappers with no state; the exceptions are `Modal` (native `<dialog>`)
and `Tabs`/`Accordion` (ARIA + roving tabindex).

Adding a class to the CSS *and* using it in React means editing `classes.ts` too, or parity
fails.

## Invariants that tooling enforces

1. **Semantic tokens only** in components — no raw hex, no primitive ramps.
2. **Zero `!important`** — layers handle precedence.
3. **Logical properties only** — `margin-inline`, `inset-block-start`, never `left`/`top`.
   Enforced by `npm run lint` (`stylelint-use-logical`).
4. **Duration tokens only** — no literal `ms`.
5. **Tier-3 pattern** — each component exposes `--sk-<cmp>-*` falling back to a semantic token.
6. **Accessible by default** — `:focus-visible` ring on every interactive element, disabled via
   `:disabled` *and* `[aria-disabled="true"]` (an `<a>` can't be `:disabled`), WCAG AA contrast
   in both modes.
7. **Dark + multi-brand + RTL** must keep working for anything added.
8. **Budget** — min+gzip core under 30 KB.

## Gotchas

- **`dist/` and `react/dist/` are committed.** A source change is not done until you rebuild
  and commit the artifacts. On Windows the rebuild often shows every dist file as modified —
  check `git diff --stat`; if it's empty, that's CRLF stat-dirt, not a real change.
- **TS imports carry `.js` extensions** (`from "./classes.js"`) even though the source is
  `.tsx`. Match that or the build breaks.
- **`$prefix` is fully wired in the SCSS** (every `@layer` statement interpolates it; verified
  by compiling with a custom prefix — zero `sk.` leftovers, and byte-identical output at the
  default). The one manual sync point left is `PREFIX` in `react/src/classes.ts`, which must
  match the CSS build or parity fails.
- **Utility groups are config-gated.** Each partial wraps its output in
  `@if map.get($utilities-enabled, "<group>")`; a new group needs a key in `_config.scss`.
- **`docs/preview.html`** is a Phase-1 artifact nothing links to. `docs/index.html` is the
  live showcase; `docs/landing.html` is the marketing page and the only one that loads
  `customizer.js`.
- **`.sk-grid` is Bootstrap's `.row`** (flex + negative margins + gutter-padded children), not CSS
  Grid. Gutters come from `.sk-g-*` / `.sk-gx-*` / `.sk-gy-*` or `--sk-gutter-x/-y`; never put
  `.sk-gap-*` on it — a real `gap` makes `sk-col-6 + sk-col-6` wrap. Breakpoints and container
  steps are Bootstrap 5's (`_config.scss`), with `2xl` standing in for `xxl`.
- **The Bootstrap-parity audit (2026-09-03) changed a few defaults:** `.sk-error` is hidden unless
  it follows an `[aria-invalid="true"]` control (or carries `--visible`); `.sk-menu` positions
  itself under its toggle (`--static` opts out); `.sk-check` is block-level (`--inline` flows);
  an empty close button (`.sk-close` or any `__close`) draws its own ×; looping indicators read
  `--sk-dur-loop`, which slows to 3s under reduced motion instead of stopping.

## Adding a component

Follow `scss/components/_button.scss` as the canonical example, and the recipe at the bottom
of `PHASES.md`: create the partial with `@layer sk.components` + Tier-3 tokens → register it
with `@forward` in `scss/components/_index.scss` → run `npm run verify` → add a showcase block
to `docs/index.html` using the real classes (no inline styles) → tick the box in `PHASES.md`.
If it gets a React wrapper, add its classes to `react/src/classes.ts` first.

## Resolved in the Phase 8.5 audit (2026-09-02)

Previously-listed known issues are fixed — kept here briefly so nobody re-reports them:
nested `[data-theme]` scopes now re-anchor inherited text `color` (see the comment in
`_semantic.scss`); every `@layer` statement interpolates `$prefix`; the select chevron token
lives on the theme scopes so all nesting combos resolve; the docs token-inspector parses
`color(srgb …)` correctly (contrast strip included); the mode control initializes to System;
the section slider no longer pins the fluid clamp; size figures were re-synced and the stale
`dist/shopkit.css.map` removed. The same pass added toast, table, progress, input-group,
range/file, spinner and the shared `.sk-close` (see `PHASES.md` Phase 8.5 / `COVERAGE.md`).
