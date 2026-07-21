import { jsx as _jsx } from "react/jsx-runtime";
// SKELETON — a thin, typed wrapper that emits the `.sk-skeleton` classes from
// the contract. No styling here; visuals come from dist/shopkit.css. Variants
// are typed off the class contract so they can never name a class the CSS
// doesn't define. Decorative by default (`aria-hidden`), overridable via rest.
import { forwardRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Skeleton = forwardRef(function Skeleton({ variant, className, ...rest }, ref) {
    return (_jsx("div", { ref: ref, "aria-hidden": true, className: cx(cls.skeleton, variant && cls.skeletonVariant[variant], className), ...rest }));
});
