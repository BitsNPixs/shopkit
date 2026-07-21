import type { HTMLAttributes } from "react";
import { cls } from "./classes.js";
export type SkeletonVariant = keyof typeof cls.skeletonVariant;
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    /** Shape variant — text line, title, circle, or block. */
    variant?: SkeletonVariant;
}
export declare const Skeleton: import("react").ForwardRefExoticComponent<SkeletonProps & import("react").RefAttributes<HTMLDivElement>>;
