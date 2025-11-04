import { dataIf } from "@corvu/utils";
import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import { some } from "@corvu/utils/reactivity";
import { createMemo, Show, splitProps, type ValidComponent } from "solid-js";
import { useInternalDataTableContext } from "./context.js";

export type DataTableRowCorvuProps = {
  id: string;
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

export type DataTableRowSharedElementProps<T extends ValidComponent = "tr"> =
  // biome-ignore lint/complexity/noBannedTypes: Required
  {};

export type DataTableRowElementProps = DataTableRowSharedElementProps & {
  "data-selected": "" | undefined;
  "data-corvu-data-table-row": "" | null;
};

export type DataTableRowProps<T extends ValidComponent = "tr"> =
  DataTableRowCorvuProps & Partial<DataTableRowSharedElementProps<T>>;

export function DataTableRow<T extends ValidComponent = "tr">(
  props: DynamicProps<T, DataTableRowProps<T>>,
) {
  const [local, rest] = splitProps(props as DataTableRowProps, [
    "id",
    "forceMount",
    "contextId",
  ]);

  const dataTableContext = createMemo(() =>
    useInternalDataTableContext(local.contextId),
  );

  const show = () => some(() => local.forceMount);

  const row = () => dataTableContext().table().getRow(local.id);

  return (
    <Show when={show()}>
      <Dynamic<DataTableRowElementProps>
        as="div"
        data-selected={dataIf(row().getIsSelected())}
        data-corvu-data-table-row=""
        {...rest}
      />
    </Show>
  );
}
