# ShopKit — Coverage Map

What ShopKit ships, what it deliberately leaves out, and what a Bootstrap-class global
framework has that we don't — so gaps are chosen, not discovered. Comparison baseline:
**Bootstrap 5.3** (the fullest mainstream inventory). Legend: ✅ have · 🟡 partial /
different approach · ❌ missing.

ShopKit's philosophy differs from Bootstrap's in two ways that explain most gaps:

1. **E-commerce-first, not general-purpose.** We ship storefront components Bootstrap has
   no equivalent for, and skip general-purpose ones a storefront rarely needs.
2. **CSS-first, platform-native.** Bootstrap ships a JS bundle (dropdown, modal, carousel
   plugins). ShopKit styles native elements (`<dialog>`, `<details>`) that give behaviour
   for free, leaves the rest of the wiring to the author, and offers the typed React layer
   (`@shopkit/react`) where state is genuinely needed.

---

## 1 · Foundation / global styles

| Area | ShopKit | Bootstrap analogue | Notes |
|---|---|---|---|
| Reset | ✅ `sk.reset` layer | Reboot | modern, logical-properties, zero `!important` |
| Design tokens | ✅ 3 tiers (primitives → semantic → component) | CSS vars (flat, partial) | ShopKit's core differentiator |
| Dark mode | ✅ `data-theme` + `prefers-color-scheme`, token-driven | `data-bs-theme` | ours works on any nested wrapper |
| Multi-brand runtime theming | ✅ `data-brand`, composes with mode | ❌ (recompile Sass) | aurora / verde / ember built in |
| RTL | ✅ logical properties everywhere, lint-enforced | separate `bootstrap.rtl.css` build | one build, `dir="rtl"` just works |
| Cascade `@layer` | ✅ all styles layered | ❌ | consumer CSS always wins |
| Typography base | ✅ headings, links, lists, code, blockquote, `::selection` | ✅ | ❌ no `.display-*` headings, no `.lead` |
| Fluid type scale | ✅ `clamp()`-based `--sk-text-*` | RFS (opt-in) | |
| Container | ✅ `.sk-container` / `-narrow` / `-fluid` | ✅ | |
| Grid | ✅ 12-col CSS Grid + responsive spans | ✅ (flexbox rows) | plus `.sk-product-grid` auto-fit |
| Stack / cluster primitives | ✅ `.sk-stack`, `.sk-cluster` | 🟡 stacks helpers | |
| Section rhythm | ✅ `.sk-section` + fluid `--sk-space-section` | ❌ | |
| Breakpoints | ✅ 5 (sm–2xl), configurable | ✅ 6 | |
| Tables | ✅ `.sk-table` + striped/hover/bordered/compact + scroll wrap | ✅ `.table` + variants | shipped in the coverage-fill pass |
| Images / figures | 🟡 sane `img` defaults | ✅ `.img-fluid`, `.figure` | no thumbnail/figure classes |
| Focus management | ✅ automatic token ring on every interactive element | `.focus-ring` helper (opt-in) | ours is default-on, forced-colors-safe |
| Motion system | ✅ token-driven, reduced-motion-first (`MOTION.md`) | ❌ | Bootstrap has no motion system |
| Accessibility base | ✅ `.sk-sr-only`, skip link, forced-colors rules | `.visually-hidden` | |

---

## 2 · Components — have (Bootstrap parity)

| Component | ShopKit | vs Bootstrap |
|---|---|---|
| Button | ✅ `.sk-btn` — 8 variants, 3 sizes, pill/block/icon/loading | parity+ (loading built in) |
| Button group | ✅ `.sk-btn-group` (+vertical) | parity |
| Badge | ✅ `.sk-badge` — status + commerce flags | parity+ |
| Chip / removable tag | ✅ `.sk-chip` | ❌ in Bootstrap |
| Alert | ✅ `.sk-alert` — 4 statuses, dismiss | parity |
| Modal | ✅ `.sk-modal` on native `<dialog>` | parity, no JS plugin needed |
| Offcanvas | ✅ `.sk-drawer` on native `<dialog>` (+`--end`) | parity |
| Tabs | ✅ `.sk-tabs` (+pill) — ARIA pattern, JS/React for keyboard | parity |
| Accordion | ✅ `.sk-accordion` on native `<details>` | parity, zero JS |
| Dropdown menu | 🟡 `.sk-menu` — panel + items styled; author owns toggle/positioning | Bootstrap ships positioning JS |
| Tooltip | ✅ `[data-sk-tooltip]` — zero-JS, hover + keyboard focus | parity for text tips (no HTML content) |
| Placeholders / skeleton | ✅ `.sk-skeleton` — text/title/circle/block + sheen | parity+ |
| Breadcrumb | ✅ `.sk-breadcrumb` | parity |
| Pagination | ✅ `.sk-pagination` | parity |
| Navbar | ✅ `.sk-navbar` — brand/nav/search/actions, mobile toggle, sticky | parity |
| Forms | ✅ input · textarea · select · checkbox · radio · switch · range · file · input-group · label · help · error · field · fieldset/legend; invalid via `[aria-invalid]` | parity+ (validation via ARIA, not classes) |
| Toast | ✅ `.sk-toasts` + `.sk-toast` — status variants, enter motion, React timing wrapper | parity |
| Table | ✅ `.sk-table` + striped/hover/bordered/compact + `.sk-table-wrap` | parity |
| Progress | ✅ `.sk-progress` — one variable drives the bar | parity |
| Spinner | ✅ `.sk-spinner` (+ React `<Spinner>`) | parity |
| Close button | ✅ `.sk-close` — shared mixin with modal/drawer/cart closes | parity |

## 3 · Components — have (ShopKit-only, no Bootstrap equivalent)

Product card (3 variants) · price (sale/was/off) · rating stars (2-var CSS mask, no
per-star markup) · swatches (colour + size) · quantity stepper · wishlist heart ·
facets/filter sidebar · empty state · hero (4 variants) · mega-menu · cart drawer +
line items + summary · checkout progress steps · announcement bar · footer (3 variants)
· `.sk-animate-*` enter/loop utilities · the token/theming system itself · the React
parity layer with drift guard.

## 4 · Gap list vs Bootstrap — status after the coverage-fill pass

The high/medium rows below **shipped** (see `PHASES.md` Phase 8.5); the rest are
deliberate stances, not oversights.

| Gap | Bootstrap has | Status |
|---|---|---|
| **Toast** | ✅ | ✅ **Shipped** — `.sk-toasts` region + `.sk-toast` (status variants, enter motion) + React `<Toast>`/`<ToastRegion>` with pause-on-hover auto-dismiss. |
| **Table styles** | ✅ | ✅ **Shipped** — `.sk-table` + `--striped/--hover/--bordered/--compact` + `.sk-table-wrap` scroll escape. |
| **Progress bar** | ✅ | ✅ **Shipped** — `.sk-progress`, one custom property drives the bar (the rating-stars idiom); forced-colors rules in `base/_a11y.scss`. |
| **Standalone spinner** | ✅ | ✅ **Shipped** — `.sk-spinner` (+ React `<Spinner>`), currentColor-tinted. |
| **Input group** | ✅ | ✅ **Shipped** — `.sk-input-group` with `__text` affixes, btn-group fusing mechanics. |
| **Range + file input styling** | ✅ | ✅ **Shipped** — `.sk-range` (native, `accent-color`, like checkbox/radio) · `.sk-input[type=file]` with styled `::file-selector-button`. |
| **Close button** (standalone) | ✅ `.btn-close` | ✅ **Shipped** — `.sk-close`; one `close-button` mixin now also feeds the modal/drawer/cart header closes (was 3 duplicated blocks). |
| **Generic card** | ✅ `.card` | **Low, unshipped.** `.sk-product-card` is deliberately specialised; a generic surface is mostly `.sk-section--alt` + radius/border tokens. Decide, don't drift into it. |
| **List group** | ✅ | **Low, unshipped.** Menu + facets cover most uses. |
| **Popover** (rich content) | ✅ | **Low, unshipped.** Tooltip is text-only by design. Would need positioning JS — consider only with the React layer. |
| **Floating labels** | ✅ | **Low, unshipped.** Stylistic choice; label-above is the a11y-safer default. |
| **Carousel** | ✅ | **Out of scope (recommended).** Heavy JS, weak conversion evidence, a11y minefield. A scroll-snap strip could be a lightweight future alternative. |
| **Scrollspy** | ✅ | **Out of scope.** Pure JS behaviour, no CSS surface. |
| **Collapse** (generic) | ✅ JS plugin | **Out of scope.** Native `<details>` (accordion, facets) already covers it without JS. |

## 5 · Utilities & helpers

Shipped (all config-gated via `$utilities-enabled`, all token-driven):

- **Spacing** — m/p × all logical sides × full scale, negative margins, auto, curated responsive
- **Display** — block/inline/flex/grid-adjacent values + responsive show/hide, `[hidden]`-safe
- **Grid** — Bootstrap's `.row` model under `.sk-grid`: `.sk-col`, `.sk-col-auto`, `.sk-col-{n}`, `.sk-grid-cols-*`, `.sk-offset-*`, `.sk-order-*`, `.sk-g/-gx/-gy-*`, stepped `.sk-container(-{bp})` — Bootstrap 5 breakpoints, all responsive, all logical
- **Flex** — direction/wrap/justify/align-items/align-self/align-content/grow/shrink + `.sk-gap-*`, `.sk-row-gap-*`, `.sk-column-gap-*`; responsive for every group (gap on curated keys)
- **Sizing** — `.sk-w-/-h-{25,50,75,100,auto}`, `.sk-mw-100`, `.sk-mh-100`, `.sk-vw-/-vh-100`, `.sk-min-vw-/-vh-100`
- **Text** — `.sk-text-start/-center/-end` + responsive (logical, RTL-safe)
- **Animation** — `.sk-animate-fade/-fade-up/-fade-down/-scale-in/-spin/-pulse` + speed modifiers

Not shipped (Bootstrap has them; `_config.scss` and `PHASES.md` mark these "add on
demand only" — that's the stated policy, not an oversight):

| Group | Stance |
|---|---|
| Text (transform/weight/truncate) | alignment shipped as `.sk-text-*`; note `truncate` exists as a **mixin** but no utility class |
| Colors / backgrounds | risky — invites bypassing semantic tokens; if added, emit only semantic-token values (`.sk-bg-surface`, never `.sk-bg-indigo-500`) |
| Borders / radius | low cost, token-driven |
| Shadows | tokens exist (`--sk-shadow-*`); classes don't |
| Position / z-index / overflow / opacity / float / object-fit / visibility / interactions / vertical-align | add individually if a component demo actually needs one |
| Ratio helper | `aspect-ratio` is one line of author CSS; card exposes `--sk-card-media-ratio` |
| Stretched link | exists but **only** as `.sk-product-card__link` — a generic `.sk-stretched-link` helper would be a 5-line add |
| Vertical rule | skip |

## 6 · The JS / behaviour model (the deepest structural difference)

| Behaviour | Bootstrap | ShopKit |
|---|---|---|
| Modal / offcanvas | JS plugin | native `<dialog>` — top layer, backdrop, focus trap, Esc free |
| Accordion / collapse | JS plugin | native `<details>` |
| Tabs keyboard nav | JS plugin | author JS (pattern shipped in `docs/index.html`) or `@shopkit/react` |
| Dropdown positioning | Popper.js | author-owned (anchor/popover API or your own JS) |
| Toast timing | JS plugin | `@shopkit/react` `<Toast>` (pause-on-hover auto-dismiss) |
| Carousel/scrollspy | JS plugins | not shipped (out of scope) |
| Framework layer | none official | `@shopkit/react` — typed, parity-guarded |

This is a feature, not a gap: zero runtime JS in the core, and the platform does the
accessibility-critical behaviour. But it means any component whose behaviour *can't* come
from the platform (toast timing, popover positioning) should land together with its React
wrapper, not CSS-only.

## 7 · Build order — status

Items 1–5 of the original plan **shipped** in the Phase 8.5 coverage-fill pass (toast,
table, progress, input group + range/file, spinner + shared `.sk-close`), inside the
budget (20.1 KB gzip, 67% used — ≈10 KB of headroom left).

Still open, deliberately deferred until real usage demands them:

1. **Text utilities group** (config-gated `"text"` key) — would include `.sk-truncate`
   (the mixin exists; no utility class yet)
2. Generic `.sk-stretched-link` helper — promote the `.sk-product-card__link` pattern

Each follows the existing recipe in `PHASES.md` (partial → `_index.scss` → `npm run verify`
→ showcase block → checkbox), and needs a `classes.ts` entry if it gets a React wrapper.

## 8 · Beyond the gap-fill — system audit results (2026-09-02)

The same pass that closed the gaps above also ran a full design-system audit (values,
tokens, layers, RTL, a11y, specificity, markup↔CSS). What it **fixed**:

| Area | What was wrong | What shipped |
|---|---|---|
| `$prefix` | `_layers.scss` declared the layer order interpolated, but 84 `@layer sk.*` blocks were hardcoded — a custom prefix broke cascade order | Every `@layer` statement now interpolates `#{$prefix}`; default build verified **byte-identical**, a `"shop"`-prefix build verified clean |
| Nested themes | `body { color: var(…) }` substitutes once at `<body>`, so plain text inside a nested `[data-theme]` kept the outer theme's colour (dark-on-dark) | Theme scopes re-anchor `color` — probe-measured before/after |
| Select chevron | Dark glyph applied via descendant selectors → wrong glyph in mixed nesting (light-in-dark) | Chevron token declared **on the theme scopes**; inheritance proximity resolves every combo |
| Close buttons | Modal / drawer / cart each carried an identical 12-declaration block | One `close-button` mixin (base/_mixins) feeds all three + the public `.sk-close` |
| Breadcrumb | Separator token lived on a root class no documented usage emits → `content: var(…)` was invalid and **separators never rendered** | Token moved onto `.sk-breadcrumb__list`; separator probe now computes `"/"`, verified LTR + RTL |
| Swatch | `_a11y.scss` targeted a `--selected` class the component (correctly, per the state contract) never defines | Dead selector removed; ARIA-driven state only |
| Docs | Token-inspector + WCAG strip mis-parsed `color(srgb …)` (white read `#010101`); mode control initialized desynced; init pinned the fluid section clamp; facets had no demo at all | Parser fixed, mode initializes to System, sliders sync without pinning, facets demo added |

What it **verified clean** (no action needed):

- **Zero** hardcoded colors, durations, or real `!important` anywhere outside the token tiers
- **Zero Bootstrap** residue; exactly **one** grid system (`layout/_grid.scss`) — the other
  `display:grid` uses are component anatomy, not competing layout APIs
- Every media query flows through `bp()` / `$breakpoints`; no stray breakpoints
- Markup↔CSS cross-reference across all three docs pages + customizer: **0 classes used but
  undefined**, both before and after the fixes (1,300 defined / 251 used in docs / 136 in the
  React contract)
- Global z-index all token-driven; local 0/1/2 values are intentional micro-stacking

Guards after everything: build · lint · size **20.1 KB gzip (67%)** · react tsc · parity —
all green. Full change log: `PHASES.md` Phase 8.5.

## Bootstrap parity audit — 2026-09-03

Every `sk-*` layout / utility class and component was diffed against Bootstrap 5.3 behaviour and
fixed in place (each partial header carries the mapping). Added along the way: `.sk-btn-toolbar`,
nested `.sk-btn-group`, `.sk-input-group--sm/--lg`, `.sk-textarea--sm/--lg`, `.sk-check--inline`,
`.sk-swatch-input` / `.sk-wishlist-input` (`:checked`-driven toggles, no JS), `.sk-modal--xl/--full`
+ page scroll lock, `.sk-alert__link`, `.sk-toasts--top/--start/--center`, tooltip arrows,
`.sk-tabs--boxed/--fill/--justified`, `.sk-accordion--flush` + collapse motion, the `.sk-breadcrumb`
block, `.sk-pagination--sm/--lg`, `.sk-table--borderless/--sm` + `.sk-table-wrap-{bp}`,
`.sk-badge--float`, `.sk-progress--striped/--animated` (+ in-bar labels), `.sk-skeleton--inline`,
`.sk-spinner--grow`, `.sk-navbar--centered` (fixed) / `--expand(-{bp})` / `__inner`,
`.sk-drawer--top/--bottom` (+ RTL flip), `.sk-mega` width floor + states, `.sk-menu`
self-positioning + `--end/--up/--static`, `.sk-footer--newsletter` (its own grid track) and
`--inverse` (pure token remap), `.sk-hero` inner rhythm + `--sk-hero-media-ratio`, `.sk-cart` RTL,
`.sk-empty--compact`, collapsible `<details>` facets, `.sk-product-grid` tokens, `--sk-dur-loop`.

Deliberate divergences: `.sk-cluster` wraps (add `.sk-flex-nowrap` for an exact `.hstack`),
spacing keys follow the 4px token scale rather than 0–5, there is no `.sk-d-grid` (the row is
`.sk-grid`) or `.sk-d-table*` (the table component owns the name), and the drawer has no
responsive inline mode because it is a modal `<dialog>`.
