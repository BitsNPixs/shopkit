import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cls } from "./classes.js";
export type ButtonVariant = keyof typeof cls.btnVariant;
export type ButtonSize = keyof typeof cls.btnSize;
/** Presentational props shared by every element a Button can render as. */
interface ButtonOwnProps {
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
/**
 * Polymorphic Button. Renders a real `<button>` by default, or an `<a>` when
 * `as="a"` (commerce CTA links). A discriminated union keeps each variant's DOM
 * props exact and sound — no `any`.
 */
export type ButtonProps = (ButtonOwnProps & {
    as?: "button";
} & ButtonHTMLAttributes<HTMLButtonElement>) | (ButtonOwnProps & {
    as: "a";
} & AnchorHTMLAttributes<HTMLAnchorElement>);
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    vertical?: boolean;
}
export declare const ButtonGroup: import("react").ForwardRefExoticComponent<ButtonGroupProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
