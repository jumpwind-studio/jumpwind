import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from "../../ui/resizable.jsx";

type ResizableStoryComponent = Component<
  PickPartial<ComponentProps<typeof Resizable>, "children">
>;

/**
 * Accessible resizable panel groups and layouts with keyboard support.
 */
const meta = {
  title: "@jumpwind/ui/Resizable",
  component: Resizable as ResizableStoryComponent,
  argTypes: {
    onLayout: {
      control: false,
    },
  },
  args: {
    onLayout: fn(),
    class: "max-w-md rounded-lg border md:min-w-[450px]",
    orientation: "horizontal",
    onSizesChange: fn(),
  },
  render: (args) => (
    <Resizable {...args}>
      <ResizablePanel initialSize={0.5}>
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <Resizable orientation="vertical">
          <ResizablePanel initialSize={0.25}>
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel initialSize={0.75}>
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </Resizable>
      </ResizablePanel>
    </Resizable>
  ),
} satisfies Meta<ResizableStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the resizable panel group.
 */
export const Default: Story = {};
