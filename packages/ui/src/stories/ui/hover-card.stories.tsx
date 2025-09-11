import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card.jsx"

type HoverCardStoryComponent = Component<
  PickPartial<ComponentProps<typeof HoverCard>, "children">
>;

/**
 * For sighted users to preview content available behind a link.
 */
const meta = {
  title: "@jumpwind/ui/HoverCard",
  component: HoverCard as HoverCardStoryComponent,
  argTypes: {},
  args: {},
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger>Hover</HoverCardTrigger>
      <HoverCardContent>Solid-js</HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<HoverCardStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the hover card.
 */
export const Default = {} satisfies Story;

/**
 * Use the `openDelay` and `closeDelay` props to control the delay before the
 * hover card opens and closes.
 */
export const Instant = {
  args: {
    openDelay: 0,
    closeDelay: 0,
  },
} satisfies Story;

export const ShouldShowOnHover: Story = {
  name: "when hovering over trigger, should show hover card content",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("Hover over the trigger element", async () => {
      await userEvent.hover(await canvasBody.findByText(/hover/i));
      await waitFor(() =>
        expect(
          canvasElement.ownerDocument.body.querySelector(
            '[data-slot="hover-card-content"]',
          ),
        ).toBeVisible(),
      );
    });
    await step("Unhover the trigger element", async () => {
      await userEvent.unhover(await canvasBody.findByText(/hover/i));
      await waitFor(() =>
        expect(
          canvasElement.ownerDocument.body.querySelector(
            '[data-slot="hover-card-content"]',
          ),
        ).toBeNull(),
      );
    });
  },
} satisfies Story;
