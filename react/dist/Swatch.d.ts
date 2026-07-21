import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
export declare const Swatches: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export interface SwatchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
    /** Swatch colour, sets the `--sk-swatch-color` custom property. */
    color?: string;
    /** Text tile (label instead of a colour dot) — uses the size modifier. */
    text?: boolean;
    /** Selected state; reflected via `aria-pressed`. */
    selected?: boolean;
}
export declare const Swatch: import("react").ForwardRefExoticComponent<SwatchProps & import("react").RefAttributes<HTMLButtonElement>>;
