import type { PickPartial } from "@jumpwind/utils";
import ArrowUpIcon from "lucide-solid/icons/arrow-up";
import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Badge } from "../../ui/badge.jsx";
import { Button } from "../../ui/button.jsx";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../ui/empty.jsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "../../ui/input-group.jsx";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "../../ui/item.jsx";
import { Progress } from "../../ui/progress.jsx";
import { Spinner } from "../../ui/spinner.jsx";

type SpinnerStoryComponent = Component<
  PickPartial<ComponentProps<typeof Spinner>, "children">
>;

/**
 * Display a spinner.
 */
const meta: Meta<SpinnerStoryComponent> = {
  title: "@jumpwind/ui/Spinner",
  component: Spinner as SpinnerStoryComponent,
  parameters: {
    layout: "padded",
  },
  render: (props) => (
    <div class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner {...props} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle class="line-clamp-1">Processing payment...</ItemTitle>
        </ItemContent>
        <ItemContent class="flex-none justify-end">
          <span class="text-sm tabular-nums">$100.00</span>
        </ItemContent>
      </Item>
    </div>
  ),
} satisfies Meta<SpinnerStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  name: "Default",
};

export const SizeStory: Story = {
  name: "Size",
  render: (props) => (
    <div class="flex items-center gap-6">
      <Spinner class="size-3" {...props} />
      <Spinner class="size-4" {...props} />
      <Spinner class="size-6" {...props} />
      <Spinner class="size-8" {...props} />
    </div>
  ),
};

export const ColorStory: Story = {
  name: "Color",
  render: (props) => (
    <div class="flex items-center gap-6">
      <Spinner class="size-6 text-red-500" {...props} />
      <Spinner class="size-6 text-green-500" {...props} />
      <Spinner class="size-6 text-blue-500" {...props} />
      <Spinner class="size-6 text-yellow-500" {...props} />
      <Spinner class="size-6 text-purple-500" {...props} />
    </div>
  ),
};

export const ButtonStory: Story = {
  name: "Button",
  render: (props) => (
    <div class="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner {...props} />
        Loading...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner {...props} />
        Please wait
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner {...props} />
        Processing
      </Button>
    </div>
  ),
};

export const BadgeStory: Story = {
  name: "Badge",
  render: (props) => (
    <div class="flex items-center gap-4 [--radius:1.2rem]">
      <Badge>
        <Spinner {...props} />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner {...props} />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner {...props} />
        Processing
      </Badge>
    </div>
  ),
};

export const InputGroupStory: Story = {
  name: "InputGroup",
  render: (props) => (
    <div class="flex w-full max-w-md flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Send a message..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner {...props} />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Send a message..." disabled />
        <InputGroupAddon align="block-end">
          <Spinner {...props} /> Validating...
          <InputGroupButton class="ml-auto" variant="default">
            <ArrowUpIcon />
            <span class="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const EmptyStory: Story = {
  name: "Empty",
  render: (props) => (
    <Empty class="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner {...props} />
        </EmptyMedia>
        <EmptyTitle>Processing your request</EmptyTitle>
        <EmptyDescription>
          Please wait while we process your request. Do not refresh the page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

export const ItemStory: Story = {
  name: "Item",
  render: (props) => (
    <div class="flex w-full max-w-md flex-col gap-4 [--radius:1rem]">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <Spinner {...props} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Downloading...</ItemTitle>
          <ItemDescription>129 MB / 1000 MB</ItemDescription>
        </ItemContent>
        <ItemActions class="hidden sm:flex">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </ItemActions>
        <ItemFooter>
          <Progress value={100} />
        </ItemFooter>
      </Item>
    </div>
  ),
};
