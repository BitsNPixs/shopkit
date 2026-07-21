import type { HTMLAttributes, LiHTMLAttributes, AnchorHTMLAttributes } from "react";
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
    /** Accessible label for the nav landmark. Defaults to "Breadcrumb". */
    ariaLabel?: string;
}
export declare const Breadcrumb: import("react").ForwardRefExoticComponent<BreadcrumbProps & import("react").RefAttributes<HTMLElement>>;
export interface BreadcrumbItemProps extends LiHTMLAttributes<HTMLLIElement> {
    /** Marks the current page — sets `aria-current="page"`. */
    current?: boolean;
}
export declare const BreadcrumbItem: import("react").ForwardRefExoticComponent<BreadcrumbItemProps & import("react").RefAttributes<HTMLLIElement>>;
export declare const BreadcrumbLink: import("react").ForwardRefExoticComponent<AnchorHTMLAttributes<HTMLAnchorElement> & import("react").RefAttributes<HTMLAnchorElement>>;
