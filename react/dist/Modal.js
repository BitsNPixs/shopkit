import { jsx as _jsx } from "react/jsx-runtime";
// MODAL — thin stateful wrapper over the native <dialog>. Controlled via `open`:
// the effect calls showModal()/close() to match. All visuals come from the CSS;
// this file only emits the `.sk-modal*` classes and manages the dialog element.
import { forwardRef, useRef, useEffect } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export function Modal({ open, onClose, size, className, children, ...rest }) {
    const ref = useRef(null);
    useEffect(() => {
        const d = ref.current;
        if (!d)
            return;
        if (open && !d.open)
            d.showModal();
        else if (!open && d.open)
            d.close();
    }, [open]);
    return (_jsx("dialog", { ref: ref, className: cx(cls.modal, size && cls.modalSize[size], className), onClose: onClose, ...rest, children: children }));
}
export const ModalPanel = forwardRef(function ModalPanel({ className, children, ...rest }, ref) {
    return (_jsx("form", { ref: ref, method: "dialog", className: cx(cls.modalPanel, className), ...rest, children: children }));
});
export const ModalHeader = forwardRef(function ModalHeader({ className, children, ...rest }, ref) {
    return (_jsx("header", { ref: ref, className: cx(cls.modalHeader, className), ...rest, children: children }));
});
export const ModalTitle = forwardRef(function ModalTitle({ className, children, ...rest }, ref) {
    return (_jsx("h2", { ref: ref, className: cx(cls.modalTitle, className), ...rest, children: children }));
});
export const ModalBody = forwardRef(function ModalBody({ className, children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, className: cx(cls.modalBody, className), ...rest, children: children }));
});
export const ModalFooter = forwardRef(function ModalFooter({ className, children, ...rest }, ref) {
    return (_jsx("footer", { ref: ref, className: cx(cls.modalFooter, className), ...rest, children: children }));
});
export const ModalClose = forwardRef(function ModalClose({ className, children, ...rest }, ref) {
    // Caller wires onClick; pass an `aria-label` via rest for accessibility.
    return (_jsx("button", { ref: ref, type: "button", className: cx(cls.modalClose, className), ...rest, children: children ?? "✕" }));
});
