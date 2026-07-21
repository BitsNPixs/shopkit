// SWATCH — thin typed wrappers emitting `.sk-swatches` / `.sk-swatch` classes.
// The tile colour is driven by the `--sk-swatch-color` custom property; no
// styling lives here.
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export const Swatches = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Swatches({ className, role, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cx(cls.swatches, className)} role={role ?? "group"} {...rest}>
        {children}
      </div>
    );
  },
);

export interface SwatchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /** Swatch colour, sets the `--sk-swatch-color` custom property. */
  color?: string;
  /** Text tile (label instead of a colour dot) — uses the size modifier. */
  text?: boolean;
  /** Selected state; reflected via `aria-pressed`. */
  selected?: boolean;
}

export const Swatch = forwardRef<HTMLButtonElement, SwatchProps>(function Swatch(
  { color, text, selected, className, type, style, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={cx(cls.swatch, text && cls.swatchSize, className)}
      aria-pressed={selected}
      style={color ? ({ ["--sk-swatch-color"]: color, ...style } as React.CSSProperties) : style}
      {...rest}
    >
      {children}
    </button>
  );
});
