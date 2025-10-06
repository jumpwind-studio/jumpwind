import type { PickPartial } from "@jumpwind/utils";
import ArrowUpRightIcon from "lucide-solid/icons/arrow-up-right";
import BellIcon from "lucide-solid/icons/bell";
import CloudIcon from "lucide-solid/icons/cloud";
import FolderCodeIcon from "lucide-solid/icons/folder-code";
import PlusIcon from "lucide-solid/icons/plus";
import RefreshCcwIcon from "lucide-solid/icons/refresh-ccw";
import SearchIcon from "lucide-solid/icons/search";
import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar.jsx";
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
  InputGroupInput,
} from "../../ui/input-group.jsx";
import { Kbd } from "../../ui/kbd.jsx";

type EmptyStoryComponent = Component<
  PickPartial<ComponentProps<typeof Empty>, "children">
>;

/**
 * Displays a button or a component that looks like a button.
 */
const meta = {
  title: "@jumpwind/ui/Empty",
  component: Empty as EmptyStoryComponent,
  parameters: {
    layout: "centered",
  },
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderCodeIcon />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div class="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
      <Button
        as="a"
        variant="link"
        class="text-muted-foreground"
        size="sm"
        href="#"
      >
        Learn More <ArrowUpRightIcon />
      </Button>
    </Empty>
  ),
} satisfies Meta<EmptyStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the button, used for primary actions and commands.
 */
export const Default: Story = {};

/**
 * Use the border utility class to create a outline empty state.
 */
export const Outline: Story = {
  args: {
    class: "border border-dashed",
  },
  render: (props) => (
    <Empty {...props}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudIcon />
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Upload Files
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

/**
 * Use the bg-* and bg-gradient-* utilities to add a background to the empty state.
 */
export const BackgroundStory: Story = {
  name: "Background",
  args: {
    class: "h-full bg-gradient-to-b from-30% from-muted/50 to-background",
  },
  render: (props) => (
    <Empty {...props}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BellIcon />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription>
          You&apos;re all caught up. New notifications will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <RefreshCcwIcon />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

/**
 * Use the EmptyMedia component to display an avatar in the empty state.
 */
export const AvatarStory: Story = {
  name: "Avatar",
  render: (props) => (
    <Empty {...props}>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Avatar class="size-12">
            <AvatarImage
              src="https://github.com/shadcn.png"
              class="grayscale"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>User Offline</EmptyTitle>
        <EmptyDescription>
          This user is currently offline. You can leave a message to notify them
          or try again later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Leave Message</Button>
      </EmptyContent>
    </Empty>
  ),
};

export const AvatarGroupStory: Story = {
  name: "AvatarGroup",
  render: (props) => (
    <Empty {...props}>
      <EmptyHeader>
        <EmptyMedia>
          <div class="-space-x-2 flex *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </EmptyMedia>
        <EmptyTitle>No Team Members</EmptyTitle>
        <EmptyDescription>
          Invite your team to collaborate on this project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <PlusIcon />
          Invite Members
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

export const InputGroupStory: Story = {
  name: "Input Group",
  render: (props) => (
    <Empty {...props}>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for
          what you need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup class="sm:w-3/4">
          <InputGroupInput placeholder="Try searching for pages..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <EmptyDescription>
          Need help? {/** biome-ignore lint/a11y/useValidAnchor: Storybook */}
          <a href="#">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  ),
};
