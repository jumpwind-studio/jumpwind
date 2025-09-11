import { For } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table.jsx";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
];

/**
 * Powerful table and datagrids built using TanStack Table.
 */
const meta = {
  title: "@jumpwind/ui/Table",
  component: Table,
  argTypes: {},
  render: (args) => (
    <Table {...args}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead class="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={invoices}>
          {(invoice) => (
            <TableRow>
              <TableCell class="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell class="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
    </Table>
  ),
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the table.
 */
export const Default: Story = {};
