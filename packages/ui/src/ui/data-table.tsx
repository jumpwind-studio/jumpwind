import { isFunction } from "@corvu/utils";
import createOnce from "@corvu/utils/create/once";
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type Table as TanstackTable,
  type VisibilityState,
} from "@tanstack/solid-table";
import ArrowDownIcon from "lucide-solid/icons/arrow-down";
import ArrowUpIcon from "lucide-solid/icons/arrow-up";
import ChevronLeftIcon from "lucide-solid/icons/chevron-left";
import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import ChevronsLeftIcon from "lucide-solid/icons/chevrons-left";
import ChevronsRightIcon from "lucide-solid/icons/chevrons-right";
import ChevronsUpDownIcon from "lucide-solid/icons/chevrons-up-down";
import EyeOffIcon from "lucide-solid/icons/eye-off";
import Settings2Icon from "lucide-solid/icons/settings-2";
import {
  type Accessor,
  type ComponentProps,
  createContext,
  createSignal,
  For,
  type JSX,
  Match,
  Show,
  Switch,
  splitProps,
  untrack,
  useContext,
} from "solid-js";
import { cn } from "../lib/utils.js";
import { Button } from "./button.jsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select.js";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table.jsx";

interface DataTableContextValue<TData> {
  table: TanstackTable<TData>;
}

export const DataTableContext = createContext<DataTableContextValue<any>>();

export function useDataTable<TData>() {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error("useDataTable must be used within a DataTable");
  }
  return context as DataTableContextValue<TData>;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Accessor<TData[] | undefined>;
  /** @hidden */
  children:
    | JSX.Element
    | ((props: DataTableChildrenProps<TData>) => JSX.Element);
}

export interface DataTableChildrenProps<TData> {
  table: TanstackTable<TData>;
}

function DataTableProvider<TData, TValue>(
  props: DataTableProps<TData, TValue>,
) {
  const [local, rest] = splitProps(props, ["columns", "data", "children"]);

  const [sorting, setSorting] = createSignal<SortingState>([]);
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] = createSignal<VisibilityState>(
    {},
  );
  const [rowSelection, setRowSelection] = createSignal({});

  const table = createSolidTable<TData>({
    get data() {
      return local.data() || [];
    },
    columns: local.columns,
    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      get columnFilters() {
        return columnFilters();
      },
      get columnVisibility() {
        return columnVisibility();
      },
      get rowSelection() {
        return rowSelection();
      },
      get sorting() {
        return sorting();
      },
    },
  });

  const childrenProps: DataTableChildrenProps<TData> = {
    table,
  };

  const memoizedChildren = createOnce(() => local.children);
  const resolveChildren = () => {
    const children = memoizedChildren()();
    if (isFunction(children)) {
      return children(childrenProps);
    }
    return children;
  };

  return (
    <DataTableContext.Provider data-slot="data-table-root" value={{ table }}>
      {untrack(() => resolveChildren())}
    </DataTableContext.Provider>
  );
}

function DataTableRoot(props: ComponentProps<typeof Table>) {
  return (
    <div class="overflow-hidden rounded-md border">
      <Table data-class="data-table-root" {...props} />
    </div>
  );
}

function DataTableHeader<TData>(
  props: ComponentProps<typeof TableHeader> & { table?: TanstackTable<TData> },
) {
  const [local, rest] = splitProps(props, ["class", "table"]);

  const dataTable = useDataTable<TData>();
  const table = () => (local?.table ? local.table : dataTable.table);

  return (
    <TableHeader
      data-slot="data-table-header"
      class={cn(local.class)}
      {...rest}
    >
      <For each={table().getHeaderGroups()}>
        {(headerGroup) => (
          <TableRow>
            <For each={headerGroup.headers}>
              {(header) => (
                <TableHead>
                  <Show when={!header.isPlaceholder}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </Show>
                </TableHead>
              )}
            </For>
          </TableRow>
        )}
      </For>
    </TableHeader>
  );
}

function DataTableBody<TData>(props: ComponentProps<typeof TableBody>) {
  const [local, rest] = splitProps(props, ["class"]);

  const { table } = useDataTable<TData>();

  return (
    <TableBody data-slot="data-table-body" class={local.class} {...rest}>
      <For
        each={table.getRowModel().rows}
        fallback={
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        }
      >
        {(row) => (
          <TableRow
            bool:data-selected={row.getIsSelected()}
            data-state={row.getIsSelected() && "selected"}
          >
            <For each={row.getVisibleCells()}>
              {(cell) => (
                <TableCell>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              )}
            </For>
          </TableRow>
        )}
      </For>
    </TableBody>
  );
}

function DataTableFooter(props: ComponentProps<typeof TableFooter>) {
  return <TableFooter data-slot="data-table-footer" {...props} />;
}

function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  return (
    <DataTableRoot {...props}>
      <DataTableHeader />
      <DataTableBody />
    </DataTableRoot>
  );
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends ComponentProps<"div"> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>(
  props: DataTableColumnHeaderProps<TData, TValue>,
) {
  const [local, rest] = splitProps(props, ["class", "column", "title"]);

  return (
    <Show
      when={local.column.getCanSort()}
      fallback={<div class={cn(local.class)}>{local.title}</div>}
    >
      <div class={cn("flex items-center gap-2", local.class)} {...rest}>
        <DropdownMenu data-slot="data-table-header" placement="top-start">
          <DropdownMenuTrigger
            as={Button}
            variant="ghost"
            size="sm"
            class="-ml-3 h-8 data-expanded:bg-accent"
          >
            <span>{local.title}</span>
            <Switch fallback={<ChevronsUpDownIcon class="size-3.5" />}>
              <Match when={local.column.getIsSorted() === "desc"}>
                <ArrowDownIcon class="size-3.5" />
              </Match>
              <Match when={local.column.getIsSorted() === "asc"}>
                <ArrowUpIcon class="size-3.5" />
              </Match>
            </Switch>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => local.column.toggleSorting(false)}>
              <ArrowUpIcon class="mr-2 size-3.5" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => local.column.toggleSorting(true)}>
              <ArrowDownIcon class="mr-2 size-3.5" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => local.column.toggleVisibility(false)}
            >
              <EyeOffIcon class="mr-2 size-3.5" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Show>
  );
}

function DataTablePagination<TData>(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  const { table } = useDataTable<TData>();

  return (
    <div
      class={cn("flex items-center justify-between px-2", local.class)}
      {...rest}
    >
      <div class="flex-1 text-muted-foreground text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div class="flex items-center space-x-6 lg:space-x-8">
        <div class="flex items-center space-x-2">
          <p class="font-medium text-sm">Rows per page</p>
          <Select
            options={["10", "20", "25", "30", "40", "50"]}
            value={`${table.getState().pagination.pageSize}`}
            placeholder={table.getState().pagination.pageSize}
            onChange={(value) => table.setPageSize(Number(value))}
            itemComponent={(props) => (
              <SelectItem value={`${props.item.rawValue}`} {...props}>
                {props.item.textValue}
              </SelectItem>
            )}
          >
            <SelectTrigger class="h-8 w-[70px]">
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent side="top" />
          </Select>
        </div>
        <div class="flex w-[100px] items-center justify-center font-medium text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div class="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            class="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span class="sr-only">Go to first page</span>
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            class="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span class="sr-only">Go to previous page</span>
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            class="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span class="sr-only">Go to next page</span>
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            class="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span class="sr-only">Go to last page</span>
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

function DataTableViewOptions<TData>(
  props: ComponentProps<typeof DropdownMenu>,
) {
  const { table } = useDataTable<TData>();

  return (
    <DropdownMenu
      data-slot="data-table-view-options"
      placement="top-end"
      {...props}
    >
      <DropdownMenuTrigger
        as={Button}
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex"
      >
        <Settings2Icon />
        View
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <For
          each={table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide(),
            )}
        >
          {(column) => (
            <DropdownMenuCheckboxItem
              class="capitalize"
              checked={column.getIsVisible()}
              onChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          )}
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export {
  DataTableProvider,
  DataTable,
  DataTableRoot,
  DataTableBody,
  DataTableHeader,
  DataTableFooter,
  DataTablePagination,
  DataTableViewOptions,
};
