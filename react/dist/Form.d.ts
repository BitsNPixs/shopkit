import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, LabelHTMLAttributes, HTMLAttributes, FieldsetHTMLAttributes } from "react";
import { cls } from "./classes.js";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    /** Size on the shared control scale. Omit for the base (medium) size. */
    size?: keyof typeof cls.inputSize;
}
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
export declare const Textarea: import("react").ForwardRefExoticComponent<TextareaHTMLAttributes<HTMLTextAreaElement> & import("react").RefAttributes<HTMLTextAreaElement>>;
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
    /** Size on the shared control scale. Omit for the base (medium) size. */
    size?: keyof typeof cls.selectSize;
}
export declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLSelectElement>>;
export declare const Checkbox: import("react").ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & import("react").RefAttributes<HTMLInputElement>>;
export declare const Radio: import("react").ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & import("react").RefAttributes<HTMLInputElement>>;
export declare const Switch: import("react").ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & import("react").RefAttributes<HTMLInputElement>>;
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    /** Appends a required-marker asterisk after the label text. */
    required?: boolean;
}
export declare const Label: import("react").ForwardRefExoticComponent<LabelProps & import("react").RefAttributes<HTMLLabelElement>>;
export declare const Check: import("react").ForwardRefExoticComponent<LabelHTMLAttributes<HTMLLabelElement> & import("react").RefAttributes<HTMLLabelElement>>;
export declare const Field: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export declare const FieldHelp: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & import("react").RefAttributes<HTMLSpanElement>>;
export declare const FieldError: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & import("react").RefAttributes<HTMLSpanElement>>;
export declare const Fieldset: import("react").ForwardRefExoticComponent<FieldsetHTMLAttributes<HTMLFieldSetElement> & import("react").RefAttributes<HTMLFieldSetElement>>;
export declare const Legend: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLLegendElement> & import("react").RefAttributes<HTMLLegendElement>>;
