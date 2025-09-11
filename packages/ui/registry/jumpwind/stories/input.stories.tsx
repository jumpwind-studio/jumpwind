import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import { expect, userEvent } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "@/registry/jumpwind/ui/button";
import { Input } from "@/registry/jumpwind/ui/input";
import { Label } from "@/registry/jumpwind/ui/label";

type InputStoryComponent = Component<
  PickPartial<ComponentProps<typeof Input>, "children">
>;

/**
 * Displays a form input field or a component that looks like an input field.
 */
const meta = {
  title: "@jumpwind/ui/Input",
  component: Input as InputStoryComponent,
  argTypes: {},
  args: {
    class: "w-96",
    type: "email",
    placeholder: "Email",
    disabled: false,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<InputStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the input field.
 */
export const Default = {} satisfies Story;

/**
 * Use the `disabled` prop to make the input non-interactive and appears faded,
 * indicating that input is not currently accepted.
 */
export const Disabled = {
  args: { disabled: true },
} satisfies Story;

/**
 * Use the `Label` component to includes a clear, descriptive label above or
 * alongside the input area to guide users.
 */
export const WithLabel = {
  render: (args) => (
    <div class="grid items-center gap-1.5">
      <Label for="email">{args.placeholder}</Label>
      <Input {...args} id="email" />
    </div>
  ),
} satisfies Story;

/**
 * Use a text element below the input field to provide additional instructions
 * or information to users.
 */
export const WithHelperText = {
  render: (args) => (
    <div class="grid items-center gap-1.5">
      <Label for="email-2">{args.placeholder}</Label>
      <Input {...args} id="email-2" />
      <p class="text-foreground/60 text-sm">Enter your email address.</p>
    </div>
  ),
} satisfies Story;

/**
 * Use the `Button` component to indicate that the input field can be submitted
 * or used to trigger an action.
 */
export const WithButton = {
  render: (args) => (
    <div class="flex items-center space-x-2">
      <Input {...args} />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
} satisfies Story;

export const ShouldEnterText = {
  name: "when user enters text, should see it in the input field",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, step }) => {
    const input = await canvas.findByPlaceholderText(/email/i);
    const mockedInput = "mocked@shadcn.com";

    await step("focus and type into the input field", async () => {
      await userEvent.click(input);
      await userEvent.type(input, mockedInput);
    });

    expect(input).toHaveValue(mockedInput);
  },
} satisfies Story;
