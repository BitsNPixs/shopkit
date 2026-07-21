import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// BADGE + CHIP — thin, typed wrappers that emit the `.sk-badge` / `.sk-chip`
// classes from the contract. No styling here; visuals come from dist/shopkit.css.
// Variants are typed off the class contract so they can never name a class the
// CSS doesn't define.
import { forwardRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Badge = forwardRef(function Badge({ variant, pill, dot, className, children, ...rest }, ref) {
    return (_jsxs("span", { ref: ref, className: cx(cls.badge, variant && cls.badgeVariant[variant], pill && cls.badgePill, className), ...rest, children: [dot && _jsx("span", { className: cls.badgeDot, "aria-hidden": "true" }), children] }));
});
export const Chip = forwardRef(function Chip({ variant, onRemove, removeLabel = "Remove", className, children, ...rest }, ref) {
    return (_jsxs("span", { ref: ref, className: cx(cls.badge, cls.chip, variant && cls.badgeVariant[variant], className), ...rest, children: [children, onRemove && (_jsx("button", { type: "button", className: cls.chipRemove, "aria-label": removeLabel, onClick: onRemove, children: "\u2715" }))] }));
});
