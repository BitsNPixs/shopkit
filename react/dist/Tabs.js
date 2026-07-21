import { jsx as _jsx } from "react/jsx-runtime";
// TABS — ARIA tab pattern with roving tabindex. State (selected value) and
// keyboard nav live here; all visuals come from the `.sk-tabs*` / `.sk-tab`
// classes. Supports controlled (`value`+`onValueChange`) and uncontrolled
// (`defaultValue`) usage.
import { forwardRef, useRef, useState, useId, useCallback, createContext, useContext } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";
const TabsContext = createContext(null);
function useTabsContext(component) {
    const ctx = useContext(TabsContext);
    if (!ctx)
        throw new Error(`<${component}> must be used inside <Tabs>.`);
    return ctx;
}
export function Tabs({ value, defaultValue, onValueChange, pill, className, children, ...rest }) {
    const baseId = useId();
    const [internal, setInternal] = useState(defaultValue);
    const isControlled = value !== undefined;
    const selected = isControlled ? value : internal;
    const setSelected = useCallback((v) => {
        if (!isControlled)
            setInternal(v);
        onValueChange?.(v);
    }, [isControlled, onValueChange]);
    return (_jsx(TabsContext.Provider, { value: { selected, setSelected, baseId }, children: _jsx("div", { className: cx(cls.tabs, pill && cls.tabsPill, className), ...rest, children: children }) }));
}
export const TabsList = forwardRef(function TabsList({ className, children, onKeyDown, ...rest }, _ref) {
    const listRef = useRef(null);
    const handleKeyDown = useCallback((e) => {
        onKeyDown?.(e);
        const list = listRef.current;
        if (!list)
            return;
        const tabs = Array.from(list.querySelectorAll('[role="tab"]')).filter((t) => !t.hasAttribute("disabled"));
        if (tabs.length === 0)
            return;
        const current = document.activeElement;
        const idx = current ? tabs.indexOf(current) : -1;
        let next = -1;
        switch (e.key) {
            case "ArrowRight":
                next = idx < 0 ? 0 : (idx + 1) % tabs.length;
                break;
            case "ArrowLeft":
                next = idx < 0 ? 0 : (idx - 1 + tabs.length) % tabs.length;
                break;
            case "Home":
                next = 0;
                break;
            case "End":
                next = tabs.length - 1;
                break;
            default:
                return;
        }
        e.preventDefault();
        const target = tabs[next];
        target.focus();
        target.click();
    }, [onKeyDown]);
    return (_jsx("div", { ref: listRef, role: "tablist", className: cx(cls.tabsList, className), onKeyDown: handleKeyDown, ...rest, children: children }));
});
export const Tab = forwardRef(function Tab({ value, className, children, onClick, ...rest }, ref) {
    const ctx = useTabsContext("Tab");
    const selected = ctx.selected === value;
    return (_jsx("button", { ref: ref, role: "tab", type: "button", id: `${ctx.baseId}-tab-${value}`, "aria-selected": selected, "aria-controls": `${ctx.baseId}-panel-${value}`, tabIndex: selected ? 0 : -1, className: cx(cls.tab, className), onClick: (e) => {
            onClick?.(e);
            ctx.setSelected(value);
        }, ...rest, children: children }));
});
export const TabsPanel = forwardRef(function TabsPanel({ value, className, children, ...rest }, ref) {
    const ctx = useTabsContext("TabsPanel");
    const selected = ctx.selected === value;
    return (_jsx("div", { ref: ref, role: "tabpanel", id: `${ctx.baseId}-panel-${value}`, "aria-labelledby": `${ctx.baseId}-tab-${value}`, hidden: !selected, tabIndex: 0, className: cx(cls.tabsPanel, className), ...rest, children: children }));
});
