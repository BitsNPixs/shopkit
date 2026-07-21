// ═══════════════════════════════════════════════════════════════════════════
// PARITY GUARD — the React layer can't drift from the CSS.
// Imports the compiled class contract (react/dist/classes.js) and asserts that
// EVERY class it can emit exists as a real selector in dist/shopkit.css, and
// every data-attribute exists too. Run after both builds:
//     npm run build && npm --prefix react run build && npm run parity
// ═══════════════════════════════════════════════════════════════════════════
import { readFileSync } from "node:fs";
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

console.log("\nShopKit · React ↔ CSS parity");
console.log("────────────────────────────────────────────────────────────────");
if (missing.length) {
  console.error(`✗ ${missing.length} name(s) referenced by the React layer are NOT in dist/shopkit.css:`);
  for (const m of missing) console.error(`   ${m}`);
  console.error("\nEither the class is misspelled in react/src/classes.ts, or the CSS\ncomponent that defines it is missing. Fix one side so they match.");
  process.exit(1);
}
console.log(`✓ all ${classes.length} classes + ${attrs.length} attributes exist in the compiled CSS — no drift.`);
