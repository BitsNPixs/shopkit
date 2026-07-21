// ═══════════════════════════════════════════════════════════════════════════
// PARITY GUARD — the React layer can't drift from the CSS.
// Imports the compiled class contract (react/dist/classes.js) and asserts that
// EVERY class it can emit exists as a real selector in dist/shopkit.css, and
// every data-attribute exists too. Run after both builds:
//     npm run build && npm --prefix react run build && npm run parity
// ═══════════════════════════════════════════════════════════════════════════
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(root, "dist", "shopkit.css"), "utf8");

const { cls, attr } = await import(
  new URL("../react/dist/classes.js", import.meta.url).href
);

function collect(obj, out = []) {
  for (const v of Object.values(obj)) {
    if (typeof v === "string") out.push(v);
    else if (v && typeof v === "object") collect(v, out);
  }
  return out;
}

const classes = [...new Set(collect(cls))];
const attrs = [...new Set(collect(attr))];

const esc = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
const missing = [];

for (const c of classes) {
  // Match `.<class>` NOT followed by another class-name char, so `.sk-tab`
  // is not satisfied by `.sk-tabs`.
  const re = new RegExp(`\\.${esc(c)}(?![a-z0-9_-])`);
  if (!re.test(css)) missing.push(`.${c}`);
}
for (const a of attrs) {
  if (!css.includes(`[${a}`)) missing.push(`[${a}]`);
}

// ───────────────────────────────────────────────────────────────────────────
// GUARD 2 — components must not hardcode a `sk-` class the contract doesn't
// know about. Every class MUST flow through react/src/classes.ts, so any
// `sk-…` literal a component emits has to be a value the contract exports.
// This catches drift the CSS check can't: a stray class that happens to exist
// in the CSS but was never registered in the contract.
//
// classes.ts is the source of truth, so it's excluded from the scan. Comments
// are stripped first (docs reference `.sk-*` selectors), and `-`-prefixed
// matches are ignored so CSS custom properties (`--sk-swatch-color`) and data
// attributes (`data-sk-tooltip`) aren't mistaken for class literals.
const known = new Set(classes);
const srcDir = join(root, "react", "src");
const CLASS_LITERAL = /(?<!-)\bsk-[a-z0-9-]+/g;
const stray = [];

for (const file of readdirSync(srcDir)) {
  if (!file.endsWith(".tsx")) continue; // .tsx components only; classes.ts is the contract
  const src = readFileSync(join(srcDir, file), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "") // block comments
    .replace(/\/\/[^\n]*/g, ""); // line comments
  for (const m of src.matchAll(CLASS_LITERAL)) {
    if (!known.has(m[0])) stray.push(`${file}: "${m[0]}"`);
  }
}

console.log("\nShopKit · React ↔ CSS parity");
console.log("────────────────────────────────────────────────────────────────");

let failed = false;

if (missing.length) {
  failed = true;
  console.error(`✗ ${missing.length} name(s) referenced by the React layer are NOT in dist/shopkit.css:`);
  for (const m of missing) console.error(`   ${m}`);
  console.error("\nEither the class is misspelled in react/src/classes.ts, or the CSS\ncomponent that defines it is missing. Fix one side so they match.");
}

if (stray.length) {
  failed = true;
  console.error(`\n✗ ${stray.length} hardcoded sk- class literal(s) not registered in react/src/classes.ts:`);
  for (const s of stray) console.error(`   ${s}`);
  console.error("\nA component is emitting an `sk-` class the contract doesn't export.\nAdd the class to react/src/classes.ts and reference it via `cls`, so the\ncontract stays the single source of truth (and this guard can vouch for it).");
}

if (failed) process.exit(1);

console.log(`✓ all ${classes.length} classes + ${attrs.length} attributes exist in the compiled CSS — no drift.`);
console.log(`✓ no component hardcodes an sk- class outside the classes.ts contract.`);
