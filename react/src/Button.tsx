// BUTTON — the reference React wrapper. A thin, typed, forwardRef component that
// emits the exact `.sk-btn` classes from the contract. No styling lives here;
// all visuals come from dist/shopkit.css. Variants/sizes/modifiers are typed off
// the class contract so they can never name a class the CSS doesn't define.
import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export type ButtonVariant = keyof typeof cls.btnVariant;
export type ButtonSize = keyof typeof cls.btnSize;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Colour variant — remaps the button's colour tokens only. */
  variant?: ButtonVariant;
  /** Size on the shared control scale. Omit for the base (medium) size. */
  size?: ButtonSize;
  /** Full-width. */
  block?: boolean;
  /** Pill radius. */
  pill?: boolean;
  /** Icon-only square — you MUST also pass an `aria-label`. */
  icon?: boolean;
  /** Spinner overlay; also sets `aria-busy` and blocks pointer events via the class. */
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, block, pill, icon, loading, className, type, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? "button"}
      aria-busy={loading || undefined}
      className={cx(
        cls.btn,
        variant && cls.btnVariant[variant],
        size && cls.btnSize[size],
        block && cls.btnBlock,
        pill && cls.btnPill,
        icon && cls.btnIcon,
        loading && cls.btnLoading,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

// ── Button group — attaches child <Button>s into one segmented control. ──
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { vertical, className, role = "group", children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role={role}
      className={cx(cls.btnGroup, vertical && cls.btnGroupVertical, className)}
      {...rest}
    >
      {children}
    </div>
  );
});
