import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { FormCheckbox } from "../../form/checkbox.jsx";
import { createForm } from "../../form/context.js";

const form = createForm(() => ({
  defaultValues: {
    terms: false,
  },
}));

type CheckboxStoryComponent = Component<
  PickPartial<ComponentProps<typeof FormCheckbox>, "children">
>;

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  title: "@jumpwind/form/Checkbox",
  component: FormCheckbox as CheckboxStoryComponent,
  argTypes: {},
  args: {
    disabled: false,
  },
  render: (args) => (
    <form.AppForm>
      <form.AppField name="terms">
        {(field) => (
          <field.Checkbox label="Accept terms and conditions" {...args} />
        )}
      </form.AppField>
    </form.AppForm>
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
    disabled: true,
  },
} satisfies Story;
