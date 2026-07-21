import { jsx as _jsx } from "react/jsx-runtime";
// PAGINATION — compound nav wrapper. The root renders <nav><ul> and emits the
// `.sk-pagination*` classes from the contract; link/ellipsis are thin parts.
// No styling here — visuals come from dist/shopkit.css.
import { forwardRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Pagination = forwardRef(function Pagination({ ariaLabel, className, children, ...rest }, ref) {
    return (_jsx("nav", { ref: ref, "aria-label": ariaLabel ?? "Pagination", ...rest, children: _jsx("ul", { className: cx(cls.pagination, className), children: children }) }));
});
export const PaginationLink = forwardRef(function PaginationLink({ current, className, children, ...rest }, ref) {
    return (_jsx("a", { ref: ref, "aria-current": current ? "page" : undefined, className: cx(cls.paginationLink, className), ...rest, children: children }));
});
export const PaginationEllipsis = forwardRef(function PaginationEllipsis({ className, children, ...rest }, ref) {
    return (_jsx("span", { ref: ref, "aria-hidden": "true", className: cx(cls.paginationEllipsis, className), ...rest, children: children ?? "…" }));
});
