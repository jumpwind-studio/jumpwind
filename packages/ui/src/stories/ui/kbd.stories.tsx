import type { PickPartial } from "@jumpwind/utils";
import SearchIcon from "lucide-solid/icons/search";
import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "../../ui/button.jsx";
import { ButtonGroup } from "../../ui/button-group.jsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../ui/input-group.jsx";
import { Kbd, KbdGroup } from "../../ui/kbd.jsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip.jsx";

type KbdStoryComponent = Component<
  PickPartial<ComponentProps<typeof Kbd>, "children">
>;

/**
 * Used to display textual user input from keyboard.
 */
const meta = {
  title: "@jumpwind/ui/Kbd",
  component: Kbd as KbdStoryComponent,
  args: {
    children: "/",
  },
  argTypes: {
    children: {
      control: "text",
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<KbdStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Use the KbdGroup component to group keyboard keys together.
 */
export const GroupStory: Story = {
  name: "Group",
  render: (props) => (
    <div class="flex flex-col items-center gap-4">
      <p class="text-muted-foreground text-sm">
        Use{" "}
        <KbdGroup>
          <Kbd {...props}>Ctrl + B</Kbd>
          <Kbd {...props}>Ctrl + K</Kbd>
        </KbdGroup>{" "}
        to open the command palette
      </p>
    </div>
  ),
};

/**
 * Use the Kbd component inside a Button component to display a keyboard key inside a button.
 */
export const ButtonStory: Story = {
  name: "Button",
  render: (props) => (
    <div class="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="sm" class="pr-2">
        Accept <Kbd {...props}>⏎</Kbd>
      </Button>
      <Button variant="outline" size="sm" class="pr-2">
        Cancel <Kbd {...props}>Esc</Kbd>
      </Button>
    </div>
  ),
};

/**
 * You can use the Kbd component inside a Tooltip component to display a tooltip with a keyboard key.
 */
export const TooltipStory: Story = {
  name: "Tooltip",
  render: (props) => (
    <div class="flex flex-wrap gap-4">
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger as={Button} size="sm" variant="outline">
            Save
          </TooltipTrigger>
          <TooltipContent>
            <div class="flex items-center gap-2">
              Save Changes <Kbd>S</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as={Button} size="sm" variant="outline">
            Print
          </TooltipTrigger>
          <TooltipContent>
            <div class="flex items-center gap-2">
              Print Document{" "}
              <KbdGroup>
                <Kbd {...props}>Ctrl</Kbd>
                <Kbd {...props}>P</Kbd>
              </KbdGroup>
            </div>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  ),
};

/**
 * You can use the Kbd component inside a InputGroupAddon component to display a keyboard key inside an input group.
 */
export const InputGroupStory: Story = {
  name: "Input Group",
  render: (props) => (
    <div class="flex w-full max-w-xs flex-col gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd {...props}>⌘</Kbd>
          <Kbd {...props}>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
