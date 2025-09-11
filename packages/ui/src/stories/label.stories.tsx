import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Label } from "@/registry/jumpwind/ui/label";

/**
 * Renders an accessible label associated with controls.
 */
const meta = {
  title: "@jumpwind/ui/Label",
  component: Label,
  argTypes: {
    children: {
      control: { type: "text" },
    },
  },
  args: {
    children: "Your email address",
    for: "email",
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof Label>;

/**
 * The default form of the label.
 */
export const Default: Story = {};
