# ShopKit — Variant, Size & State API

The formal contract every component obeys, so the whole kit feels like one system
and a consumer can predict a component they've never used. Codified in code as
[`scss/base/_variants.scss`](scss/base/_variants.scss) (Sass helpers, zero CSS
output) and enforced by convention + the build guards.

Three axes, one predictable shape each:

| Axis | Hook | Shape |
|---|---|---|
| **Variant** | `.sk-<cmp>--<name>` | remaps the component's Tier‑3 **colour** tokens only |
| **Size** | `.sk-<cmp>--sm` · (base) · `.sk-<cmp>--lg` | remaps the component's **metric** tokens |
| **State** | the real DOM signal (pseudo‑class / ARIA attr) | never a styling‑only class |

---

## 1 · Variant — colour, not structure

A variant **only** re-points the component's `--sk-<cmp>-*` colour tokens; it never
restates the box, size, focus, or motion (those live on the base). This is what keeps
every combination valid — `sk-btn sk-btn--ghost sk-btn--lg sk-btn--block` all compose
because each modifier touches a different, orthogonal set of tokens.

```scss
.sk-btn--ghost {           // structure is inherited; only colour tokens move
  --sk-btn-bg:        transparent;
  --sk-btn-bg-hover:  var(--sk-color-primary-soft);
  --sk-btn-fg:        var(--sk-color-primary);
}
```

### Shared status palette

Components that express **status** name their variants from one list, so `--danger`
means danger everywhere:

`--primary` · `--success` · `--danger` · `--warning` · `--info`

Soft (tinted) status variants read `--sk-color-<status>-soft` for the fill and
`--sk-color-<status>` for the ink; solid ones sit on `--sk-color-<status>` with an
on-colour foreground. Commerce flags (`--sale` / `--new` / `--bestseller`) are their
own small palette drawn from the `--sk-color-badge-*` tokens.

---

## 2 · Size — the shared control scale

Sized components expose an `--sm` and `--lg` modifier around an unsuffixed **base**
(medium). Each remaps the component's metric tokens onto the shared control scale so a
small input and a small button line up on the same row:

| Size | height token | font token |
|---|---|---|
| `--sm` | `--sk-control-height-sm` (2.25rem) | `--sk-text-xs` |
| base | `--sk-control-height` (2.75rem · 44px tap target) | `--sk-text-sm` |
| `--lg` | `--sk-control-height-lg` (3.25rem) | `--sk-text-md` |

Declared once as the `$sizes` map in `base/_variants.scss`; a component with the
standard `--<cmp>-height` / `--<cmp>-font-size` tokens can emit both modifiers with
`@include control-sizes("<cmp>")`. Components that also vary padding/gap per size
(e.g. the button) add those lines alongside.

**Sized components:** button · input · select · stepper · modal (width) · price · rating ·
spinner · progress (height).

---

## 3 · State — driven by the DOM, never a class

State styling always hangs off the real signal an assistive-tech user and the platform
already see, so the visual can't drift from the semantics.

| State | Selector | Notes |
|---|---|---|
| hover / active | `@include enabled { &:hover / &:active }` | guarded so disabled controls stay inert |
| focus | `:focus-visible { @include focus-ring; }` | token ring; on **every** interactive element |
| disabled | `@include disabled` → `:disabled, [disabled], [aria-disabled="true"]` | native **and** ARIA (covers `<a>` / custom) |
| selected / pressed | `[aria-pressed="true"]` · `[aria-selected="true"]` · `[aria-checked="true"]` | swatches, tabs, toggle buttons |
| current | `[aria-current="page"]` · `[aria-current="step"]` | nav links, breadcrumb, checkout steps |
| invalid | `[aria-invalid="true"]` | form controls → danger border + ring |
| open | `[open]` (`<dialog>` / `<details>`) · `:not([hidden])` (menus) | modal, cart, drawer, accordion, menu |
| loading | `.sk-<cmp>--loading` | the one legit styling-flag (no DOM signal exists) |

### Why the disabled guard differs by element

The `disabled()` mixin emits all three signals, but not every component needs all three:

- **Native controls** (`<button>`, `<input>`, `<select>`) — `:disabled` is enough; the
  extra `[disabled]` / `[aria-disabled]` selectors are harmless and kept for uniformity
  on the hybrid controls (button, stepper, wishlist, swatch).
- **Link-based controls** (`.sk-menu__item`, `.sk-pagination__link`) — an `<a>` can't be
  `:disabled`, so these key on `[aria-disabled="true"]` only. **This is correct, not
  drift.**

---

## 4 · The Sass toolkit — `base/_variants.scss`

```scss
@use "../base/variants" as *;

.sk-btn {
  @include enabled {                       // hover/active that respect disabled
    &:hover  { background: var(--sk-btn-bg-hover); }
    &:active { background: var(--sk-btn-bg-active); }
  }
  @include disabled;                        // uniform native+ARIA dim (opacity .55)
}

@include control-sizes("input");           // emit .sk-input--sm / --lg from $sizes
```

| Export | Kind | Purpose |
|---|---|---|
| `$sizes` | map | the `--sm` / `--lg` → control-token scale |
| `$status` | list | the canonical status-variant names |
| `enabled` | mixin | wrap hover/active so disabled controls don't react |
| `disabled($opacity)` | mixin | the uniform disabled block (native + ARIA) |
| `control-sizes($cmp)` | mixin | emit the size modifiers for a standard-token component |

Adopting `enabled` / `disabled` in the button, wishlist and stepper produced
**byte-for-byte identical** compiled output (verified against the pre-refactor build) —
the toolkit encodes exactly what the components already did.

---

## 5 · Per-component reference

| Component | Variants | Sizes | Key states | Tier‑3 surface (excerpt) |
|---|---|---|---|---|
| button | accent · secondary · outline · ghost · soft · danger · success · link | sm · lg | hover · active · focus · disabled · loading · pill · block · icon | `--sk-btn-bg/-fg/-border-color/-radius/-height/-padding-x` |
| button-group | (vertical) | — | pressed (raises) | inherits `--sk-btn-*` |
| form (input/select/textarea) | — | sm · lg | focus · **invalid** · disabled | `--sk-field-bg/-fg/-border/-radius/-height` |
| checkbox/radio/switch | — | — | checked · focus · disabled | `accent-color` · `--sk-switch-*` |
| badge / chip | primary · success · danger · warning · info · sale · new · bestseller · outline · pill | — | — | `--sk-badge-bg/-fg/-radius/-pad-*` |
| alert | success · warning · danger · info | — | dismiss | `--sk-alert-bg/-fg/-accent/-radius` |
| toast | success · danger · warning · info | — | enter motion · dismiss (JS/React-timed) | `--sk-toast-bg/-fg/-accent` |
| table | striped · hover · bordered · compact | — | row hover | `--sk-table-pad-*/-border/-stripe-bg/-hover-bg` |
| progress | success · danger · warning | sm · lg | value via `--sk-progress-value` | `--sk-progress-height/-track/-fill/-radius` |
| input-group | — | (children keep theirs) | focus raises segment | inherits `--sk-control-*` |
| spinner | — | sm · lg | reduced-motion stills | `--sk-spinner-size/-track` |
| close | — | — | hover · focus | shared `close-button` mixin (base/_mixins) |
| modal | sm · lg | (width) | open · backdrop | `--sk-modal-width/-radius` |
| tabs | pill | — | **selected** (`aria-selected`) · disabled | `--sk-tabs-accent/-border` |
| accordion | — | — | open (`<details>`) | `--sk-accordion-border` |
| skeleton | text · title · circle · block | — | reduced-motion | `--sk-skeleton-bg/-sheen/-radius` |
| tooltip | pos: top/bottom/start/end | — | hover · focus | `--sk-tooltip-bg/-fg` |
| price | sale | sm · lg | — | `--sk-price-now/-size` |
| rating | (sm · lg) | sm · lg | — | `--sk-rating-value/-max/-size` |
| swatch | size | — | **pressed/checked** · disabled (strike) | `--sk-swatch-color/-size` |
| stepper | — | sm · lg | hover · focus · disabled | `--sk-stepper-height/-input-w/-border` |
| wishlist | — | — | **pressed** (fills) · hover · disabled | `--sk-wishlist-size/-fg-*` |
| product-card | horizontal · compact · flat | — | hover · focus-within | `--sk-card-radius/-pad/-gap/-media-ratio` |
| breadcrumb | — | — | current (`aria-current`) | `--sk-breadcrumb-sep` |
| pagination | — | — | current · disabled | `--sk-pagination-size` |
| navbar | centered · sticky | — | current · hover | `--sk-navbar-bg/-height` |
| menu | (item --danger) | — | disabled · open (`:not([hidden])`) | — |
| mega-menu | — | — | open | — |
| drawer | end | — | open · backdrop | `--sk-drawer-from` |
| hero | split · centered · minimal · image | — | — | `--sk-hero-min/-measure/-image` |
| cart | — | — | open · backdrop | `--sk-cart-width/-from` |
| checkout-steps | — | — | **done** · **current** (class or `aria-current`) | `--sk-steps-marker-size/-line/-line-done` |
| footer | minimal · newsletter · inverse | — | — | `--sk-footer-bg/-fg` |
| announcement | primary | — | dismiss | `--sk-announcement-bg/-fg` |

---

_Consumers override any Tier‑3 token in their own (unlayered) CSS — it always wins over
the library's `@layer`. Move a **semantic** token to reskin every component at once;
set a `--sk-<cmp>-*` token to narrow the change to one._
