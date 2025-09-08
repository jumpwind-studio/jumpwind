import type { ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Slider,
  SliderFill,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from "@/registry/jumpwind/ui/slider";

type StoryProps = ComponentProps<typeof Slider>;

/**
 * An input where the user selects a value from within a given range.
 */
const meta = {
  title: "@jumpwind/ui/Slider",
  component: Slider,
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
    class: "w-[300px] space-y-3",
  },
  render: (args) => (
    <Slider {...args}>
      <div class="flex w-full justify-between">
        <SliderLabel>Money</SliderLabel>
        <SliderValueLabel />
      </div>
      <SliderTrack>
        <SliderFill />
        <SliderThumb />
        <SliderThumb />
      </SliderTrack>
    </Slider>
  ),
} satisfies Meta<StoryProps>;

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
