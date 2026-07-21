// MODAL — thin stateful wrapper over the native <dialog>. Controlled via `open`:
// the effect calls showModal()/close() to match. All visuals come from the CSS;
// this file only emits the `.sk-modal*` classes and manages the dialog element.
import { forwardRef, useRef, useEffect, useId, createContext, useContext } from "react";
import type { HTMLAttributes, FormHTMLAttributes, ButtonHTMLAttributes, MouseEvent } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

// Lets <ModalTitle> pick up the id the <Modal> points `aria-labelledby` at.
const ModalContext = createContext<{ titleId: string } | null>(null);

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

export function Modal({ open, onClose, size, className, children, onClick, ...rest }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);

  // Native <dialog>.showModal() does NOT close on backdrop click, so implement
  // it. A click whose coordinates fall outside the panel's box is a backdrop
  // click — close via the same `close()`/onClose path used by Esc.
  const handleClick = (e: MouseEvent<HTMLDialogElement>): void => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    const d = ref.current;
    if (!d || e.target !== d) return;
    // e.target === the <dialog> itself means the click landed on the backdrop
    // area, not on any child panel content. Confirm with a hit-test so clicks
    // on a full-bleed panel that IS the dialog don't false-close.
    const r = d.getBoundingClientRect();
    const inside =
      e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) d.close();
  };

  return (
    <ModalContext.Provider value={{ titleId }}>
      <dialog
        ref={ref}
        className={cx(cls.modal, size && cls.modalSize[size], className)}
        aria-labelledby={titleId}
        onClose={onClose}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </dialog>
    </ModalContext.Provider>
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
  function ModalTitle({ className, id, children, ...rest }, ref) {
    // Adopt the id the parent <Modal> points aria-labelledby at, unless the
    // consumer set their own id (which then wins).
    const ctx = useContext(ModalContext);
    return (
      <h2 ref={ref} id={id ?? ctx?.titleId} className={cx(cls.modalTitle, className)} {...rest}>
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
