// ═══════════════════════════════════════════════════════════════════════════
// ShopKit — Floating Theme Customizer
// ───────────────────────────────────────────────────────────────────────────
// A self-contained, drop-in widget. Include it on ANY page that links
// dist/shopkit.css and it injects a floating button + panel that re-skins the
// page live (mode · brand · radius · gutter · section rhythm · motion · dir),
// persists the choice to localStorage, and hands back a paste-ready :root block.
//
//     <script src="customizer.js" defer></script>
//
// It only writes attributes on <html> (data-theme / data-brand / data-motion /
// dir) and a handful of semantic CSS variables — exactly the public runtime
// theming surface — so nothing here is ShopKit-internal. Zero dependencies.
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  "use strict";

  var KEY = "shopkit-customizer";
  var root = document.documentElement;

  // Defaults mirror the library's own defaults (see tokens/_semantic.scss).
  var DEFAULTS = {
    mode: "system",   // light · dark · system
    brand: "aurora",  // aurora · verde · ember
    radius: 10,       // px  → --sk-radius
    gutter: 24,       // px  → --sk-space-gutter
    section: 72,      // px  → --sk-space-section
    motion: "on",     // on · off
    dir: "ltr",       // ltr · rtl
  };

  var state = load();

  // ── Persistence ──
  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      return Object.assign({}, DEFAULTS, saved);
    } catch (e) {
      return Object.assign({}, DEFAULTS);
    }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  // ── Apply state → the page (only public theming hooks) ──
  function apply() {
    if (state.mode === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", state.mode);

    root.setAttribute("data-brand", state.brand);
    root.setAttribute("dir", state.dir);

    if (state.motion === "off") root.setAttribute("data-motion", "off");
    else root.removeAttribute("data-motion");

    root.style.setProperty("--sk-radius", state.radius + "px");
    root.style.setProperty("--sk-space-gutter", state.gutter + "px");
    root.style.setProperty("--sk-space-section", state.section + "px");
  }

  // The paste-ready override block (only non-default values).
  function themeCss() {
    var lines = [];
    if (state.mode !== "system") lines.push('/* set data-theme="' + state.mode + '" on <html> */');
    if (state.brand !== "aurora") lines.push('/* set data-brand="' + state.brand + '" on <html> */');
    if (state.dir !== "ltr") lines.push('/* set dir="' + state.dir + '" on <html> */');
    if (state.motion !== "on") lines.push('/* set data-motion="off" on <html> */');
    var vars = [];
    if (state.radius !== DEFAULTS.radius) vars.push("  --sk-radius: " + state.radius + "px;");
    if (state.gutter !== DEFAULTS.gutter) vars.push("  --sk-space-gutter: " + state.gutter + "px;");
    if (state.section !== DEFAULTS.section) vars.push("  --sk-space-section: " + state.section + "px;");
    var css = lines.join("\n");
    if (vars.length) css += (css ? "\n" : "") + ":root {\n" + vars.join("\n") + "\n}";
    return css || ":root { /* defaults — nothing to override */ }";
  }

  // ── Injected styles (panel chrome only; controls reuse sk- classes) ──
  var CSS = [
    ".skc-fab{position:fixed;inset-block-end:1.25rem;inset-inline-end:1.25rem;z-index:2147483000;",
    "inline-size:3.25rem;block-size:3.25rem;border-radius:50%;border:0;cursor:pointer;",
    "display:inline-flex;align-items:center;justify-content:center;",
    "background:var(--sk-color-primary);color:var(--sk-color-primary-contrast);",
    "box-shadow:var(--sk-shadow-lg);transition:transform var(--sk-dur-fast) var(--sk-ease-standard)}",
    ".skc-fab:hover{transform:translateY(-2px)}",
    ".skc-fab:focus-visible{outline:3px solid var(--sk-color-primary);outline-offset:2px}",
    ".skc-fab svg{inline-size:1.5rem;block-size:1.5rem}",
    ".skc-panel{position:fixed;inset-block-end:1.25rem;inset-inline-end:1.25rem;z-index:2147483001;",
    "inline-size:min(20rem,calc(100vw - 2rem));max-block-size:min(38rem,calc(100dvh - 2rem));overflow-y:auto;",
    "display:none;flex-direction:column;gap:var(--sk-space-4);padding:var(--sk-space-5);",
    "background:var(--sk-color-surface);color:var(--sk-color-text);border:1px solid var(--sk-color-border);",
    "border-radius:var(--sk-radius-lg);box-shadow:var(--sk-shadow-xl);font-family:var(--sk-font-body)}",
    ".skc-panel[data-open]{display:flex}",
    ".skc-head{display:flex;align-items:center;justify-content:space-between;gap:var(--sk-space-3)}",
    ".skc-head h2{margin:0;font-size:var(--sk-text-md);font-weight:var(--sk-weight-semibold);font-family:var(--sk-font-heading)}",
    ".skc-x{border:0;background:transparent;color:var(--sk-color-text-muted);cursor:pointer;font-size:1.1rem;line-height:1;padding:.25rem;border-radius:var(--sk-radius-sm)}",
    ".skc-x:hover{background:var(--sk-color-surface-sunken);color:var(--sk-color-text)}",
    ".skc-row{display:flex;flex-direction:column;gap:var(--sk-space-2)}",
    ".skc-row>.skc-lbl{display:flex;align-items:baseline;justify-content:space-between;font-size:var(--sk-text-sm);font-weight:var(--sk-weight-medium)}",
    ".skc-row .skc-val{color:var(--sk-color-text-muted);font-family:var(--sk-font-mono);font-size:var(--sk-text-xs)}",
    ".skc-seg{display:flex;gap:.25rem}",
    ".skc-seg button{flex:1;min-block-size:2rem;padding-inline:var(--sk-space-2);border:1px solid var(--sk-color-border);",
    "background:var(--sk-color-surface);color:var(--sk-color-text-muted);border-radius:var(--sk-radius-sm);cursor:pointer;",
    "font:inherit;font-size:var(--sk-text-xs)}",
    ".skc-seg button:hover{background:var(--sk-color-surface-sunken)}",
    ".skc-seg button[aria-pressed=true]{background:var(--sk-color-primary);color:var(--sk-color-primary-contrast);border-color:var(--sk-color-primary)}",
    ".skc-seg button:focus-visible{outline:3px solid var(--sk-color-primary);outline-offset:1px}",
    ".skc-range{inline-size:100%;accent-color:var(--sk-color-primary)}",
    ".skc-out{margin:0;padding:var(--sk-space-3);background:var(--sk-color-surface-sunken);border-radius:var(--sk-radius-sm);",
    "font-family:var(--sk-font-mono);font-size:var(--sk-text-2xs);color:var(--sk-color-text);white-space:pre-wrap;word-break:break-word;max-block-size:9rem;overflow:auto}",
    ".skc-actions{display:flex;gap:var(--sk-space-2)}",
    ".skc-actions button{flex:1}",
  ].join("");

  // ── Build the DOM ──
  function seg(label, valId, options, key) {
    var buttons = options.map(function (o) {
      return '<button type="button" data-key="' + key + '" data-value="' + o.v + '" aria-pressed="' +
        (state[key] === o.v) + '">' + o.t + "</button>";
    }).join("");
    return '<div class="skc-row"><div class="skc-lbl"><span>' + label +
      "</span></div><div class=\"skc-seg\" role=\"group\" aria-label=\"" + label + '">' + buttons + "</div></div>";
  }
  function range(label, key, min, max, unit) {
    return '<div class="skc-row"><div class="skc-lbl"><span>' + label +
      '</span><span class="skc-val" data-out="' + key + '">' + state[key] + unit + "</span></div>" +
      '<input class="skc-range" type="range" min="' + min + '" max="' + max + '" value="' + state[key] +
      '" data-range="' + key + '" aria-label="' + label + '"></div>';
  }

  function build() {
    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    var fab = document.createElement("button");
    fab.className = "skc-fab";
    fab.type = "button";
    fab.setAttribute("aria-label", "Open theme customizer");
    fab.setAttribute("aria-expanded", "false");
    fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="12" r="2.5"/><circle cx="17" cy="14.5" r="2.5"/>' +
      '<circle cx="9.5" cy="18.5" r="2.5"/><path d="M12 2a10 10 0 1 0 0 20"/></svg>';

    var panel = document.createElement("section");
    panel.className = "skc-panel";
    panel.setAttribute("aria-label", "Theme customizer");
    panel.innerHTML =
      '<div class="skc-head"><h2>Customize</h2><button type="button" class="skc-x" aria-label="Close">✕</button></div>' +
      seg("Mode", null, [{ v: "light", t: "Light" }, { v: "dark", t: "Dark" }, { v: "system", t: "System" }], "mode") +
      seg("Brand", null, [{ v: "aurora", t: "Aurora" }, { v: "verde", t: "Verde" }, { v: "ember", t: "Ember" }], "brand") +
      range("Radius", "radius", 0, 24, "px") +
      range("Gutter", "gutter", 8, 48, "px") +
      range("Section rhythm", "section", 32, 128, "px") +
      seg("Motion", null, [{ v: "on", t: "On" }, { v: "off", t: "Off" }], "motion") +
      seg("Direction", null, [{ v: "ltr", t: "LTR" }, { v: "rtl", t: "RTL" }], "dir") +
      '<div class="skc-row"><div class="skc-lbl"><span>Your theme</span></div><pre class="skc-out" id="skc-out"></pre></div>' +
      '<div class="skc-actions"><button type="button" class="sk-btn sk-btn--sm" data-act="copy">Copy CSS</button>' +
      '<button type="button" class="sk-btn sk-btn--ghost sk-btn--sm" data-act="reset">Reset</button></div>';

    document.body.appendChild(fab);
    document.body.appendChild(panel);
    wire(fab, panel);
    refreshOut(panel);
  }

  function refreshSegs(panel) {
    panel.querySelectorAll(".skc-seg button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(state[b.dataset.key] === b.dataset.value));
    });
  }
  function refreshOut(panel) {
    var out = panel.querySelector("#skc-out");
    if (out) out.textContent = themeCss();
  }

  function wire(fab, panel) {
    function open(o) {
      if (o) panel.setAttribute("data-open", ""); else panel.removeAttribute("data-open");
      fab.setAttribute("aria-expanded", String(o));
      fab.style.display = o ? "none" : "inline-flex";
    }
    fab.addEventListener("click", function () { open(true); });
    panel.querySelector(".skc-x").addEventListener("click", function () { open(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.hasAttribute("data-open")) open(false);
    });

    // Segmented choices
    panel.querySelectorAll(".skc-seg button").forEach(function (b) {
      b.addEventListener("click", function () {
        state[b.dataset.key] = b.dataset.value;
        apply(); save(); refreshSegs(panel); refreshOut(panel);
      });
    });
    // Ranges
    panel.querySelectorAll("input[data-range]").forEach(function (r) {
      r.addEventListener("input", function () {
        var key = r.dataset.range;
        state[key] = parseInt(r.value, 10);
        var out = panel.querySelector('[data-out="' + key + '"]');
        if (out) out.textContent = state[key] + "px";
        apply(); save(); refreshOut(panel);
      });
    });
    // Actions
    panel.querySelector('[data-act="copy"]').addEventListener("click", function (e) {
      var txt = themeCss();
      var done = function () { e.target.textContent = "Copied ✓"; setTimeout(function () { e.target.textContent = "Copy CSS"; }, 1400); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, done);
      else done();
    });
    panel.querySelector('[data-act="reset"]').addEventListener("click", function () {
      state = Object.assign({}, DEFAULTS);
      apply(); save();
      panel.querySelectorAll("input[data-range]").forEach(function (r) {
        r.value = state[r.dataset.range];
        var out = panel.querySelector('[data-out="' + r.dataset.range + '"]');
        if (out) out.textContent = state[r.dataset.range] + "px";
      });
      refreshSegs(panel); refreshOut(panel);
    });
  }

  // ── Boot: apply saved state immediately, then inject the UI ──
  apply();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
