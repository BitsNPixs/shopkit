import type { HTMLAttributes } from "react";
import { cls } from "./classes.js";
export interface StepperProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** Controlled value. */
    value?: number;
    /** Initial value for uncontrolled use. */
    defaultValue?: number;
    /** Minimum value. */
    min?: number;
    /** Maximum value. */
    max?: number;
    /** Increment/decrement step. */
    step?: number;
    /** Fires with the next value when changed. */
    onValueChange?: (v: number) => void;
    /** Size on the stepper scale. */
    size?: keyof typeof cls.stepperSize;
    /** Accessible label for the quantity input. */
    label?: string;
}
export declare const Stepper: import("react").ForwardRefExoticComponent<StepperProps & import("react").RefAttributes<HTMLDivElement>>;
