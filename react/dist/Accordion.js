import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ACCORDION — thin wrappers over native <details>/<summary>. Open/close is the
// browser's own disclosure behaviour; this file only emits the `.sk-accordion*`
// classes and passes `open`/`name`/`onToggle` straight through to <details>.
import { forwardRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Accordion = forwardRef(function Accordion({ className, children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, className: cx(cls.accordion, className), ...rest, children: children }));
});
export const AccordionItem = forwardRef(function AccordionItem({ className, children, ...rest }, ref) {
    // `open`, `name` (exclusive-accordion grouping) and `onToggle` flow via rest.
    return (_jsx("details", { ref: ref, className: cx(cls.accordionItem, className), ...rest, children: children }));
});
export const AccordionTrigger = forwardRef(function AccordionTrigger({ className, children, ...rest }, ref) {
    return (_jsxs("summary", { ref: ref, className: cx(cls.accordionTrigger, className), ...rest, children: [children, _jsx("span", { className: cls.accordionMarker, "aria-hidden": "true" })] }));
});
export const AccordionPanel = forwardRef(function AccordionPanel({ className, children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, className: cx(cls.accordionPanel, className), ...rest, children: children }));
});
