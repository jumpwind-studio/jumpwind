import { For, splitProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { generateTokens } from "@/registry/jumpwind/stories/design/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table.jsx"

type Spacing = {
  name: string;
  value: number;
};

const SpacingRow = (props: Spacing) => {
  const [local] = splitProps(props, ["name", "value"]);
  const style = window.getComputedStyle(document.body);
  const size = () => style.getPropertyValue("--spacing");
  const rem = () => Number.parseFloat(size()) * local.value;
  const pixels = () => Number.parseFloat(size()) * 16 * local.value;

  return (
    <TableRow>
      <TableCell>{local.name}</TableCell>
      <TableCell>{rem()}rem</TableCell>
      <TableCell>{pixels()}px</TableCell>
      <TableCell class="w-full">
        <div class="border bg-muted">
          <div class="h-4 bg-primary" style={{ width: `${pixels()}px` }} />
        </div>
      </TableCell>
    </TableRow>
  );
};

/**
 * Spacing tokens for the design system
 */
const meta: Meta<{
  scale: Spacing[];
}> = {
  title: "@jumpwind/design/Spacing",
  argTypes: {},
  render: (args) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Pixels</TableHead>
          <TableHead class="hidden sm:table-cell">
            <span class="sr-only">Preview</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={args.scale}>
          {(scale) => <SpacingRow value={scale.value} name={scale.name} />}
        </For>
      </TableBody>
    </Table>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Spacing values used for padding, margins, and layout.
 */
export const Core: Story = {
  args: {
    scale: generateTokens(
      "",
      [
        1, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72,
        76, 80,
      ],
      { name: (value) => `x-${value}` },
    ),
  },
};
