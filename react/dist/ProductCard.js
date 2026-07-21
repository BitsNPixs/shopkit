import { jsx as _jsx } from "react/jsx-runtime";
// PRODUCT CARD — compound wrappers mirroring the CSS structure. Each part is a
// thin forwardRef component emitting one `.sk-product-card*` class from the
// contract; no styling lives here. Compose root + parts to match the markup.
import { forwardRef } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
export const ProductCard = forwardRef(function ProductCard({ variant, className, children, ...rest }, ref) {
    return (_jsx("article", { ref: ref, className: cx(cls.card, variant && cls.cardVariant[variant], className), ...rest, children: children }));
});
export const ProductCardMedia = forwardRef(function ProductCardMedia({ className, children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, className: cx(cls.cardMedia, className), ...rest, children: children }));
});
export const ProductCardImg = forwardRef(function ProductCardImg({ className, ...rest }, ref) {
    return _jsx("img", { ref: ref, className: cx(cls.cardImg, className), ...rest });
});
export const ProductCardBadges = forwardRef(function ProductCardBadges({ className, children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, className: cx(cls.cardBadges, className), ...rest, children: children }));
});
export const ProductCardWishlist = forwardRef(function ProductCardWishlist({ className, children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, className: cx(cls.cardWishlist, className), ...rest, children: children }));
});
export const ProductCardBody = forwardRef(function ProductCardBody({ className, children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, className: cx(cls.cardBody, className), ...rest, children: children }));
});
export const ProductCardEyebrow = forwardRef(function ProductCardEyebrow({ className, children, ...rest }, ref) {
    return (_jsx("p", { ref: ref, className: cx(cls.cardEyebrow, className), ...rest, children: children }));
});
export const ProductCardTitle = forwardRef(function ProductCardTitle({ className, children, ...rest }, ref) {
    return (_jsx("h3", { ref: ref, className: cx(cls.cardTitle, className), ...rest, children: children }));
});
export const ProductCardLink = forwardRef(function ProductCardLink({ className, children, ...rest }, ref) {
    return (_jsx("a", { ref: ref, className: cx(cls.cardLink, className), ...rest, children: children }));
});
export const ProductCardMeta = forwardRef(function ProductCardMeta({ className, children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, className: cx(cls.cardMeta, className), ...rest, children: children }));
});
export const ProductCardActions = forwardRef(function ProductCardActions({ className, children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, className: cx(cls.cardActions, className), ...rest, children: children }));
});
