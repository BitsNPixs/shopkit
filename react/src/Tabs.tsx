// TABS — ARIA tab pattern with roving tabindex. State (selected value) and
// keyboard nav live here; all visuals come from the `.sk-tabs*` / `.sk-tab`
// classes. Supports controlled (`value`+`onValueChange`) and uncontrolled
// (`defaultValue`) usage.
import { forwardRef, useRef, useState, useId, useCallback, createContext, useContext } from "react";
import type { HTMLAttributes, KeyboardEvent } from "react";
import { cls } from "./classes.js";
import { cx } from "./cx.js";

interface TabsContextValue {
  selected: string | undefined;
  setSelected: (v: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`<${component}> must be used inside <Tabs>.`);
  return ctx;
}

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

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  pill,
  className,
  children,
  ...rest
}: TabsProps) {
  const baseId = useId();
  const [internal, setInternal] = useState<string | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;

  const setSelected = useCallback(
    (v: string) => {
      if (!isControlled) setInternal(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange],
  );

  return (
    <TabsContext.Provider value={{ selected, setSelected, baseId }}>
      <div className={cx(cls.tabs, pill && cls.tabsPill, className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, children, onKeyDown, ...rest },
  _ref,
) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      const list = listRef.current;
      if (!list) return;
      const tabs = Array.from(
        list.querySelectorAll<HTMLElement>('[role="tab"]'),
      ).filter((t) => !t.hasAttribute("disabled"));
      if (tabs.length === 0) return;
      const current = document.activeElement as HTMLElement | null;
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
    },
    [onKeyDown],
  );

  return (
    <div
      ref={listRef}
      role="tablist"
      className={cx(cls.tabsList, className)}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </div>
  );
});

export interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, "id"> {
  /** Unique value identifying this tab / its panel. */
  value: string;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, className, children, onClick, ...rest },
  ref,
) {
  const ctx = useTabsContext("Tab");
  const selected = ctx.selected === value;
  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      id={`${ctx.baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${ctx.baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      className={cx(cls.tab, className)}
      onClick={(e) => {
        onClick?.(e);
        ctx.setSelected(value);
      }}
      {...rest}
    >
      {children}
    </button>
  );
});

export interface TabsPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
  /** Value of the tab that controls this panel. */
  value: string;
}

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel(
  { value, className, children, ...rest },
  ref,
) {
  const ctx = useTabsContext("TabsPanel");
  const selected = ctx.selected === value;
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${ctx.baseId}-panel-${value}`}
      aria-labelledby={`${ctx.baseId}-tab-${value}`}
      hidden={!selected}
      tabIndex={0}
      className={cx(cls.tabsPanel, className)}
      {...rest}
    >
      {children}
    </div>
  );
});
