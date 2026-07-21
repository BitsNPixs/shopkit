// PRICE — thin typed wrapper emitting `.sk-price` classes from the contract.
// No styling here; visuals come from dist/shopkit.css.
import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export interface PriceProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Current price. */
  now: React.ReactNode;
  /** Original (struck-through) price. */
  was?: React.ReactNode;
  /** Discount call-out, e.g. "-20%". */
  off?: React.ReactNode;
  /** Apply the sale colour treatment. */
  sale?: boolean;
  /** Size on the price scale. */
  size?: keyof typeof cls.priceSize;
}

export const Price = forwardRef<HTMLParagraphElement, PriceProps>(function Price(
  { now, was, off, sale, size, className, ...rest },
  ref,
) {
  return (
    <p
      ref={ref}
      className={cx(cls.price, sale && cls.priceSale, size && cls.priceSize[size], className)}
      {...rest}
    >
      <span className={cls.priceNow}>{now}</span>
      {was != null && <span className={cls.priceWas}>{was}</span>}
      {off != null && <span className={cls.priceOff}>{off}</span>}
    </p>
  );
});
