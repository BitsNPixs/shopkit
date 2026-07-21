// MODAL — thin stateful wrapper over the native <dialog>. Controlled via `open`:
// the effect calls showModal()/close() to match. All visuals come from the CSS;
// this file only emits the `.sk-modal*` classes and manages the dialog element.
import { forwardRef, useRef, useEffect } from "react";
import type { HTMLAttributes, FormHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export type ModalSize = keyof typeof cls.modalSize;

export interface ModalProps extends HTMLAttributes<HTMLDialogElement> {
  /** Controlled open state. */
  open: boolean;
  /**
   * Fires on native `close` (Esc / backdrop) as well as programmatic close.
   * The parent MUST set `open={false}` here to keep React state in sync.
   */
  onClose?: () => void;
  /** Size preset on the modal scale. Omit for the base size. */
  size?: ModalSize;
}

export function Modal({ open, onClose, size, className, children, ...rest }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cx(cls.modal, size && cls.modalSize[size], className)}
      onClose={onClose}
      {...rest}
    >
      {children}
    </dialog>
  );
}

export const ModalPanel = forwardRef<HTMLFormElement, FormHTMLAttributes<HTMLFormElement>>(
  function ModalPanel({ className, children, ...rest }, ref) {
    return (
      <form ref={ref} method="dialog" className={cx(cls.modalPanel, className)} {...rest}>
        {children}
      </form>
    );
  },
);

export const ModalHeader = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function ModalHeader({ className, children, ...rest }, ref) {
    return (
      <header ref={ref} className={cx(cls.modalHeader, className)} {...rest}>
        {children}
      </header>
    );
  },
);

export const ModalTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function ModalTitle({ className, children, ...rest }, ref) {
    return (
      <h2 ref={ref} className={cx(cls.modalTitle, className)} {...rest}>
        {children}
      </h2>
    );
  },
);

export const ModalBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ModalBody({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cx(cls.modalBody, className)} {...rest}>
        {children}
      </div>
    );
  },
);

export const ModalFooter = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function ModalFooter({ className, children, ...rest }, ref) {
    return (
      <footer ref={ref} className={cx(cls.modalFooter, className)} {...rest}>
        {children}
      </footer>
    );
  },
);

export const ModalClose = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function ModalClose({ className, children, ...rest }, ref) {
    // Caller wires onClick; pass an `aria-label` via rest for accessibility.
    return (
      <button ref={ref} type="button" className={cx(cls.modalClose, className)} {...rest}>
        {children ?? "✕"}
      </button>
    );
  },
);
