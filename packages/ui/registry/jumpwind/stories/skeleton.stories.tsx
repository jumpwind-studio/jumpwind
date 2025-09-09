import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Skeleton } from "@/registry/jumpwind/ui/skeleton";

/**
 * Use to show a placeholder while content is loading.
 */
const meta = {
  title: "@jumpwind/ui/Skeleton",
  component: Skeleton,
  argTypes: {},
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Skeleton>;

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
