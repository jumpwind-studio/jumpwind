import type { ElementOf, Ref } from "@corvu/utils/dom";
import type { DynamicProps } from "@corvu/utils/dynamic";
import {
  createMemo,
  Index,
  type JSX,
  Show,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { TableCell, TableRow } from "../../ui/table.jsx";
import { useInternalDataTableContext } from "./context.js";

export type DataTableBodyCorvuProps = {
  /**
   * Whether the data table content should be forced to render. Useful when using third-party animation libraries.
   * @defaultValue `false`
   */
  forceMount?: boolean;
  /**
   * The `id` of the data table context to use.
   */
  contextId?: string;
};

export type DataTableBodySharedElementProps<
  T extends ValidComponent = "tbody",
> = {
  ref: Ref<ElementOf<T>>;
  style: string | JSX.CSSProperties;
};

export type DataTableBodyElementProps = DataTableBodySharedElementProps & {
  id: string;
  tabIndex: "-1";
  "aria-describedby": string | undefined;
  "aria-labelledby": string | undefined;
  "aria-modal": "true" | "false";
  "data-closed": "" | undefined;
  "data-open": "" | undefined;
  "data-corvu-data-table-content": "" | null;
};

export type DataTableBodyProps<T extends ValidComponent = "tbody"> =
  DataTableBodyCorvuProps & Partial<DataTableBodySharedElementProps<T>>;

function DataTableBody<T extends ValidComponent = "tbody">(
  props: DynamicProps<T, DataTableBodyProps<T>>,
) {
  const [local, rest] = splitProps(props as DataTableBodyProps, ["contextId"]);

  const context = createMemo(() =>
    useInternalDataTableContext(local.contextId),
  );

  return (
    <Dynamic as="tbody" {...rest}>
      <Index
        each={context().table().getRowModel().rows}
        fallback={
          <Show
            when={local.fallback}
            fallback={
              <TableRow>
                <TableCell
                  colSpan={context().table().getAllColumns().length}
                  class="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            }
          >
            {local.fallback}
          </Show>
        }
      >
        {(row) => (
          <TableRow
            bool:data-selected={row().getIsSelected()}
            data-state={row().getIsSelected() && "selected"}
          >
            <Index each={row().getVisibleCells()}>
              {(cell) => (
                <TableCell>
                  <Dynamic
                    component={cell().column.columnDef.cell}
                    {...cell().getContext()}
                  />
                </TableCell>
              )}
            </Index>
          </TableRow>
        )}
      </Index>
    </Dynamic>
  );
}
