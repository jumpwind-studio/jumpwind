import InfoIcon from "lucide-solid/icons/info";
import { expect, userEvent } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
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
    class: "w-96",
    disabled: false,
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger class="flex gap-2">
        <h3 class="font-semibold">Can I use this in my project?</h3>
        <InfoIcon class="size-6" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects. No attribution
        required.
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
