// PRODUCT CARD — compound wrappers mirroring the CSS structure. Each part is a
// thin forwardRef component emitting one `.sk-product-card*` class from the
// contract; no styling lives here. Compose root + parts to match the markup.
import { forwardRef } from "react";
import type { HTMLAttributes, ImgHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export interface ProductCardProps extends HTMLAttributes<HTMLElement> {
  /** Layout variant — remaps the card's structure only. */
  variant?: keyof typeof cls.cardVariant;
}

export const ProductCard = forwardRef<HTMLElement, ProductCardProps>(function ProductCard(
  { variant, className, children, ...rest },
  ref,
) {
  return (
    <article
      ref={ref}
      className={cx(cls.card, variant && cls.cardVariant[variant], className)}
      {...rest}
    >
      {children}
    </article>
  );
});

export const ProductCardMedia = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ProductCardMedia({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cx(cls.cardMedia, className)} {...rest}>
        {children}
      </div>
    );
  },
);

export const ProductCardImg = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(
  function ProductCardImg({ className, ...rest }, ref) {
    return <img ref={ref} className={cx(cls.cardImg, className)} {...rest} />;
  },
);

export const ProductCardBadges = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ProductCardBadges({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cx(cls.cardBadges, className)} {...rest}>
        {children}
      </div>
    );
  },
);

export const ProductCardWishlist = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ProductCardWishlist({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cx(cls.cardWishlist, className)} {...rest}>
        {children}
      </div>
    );
  },
);

export const ProductCardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ProductCardBody({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cx(cls.cardBody, className)} {...rest}>
        {children}
      </div>
    );
  },
);

export const ProductCardEyebrow = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function ProductCardEyebrow({ className, children, ...rest }, ref) {
    return (
      <p ref={ref} className={cx(cls.cardEyebrow, className)} {...rest}>
        {children}
      </p>
    );
  },
);

export const ProductCardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function ProductCardTitle({ className, children, ...rest }, ref) {
    return (
      <h3 ref={ref} className={cx(cls.cardTitle, className)} {...rest}>
        {children}
      </h3>
    );
  },
);

export const ProductCardLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  function ProductCardLink({ className, children, ...rest }, ref) {
    return (
      <a ref={ref} className={cx(cls.cardLink, className)} {...rest}>
        {children}
      </a>
    );
  },
);

export const ProductCardMeta = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ProductCardMeta({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cx(cls.cardMeta, className)} {...rest}>
        {children}
      </div>
    );
  },
);

export const ProductCardActions = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ProductCardActions({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cx(cls.cardActions, className)} {...rest}>
        {children}
      </div>
    );
  },
);
