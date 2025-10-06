import { createForm } from "@tanstack/solid-form";
import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { FormSlider } from "../../form/slider.jsx";

type SliderStoryComponent = Component<ComponentProps<typeof FormSlider>>;

/**
 * An input where the user selects a value from within a given range.
 */
const meta = {
  title: "@jumpwind/form/Slider",
  component: FormSlider as SliderStoryComponent,
  parameters: { layout: "padded" },
  argTypes: {
    minValue: {
      control: { type: "range", min: 0, max: 100 },
    },
    maxValue: {
      control: { type: "range", min: 0, max: 100 },
    },
  },
  args: {
    minValue: 0,
    maxValue: 2000,
    defaultValue: [20, 500],
    label: "Price Range",
    getValueLabel: (params) => `$${params.values[0]} - $${params.values[1]}`,
  },
  render: (args) => {
    const form = createForm(() => ({
      defaultValues: {
        values: args.defaultValue,
      },
    }));
    return (
      <form.Field name="values" mode="array">
        {(field) => <FormSlider {...args} field={field()} />}
      </form.Field>
    );
  },
} satisfies Meta<SliderStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the slider.
 */
export const Default: Story = {};
