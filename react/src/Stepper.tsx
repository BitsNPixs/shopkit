// STEPPER — a quantity control emitting the `.sk-stepper` classes. Supports
// controlled (`value` + `onValueChange`) and uncontrolled (`defaultValue`) use.
// No styling lives here; visuals come from dist/shopkit.css.
import { forwardRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export interface StepperProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controlled value. */
  value?: number;
  /** Initial value for uncontrolled use. */
  defaultValue?: number;
  /** Minimum value. */
  min?: number;
  /** Maximum value. */
  max?: number;
  /** Increment/decrement step. */
  step?: number;
  /** Fires with the next value when changed. */
  onValueChange?: (v: number) => void;
  /** Size on the stepper scale. */
  size?: keyof typeof cls.stepperSize;
  /** Accessible label for the quantity input. */
  label?: string;
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(function Stepper(
  {
    value,
    defaultValue,
    min = 1,
    max,
    step = 1,
    onValueChange,
    size,
    label,
    className,
    ...rest
  },
  ref,
) {
  const clamp = (n: number): number => {
    let out = n;
    if (out < min) out = min;
    if (max != null && out > max) out = max;
    return out;
  };

  // Clamp the initial uncontrolled value so an out-of-range `defaultValue`
  // (e.g. 0 with min=1) never seeds an invalid state. Lazy init keeps it to
  // the first render.
  const [state, setState] = useState<number>(() => clamp(defaultValue ?? min));
  const isControlled = value !== undefined;
  const val = isControlled ? value : state;

  const commit = (next: number): void => {
    const clamped = clamp(next);
    if (!isControlled) setState(clamped);
    onValueChange?.(clamped);
  };

  const dec = (): void => commit(val - step);
  const inc = (): void => commit(val + step);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const n = Number(e.target.value);
    if (Number.isNaN(n)) return;
    commit(n);
  };

  return (
    <div
      ref={ref}
      className={cx(cls.stepper, size && cls.stepperSize[size], className)}
      {...rest}
    >
      <button
        type="button"
        className={cls.stepperBtn}
        aria-label="Decrease"
        onClick={dec}
        disabled={val <= min}
      >
        −
      </button>
      <input
        className={cls.stepperInput}
        type="number"
        value={val}
        min={min}
        max={max}
        step={step}
        aria-label={label ?? "Quantity"}
        onChange={handleInput}
      />
      <button
        type="button"
        className={cls.stepperBtn}
        aria-label="Increase"
        onClick={inc}
        disabled={max != null && val >= max}
      >
        +
      </button>
    </div>
  );
});
