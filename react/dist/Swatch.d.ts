import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
export interface SwatchesProps extends HTMLAttributes<HTMLDivElement> {
    /** Accessible name for the swatch group (maps to `aria-label`). */
    label?: string;
}
export declare const Swatches: import("react").ForwardRefExoticComponent<SwatchesProps & import("react").RefAttributes<HTMLDivElement>>;
export interface SwatchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
    /** Swatch colour, sets the `--sk-swatch-color` custom property. */
    color?: string;
    /** Text tile (label instead of a colour dot) — uses the size modifier. */
    text?: boolean;
    /** Selected state; reflected via `aria-pressed`. */
    selected?: boolean;
}
export declare const Swatch: import("react").ForwardRefExoticComponent<SwatchProps & import("react").RefAttributes<HTMLButtonElement>>;
