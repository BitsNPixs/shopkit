import type { HTMLAttributes, AnchorHTMLAttributes } from "react";
export interface PaginationProps extends HTMLAttributes<HTMLElement> {
    /** Accessible label for the nav landmark. Defaults to "Pagination". */
    ariaLabel?: string;
}
export declare const Pagination: import("react").ForwardRefExoticComponent<PaginationProps & import("react").RefAttributes<HTMLElement>>;
export interface PaginationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Marks the current page — sets `aria-current="page"`. */
    current?: boolean;
}
export declare const PaginationLink: import("react").ForwardRefExoticComponent<PaginationLinkProps & import("react").RefAttributes<HTMLAnchorElement>>;
export declare const PaginationEllipsis: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & import("react").RefAttributes<HTMLSpanElement>>;
