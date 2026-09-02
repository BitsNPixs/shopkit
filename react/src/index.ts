// ═══════════════════════════════════════════════════════════════════════════
// @shopkit/react — the React parity layer.
// Thin, typed components that emit the exact same `sk-` classes as ShopKit's CSS
// and read the same design tokens. Import the compiled CSS once in your app
// (from the shopkit package or the CDN), then use these components — all styling
// lives in the CSS; these only wire markup, types, and a little state.
// ═══════════════════════════════════════════════════════════════════════════

// ── Contract + helpers ──
export { PREFIX, cls, attr } from "./classes.js";
export { cx } from "./cx.js";
export type { ClassValue } from "./cx.js";

// ── Core UI ──
export * from "./Button.js";
export * from "./Badge.js";
export * from "./Alert.js";
export * from "./Toast.js";
export * from "./Form.js";
export * from "./Modal.js";
export * from "./Tabs.js";
export * from "./Accordion.js";
export * from "./Skeleton.js";
export * from "./Spinner.js";

// ── E-commerce ──
export * from "./Price.js";
export * from "./Rating.js";
export * from "./Swatch.js";
export * from "./Stepper.js";
export * from "./Wishlist.js";
export * from "./ProductCard.js";
export * from "./Breadcrumb.js";
export * from "./Pagination.js";
