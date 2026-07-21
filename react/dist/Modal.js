import { jsx as _jsx } from "react/jsx-runtime";
// MODAL — thin stateful wrapper over the native <dialog>. Controlled via `open`:
// the effect calls showModal()/close() to match. All visuals come from the CSS;
// this file only emits the `.sk-modal*` classes and manages the dialog element.
import { forwardRef, useRef, useEffect, useId, createContext, useContext } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
// Lets <ModalTitle> pick up the id the <Modal> points `aria-labelledby` at.
const ModalContext = createContext(null);
export function Modal({ open, onClose, size, className, children, onClick, ...rest }) {
    const ref = useRef(null);
    const titleId = useId();
    useEffect(() => {
        const d = ref.current;
        if (!d)
            return;
        if (open && !d.open)
            d.showModal();
        else if (!open && d.open)
            d.close();
    }, [open]);
    // Native <dialog>.showModal() does NOT close on backdrop click, so implement
    // it. A click whose coordinates fall outside the panel's box is a backdrop
    // click — close via the same `close()`/onClose path used by Esc.
    const handleClick = (e) => {
        onClick?.(e);
        if (e.defaultPrevented)
            return;
        const d = ref.current;
        if (!d || e.target !== d)
            return;
        // e.target === the <dialog> itself means the click landed on the backdrop
        // area, not on any child panel content. Confirm with a hit-test so clicks
        // on a full-bleed panel that IS the dialog don't false-close.
        const r = d.getBoundingClientRect();
        const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        if (!inside)
            d.close();
    };
    return (_jsx(ModalContext.Provider, { value: { titleId }, children: _jsx("dialog", { ref: ref, className: cx(cls.modal, size && cls.modalSize[size], className), "aria-labelledby": titleId, onClose: onClose, onClick: handleClick, ...rest, children: children }) }));
}
export const ModalPanel = forwardRef(function ModalPanel({ className, children, ...rest }, ref) {
    return (_jsx("form", { ref: ref, method: "dialog", className: cx(cls.modalPanel, className), ...rest, children: children }));
});
export const ModalHeader = forwardRef(function ModalHeader({ className, children, ...rest }, ref) {
    return (_jsx("header", { ref: ref, className: cx(cls.modalHeader, className), ...rest, children: children }));
});
export const ModalTitle = forwardRef(function ModalTitle({ className, id, children, ...rest }, ref) {
    // Adopt the id the parent <Modal> points aria-labelledby at, unless the
    // consumer set their own id (which then wins).
    const ctx = useContext(ModalContext);
    return (_jsx("h2", { ref: ref, id: id ?? ctx?.titleId, className: cx(cls.modalTitle, className), ...rest, children: children }));
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
