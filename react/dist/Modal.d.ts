import type { HTMLAttributes, FormHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cls } from "./classes.js";
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
export declare function Modal({ open, onClose, size, className, children, ...rest }: ModalProps): import("react").JSX.Element;
export declare const ModalPanel: import("react").ForwardRefExoticComponent<FormHTMLAttributes<HTMLFormElement> & import("react").RefAttributes<HTMLFormElement>>;
export declare const ModalHeader: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & import("react").RefAttributes<HTMLElement>>;
export declare const ModalTitle: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & import("react").RefAttributes<HTMLHeadingElement>>;
export declare const ModalBody: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export declare const ModalFooter: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & import("react").RefAttributes<HTMLElement>>;
export declare const ModalClose: import("react").ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & import("react").RefAttributes<HTMLButtonElement>>;
