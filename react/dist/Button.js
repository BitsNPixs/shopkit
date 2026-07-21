import { jsx as _jsx } from "react/jsx-runtime";
// BUTTON — the reference React wrapper. A thin, typed, forwardRef component that
// emits the exact `.sk-btn` classes from the contract. No styling lives here;
// all visuals come from dist/shopkit.css. Variants/sizes/modifiers are typed off
// the class contract so they can never name a class the CSS doesn't define.
import { forwardRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Button = forwardRef(function Button({ variant, size, block, pill, icon, loading, className, type, children, ...rest }, ref) {
    return (_jsx("button", { ref: ref, type: type ?? "button", "aria-busy": loading || undefined, className: cx(cls.btn, variant && cls.btnVariant[variant], size && cls.btnSize[size], block && cls.btnBlock, pill && cls.btnPill, icon && cls.btnIcon, loading && cls.btnLoading, className), ...rest, children: children }));
});
export const ButtonGroup = forwardRef(function ButtonGroup({ vertical, className, role = "group", children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, role: role, className: cx(cls.btnGroup, vertical && cls.btnGroupVertical, className), ...rest, children: children }));
});
