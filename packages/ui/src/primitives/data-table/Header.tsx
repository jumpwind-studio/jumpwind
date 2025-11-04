import type { ElementOf, Ref } from "@corvu/utils/dom";
import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import {
  createMemo,
  Index,
  type JSX,
  Show,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { TableHead, TableRow } from "../../ui/table.jsx";
import { useInternalDataTableContext } from "./context.js";

export type DataTableHeaderCorvuProps = {
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

export type DataTableHeaderSharedElementProps<
  T extends ValidComponent = "thead",
> = {
  ref: Ref<ElementOf<T>>;
  style: string | JSX.CSSProperties;
};

export type DataTableHeaderElementProps = DataTableHeaderSharedElementProps & {
  id: string;
  tabIndex: "-1";
  "aria-describedby": string | undefined;
  "aria-labelledby": string | undefined;
  "aria-modal": "true" | "false";
  "data-closed": "" | undefined;
  "data-open": "" | undefined;
  "data-corvu-data-table-content": "" | null;
};

export type DataTableHeaderProps<T extends ValidComponent = "thead"> =
  DataTableHeaderCorvuProps & Partial<DataTableHeaderSharedElementProps<T>>;

export function DataTableHeader<T extends ValidComponent = "thead">(
  props: DynamicProps<T, DataTableHeaderProps<T>>,
) {
  const [local, rest] = splitProps(props as DataTableHeaderProps, [
    "contextId",
  ]);

  const context = createMemo(() =>
    useInternalDataTableContext(local.contextId),
  );

  return (
    <Dynamic as="thead" {...rest}>
      <Index each={context().table().getHeaderGroups()}>
        {(headerGroup) => (
          <TableRow>
            <Index each={headerGroup().headers}>
              {(header) => (
                <TableHead>
                  <Show when={!header().isPlaceholder}>
                    <Dynamic
                      component={header().column.columnDef.header}
                      {...header().getContext()}
                    />
                  </Show>
                </TableHead>
              )}
            </Index>
          </TableRow>
        )}
      </Index>
    </Dynamic>
  );
}
