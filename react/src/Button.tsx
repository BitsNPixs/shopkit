// BUTTON — the reference React wrapper. A thin, typed, forwardRef component that
// emits the exact `.sk-btn` classes from the contract. No styling lives here;
// all visuals come from dist/shopkit.css. Variants/sizes/modifiers are typed off
// the class contract so they can never name a class the CSS doesn't define.
import { forwardRef } from "react";
import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ForwardedRef,
  Ref,
} from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export type ButtonVariant = keyof typeof cls.btnVariant;
export type ButtonSize = keyof typeof cls.btnSize;

/** Presentational props shared by every element a Button can render as. */
interface ButtonOwnProps {
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

/**
 * Polymorphic Button. Renders a real `<button>` by default, or an `<a>` when
 * `as="a"` (commerce CTA links). A discriminated union keeps each variant's DOM
 * props exact and sound — no `any`.
 */
export type ButtonProps =
  | (ButtonOwnProps & { as?: "button" } & ButtonHTMLAttributes<HTMLButtonElement>)
  | (ButtonOwnProps & { as: "a" } & AnchorHTMLAttributes<HTMLAnchorElement>);

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { as, variant, size, block, pill, icon, loading, className, children, ...rest },
    ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>,
  ) {
    const classes = cx(
      cls.btn,
      variant && cls.btnVariant[variant],
      size && cls.btnSize[size],
      block && cls.btnBlock,
      pill && cls.btnPill,
      icon && cls.btnIcon,
      loading && cls.btnLoading,
      className,
    );
    const busy = loading || undefined;

    if (as === "a") {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          className={classes}
          aria-busy={busy}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    const { type, ...btnRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type={type ?? "button"}
        className={classes}
        aria-busy={busy}
        {...btnRest}
      >
        {children}
      </button>
    );
  },
);

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
