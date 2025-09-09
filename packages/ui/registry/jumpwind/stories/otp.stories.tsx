import type { PickPartial } from "@jumpwind/utils";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import type { Component, ComponentProps } from "solid-js";
import { expect, fn, userEvent } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Otp,
  OtpGroup,
  OtpSeparator,
  OtpSlot,
} from "@/registry/jumpwind/ui/input-otp";

type OtpStoryComponent = Component<
  PickPartial<ComponentProps<typeof Otp>, "children">
>;

/**
 * Accessible one-time password component with copy paste functionality.
 */
const meta = {
  title: "@jumpwind/ui/Otp",
  component: Otp as OtpStoryComponent,
  argTypes: {},
  args: {
    maxLength: 6,
    onChange: fn(),
    onComplete: fn(),
    children: null,
    "aria-label": "One-time password",
  },

  render: (args) => (
    <Otp {...args} render={undefined}>
      <OtpGroup>
        <OtpSlot index={0} />
        <OtpSlot index={1} />
        <OtpSlot index={2} />
        <OtpSlot index={3} />
        <OtpSlot index={4} />
        <OtpSlot index={5} />
      </OtpGroup>
    </Otp>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<OtpStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the Otp field.
 */
export const Default: Story = {};

/**
 * The number form of the Otp field.
 */
export const OnlyNumbers: Story = {
  args: {
    pattern: REGEXP_ONLY_DIGITS,
  },
};

/**
 * Use multiple groups to separate the input slots.
 */
export const SeparatedGroup: Story = {
  render: (args) => (
    <Otp {...args} render={undefined}>
      <OtpGroup>
        <OtpSlot index={0} />
        <OtpSlot index={1} />
        <OtpSlot index={2} />
      </OtpGroup>
      <OtpSeparator />
      <OtpGroup>
        <OtpSlot index={3} />
        <OtpSlot index={4} />
        <OtpSlot index={5} />
      </OtpGroup>
    </Otp>
  ),
};

export const ShouldEnterText: Story = {
  name: "when typing text, should call onChange and onComplete",
  tags: ["!dev", "!autodocs"],
  play: async ({ args, canvas, step }) => {
    const inputTextbox = await canvas.findByRole("textbox");

    await step("type into input textbox", async () => {
      await userEvent.click(inputTextbox);
      await userEvent.type(inputTextbox, "mocked");
      expect(args.onChange).toHaveBeenCalledTimes(6);
    });

    await step("finish typing by pressing Enter", async () => {
      await userEvent.keyboard("{enter}");
      expect(args.onComplete).toHaveBeenCalledTimes(1);
    });
  },
};

export const ShouldEnterOnlyNumbers: Story = {
  ...OnlyNumbers,
  name: "when only numbers are allowed, should call onChange for numbers and onComplete",
  tags: ["!dev", "!autodocs"],
  play: async ({ args, canvas, step }) => {
    const inputTextbox = await canvas.findByRole("textbox");

    await step("type text into input textbox", async () => {
      await userEvent.click(inputTextbox);
      await userEvent.type(inputTextbox, "mocked");
      expect(args.onChange).toHaveBeenCalledTimes(0);
    });

    await step("type numbers into input textbox", async () => {
      await userEvent.type(inputTextbox, "123456");
      expect(args.onChange).toHaveBeenCalledTimes(6);
    });

    await step("finish typing by pressing Enter", async () => {
      await userEvent.keyboard("{enter}");
      expect(args.onComplete).toHaveBeenCalledTimes(1);
    });
  },
};
