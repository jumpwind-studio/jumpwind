import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Slider,
  SliderLabel,
  SliderTrack,
  SliderValueLabel,
} from "../../ui/slider.jsx"

type SliderStoryComponent = Component<
  PickPartial<ComponentProps<typeof Slider>, "children">
>;

/**
 * An input where the user selects a value from within a given range.
 */
const meta = {
  title: "@jumpwind/ui/Slider",
  component: Slider as SliderStoryComponent,
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
    getValueLabel: (params) => `$${params.values[0]} - $${params.values[1]}`,
  },
  render: (args) => (
    <Slider {...args}>
      <div class="flex w-full justify-between">
        <SliderLabel>Money</SliderLabel>
        <SliderValueLabel />
      </div>
      <SliderTrack />
    </Slider>
  ),
} satisfies Meta<SliderStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the slider.
 */
export const Default: Story = {};

/**
 * Use the `inverted` prop to have the slider fill from right to left.
 */
export const Inverted: Story = {
  args: {
    inverted: true,
  },
};

/**
 * Use the `disabled` prop to disable the slider.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
