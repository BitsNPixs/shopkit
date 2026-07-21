import { jsx as _jsx } from "react/jsx-runtime";
// SWATCH — thin typed wrappers emitting `.sk-swatches` / `.sk-swatch` classes.
// The tile colour is driven by the `--sk-swatch-color` custom property; no
// styling lives here.
import { forwardRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Swatches = forwardRef(function Swatches({ className, role, children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, className: cx(cls.swatches, className), role: role ?? "group", ...rest, children: children }));
});
export const Swatch = forwardRef(function Swatch({ color, text, selected, className, type, style, children, ...rest }, ref) {
    return (_jsx("button", { ref: ref, type: type ?? "button", className: cx(cls.swatch, text && cls.swatchSize, className), "aria-pressed": selected, style: color ? { ["--sk-swatch-color"]: color, ...style } : style, ...rest, children: children }));
});
