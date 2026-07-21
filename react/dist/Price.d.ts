import type { HTMLAttributes } from "react";
import { cls } from "./classes.js";
export interface PriceProps extends HTMLAttributes<HTMLParagraphElement> {
    /** Current price. */
    now: React.ReactNode;
    /** Original (struck-through) price. */
    was?: React.ReactNode;
    /** Discount call-out, e.g. "-20%". */
    off?: React.ReactNode;
    /** Apply the sale colour treatment. */
    sale?: boolean;
    /** Size on the price scale. */
    size?: keyof typeof cls.priceSize;
}
export declare const Price: import("react").ForwardRefExoticComponent<PriceProps & import("react").RefAttributes<HTMLParagraphElement>>;
