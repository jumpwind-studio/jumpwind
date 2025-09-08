import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "@/registry/jumpwind/ui/button";
import { Label } from "@/registry/jumpwind/ui/label";
import { Textarea } from "@/registry/jumpwind/ui/textarea";

/**
 * Displays a form textarea or a component that looks like a textarea.
 */
const meta = {
  title: "@jumpwind/ui/Textarea",
  component: Textarea,
  argTypes: {},
  args: {
    placeholder: "Type your message here.",
    disabled: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the textarea.
 */
export const Default: Story = {};

/**
 * Use the `disabled` prop to disable the textarea.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Use the `Label` component to includes a clear, descriptive label above or
 * alongside the text area to guide users.
 */
export const WithLabel: Story = {
  render: (args) => (
    <div class="grid w-full gap-1.5">
      <Label for="message">Your message</Label>
      <Textarea {...args} id="message" />
    </div>
  ),
};

/**
 * Use a text element below the text area to provide additional instructions
 * or information to users.
 */
export const WithText: Story = {
  render: (args) => (
    <div class="grid w-full gap-1.5">
      <Label for="message-2">Your Message</Label>
      <Textarea {...args} id="message-2" />
      <p class="text-sm text-slate-500">
        Your message will be copied to the support team.
      </p>
    </div>
  ),
};

/**
 * Use the `Button` component to indicate that the text area can be submitted
 * or used to trigger an action.
 */
export const WithButton: Story = {
  render: (args) => (
    <div class="grid w-full gap-2">
      <Textarea {...args} />
      <Button type="submit">Send Message</Button>
    </div>
  ),
};
