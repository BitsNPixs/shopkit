import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ALERT — a thin, typed wrapper that emits the `.sk-alert` classes from the
// contract. No styling here; visuals come from dist/shopkit.css. Variants are
// typed off the class contract so they can never name a class the CSS doesn't
// define. `role` is forwarded — the caller decides role="alert"/"status".
import { forwardRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Alert = forwardRef(function Alert({ variant, icon, title, onClose, closeLabel = "Dismiss", className, children, ...rest }, ref) {
    return (_jsxs("div", { ref: ref, className: cx(cls.alert, variant && cls.alertVariant[variant], className), ...rest, children: [icon && _jsx("span", { className: cls.alertIcon, children: icon }), _jsxs("div", { className: cls.alertBody, children: [title && _jsx("p", { className: cls.alertTitle, children: title }), children] }), onClose && (_jsx("button", { type: "button", className: cls.alertClose, "aria-label": closeLabel, onClick: onClose, children: "\u2715" }))] }));
});
