import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Skeleton } from "../../ui/skeleton.jsx";

type SkeletonStoryComponent = Component<
  PickPartial<ComponentProps<typeof Skeleton>, "children">
>;

/**
 * Use to show a placeholder while content is loading.
 */
const meta = {
  title: "@jumpwind/ui/Skeleton",
  component: Skeleton as SkeletonStoryComponent,
  argTypes: {},
  parameters: {
    layout: "centered",
  },
} satisfies Meta<SkeletonStoryComponent>;

export default meta;

type Story = StoryObj<typeof Skeleton>;

/**
 * The default form of the skeleton.
 */
export const Default: Story = {
  render: (args) => (
    <div class="flex items-center space-x-4">
      <Skeleton {...args} class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <Skeleton {...args} class="h-4 w-[250px]" />
        <Skeleton {...args} class="h-4 w-[200px]" />
      </div>
    </div>
  ),
};
