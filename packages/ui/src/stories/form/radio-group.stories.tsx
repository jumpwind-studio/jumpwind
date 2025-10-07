import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createForm } from "../../form/context.js";
import { FormRadioGroup } from "../../form/radio.jsx";

type RadioGroupStoryComponent = Component<
  ComponentProps<typeof FormRadioGroup>
>;

/**
 * An input where the user selects a value from within a given range.
 */
const meta = {
  title: "@jumpwind/form/RadioGroup",
  component: FormRadioGroup as RadioGroupStoryComponent,
  parameters: { layout: "padded" },
  args: {
    defaultValue: "3",
    items: [
      { label: "Monthly ($9.99/month)", value: "monthly" },
      { label: "Yearly ($99.99/year)", value: "yearly" },
      { label: "Lifetime ($299.99)", value: "lifetime" },
    ],
    label: "Price Range",
    description: "Yearly and lifetime plans offer significant savings.",
  },
  render: (args) => {
    const form = createForm(() => ({
      defaultValues: {
        values: args.defaultValue,
      },
    }));
    return (
      <form.AppForm>
        <form.AppField name="values" mode="array">
          {(field) => <field.RadioGroup {...args} />}
        </form.AppField>
      </form.AppForm>
    );
  },
} satisfies Meta<RadioGroupStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the slider.
 */
export const Default: Story = {};
