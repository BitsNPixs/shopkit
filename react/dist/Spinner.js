import { jsx as _jsx } from "react/jsx-runtime";
// SPINNER — a thin, typed wrapper that emits the `.sk-spinner` classes from
// the contract. No styling here; visuals come from dist/shopkit.css. Announces
// itself via role="status" + label by default; pass `aria-hidden` (via rest)
// instead when a visible text sibling already carries the state.
import { forwardRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Spinner = forwardRef(function Spinner({ size, label = "Loading", role = "status", className, ...rest }, ref) {
    return (_jsx("span", { ref: ref, role: role, "aria-label": label, className: cx(cls.spinner, size && cls.spinnerSize[size], className), ...rest }));
});
