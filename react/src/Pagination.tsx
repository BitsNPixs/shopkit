// PAGINATION — compound nav wrapper. The root renders <nav><ul> and emits the
// `.sk-pagination*` classes from the contract; link/ellipsis are thin parts.
// No styling here — visuals come from dist/shopkit.css.
import { forwardRef } from "react";
import type { HTMLAttributes, AnchorHTMLAttributes } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** Accessible label for the nav landmark. Defaults to "Pagination". */
  ariaLabel?: string;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { ariaLabel, className, children, ...rest },
  ref,
) {
  return (
    <nav ref={ref} aria-label={ariaLabel ?? "Pagination"} {...rest}>
      <ul className={cx(cls.pagination, className)}>{children}</ul>
    </nav>
  );
});

export interface PaginationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks the current page — sets `aria-current="page"`. */
  current?: boolean;
}

export const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  function PaginationLink({ current, className, children, ...rest }, ref) {
    return (
      <a
        ref={ref}
        aria-current={current ? "page" : undefined}
        className={cx(cls.paginationLink, className)}
        {...rest}
      >
        {children}
      </a>
    );
  },
);

export const PaginationEllipsis = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function PaginationEllipsis({ className, children, ...rest }, ref) {
    return (
      <span ref={ref} aria-hidden="true" className={cx(cls.paginationEllipsis, className)} {...rest}>
        {children ?? "…"}
      </span>
    );
  },
);
