// SKELETON — a thin, typed wrapper that emits the `.sk-skeleton` classes from
// the contract. No styling here; visuals come from dist/shopkit.css. Variants
// are typed off the class contract so they can never name a class the CSS
// doesn't define. Decorative by default (`aria-hidden`), overridable via rest.
import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export type SkeletonVariant = keyof typeof cls.skeletonVariant;

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Shape variant — text line, title, circle, or block. */
  variant?: SkeletonVariant;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { variant, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden={true}
      className={cx(cls.skeleton, variant && cls.skeletonVariant[variant], className)}
      {...rest}
    />
  );
});
