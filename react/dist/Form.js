import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// FORM CONTROLS — thin, typed forwardRef wrappers over ShopKit's form classes.
// Every className comes straight from the class contract (`cls.*`); no styling or
// "sk-…" literals live here. Visuals are entirely from dist/shopkit.css.
import { forwardRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Input = forwardRef(function Input({ size, className, type, ...rest }, ref) {
    return (_jsx("input", { ref: ref, type: type ?? "text", className: cx(cls.input, size && cls.inputSize[size], className), ...rest }));
});
// ── Textarea ──
export const Textarea = forwardRef(function Textarea({ className, ...rest }, ref) {
    return _jsx("textarea", { ref: ref, className: cx(cls.textarea, className), ...rest });
});
export const Select = forwardRef(function Select({ size, className, children, ...rest }, ref) {
    return (_jsx("select", { ref: ref, className: cx(cls.select, size && cls.selectSize[size], className), ...rest, children: children }));
});
// ── Checkbox ──
export const Checkbox = forwardRef(function Checkbox({ className, ...rest }, ref) {
    return (_jsx("input", { ref: ref, type: "checkbox", className: cx(cls.checkbox, className), ...rest }));
});
// ── Radio ──
export const Radio = forwardRef(function Radio({ className, ...rest }, ref) {
    return (_jsx("input", { ref: ref, type: "radio", className: cx(cls.radio, className), ...rest }));
});
// ── Switch ──
export const Switch = forwardRef(function Switch({ className, ...rest }, ref) {
    return (_jsx("input", { ref: ref, type: "checkbox", role: "switch", className: cx(cls.switch, className), ...rest }));
});
export const Label = forwardRef(function Label({ required, className, children, ...rest }, ref) {
    return (_jsxs("label", { ref: ref, className: cx(cls.label, className), ...rest, children: [children, required && (_jsx("span", { className: cls.labelReq, "aria-hidden": "true", children: "*" }))] }));
});
// ── Check — the checkbox/radio + text row wrapper. ──
export const Check = forwardRef(function Check({ className, children, ...rest }, ref) {
    return (_jsx("label", { ref: ref, className: cx(cls.check, className), ...rest, children: children }));
});
// ── Field — vertical stack of label + control + help/error. ──
export const Field = forwardRef(function Field({ className, children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, className: cx(cls.field, className), ...rest, children: children }));
});
// ── FieldHelp — muted helper text. ──
export const FieldHelp = forwardRef(function FieldHelp({ className, children, ...rest }, ref) {
    return (_jsx("span", { ref: ref, className: cx(cls.help, className), ...rest, children: children }));
});
// ── FieldError — error message text. ──
export const FieldError = forwardRef(function FieldError({ className, children, ...rest }, ref) {
    return (_jsx("span", { ref: ref, className: cx(cls.error, className), ...rest, children: children }));
});
// ── Fieldset ──
export const Fieldset = forwardRef(function Fieldset({ className, children, ...rest }, ref) {
    return (_jsx("fieldset", { ref: ref, className: cx(cls.fieldset, className), ...rest, children: children }));
});
// ── Legend ──
export const Legend = forwardRef(function Legend({ className, children, ...rest }, ref) {
    return (_jsx("legend", { ref: ref, className: cx(cls.legend, className), ...rest, children: children }));
});
