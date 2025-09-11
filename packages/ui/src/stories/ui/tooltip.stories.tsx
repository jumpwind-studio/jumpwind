import type { PickPartial } from "@jumpwind/utils";
import PlusIcon from "lucide-solid/icons/plus";
import type { Component, ComponentProps } from "solid-js";
import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../ui/tooltip.jsx"

type TooltipStoryComponent = Component<
  PickPartial<ComponentProps<typeof Tooltip>, "children">
>;

/**
 * A popup that displays information related to an element when the element
 * receives keyboard focus or the mouse hovers over it.
 */
const meta = {
  title: "@jumpwind/ui/Tooltip",
  component: Tooltip as TooltipStoryComponent,
  argTypes: {
    placement: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "radio",
      },
    },
    children: {
      control: "text",
    },
  },
  args: {
    placement: "top",
    children: "Add to library",
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger>
        <PlusIcon class="size-4" />
        <span class="sr-only">Add</span>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
} satisfies Meta<TooltipStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the tooltip.
 */
export const Default: Story = {};

/**
 * Use the `bottom` placement to display the tooltip below the element.
 */
export const Bottom: Story = {
  args: {
    placement: "bottom",
  },
};

/**
 * Use the `left` placement to display the tooltip to the left of the element.
 */
export const Left: Story = {
  args: {
    placement: "left",
  },
};

/**
 * Use the `right` placement to display the tooltip to the right of the element.
 */
export const Right: Story = {
  args: {
    placement: "right",
  },
};

export const ShouldShowOnHover: Story = {
  name: "when hovering over trigger, should show hover tooltip content",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);
    const triggerBtn = await canvasBody.findByRole("button", { name: /add/i });

    await step("hover over trigger", async () => {
      await userEvent.hover(triggerBtn);
      await waitFor(() =>
        expect(
          canvasElement.ownerDocument.body.querySelector(
            '[data-slot="tooltip-content"]',
          ),
        ).toBeVisible(),
      );
    });

    await step("unhover trigger", async () => {
      await userEvent.unhover(triggerBtn);
      await waitFor(() =>
        expect(
          canvasElement.ownerDocument.body.querySelector(
            '[data-slot="tooltip-content"]',
          ),
        ).not.toBeVisible(),
      );
    });
  },
};
