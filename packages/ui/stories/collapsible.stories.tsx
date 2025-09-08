import ChevronsUpDown from "lucide-solid/icons/chevrons-up-down";
import { expect, userEvent } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "@/registry/jumpwind/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/jumpwind/ui/collapsible";

/**
 * An interactive component which expands/collapses a panel.
 */
const meta = {
  title: "@jumpwind/ui/Collapsible",
  component: Collapsible,
  argTypes: {},
  args: {
    class: "flex w-[350px] flex-col gap-2",
    disabled: false,
  },
  render: (args) => (
    <Collapsible {...args}>
      <div class="flex items-center justify-between gap-4 px-4">
        <h4 class="text-sm font-semibold">@jumpwind starred 3 repositories</h4>
        <CollapsibleTrigger
          as={Button}
          variant="ghost"
          size="icon"
          class="size-8"
        >
          <ChevronsUpDown />
          <span class="sr-only">Toggle</span>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent class="flex flex-col gap-2">
        <div class="rounded-md border px-4 py-2 font-mono text-sm">
          @kobalte/core
        </div>
        <div class="rounded-md border px-4 py-2 font-mono text-sm">
          @stitches/solid
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the collapsible.
 */
export const Default = {} satisfies Story;

/**
 * Use the `disabled` prop to disable the interaction.
 */
export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const ShouldOpenClose = {
  name: "when collapsable trigger is clicked, should show content",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, step }) => {
    const trigger = await canvas.findByRole("button");

    await step("Open the collapsible", async () => {
      await userEvent.click(trigger, { delay: 100 });
      expect(canvas.queryByText(/yes/i, { exact: true })).toBeVisible();
    });

    await step("Close the collapsible", async () => {
      await userEvent.click(trigger, { delay: 100 });
      expect(canvas.queryByText(/yes/i, { exact: true })).toBeNull();
    });
  },
} satisfies Story;
