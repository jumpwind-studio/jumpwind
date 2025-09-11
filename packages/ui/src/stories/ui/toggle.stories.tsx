import type { PickPartial } from "@jumpwind/utils";
import BoldIcon from "lucide-solid/icons/bold";
import ItalicIcon from "lucide-solid/icons/italic";
import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Toggle } from "../../ui/toggle.jsx";

type ToggleStoryComponent = Component<
  PickPartial<ComponentProps<typeof Toggle>, "children">
>;

/**
 * A two-state button that can be either on or off.
 */
const meta = {
  title: "@jumpwind/ui/Toggle",
  component: Toggle as ToggleStoryComponent,
  argTypes: {
    children: {
      control: { disable: true },
    },
  },
  args: {
    children: <BoldIcon class="h-4 w-4" />,
    "aria-label": "Toggle bold",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<ToggleStoryComponent>;

export default meta;

type Story = StoryObj<typeof Toggle>;

/**
 * The default form of the toggle.
 */
export const Default: Story = {};

/**
 * Use the `outline` variant for a distinct outline, emphasizing the boundary
 * of the selection circle for clearer visibility
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: <ItalicIcon class="h-4 w-4" />,
    "aria-label": "Toggle italic",
  },
};

/**
 * Use the text element to add a label to the toggle.
 */
export const WithText: Story = {
  render: (args) => (
    <Toggle {...args}>
      <ItalicIcon class="mr-2 h-4 w-4" />
      Italic
    </Toggle>
  ),
  args: { ...Outline.args },
};

/**
 * Use the `sm` size for a smaller toggle, suitable for interfaces needing
 * compact elements without sacrificing usability.
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Use the `lg` size for a larger toggle, offering better visibility and
 * easier interaction for users.
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Add the `disabled` prop to prevent interactions with the toggle.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
