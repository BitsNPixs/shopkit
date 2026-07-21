import type { HTMLAttributes } from "react";
import { cls } from "./classes.js";
export interface RatingProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    /** Rating value, e.g. 4.5. */
    value: number;
    /** Maximum rating. */
    max?: number;
    /** Size on the rating scale. */
    size?: keyof typeof cls.ratingSize;
    /** Accessible label; defaults to "Rated {value} out of {max}". */
    label?: string;
    /** Optional review count rendered alongside the stars. */
    count?: React.ReactNode;
}
export declare const Rating: import("react").ForwardRefExoticComponent<RatingProps & import("react").RefAttributes<HTMLSpanElement>>;
