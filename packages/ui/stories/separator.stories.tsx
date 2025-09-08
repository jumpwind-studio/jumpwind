import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Separator } from "@/registry/jumpwind/ui/separator";

/**
 * Visually or semantically separates content.
 */
const meta = {
  title: "@jumpwind/ui/Separator",
  component: Separator,
  argTypes: {},
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A separator between horizontal items.
 */
export const Horizontal: Story = {
  render: () => (
    <div class="flex h-12 items-center justify-center gap-2">
      <div>Left</div>
      <Separator orientation="vertical" />
      <div>Right</div>
    </div>
  ),
};

/**
 * A separator between vertical items.
 */
export const Vertical: Story = {
  render: () => (
    <div class="flex flex-col items-center justify-center gap-2">
      <div>Top</div>
      <Separator orientation="horizontal" />
      <div>Bottom</div>
    </div>
  ),
};
