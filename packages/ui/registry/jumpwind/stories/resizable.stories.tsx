import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/jumpwind/ui/resizable";

/**
 * Accessible resizable panel groups and layouts with keyboard support.
 */
const meta: Meta<typeof ResizablePanelGroup> = {
  title: "@jumpwind/ui/ResizablePanelGroup",
  component: ResizablePanelGroup,
  argTypes: {
    onLayout: {
      control: false,
    },
  },
  args: {
    // onLayout: fn(),
    class: "max-w-96 rounded-lg border",
    direction: "horizontal",
  },
  render: (args) => (
    <ResizablePanelGroup {...args}>
      <ResizablePanel initialSize={0.5}>
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel initialSize={0.5}>
        <ResizablePanelGroup orientation="vertical">
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
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the resizable panel group.
 */
export const Default: Story = {};
