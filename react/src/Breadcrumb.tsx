// BREADCRUMB — compound nav wrapper. The root renders <nav><ol> and emits the
// `.sk-breadcrumb__*` classes from the contract; items/links are thin parts.
// No styling here — visuals come from dist/shopkit.css.
import { forwardRef } from "react";
import type { HTMLAttributes, LiHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Accessible label for the nav landmark. Defaults to "Breadcrumb". */
  ariaLabel?: string;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { ariaLabel, className, children, ...rest },
  ref,
) {
  return (
    <nav ref={ref} aria-label={ariaLabel ?? "Breadcrumb"} {...rest}>
      <ol className={cx(cls.breadcrumbList, className)}>{children}</ol>
    </nav>
  );
});

export interface BreadcrumbItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** Marks the current page — sets `aria-current="page"`. */
  current?: boolean;
}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(function BreadcrumbItem(
  { current, className, children, ...rest },
  ref,
) {
  return (
    <li
      ref={ref}
      aria-current={current ? "page" : undefined}
      className={cx(cls.breadcrumbItem, className)}
      {...rest}
    >
      {children}
    </li>
  );
});

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  function BreadcrumbLink({ className, children, ...rest }, ref) {
    return (
      <a ref={ref} className={cx(cls.breadcrumbLink, className)} {...rest}>
        {children}
      </a>
    );
  },
);
