// ALERT — a thin, typed wrapper that emits the `.sk-alert` classes from the
// contract. No styling here; visuals come from dist/shopkit.css. Variants are
// typed off the class contract so they can never name a class the CSS doesn't
// define. `role` is forwarded — the caller decides role="alert"/"status".
import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export type AlertVariant = keyof typeof cls.alertVariant;

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Colour variant — remaps the alert's colour tokens only. */
  variant?: AlertVariant;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Optional bold title rendered above the body content. */
  title?: ReactNode;
  /** Show a trailing close button and handle its click. */
  onClose?: () => void;
  /** Accessible label for the close button. */
  closeLabel?: string;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant, icon, title, onClose, closeLabel = "Dismiss", className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(cls.alert, variant && cls.alertVariant[variant], className)}
      {...rest}
    >
      {icon && <span className={cls.alertIcon}>{icon}</span>}
      <div className={cls.alertBody}>
        {title && <p className={cls.alertTitle}>{title}</p>}
        {children}
      </div>
      {onClose && (
        <button
          type="button"
          className={cls.alertClose}
          aria-label={closeLabel}
          onClick={onClose}
        >
          ✕
        </button>
      )}
    </div>
  );
});
