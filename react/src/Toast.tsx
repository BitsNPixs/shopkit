// TOAST — thin, typed wrappers over `.sk-toasts` / `.sk-toast`. All visuals
// come from dist/shopkit.css; this file adds the one piece of behaviour CSS
// can't provide: an optional auto-dismiss timer that pauses while the toast
// is hovered or holds focus (so it is never yanked away mid-read).
// Role defaults to "status" (polite); pass role="alert" for urgent failures.
import { forwardRef, useEffect, useRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

// ── The fixed stacking region — render ONE near the app root. ──
export const ToastRegion = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ToastRegion({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cx(cls.toasts, className)} {...rest}>
        {children}
      </div>
    );
  },
);

export type ToastVariant = keyof typeof cls.toastVariant;

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Colour variant — remaps the toast's accent token only. */
  variant?: ToastVariant;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Optional bold title rendered above the body content. */
  title?: ReactNode;
  /** Show the shared close button and handle dismissal. */
  onClose?: () => void;
  /** Accessible label for the close button. */
  closeLabel?: string;
  /**
   * Auto-dismiss after this many ms (requires `onClose`). The timer pauses
   * while the toast is hovered or contains focus. Omit for a sticky toast —
   * and keep errors sticky: auto-dismiss should never be the only way to
   * read a failure.
   */
  duration?: number;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    variant,
    icon,
    title,
    onClose,
    closeLabel = "Dismiss",
    duration,
    role = "status",
    className,
    children,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  // Timer with hover/focus pause. Remaining time survives pauses.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const remaining = useRef(duration ?? 0);
  const startedAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!duration || !closeRef.current) return;
    remaining.current = duration;
    startedAt.current = Date.now();
    timer.current = setTimeout(() => closeRef.current?.(), duration);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [duration]);

  const pause = (): void => {
    if (!timer.current) return;
    clearTimeout(timer.current);
    timer.current = null;
    remaining.current -= Date.now() - startedAt.current;
  };
  const resume = (): void => {
    if (timer.current || !duration || !closeRef.current || remaining.current <= 0) return;
    startedAt.current = Date.now();
    timer.current = setTimeout(() => closeRef.current?.(), remaining.current);
  };

  return (
    <div
      ref={ref}
      role={role}
      className={cx(cls.toast, variant && cls.toastVariant[variant], className)}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        pause();
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        resume();
      }}
      onFocus={(e) => {
        onFocus?.(e);
        pause();
      }}
      onBlur={(e) => {
        onBlur?.(e);
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) resume();
      }}
      {...rest}
    >
      {icon && (
        <span className={cls.toastIcon} aria-hidden={true}>
          {icon}
        </span>
      )}
      <div className={cls.toastBody}>
        {title && <p className={cls.toastTitle}>{title}</p>}
        {children}
      </div>
      {onClose && (
        <button type="button" className={cls.close} aria-label={closeLabel} onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
});
