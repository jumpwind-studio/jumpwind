import {
  createKeyedContext,
  useKeyedContext,
} from "@corvu/utils/create/keyedContext";
import type { RowData, Table as TanstackTable } from "@tanstack/solid-table";
import {
  type Accessor,
  createContext,
  type Setter,
  useContext,
} from "solid-js";

export interface DataTableContextValue<TData extends RowData = unknown> {
  table: Accessor<TanstackTable<TData>>;
  /** The selected rows of the data table. */
  selected: Accessor<string[]>;
  /** Callback fired when the selected rows change. */
  setSelected: Setter<string[]>;
}

const DataTableContext = createContext<DataTableContextValue<any>>();

export const createDataTableContext = <TData extends RowData = unknown>(
  contextId?: string,
) => {
  if (contextId === undefined) return DataTableContext;

  const context = createKeyedContext<DataTableContextValue<TData>>(
    `dataTable-${contextId}`,
  );
  return context;
};

/** Context which exposes various properties to interact with the dataTable. Optionally provide a contextId to access a keyed context. */
export const useDataTableContext = <TData extends RowData = unknown>(
  contextId?: string,
) => {
  if (contextId === undefined) {
    const context = useContext<DataTableContextValue<TData> | undefined>(
      DataTableContext,
    );
    if (!context) {
      throw new Error("useDataTable must be used within a DataTable");
    }
    return context;
  }

  const context = useKeyedContext<DataTableContextValue<TData>>(
    `dataTable-${contextId}`,
  );
  if (!context) {
    throw new Error(
      `useDataTable with id ${contextId} must be used within a DataTable`,
    );
  }
  return context;
};

export type InternalDataTableContextValue<TData extends RowData = unknown> =
  DataTableContextValue<TData>;

const InternalDataTableContext =
  createContext<InternalDataTableContextValue<any>>();

export const createInternalDataTableContext = <TData extends RowData = unknown>(
  contextId?: string,
) => {
  if (contextId === undefined) return InternalDataTableContext;

  const context = createKeyedContext<InternalDataTableContextValue<TData>>(
    `dataTable-internal-${contextId}`,
  );
  return context;
};

/** Context which exposes various properties to interact with the dataTable. Optionally provide a contextId to access a keyed context. */
export const useInternalDataTableContext = <TData extends RowData = unknown>(
  contextId?: string,
) => {
  if (contextId === undefined) {
    const context = useContext<
      InternalDataTableContextValue<TData> | undefined
    >(InternalDataTableContext);
    if (!context) {
      throw new Error(
        "[corvu]: DataTable context not found. Make sure to wrap DataTable components in <DataTable.Root>",
      );
    }
    return context;
  }

  const context = useKeyedContext<InternalDataTableContextValue<TData>>(
    `dataTable-internal-${contextId}`,
  );
  if (!context) {
    throw new Error(
      `[corvu]: DataTable context with id "${contextId}" not found. Make sure to wrap DataTable components in <DataTable.Root contextId="${contextId}">`,
    );
  }
  return context;
};
