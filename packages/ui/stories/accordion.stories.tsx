import { fn } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Accordion } from "@/registry/jumpwind/ui/accordion";

const meta = {
  title: "@jumpwind/ui/Accordion",
  component: Accordion, // this is just the root
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Accordion>;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    children: "Button",
  },
} satisfies Story;
