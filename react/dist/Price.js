import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// PRICE — thin typed wrapper emitting `.sk-price` classes from the contract.
// No styling here; visuals come from dist/shopkit.css.
import { forwardRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const Price = forwardRef(function Price({ now, was, off, sale, size, className, ...rest }, ref) {
    return (_jsxs("p", { ref: ref, className: cx(cls.price, sale && cls.priceSale, size && cls.priceSize[size], className), ...rest, children: [_jsx("span", { className: cls.priceNow, children: now }), was != null && _jsx("span", { className: cls.priceWas, children: was }), off != null && _jsx("span", { className: cls.priceOff, children: off })] }));
});
