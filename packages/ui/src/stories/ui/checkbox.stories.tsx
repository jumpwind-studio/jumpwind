import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Checkbox,
  CheckboxControl,
  CheckboxDescription,
  CheckboxInput,
  CheckboxLabel,
} from "../../ui/checkbox.jsx";
import { Label } from "../../ui/label.jsx";

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

export const Demo: Story = {
  render: () => (
    <div class="flex flex-col gap-6">
      <Checkbox>
        <CheckboxInput />
        <CheckboxControl />
        <CheckboxLabel as={Label}>Accept terms and conditions</CheckboxLabel>
      </Checkbox>
      <Checkbox defaultChecked>
        <CheckboxInput />
        <CheckboxControl />
        <div class="grid gap-2">
          <CheckboxLabel as={Label}>Accept terms and conditions</CheckboxLabel>
          <CheckboxDescription class="text-muted-foreground text-sm">
            By clicking this checkbox, you agree to the terms and conditions.
          </CheckboxDescription>
        </div>
      </Checkbox>
      <div class="flex items-start gap-3">
        <Checkbox disabled>
          <CheckboxInput />
          <CheckboxControl />
          <CheckboxLabel as={Label}>Enable notifications</CheckboxLabel>
        </Checkbox>
      </div>
      <Label class="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[data-checked]]:border-blue-600 has-[[data-checked]]:bg-blue-50 dark:has-[[data-checked]]:border-blue-900 dark:has-[[data-checked]]:bg-blue-950">
        <Checkbox defaultChecked>
          <CheckboxInput />
          <CheckboxControl class="data-checked:border-blue-600 data-checked:bg-blue-600 data-checked:text-white dark:data-checked:border-blue-700 dark:data-checked:bg-blue-700" />
          <div class="grid gap-1.5 font-normal">
            <CheckboxLabel as={Label} class="font-medium text-sm leading-none">
              Enable notifications
            </CheckboxLabel>
            <CheckboxDescription class="text-muted-foreground text-sm">
              You can enable or disable notifications at any time.
            </CheckboxDescription>
          </div>
        </Checkbox>
      </Label>
    </div>
  ),
};

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
