import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import { expect, fn, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSection,
  SelectTrigger,
  SelectValue,
} from "../../ui/select.jsx";

const options = [
  {
    name: "Fruits",
    items: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Blueberry", value: "blueberry" },
      { label: "Grapes", value: "grapes" },
      { label: "Pineapple", value: "pineapple" },
    ],
  },
  {
    name: "Vegetables",
    items: [
      { label: "Aubergine", value: "aubergine" },
      { label: "Broccoli", value: "broccoli" },
      { label: "Carrot", value: "carrot" },
      { label: "Courgette", value: "courgette" },
      { label: "Leek", value: "leek" },
    ],
  },
  {
    name: "Meat",
    items: [
      { label: "Beef", value: "beef" },
      { label: "Chicken", value: "chicken" },
      { label: "Lamb", value: "lamb" },
      { label: "Pork", value: "pork" },
    ],
  },
];

type OptionGroup = (typeof options)[number];
type Option = OptionGroup["items"][number];

type SelectStoryComponent = Component<
  PickPartial<ComponentProps<typeof Select<Option, OptionGroup>>, "children">
>;

/**
 * Displays a list of options for the user to pick from—triggered by a button.
 */
const meta = {
  title: "@jumpwind/ui/Select",
  component: Select as SelectStoryComponent,
  argTypes: {
    options: {
      control: { type: "object" },
    },
  },
  args: {
    options: options,
    placeholder: "Select a fruit",
    optionValue: "value",
    optionTextValue: "label",
    optionGroupChildren: "items",
    onChange: fn(),
  },
  render: (args) => (
    <Select<Option, OptionGroup>
      {...args}
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.textValue}</SelectItem>
      )}
      sectionComponent={(props) => (
        <SelectSection>{props.section.rawValue.name}</SelectSection>
      )}
    >
      <SelectTrigger title="Select" class="w-96">
        <SelectValue<Option>>
          {(state) => state.selectedOption()?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<SelectStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the select.
 */
export const Default: Story = {};

export const ShouldSelectOption: Story = {
  name: "when an option is selected, should be checked",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);
    const select = await canvasBody.findByRole("combobox");

    await step("open and select item", async () => {
      await userEvent.click(select);
      await userEvent.click(
        await canvasBody.findByRole("option", { name: /banana/i }),
      );
      expect(select).toHaveTextContent("Banana");
    });

    await step("verify the selected option", async () => {
      await userEvent.click(select);
      expect(
        await canvasBody.findByRole("option", { name: /banana/i }),
      ).toHaveAttribute("data-state", "checked");
      await userEvent.click(
        await canvasBody.findByRole("option", { name: /banana/i }),
      );
    });
  },
};
