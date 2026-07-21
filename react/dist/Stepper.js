import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// STEPPER — a quantity control emitting the `.sk-stepper` classes. Supports
// controlled (`value` + `onValueChange`) and uncontrolled (`defaultValue`) use.
// No styling lives here; visuals come from dist/shopkit.css.
import { forwardRef, useState } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Stepper = forwardRef(function Stepper({ value, defaultValue, min = 1, max, step = 1, onValueChange, size, label, className, ...rest }, ref) {
    const [state, setState] = useState(defaultValue ?? min);
    const isControlled = value !== undefined;
    const val = isControlled ? value : state;
    const clamp = (n) => {
        let out = n;
        if (out < min)
            out = min;
        if (max != null && out > max)
            out = max;
        return out;
    };
    const commit = (next) => {
        const clamped = clamp(next);
        if (!isControlled)
            setState(clamped);
        onValueChange?.(clamped);
    };
    const dec = () => commit(val - step);
    const inc = () => commit(val + step);
    const handleInput = (e) => {
        const n = Number(e.target.value);
        if (Number.isNaN(n))
            return;
        commit(n);
    };
    return (_jsxs("div", { ref: ref, className: cx(cls.stepper, size && cls.stepperSize[size], className), ...rest, children: [_jsx("button", { type: "button", className: cls.stepperBtn, "aria-label": "Decrease", onClick: dec, disabled: val <= min, children: "\u2212" }), _jsx("input", { className: cls.stepperInput, type: "number", value: val, min: min, max: max, step: step, "aria-label": label ?? "Quantity", onChange: handleInput }), _jsx("button", { type: "button", className: cls.stepperBtn, "aria-label": "Increase", onClick: inc, disabled: max != null && val >= max, children: "+" })] }));
});
