import type { ButtonHTMLAttributes } from "react";
import { cls } from "./classes.js";
export type ButtonVariant = keyof typeof cls.btnVariant;
export type ButtonSize = keyof typeof cls.btnSize;
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Colour variant — remaps the button's colour tokens only. */
    variant?: ButtonVariant;
    /** Size on the shared control scale. Omit for the base (medium) size. */
    size?: ButtonSize;
    /** Full-width. */
    block?: boolean;
    /** Pill radius. */
    pill?: boolean;
    /** Icon-only square — you MUST also pass an `aria-label`. */
    icon?: boolean;
    /** Spinner overlay; also sets `aria-busy` and blocks pointer events via the class. */
    loading?: boolean;
}
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    vertical?: boolean;
}
export declare const ButtonGroup: import("react").ForwardRefExoticComponent<ButtonGroupProps & import("react").RefAttributes<HTMLDivElement>>;
