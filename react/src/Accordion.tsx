// ACCORDION — thin wrappers over native <details>/<summary>. Open/close is the
// browser's own disclosure behaviour; this file only emits the `.sk-accordion*`
// classes and passes `open`/`name`/`onToggle` straight through to <details>.
import { forwardRef } from "react";
import type { HTMLAttributes, DetailsHTMLAttributes } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

export const Accordion = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Accordion({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cx(cls.accordion, className)} {...rest}>
        {children}
      </div>
    );
  },
);

export const AccordionItem = forwardRef<
  HTMLDetailsElement,
  DetailsHTMLAttributes<HTMLDetailsElement>
>(function AccordionItem({ className, children, ...rest }, ref) {
  // `open`, `name` (exclusive-accordion grouping) and `onToggle` flow via rest.
  return (
    <details ref={ref} className={cx(cls.accordionItem, className)} {...rest}>
      {children}
    </details>
  );
});

export const AccordionTrigger = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function AccordionTrigger({ className, children, ...rest }, ref) {
    return (
      <summary ref={ref} className={cx(cls.accordionTrigger, className)} {...rest}>
        {children}
        <span className={cls.accordionMarker} aria-hidden="true" />
      </summary>
    );
  },
);

export const AccordionPanel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AccordionPanel({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cx(cls.accordionPanel, className)} {...rest}>
        {children}
      </div>
    );
  },
);
