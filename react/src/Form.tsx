// FORM CONTROLS — thin, typed forwardRef wrappers over ShopKit's form classes.
// Every className comes straight from the class contract (`cls.*`); no styling or
// "sk-…" literals live here. Visuals are entirely from dist/shopkit.css.
import { forwardRef } from "react";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  LabelHTMLAttributes,
  HTMLAttributes,
  FieldsetHTMLAttributes,
} from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

// ── Input ──
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Size on the shared control scale. Omit for the base (medium) size. */
  size?: keyof typeof cls.inputSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size, className, type, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type ?? "text"}
      className={cx(cls.input, size && cls.inputSize[size], className)}
      {...rest}
    />
  );
});

// ── Textarea ──
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...rest }, ref) {
  return <textarea ref={ref} className={cx(cls.textarea, className)} {...rest} />;
});

// ── Select ──
export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Size on the shared control scale. Omit for the base (medium) size. */
  size?: keyof typeof cls.selectSize;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size, className, children, ...rest },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cx(cls.select, size && cls.selectSize[size], className)}
      {...rest}
    >
      {children}
    </select>
  );
});

// ── Checkbox ──
export const Checkbox = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "type">
>(function Checkbox({ className, ...rest }, ref) {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={cx(cls.checkbox, className)}
      {...rest}
    />
  );
});

// ── Radio ──
export const Radio = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "type">
>(function Radio({ className, ...rest }, ref) {
  return (
    <input ref={ref} type="radio" className={cx(cls.radio, className)} {...rest} />
  );
});

// ── Switch ──
export const Switch = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "type">
>(function Switch({ className, ...rest }, ref) {
  return (
    <input
      ref={ref}
      type="checkbox"
      role="switch"
      className={cx(cls.switch, className)}
      {...rest}
    />
  );
});

// ── Label ──
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Appends a required-marker asterisk after the label text. */
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required, className, children, ...rest },
  ref,
) {
  return (
    <label ref={ref} className={cx(cls.label, className)} {...rest}>
      {children}
      {required && (
        <span className={cls.labelReq} aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
});

// ── Check — the checkbox/radio + text row wrapper. ──
export const Check = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>(function Check({ className, children, ...rest }, ref) {
  return (
    <label ref={ref} className={cx(cls.check, className)} {...rest}>
      {children}
    </label>
  );
});

// ── Field — vertical stack of label + control + help/error. ──
export const Field = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Field({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cx(cls.field, className)} {...rest}>
        {children}
      </div>
    );
  },
);

// ── FieldHelp — muted helper text. ──
export const FieldHelp = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function FieldHelp({ className, children, ...rest }, ref) {
  return (
    <span ref={ref} className={cx(cls.help, className)} {...rest}>
      {children}
    </span>
  );
});

// ── FieldError — error message text. ──
export const FieldError = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(function FieldError({ className, children, ...rest }, ref) {
  return (
    <span ref={ref} className={cx(cls.error, className)} {...rest}>
      {children}
    </span>
  );
});

// ── Fieldset ──
export const Fieldset = forwardRef<
  HTMLFieldSetElement,
  FieldsetHTMLAttributes<HTMLFieldSetElement>
>(function Fieldset({ className, children, ...rest }, ref) {
  return (
    <fieldset ref={ref} className={cx(cls.fieldset, className)} {...rest}>
      {children}
    </fieldset>
  );
});

// ── Legend ──
export const Legend = forwardRef<
  HTMLLegendElement,
  HTMLAttributes<HTMLLegendElement>
>(function Legend({ className, children, ...rest }, ref) {
  return (
    <legend ref={ref} className={cx(cls.legend, className)} {...rest}>
      {children}
    </legend>
  );
});
