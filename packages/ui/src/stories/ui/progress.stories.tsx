import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Progress,
  ProgressLabel,
  ProgressValueLabel,
} from "../../ui/progress.jsx"

/**
 * Displays an indicator showing the completion progress of a task, typically
 * displayed as a progress bar.
 */
const meta = {
  title: "@jumpwind/ui/Progress",
  component: Progress,
  argTypes: {},
  args: {
    "aria-label": "Progress",
    value: 30,
    maxValue: 100,
    class: "w-[300px]",
  },
  render: (args) => (
    <Progress {...args}>
      <div class="flex w-full justify-between">
        <ProgressLabel>Processing...</ProgressLabel>
        <ProgressValueLabel />
      </div>
    </Progress>
  ),
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the progress.
 */
export const Default: Story = {};

/**
 * When the progress is indeterminate.
 */
export const Indeterminate: Story = {
  args: {
    value: undefined,
  },
};

/**
 * When the progress is completed.
 */
export const Completed: Story = {
  args: {
    value: 100,
  },
};
