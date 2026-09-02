import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// TOAST — thin, typed wrappers over `.sk-toasts` / `.sk-toast`. All visuals
// come from dist/shopkit.css; this file adds the one piece of behaviour CSS
// can't provide: an optional auto-dismiss timer that pauses while the toast
// is hovered or holds focus (so it is never yanked away mid-read).
// Role defaults to "status" (polite); pass role="alert" for urgent failures.
import { forwardRef, useEffect, useRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
// ── The fixed stacking region — render ONE near the app root. ──
export const ToastRegion = forwardRef(function ToastRegion({ className, children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, className: cx(cls.toasts, className), ...rest, children: children }));
});
export const Toast = forwardRef(function Toast({ variant, icon, title, onClose, closeLabel = "Dismiss", duration, role = "status", className, children, onPointerEnter, onPointerLeave, onFocus, onBlur, ...rest }, ref) {
    // Timer with hover/focus pause. Remaining time survives pauses.
    const closeRef = useRef(onClose);
    closeRef.current = onClose;
    const remaining = useRef(duration ?? 0);
    const startedAt = useRef(0);
    const timer = useRef(null);
    useEffect(() => {
        if (!duration || !closeRef.current)
            return;
        remaining.current = duration;
        startedAt.current = Date.now();
        timer.current = setTimeout(() => closeRef.current?.(), duration);
        return () => {
            if (timer.current)
                clearTimeout(timer.current);
        };
    }, [duration]);
    const pause = () => {
        if (!timer.current)
            return;
        clearTimeout(timer.current);
        timer.current = null;
        remaining.current -= Date.now() - startedAt.current;
    };
    const resume = () => {
        if (timer.current || !duration || !closeRef.current || remaining.current <= 0)
            return;
        startedAt.current = Date.now();
        timer.current = setTimeout(() => closeRef.current?.(), remaining.current);
    };
    return (_jsxs("div", { ref: ref, role: role, className: cx(cls.toast, variant && cls.toastVariant[variant], className), onPointerEnter: (e) => {
            onPointerEnter?.(e);
            pause();
        }, onPointerLeave: (e) => {
            onPointerLeave?.(e);
            resume();
        }, onFocus: (e) => {
            onFocus?.(e);
            pause();
        }, onBlur: (e) => {
            onBlur?.(e);
            if (!e.currentTarget.contains(e.relatedTarget))
                resume();
        }, ...rest, children: [icon && (_jsx("span", { className: cls.toastIcon, "aria-hidden": true, children: icon })), _jsxs("div", { className: cls.toastBody, children: [title && _jsx("p", { className: cls.toastTitle, children: title }), children] }), onClose && (_jsx("button", { type: "button", className: cls.close, "aria-label": closeLabel, onClick: onClose, children: "\u2715" }))] }));
});
