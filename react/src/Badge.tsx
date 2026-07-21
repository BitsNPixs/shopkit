// BADGE + CHIP — thin, typed wrappers that emit the `.sk-badge` / `.sk-chip`
// classes from the contract. No styling here; visuals come from dist/shopkit.css.
// Variants are typed off the class contract so they can never name a class the
// CSS doesn't define.
import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export type BadgeVariant = keyof typeof cls.badgeVariant;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Colour variant — remaps the badge's colour tokens only. */
  variant?: BadgeVariant;
  /** Pill radius. */
  pill?: boolean;
  /** Render a leading status dot before the children. */
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant, pill, dot, className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx(
        cls.badge,
        variant && cls.badgeVariant[variant],
        pill && cls.badgePill,
        className,
      )}
      {...rest}
    >
      {dot && <span className={cls.badgeDot} aria-hidden="true" />}
      {children}
    </span>
  );
});

// ── Chip — a badge with an optional remove button (removable filter/token). ──
export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  /** Colour variant — remaps the chip's colour tokens only. */
  variant?: BadgeVariant;
  /** Show a trailing remove button and handle its click. */
  onRemove?: () => void;
  /** Accessible label for the remove button. */
  removeLabel?: string;
}

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  { variant, onRemove, removeLabel = "Remove", className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx(cls.badge, cls.chip, variant && cls.badgeVariant[variant], className)}
      {...rest}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          className={cls.chipRemove}
          aria-label={removeLabel}
          onClick={onRemove}
        >
          ✕
        </button>
      )}
    </span>
  );
});
