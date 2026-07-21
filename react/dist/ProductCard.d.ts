import type { HTMLAttributes, ImgHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cls } from "./classes.js";
export interface ProductCardProps extends HTMLAttributes<HTMLElement> {
    /** Layout variant — remaps the card's structure only. */
    variant?: keyof typeof cls.cardVariant;
}
export declare const ProductCard: import("react").ForwardRefExoticComponent<ProductCardProps & import("react").RefAttributes<HTMLElement>>;
export declare const ProductCardMedia: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export declare const ProductCardImg: import("react").ForwardRefExoticComponent<ImgHTMLAttributes<HTMLImageElement> & import("react").RefAttributes<HTMLImageElement>>;
export declare const ProductCardBadges: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export declare const ProductCardWishlist: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export declare const ProductCardBody: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export declare const ProductCardEyebrow: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & import("react").RefAttributes<HTMLParagraphElement>>;
export declare const ProductCardTitle: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & import("react").RefAttributes<HTMLHeadingElement>>;
export declare const ProductCardLink: import("react").ForwardRefExoticComponent<AnchorHTMLAttributes<HTMLAnchorElement> & import("react").RefAttributes<HTMLAnchorElement>>;
export declare const ProductCardMeta: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export declare const ProductCardActions: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
