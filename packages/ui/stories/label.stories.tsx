import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Label } from "@/registry/jumpwind/ui/label";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "@jumpwind/ui/Label",
  component: Label,
} satisfies Meta<typeof Label>;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    primary: true,
    children: "Label",
  },
} satisfies Story;

export const Secondary = {
  args: {
    children: "Label",
  },
} satisfies Story;

export default meta;
