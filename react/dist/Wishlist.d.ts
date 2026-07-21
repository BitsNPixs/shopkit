import type { ButtonHTMLAttributes } from "react";
export interface WishlistProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
    /** Controlled pressed state. */
    pressed?: boolean;
    /** Initial pressed state for uncontrolled use. */
    defaultPressed?: boolean;
    /** Fires with the next pressed state when toggled. */
    onPressedChange?: (pressed: boolean) => void;
    /** Accessible label. */
    label?: string;
}
export declare const Wishlist: import("react").ForwardRefExoticComponent<WishlistProps & import("react").RefAttributes<HTMLButtonElement>>;
