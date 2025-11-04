import type { ColumnDef } from "@tanstack/solid-table";
import ChevronDownIcon from "lucide-solid/icons/chevron-down";
import MoreHorizontalIcon from "lucide-solid/icons/more-horizontal";
import { type Component, type ComponentProps, For } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "../../ui/button.jsx";
import {
  Checkbox,
  CheckboxControl,
  CheckboxInput,
} from "../../ui/checkbox.jsx";
import {
  type DataTable,
  DataTableBody,
  DataTableColumnHeader,
  DataTableHeader,
  DataTablePagination,
  DataTableProvider,
  DataTableRoot,
} from "../../ui/data-table.jsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu.tsx";
import { Input } from "../../ui/input.tsx";

type DataTableStoryComponent = Component<ComponentProps<typeof DataTable>>;

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        indeterminate={table.getIsSomePageRowsSelected()}
        aria-label="Select all"
      >
        <CheckboxInput />
        <CheckboxControl />
      </Checkbox>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      >
        <CheckboxInput />
        <CheckboxControl />
      </Checkbox>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div class="capitalize">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div class="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div class="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div class="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu placement="bottom-end">
          <DropdownMenuTrigger as={Button} variant="ghost" class="size-8 p-0">
            <span class="sr-only">Open menu</span>
            <MoreHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

/**
 * Used to display textual user input from keyboard.
 */
const meta: Meta<DataTableStoryComponent> = {
  title: "@jumpwind/ui/DataTable",
  component: DataTableRoot as DataTableStoryComponent,
  parameters: {
    layout: "padded",
  },
  render: () => (
    <DataTableProvider columns={columns} data={() => data}>
      {(props) => (
        <div class="flex flex-col gap-y-2">
          <div class="flex flex-row justify-start">
            <Input
              placeholder="Filter emails..."
              type="text"
              value={
                (props.table.getColumn("email")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                props.table
                  .getColumn("email")
                  ?.setFilterValue(event.target.value)
              }
              class="max-w-sm"
            />
            <DropdownMenu placement="bottom-end">
              <DropdownMenuTrigger
                as={Button}
                variant="outline"
                class="ml-auto"
              >
                Columns <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <For
                  each={props.table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())}
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
          </div>
          <DataTableRoot>
            <DataTableHeader />
            <DataTableBody />
          </DataTableRoot>
          <DataTablePagination class="mt-2" />
        </div>
      )}
    </DataTableProvider>
  ),
} satisfies Meta<DataTableStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  name: "Default",
};
