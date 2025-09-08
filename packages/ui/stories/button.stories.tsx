import { createSignal } from "solid-js";
import { fn } from "storybook/test";
import type { Meta, StoryFn, StoryObj } from "storybook-solidjs-vite";
import { Button } from "@/registry/jumpwind/ui/button";

const meta = {
  title: "@jumpwind/ui/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      description: "",
      control: "select",
      table: {
        defaultValue: { summary: `"default"` },
      },
    },
    size: {
      description: "",
      control: "select",
      table: {
        defaultValue: { summary: `"default"` },
      },
    },
    children: {
      description: "Text to display",
      control: "text",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    primary: true,
    children: "Button",
  },
} satisfies Story;

export const Secondary = {
  args: {
    children: "Button",
  },
} satisfies Story;

export const Large = {
  args: {
    size: "lg",
    children: "Button",
  },
} satisfies Story;

export const Small = {
  args: {
    size: "sm",
    children: "Button",
  },
} satisfies Story;

export const InCSFFormat = (() => {
  return <Button size="sm">Button</Button>;
}) satisfies StoryFn<typeof meta>;

export const WithDecorator = {
  args: {
    size: "sm",
    children: "Button",
  },
  decorators: [
    (Story, context) => {
      return (
        <div style={{ border: "1px dashed red", padding: "10px" }}>
          <Story {...context.args} />
        </div>
      );
    },
  ],
} satisfies Story;

export const WithHooks = {
  tags: ["autodocs"],
  render: () => {
    // Sets the hooks for both the label and primary props
    const [value, setValue] = createSignal("Secondary");
    const [isPrimary, setIsPrimary] = createSignal(true);

    // Sets a click handler to change the label's value
    const handleOnChange = () => {
      if (!isPrimary()) {
        setIsPrimary(true);
        setValue("Primary");
      }
    };
    return (
      <Button
        variant={isPrimary() ? "default" : "secondary"}
        onClick={handleOnChange}
      >
        {value()}
      </Button>
    );
  },
} satisfies Story;

export default meta;

// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
