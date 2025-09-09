import { For } from "solid-js";
import { expect, userEvent, waitFor } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
} from "@/registry/jumpwind/ui/radio-group";

/**
 * A set of checkable buttons—known as radio buttons—where no more than one of
 * the buttons can be checked at a time.
 */
const meta = {
  title: "@jumpwind/ui/RadioGroup",
  component: RadioGroup,
  argTypes: {},
  args: {
    defaultValue: "comfortable",
  },
  render: (args) => (
    <RadioGroup {...args}>
      <For each={["Default", "Comfortable", "Compact"]}>
        {(item) => (
          <RadioGroupItem value={item}>
            <RadioGroupItemLabel>{item}</RadioGroupItemLabel>
          </RadioGroupItem>
        )}
      </For>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the radio group.
 */
export const Default: Story = {};

export const ShouldToggleRadio: Story = {
  name: "when clicking on a radio button, it should toggle its state",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, step }) => {
    const radios = await canvas.findAllByRole("radio");
    expect(radios).toHaveLength(3);

    await step("click the default radio button", async () => {
      await userEvent.click(radios[0]);
      await waitFor(() => expect(radios[0]).toBeChecked());
      await waitFor(() => expect(radios[1]).not.toBeChecked());
    });

    await step("click the comfortable radio button", async () => {
      await userEvent.click(radios[1]);
      await waitFor(() => expect(radios[1]).toBeChecked());
      await waitFor(() => expect(radios[0]).not.toBeChecked());
    });
  },
};
