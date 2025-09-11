import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "../../ui/button.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover.jsx";

type PopoverStoryComponent = Component<
  PickPartial<ComponentProps<typeof Popover>, "children">
>;

/**
 * Displays rich content in a portal, triggered by a button.
 */
const meta = {
  title: "@jumpwind/ui/Popover",
  component: Popover as PopoverStoryComponent,
  argTypes: {},
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger as={Button} variant="outline">
        Open
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<PopoverStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the popover.
 */
export const Default: Story = {};

export const ShouldOpenClose: Story = {
  name: "when clicking the trigger, should open and close the popover",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("click the trigger to open the popover", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      expect(await canvasBody.findByRole("dialog")).toBeInTheDocument();
    });

    await step("click the trigger to close the popover", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      expect(await canvasBody.findByRole("dialog")).toHaveAttribute(
        "data-state",
        "closed",
      );
    });
  },
};
