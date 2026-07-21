import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// RATING — thin typed wrapper emitting `.sk-rating` classes from the contract.
// The star fill is driven by the `--sk-rating-value` / `--sk-rating-max` custom
// properties; no styling lives here.
import { forwardRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Rating = forwardRef(function Rating({ value, max = 5, size, label, count, className, style, ...rest }, ref) {
    return (_jsxs(_Fragment, { children: [_jsx("span", { ref: ref, className: cx(cls.rating, size && cls.ratingSize[size], className), role: "img", "aria-label": label ?? `Rated ${value} out of ${max}`, style: { ["--sk-rating-value"]: value, ["--sk-rating-max"]: max, ...style }, ...rest }), count != null && _jsx("span", { className: cls.ratingCount, children: count })] }));
});
