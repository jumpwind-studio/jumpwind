import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Separator } from "../../ui/separator.jsx"

type SeparatorStoryComponent = Component<
  PickPartial<ComponentProps<typeof Separator>, "children">
>;

/**
 * Visually or semantically separates content.
 */
const meta = {
  title: "@jumpwind/ui/Separator",
  component: Separator as SeparatorStoryComponent,
  argTypes: {},
} satisfies Meta<SeparatorStoryComponent>;

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
