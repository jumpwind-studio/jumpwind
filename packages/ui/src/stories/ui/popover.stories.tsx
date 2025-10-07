import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "../../ui/button.jsx";
import { Input } from "../../ui/input.jsx";
import { Label } from "../../ui/label.jsx";
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
  parameters: {
    layout: "centered",
  },
  render: (_args) => (
    <Popover>
      <PopoverTrigger as={Button} variant="outline">
        Open popover
      </PopoverTrigger>
      <PopoverContent class="w-80">
        <div class="grid gap-4">
          <div class="space-y-2">
            <h4 class="font-medium leading-none">Dimensions</h4>
            <p class="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div class="grid gap-2">
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="width">Width</Label>
              <Input id="width" value="100%" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="maxWidth">Max. width</Label>
              <Input id="maxWidth" value="300px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="height">Height</Label>
              <Input id="height" value="25px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="maxHeight">Max. height</Label>
              <Input id="maxHeight" value="none" class="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
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
