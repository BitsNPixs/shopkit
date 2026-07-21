import type { HTMLAttributes } from "react";
import { cls } from "./classes.js";
export type BadgeVariant = keyof typeof cls.badgeVariant;
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    /** Colour variant — remaps the badge's colour tokens only. */
    variant?: BadgeVariant;
    /** Pill radius. */
    pill?: boolean;
    /** Render a leading status dot before the children. */
    dot?: boolean;
}
export declare const Badge: import("react").ForwardRefExoticComponent<BadgeProps & import("react").RefAttributes<HTMLSpanElement>>;
export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
    /** Colour variant — remaps the chip's colour tokens only. */
    variant?: BadgeVariant;
    /** Show a trailing remove button and handle its click. */
    onRemove?: () => void;
    /** Accessible label for the remove button. */
    removeLabel?: string;
}
export declare const Chip: import("react").ForwardRefExoticComponent<ChipProps & import("react").RefAttributes<HTMLSpanElement>>;
