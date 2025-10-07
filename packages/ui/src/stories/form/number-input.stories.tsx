import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createForm } from "../../form/context.js";
import { FormNumberInput } from "../../form/number-input.jsx";

type NumberInputStoryComponent = Component<
  ComponentProps<typeof FormNumberInput>
>;

/**
 * An input where the user selects a value from within a given range.
 */
const meta = {
  title: "@jumpwind/form/NumberInput",
  component: FormNumberInput as NumberInputStoryComponent,
  parameters: { layout: "padded" },
  args: {
    label: "Temperature",
    description: "Set your preferred temperature",
    defaultValue: 70,
  },
  render: (args) => {
    const form = createForm(() => ({
      defaultValues: {
        temp: args.defaultValue,
      },
    }));
    return (
      <form.AppForm>
        <form.AppField name="temp">
          {(field) => <field.NumberInput {...args} />}
        </form.AppField>
      </form.AppForm>
    );
  },
} satisfies Meta<NumberInputStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the slider.
 */
export const Default: Story = {};
