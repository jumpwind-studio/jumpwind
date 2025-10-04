import type { PickPartial } from "@jumpwind/utils";
import ArrowLeftIcon from "lucide-solid/icons/arrow-left";
import ArrowRightIcon from "lucide-solid/icons/arrow-right";
import BotIcon from "lucide-solid/icons/bot";
import ChevronDownIcon from "lucide-solid/icons/chevron-down";
import MinusIcon from "lucide-solid/icons/minus";
import PlusIcon from "lucide-solid/icons/plus";
import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "../../ui/button.jsx";
import { ButtonGroup, ButtonGroupSeparator } from "../../ui/button-group.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover.jsx";
import { Separator } from "../../ui/separator.jsx";
import { Textarea } from "../../ui/textarea.jsx";

type ButtonGroupStoryComponent = Component<
  PickPartial<ComponentProps<typeof ButtonGroup>, "children">
>;

/**
 * Displays a button or a component that looks like a button.
 */
const meta = {
  title: "@jumpwind/ui/ButtonGroup",
  component: ButtonGroup as ButtonGroupStoryComponent,
  args: {
    children: "Button",
  },
  argTypes: {
    children: {
      control: "text",
    },
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>{args.children}</Button>
    </ButtonGroup>
  ),
} satisfies Meta<ButtonGroupStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the button, used for primary actions and commands.
 */
export const Default: Story = {};

export const Orientation: Story = {
  render: (props) => (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      class="h-fit"
      {...props}
    >
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  ),
};

/**
 * Nest to create button groups with spacing.
 */
export const Nested: Story = {
  render: (props) => (
    <ButtonGroup {...props}>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          4
        </Button>
        <Button variant="outline" size="sm">
          5
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="Previous">
          <ArrowLeftIcon />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  ),
};

/**
 * Visually divides buttons within a group.
 *
 * Buttons with variant outline do not need a separator since they have a border.
 * For other variants, a separator is recommended to improve the visual hierarchy.
 */
export const SeparatorStory: Story = {
  name: "Separator",
  render: (props) => (
    <ButtonGroup {...props}>
      <Button variant="secondary" size="sm">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        Paste
      </Button>
    </ButtonGroup>
  ),
};

/**
 * Create a split button group by adding two buttons separated by a ButtonGroupSeparator.
 */
export const Split: Story = {
  render: (props) => (
    <ButtonGroup {...props}>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  ),
};

/**
 * Use with a Popover component.
 */
export const PopoverStory: Story = {
  name: "Popover",
  render: (props) => (
    <ButtonGroup {...props}>
      <Button variant="outline">
        <BotIcon /> Copilot
      </Button>
      <Popover placement="top-end">
        <PopoverTrigger
          as={Button}
          variant="outline"
          size="icon"
          aria-label="Open Popover"
        >
          <ChevronDownIcon />
        </PopoverTrigger>
        <PopoverContent class="rounded-xl p-0 text-sm">
          <div class="px-4 py-3">
            <div class="font-medium text-sm">Agent Tasks</div>
          </div>
          <Separator />
          <div class="p-4 text-sm *:[p:not(:last-child)]:mb-2">
            <Textarea
              placeholder="Describe your task in natural language."
              class="mb-4 resize-none"
            />
            <p class="font-medium">Start a new task with Copilot</p>
            <p class="text-muted-foreground">
              Describe your task in natural language. Copilot will work in the
              background and open a pull request for your review.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  ),
};
