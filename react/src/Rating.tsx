// RATING — thin typed wrapper emitting `.sk-rating` classes from the contract.
// The star fill is driven by the `--sk-rating-value` / `--sk-rating-max` custom
// properties; no styling lives here.
import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export interface RatingProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Rating value, e.g. 4.5. */
  value: number;
  /** Maximum rating. */
  max?: number;
  /** Size on the rating scale. */
  size?: keyof typeof cls.ratingSize;
  /** Accessible label; defaults to "Rated {value} out of {max}". */
  label?: string;
  /** Optional review count rendered alongside the stars. */
  count?: React.ReactNode;
}

export const Rating = forwardRef<HTMLSpanElement, RatingProps>(function Rating(
  { value, max = 5, size, label, count, className, style, ...rest },
  ref,
) {
  return (
    <>
      <span
        ref={ref}
        className={cx(cls.rating, size && cls.ratingSize[size], className)}
        role="img"
        aria-label={label ?? `Rated ${value} out of ${max}`}
        style={{ ["--sk-rating-value"]: value, ["--sk-rating-max"]: max, ...style } as React.CSSProperties}
        {...rest}
      />
      {count != null && <span className={cls.ratingCount}>{count}</span>}
    </>
  );
});
