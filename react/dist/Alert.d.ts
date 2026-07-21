import type { HTMLAttributes, ReactNode } from "react";
import { cls } from "./classes.js";
export type AlertVariant = keyof typeof cls.alertVariant;
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Colour variant — remaps the alert's colour tokens only. */
    variant?: AlertVariant;
    /** Optional leading icon. */
    icon?: ReactNode;
    /** Optional bold title rendered above the body content. */
    title?: ReactNode;
    /** Show a trailing close button and handle its click. */
    onClose?: () => void;
    /** Accessible label for the close button. */
    closeLabel?: string;
}
export declare const Alert: import("react").ForwardRefExoticComponent<AlertProps & import("react").RefAttributes<HTMLDivElement>>;
