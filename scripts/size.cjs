#!/usr/bin/env node
// Size report for the compiled CSS against the <30 KB gzip core budget.
const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

const BUDGET_GZIP = 30 * 1024;
const files = ["dist/shopkit.css", "dist/shopkit.min.css"];

let worst = 0;
console.log("\nShopKit · size report");
console.log("─".repeat(64));
for (const f of files) {
  const p = path.resolve(process.cwd(), f);
  if (!fs.existsSync(p)) { console.log(`${f.padEnd(26)} (missing — run \`npm run build\`)`); continue; }
  const raw = fs.statSync(p).size;
  const gz = zlib.gzipSync(fs.readFileSync(p)).length;
  if (f.endsWith(".min.css")) worst = gz;
  console.log(
    `${f.padEnd(26)} raw ${(raw / 1024).toFixed(1).padStart(6)} KB` +
    `   gzip ${(gz / 1024).toFixed(1).padStart(5)} KB`
  );
}
console.log("─".repeat(64));
const pct = ((worst / BUDGET_GZIP) * 100).toFixed(0);
console.log(`core (min, gzip): ${(worst / 1024).toFixed(1)} KB  ·  budget 30.0 KB  ·  ${pct}% used`);
console.log(worst <= BUDGET_GZIP ? "✓ within budget\n" : "✗ OVER BUDGET\n");
process.exit(worst <= BUDGET_GZIP ? 0 : 1);
