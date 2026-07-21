# @shopkit/react

The React parity layer for [ShopKit](../README.md). Thin, typed components that emit the
**exact same `sk-` classes** as the CSS and read the **same design tokens** — so the CSS
and the React API can't drift.

```bash
npm install @shopkit/react react react-dom
```

```tsx
import "shopkit/dist/shopkit.css";           // the styles (once, anywhere in your app)
import { Button, Price, ProductCard, ProductCardBody, ProductCardTitle } from "@shopkit/react";

<ProductCard variant="compact">
  <ProductCardBody>
    <ProductCardTitle>Featherweight Merino Crew</ProductCardTitle>
    <Price now="$63" was="$84" off="-25%" sale />
    <Button block>Add to cart</Button>
  </ProductCardBody>
</ProductCard>
```

Theming is identical to the CSS: set `data-theme` / `data-brand` / `data-motion` on any
ancestor, or override the CSS custom properties. There is no React theme provider to keep
in sync — the tokens are the single source of truth for both layers.

---

## No drift, by construction

- **One class contract.** Every class lives in [`src/classes.ts`](src/classes.ts). No
  component ever inlines a `"sk-…"` string; they build `className` from the contract only.
- **A parity guard.** [`scripts/parity.mjs`](../scripts/parity.mjs) imports the compiled
  contract and asserts **every** class + data-attribute it can emit exists as a real
  selector in `dist/shopkit.css`. Run it in CI:

  ```bash
  npm run build          # compile the CSS
  npm run react:build    # compile the React (emits the contract)
  npm run parity         # ✓ all N classes exist in the compiled CSS — no drift
  # or all of it: npm run verify
  ```

- **Types off the contract.** Variant/size unions are `keyof typeof cls.*`, so a prop can
  never name a variant the CSS doesn't define.

---

## What's included

Thin wrappers over the reusable widgets. Page-level layout sections (navbar, hero, cart,
footer) are best composed in your app's JSX with the `sk-` classes directly — they're
layout, not state.

**Core UI** — `Button`, `ButtonGroup`, `Badge`, `Chip`, `Alert`, `Modal` (+ parts),
`Tabs` (+ `TabsList`/`Tab`/`TabsPanel`, roving-tabindex), `Accordion` (+ parts),
`Skeleton`, form controls (`Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`,
`Label`, `Check`, `Field`, `FieldHelp`, `FieldError`, `Fieldset`, `Legend`).

**E-commerce** — `Price`, `Rating`, `Swatch`/`Swatches`, `Stepper`, `Wishlist`,
`ProductCard` (+ parts), `Breadcrumb` (+ parts), `Pagination` (+ parts).

Stateful components (`Modal`, `Tabs`, `Stepper`, `Wishlist`) support both controlled and
uncontrolled use; everything forwards refs and spreads native props.

---

## Conventions

- `className` is always **merged last** — your classes win, and the layer is unlayered so
  it already beats ShopKit's `@layer` CSS.
- `size` / `title` / `color` props that clash with native attributes `Omit` the native one.
- `PREFIX` in the contract must match the CSS build (`scss/_config.scss` `$prefix`,
  default `"sk"`). Change one, change both.

MIT.
