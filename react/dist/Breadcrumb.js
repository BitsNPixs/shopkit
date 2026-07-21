import { jsx as _jsx } from "react/jsx-runtime";
// BREADCRUMB — compound nav wrapper. The root renders <nav><ol> and emits the
// `.sk-breadcrumb__*` classes from the contract; items/links are thin parts.
// No styling here — visuals come from dist/shopkit.css.
import { forwardRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Breadcrumb = forwardRef(function Breadcrumb({ ariaLabel, className, children, ...rest }, ref) {
    return (_jsx("nav", { ref: ref, "aria-label": ariaLabel ?? "Breadcrumb", ...rest, children: _jsx("ol", { className: cx(cls.breadcrumbList, className), children: children }) }));
});
export const BreadcrumbItem = forwardRef(function BreadcrumbItem({ current, className, children, ...rest }, ref) {
    return (_jsx("li", { ref: ref, "aria-current": current ? "page" : undefined, className: cx(cls.breadcrumbItem, className), ...rest, children: children }));
});
export const BreadcrumbLink = forwardRef(function BreadcrumbLink({ className, children, ...rest }, ref) {
    return (_jsx("a", { ref: ref, className: cx(cls.breadcrumbLink, className), ...rest, children: children }));
});
