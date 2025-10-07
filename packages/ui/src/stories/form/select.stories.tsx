import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createForm } from "../../form/context.js";
import { FormSelect } from "../../form/select.jsx";

type SelectStoryComponent = Component<ComponentProps<typeof FormSelect>>;

/**
 * An input where the user selects a value from within a given range.
 */
const meta = {
  title: "@jumpwind/form/Select",
  component: FormSelect as SelectStoryComponent,
  parameters: { layout: "padded" },
  args: {
    label: "Department",
    description:
      "Enable multi-factor authentication. If you do not have a two-factor device, you can use a one-time code sent to your email.",
    options: [
      "Engineering",
      "Design",
      "Marketing",
      "Sales",
      "Customer Support",
      "Human Resources",
      "Finance",
      "Operations",
    ],
    placeholder: "Choose department",
  },
  render: (args) => {
    const form = createForm(() => ({
      defaultValues: {},
    }));
    return (
      <form.AppForm>
        <form.AppField name="department">
          {(field) => <field.Select {...args} />}
        </form.AppField>
      </form.AppForm>
    );
  },
} satisfies Meta<SelectStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the slider.
 */
export const Default: Story = {};
