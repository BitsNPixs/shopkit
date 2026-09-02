import type { HTMLAttributes, ReactNode } from "react";
import { cls } from "./classes.js";
export declare const ToastRegion: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export type ToastVariant = keyof typeof cls.toastVariant;
export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Colour variant — remaps the toast's accent token only. */
    variant?: ToastVariant;
    /** Optional leading icon. */
    icon?: ReactNode;
    /** Optional bold title rendered above the body content. */
    title?: ReactNode;
    /** Show the shared close button and handle dismissal. */
    onClose?: () => void;
    /** Accessible label for the close button. */
    closeLabel?: string;
    /**
     * Auto-dismiss after this many ms (requires `onClose`). The timer pauses
     * while the toast is hovered or contains focus. Omit for a sticky toast —
     * and keep errors sticky: auto-dismiss should never be the only way to
     * read a failure.
     */
    duration?: number;
}
export declare const Toast: import("react").ForwardRefExoticComponent<ToastProps & import("react").RefAttributes<HTMLDivElement>>;
