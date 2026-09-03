import type { HTMLAttributes } from "react";
import { cls } from "./classes.js";
export type SpinnerSize = keyof typeof cls.spinnerSize;
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    /** Size on the spinner scale. Omit for the base size. */
    size?: SpinnerSize;
    /** Accessible label announced by AT. */
    label?: string;
}
export declare const Spinner: import("react").ForwardRefExoticComponent<SpinnerProps & import("react").RefAttributes<HTMLSpanElement>>;
