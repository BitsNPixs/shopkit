# ShopKit — Motion System

Motion in ShopKit is **token-driven and reduced-motion-first**. Every transition and
animation reads a `--sk-dur-*` duration token, so honouring a user's reduced-motion
preference is automatic and needs no per-component media query — the token layer zeroes
the durations and the motion stops. Codified as [`scss/base/_motion.scss`](scss/base/_motion.scss)
(the `transition()` mixin) and [`scss/utilities/_animation.scss`](scss/utilities/_animation.scss)
(the `.sk-animate-*` utilities).

---

## 1 · Tokens

| Kind | Token | Value | Use |
|---|---|---|---|
| duration | `--sk-dur-instant` | 80ms | tiny state flips |
| | `--sk-dur-fast` | 150ms | hover / focus / press (the default) |
| | `--sk-dur-base` | 300ms | enter/exit of panels, cards |
| | `--sk-dur-slow` | 600ms | loaders, ambient loops |
| | `--sk-dur-loop` | 900ms | looping *status* indicators (spinners, striped progress) — slows to 3s under reduced motion instead of stopping, so "busy" still reads as busy (Bootstrap slows to 1.5s) |
| easing | `--sk-ease-standard` | `cubic-bezier(.2,.6,.35,1)` | in-out, the default |
| | `--sk-ease-out` | `cubic-bezier(.16,1,.3,1)` | decelerate — enters |
| | `--sk-ease-spring` | `cubic-bezier(.34,1.56,.64,1)` | slight overshoot — pops |

**Golden rule:** never hard-code a millisecond value. Always a duration token — that is
the single mechanism the reduced-motion + `data-motion` systems hook into.

---

## 2 · Reduced motion — free, and overridable

Three layers, no `!important`, fully token-driven:

```css
/* tokens/_semantic.scss — zeroes durations when the OS asks for less motion … */
@media (prefers-reduced-motion: reduce) {
  :root:not([data-motion="full"]) {
    --sk-dur-instant: 0ms; --sk-dur-fast: 0ms; --sk-dur-base: 0ms; --sk-dur-slow: 0ms; --sk-dur-loop: 3s;
  }
}
/* … and a hard switch either direction */
[data-motion="off"]  { /* durations → 0ms */ }
```

```html
<html data-motion="off">    <!-- kill motion everywhere -->
<section data-motion="full"> <!-- opt this subtree back in, even under OS reduced-motion -->
```

Because durations become `0ms`:
- **enter** animations snap straight to their end frame (no flash — they use `both` fill),
- **continuous** loops (spin/pulse) simply don't advance,
- **transitions** apply instantly.

No component writes a `prefers-reduced-motion` rule for motion itself. (The one exception
is `.sk-skeleton`, which additionally swaps its moving gradient for a flat tint — a paint
change, not a timing change.)

---

## 3 · Transitions — the `transition()` mixin

```scss
@use "../base/motion" as *;

.thing  { @include transition(background, color); }              // fast · standard
.panel  { @include transition(transform, $dur: "base", $ease: "out"); }
.row    { @include transition((opacity, transform), $dur: "base"); }
```

Every listed property gets the same token-driven duration + easing (the common case). For
per-property timing, write the `transition` shorthand by hand (still with tokens). Adopting
the mixin in the button produced **byte-identical** compiled output.

For **enter/exit of top-layer elements** (modal, cart, drawer) the pattern is a `[open]`
transition from `@starting-style`, with the `overlay` / `display` legs marked
`allow-discrete` so the exit still runs on the top layer — see `_modal.scss`.

---

## 4 · Animation utilities — `.sk-animate-*`

Config-gated (`$utilities-enabled.motion`), `@layer sk.utilities`. RTL-safe: the keyframes
move only opacity, scale, the block axis, or rotation — nothing keyed to a physical inline
direction, so they are identical under `dir="rtl"`.

| Class | Motion | Keyframe |
|---|---|---|
| `.sk-animate-fade` | opacity 0 → 1 | `sk-fade` |
| `.sk-animate-fade-up` | rise + fade (enter from below) | `sk-fade-up` |
| `.sk-animate-fade-down` | drop + fade (enter from above) | `sk-fade-down` |
| `.sk-animate-scale-in` | pop in (spring) | `sk-scale-in` |
| `.sk-animate-spin` | 360° loop (loaders) | `sk-spin` |
| `.sk-animate-pulse` | opacity breathe (attention) | `sk-pulse` |
| `.sk-animate-fast` / `-slow` | swap the duration token | — |

```html
<article class="sk-product-card sk-animate-fade-up">…</article>
<span class="sk-animate-spin" aria-hidden="true"><svg>…</svg></span>
```

Enter animations use `both` fill so they hold the end frame. For **edge slides**
(off-canvas drawer / cart) use the component's `--*-from` token pattern rather than a
horizontal keyframe — that keeps the slide direction logical (start vs end edge).

---

## 5 · What already moves

Built on these tokens across the kit: button press + spinner, modal/cart/drawer
enter/exit (`@starting-style` + `allow-discrete`), skeleton sweep, accordion marker,
tabs underline, tooltip pop, product-card hover lift + image zoom, swatch/wishlist press,
nav/link/menu hover. All of it goes still under `data-motion="off"` or OS reduced-motion.
