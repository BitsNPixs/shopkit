import type { HTMLAttributes } from "react";
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** Controlled selected value. */
    value?: string;
    /** Initial value for uncontrolled usage. */
    defaultValue?: string;
    /** Fires when selection changes. */
    onValueChange?: (v: string) => void;
    /** Pill styling variant. */
    pill?: boolean;
}
export declare function Tabs({ value, defaultValue, onValueChange, pill, className, children, ...rest }: TabsProps): import("react").JSX.Element;
export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
}
export declare const TabsList: import("react").ForwardRefExoticComponent<TabsListProps & import("react").RefAttributes<HTMLDivElement>>;
export interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, "id"> {
    /** Unique value identifying this tab / its panel. */
    value: string;
}
export declare const Tab: import("react").ForwardRefExoticComponent<TabProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface TabsPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
    /** Value of the tab that controls this panel. */
    value: string;
}
export declare const TabsPanel: import("react").ForwardRefExoticComponent<TabsPanelProps & import("react").RefAttributes<HTMLDivElement>>;
