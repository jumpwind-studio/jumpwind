import { isFunction } from "@corvu/utils";
import createControllableSignal from "@corvu/utils/create/controllableSignal";
import createOnce from "@corvu/utils/create/once";
import type { RowData, Table as TanstackTable } from "@tanstack/solid-table";
import {
  type ComponentProps,
  createMemo,
  createUniqueId,
  type JSX,
  mergeProps,
  splitProps,
  untrack,
} from "solid-js";
import { cn } from "../../lib/utils.js";
import { Table, TableFooter } from "../../ui/table.jsx";
import {
  createDataTableContext,
  createInternalDataTableContext,
} from "./context.js";

export type DataTableRootProps<TData extends RowData> = {
  /**
   * The data table.
   */
  table: TanstackTable<TData>;
  /**
   * The selected rows of the data table.
   */
  selected?: string[];
  /**
   * Callback fired when the selected rows change.
   */
  onSelectedChange?: (id: string[]) => void;
  /**
   * The selected rows initially.
   * @defaultValue `[]`
   */
  initialSelected?: string[];
  /**
   * The `id` of the data table context. Useful if you have nested data tables and want to create components that belong to a data table higher up in the tree.
   */
  contextId?: string;
  /** @hidden */
  children:
    | JSX.Element
    | ((props: DataTableChildrenProps<TData>) => JSX.Element);
};

export interface DataTableChildrenProps<TData extends RowData> {
  table: TanstackTable<TData>;
}

function DataTableRoot<TData extends RowData>(
  props: DataTableRootProps<TData>,
) {
  const defaultedProps = mergeProps(
    {
      dataTableId: createUniqueId(),
      initialSelected: [],
    },
    props,
  );

  const [selected, setSelected] = createControllableSignal({
    value: () => defaultedProps.selected,
    initialValue: defaultedProps.initialSelected,
    onChange: defaultedProps.onSelectedChange,
  });

  const childrenProps: DataTableChildrenProps<TData> = {
    get table() {
      return defaultedProps.table;
    },
  };

  const memoizedChildren = createOnce(() => defaultedProps.children);

  const resolveChildren = () => {
    const children = memoizedChildren()();
    if (isFunction(children)) {
      return children(childrenProps);
    }
    return children;
  };

  const memoizedDataTableRoot = createMemo(() => {
    const DataTableContext = createDataTableContext<TData>(
      defaultedProps.contextId,
    );
    const InternalDataTableContext = createInternalDataTableContext<TData>(
      defaultedProps.contextId,
    );

    return (
      <DataTableContext.Provider
        value={{
          table: () => defaultedProps.table,
          selected,
          setSelected,
        }}
      >
        <InternalDataTableContext.Provider
          value={{
            table: () => defaultedProps.table,
            selected,
            setSelected,
          }}
        >
          {untrack(() => resolveChildren())}
        </InternalDataTableContext.Provider>
      </DataTableContext.Provider>
    );
  });

  return memoizedDataTableRoot as unknown as JSX.Element;
}

function DataTableContent(props: ComponentProps<typeof Table>) {
  const [local, rest] = splitProps(props, ["class"]);

  return <Table data-class="data-table" class={cn(local.class)} {...rest} />;
}

function DataTableFooter(props: ComponentProps<typeof TableFooter>) {
  return <TableFooter data-slot="data-table-footer" {...props} />;
}

export { DataTableRoot, DataTableFooter };
