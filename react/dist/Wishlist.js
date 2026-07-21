import { jsx as _jsx } from "react/jsx-runtime";
// WISHLIST — a toggle heart button emitting the `.sk-wishlist` class. Supports
// controlled (`pressed` + `onPressedChange`) and uncontrolled (`defaultPressed`)
// use. The CSS styles the SVG fill/stroke; no styling lives here.
import { forwardRef, useState } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Wishlist = forwardRef(function Wishlist({ pressed, defaultPressed, onPressedChange, label, className, onClick, children, ...rest }, ref) {
    const [state, setState] = useState(defaultPressed ?? false);
    const isControlled = pressed !== undefined;
    const on = isControlled ? pressed : state;
    return (_jsx("button", { ref: ref, type: "button", className: cx(cls.wishlist, className), "aria-pressed": on, "aria-label": label ?? (on ? "Remove from wishlist" : "Add to wishlist"), onClick: (e) => {
            const next = !on;
            if (!isControlled)
                setState(next);
            onPressedChange?.(next);
            onClick?.(e);
        }, ...rest, children: children ?? (_jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: _jsx("path", { d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z" }) })) }));
});
