import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Checkbox,
  CheckboxControl,
  CheckboxInput,
  CheckboxLabel,
} from "../../ui/checkbox.jsx";

type CheckboxStoryComponent = Component<
  PickPartial<ComponentProps<typeof Checkbox>, "children">
>;

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  title: "@jumpwind/ui/Checkbox",
  component: Checkbox as CheckboxStoryComponent,
  argTypes: {},
  args: {
    id: "terms",
    disabled: false,
  },
  render: (args) => (
    <Checkbox {...args}>
      <CheckboxInput />
      <CheckboxControl />
      <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
    </Checkbox>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<CheckboxStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the checkbox.
 */
export const Default = {} satisfies Story;

/**
 * Use the `disabled` prop to disable the checkbox.
 */
export const Disabled = {
  args: {
    id: "disabled-terms",
    disabled: true,
  },
} satisfies Story;

export const ShouldToggleCheck = {
  name: "when the checkbox is clicked, should toggle between checked and not checked",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    await userEvent.click(checkbox, { delay: 100 });
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox, { delay: 100 });
    expect(checkbox).toBeChecked();
  },
} satisfies Story;
