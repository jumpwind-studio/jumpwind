import type { PickPartial } from "@jumpwind/utils";
import BadgeCheckIcon from "lucide-solid/icons/badge-check";
import ChevronDownIcon from "lucide-solid/icons/chevron-down";
import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import ExternalLinkIcon from "lucide-solid/icons/external-link";
import PlusIcon from "lucide-solid/icons/plus";
import ShieldAlertIcon from "lucide-solid/icons/shield-alert";
import { type Component, type ComponentProps, For, Show } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { cn } from "../../lib/utils.js";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar.jsx";
import { Button } from "../../ui/button.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu.jsx";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "../../ui/item.jsx";

type ItemStoryComponent = Component<
  PickPartial<ComponentProps<typeof Item>, "children">
>;

/**
 * Used to display textual user input from keyboard.
 */
const meta: Meta<ItemStoryComponent> = {
  title: "@jumpwind/ui/Item",
  component: Item as ItemStoryComponent,
  parameters: {
    layout: "padded",
  },
  render: (props) => (
    <div class="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline" {...props}>
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>
            A simple item with title and description.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" as="a" href="#" {...props}>
        <ItemMedia>
          <BadgeCheckIcon class="size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Your profile has been verified.</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon class="size-4" />
        </ItemActions>
      </Item>
    </div>
  ),
} satisfies Meta<ItemStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  name: "Default",
};

export const VariantsStory: Story = {
  name: "Variants",
  render: (props) => (
    <div class="flex flex-col gap-6">
      <Item {...props}>
        <ItemContent>
          <ItemTitle>Default Variant</ItemTitle>
          <ItemDescription>
            Standard styling with subtle background and borders.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" {...props}>
        <ItemContent>
          <ItemTitle>Outline Variant</ItemTitle>
          <ItemDescription>
            Outlined style with clear borders and transparent background.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted" {...props}>
        <ItemContent>
          <ItemTitle>Muted Variant</ItemTitle>
          <ItemDescription>
            Subdued appearance with muted colors for secondary content.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};

export const SizeStory: Story = {
  name: "Size",
  render: (props) => (
    <div class="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline" {...props}>
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>
            A simple item with title and description.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" as="a" href="#" {...props}>
        <ItemMedia>
          <BadgeCheckIcon class="size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Your profile has been verified.</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon class="size-4" />
        </ItemActions>
      </Item>
    </div>
  ),
};
export const IconStory: Story = {
  name: "Icon",
  render: (props) => (
    <div class="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline" {...props}>
        <ItemMedia variant="icon">
          <ShieldAlertIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Security Alert</ItemTitle>
          <ItemDescription>
            New login detected from unknown device.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Review
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};
export const AvatarStory: Story = {
  name: "Avatar",
  render: (props) => (
    <div class="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline" {...props}>
        <ItemMedia>
          <Avatar class="size-10">
            <AvatarImage src="https://github.com/evilrabbit.png" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Evil Rabbit</ItemTitle>
          <ItemDescription>Last seen 5 months ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            size="icon-sm"
            variant="outline"
            class="rounded-full"
            aria-label="Invite"
          >
            <PlusIcon />
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" {...props}>
        <ItemMedia>
          <div class="-space-x-2 flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
            <Avatar class="hidden sm:flex">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar class="hidden sm:flex">
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
        </ItemMedia>
        <ItemContent>
          <ItemTitle>No Team Members</ItemTitle>
          <ItemDescription>
            Invite your team to collaborate on this project.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Invite
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};
export const ImageStory: Story = {
  name: "Image",
  render: (_props) => {
    const items = [
      {
        title: "Midnight City Lights",
        artist: "Neon Dreams",
        album: "Electric Nights",
        duration: "3:45",
      },
      {
        title: "Coffee Shop Conversations",
        artist: "The Morning Brew",
        album: "Urban Stories",
        duration: "4:05",
      },
      {
        title: "Digital Rain",
        artist: "Cyber Symphony",
        album: "Binary Beats",
        duration: "3:30",
      },
    ];
    return (
      <ItemGroup class="gap-4">
        <For each={items}>
          {(song) => (
            <Item as="a" variant="outline" role="listitem" href="#">
              <ItemMedia variant="image">
                <img
                  src={`https://avatar.vercel.sh/${song.title}`}
                  alt={song.title}
                  width={32}
                  height={32}
                  class="object-cover grayscale"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle class="line-clamp-1">
                  {song.title} -{" "}
                  <span class="text-muted-foreground">{song.album}</span>
                </ItemTitle>
                <ItemDescription>{song.artist}</ItemDescription>
              </ItemContent>
              <ItemContent class="flex-none text-center">
                <ItemDescription>{song.duration}</ItemDescription>
              </ItemContent>
            </Item>
          )}
        </For>
      </ItemGroup>
    );
  },
};
export const GroupStory: Story = {
  name: "Group",
  render: (_props) => {
    const items = [
      {
        username: "shadcn",
        avatar: "https://github.com/shadcn.png",
        email: "shadcn@vercel.com",
      },
      {
        username: "maxleiter",
        avatar: "https://github.com/maxleiter.png",
        email: "maxleiter@vercel.com",
      },
      {
        username: "evilrabbit",
        avatar: "https://github.com/evilrabbit.png",
        email: "evilrabbit@vercel.com",
      },
    ];
    return (
      <div class="flex w-full max-w-md flex-col gap-6">
        <ItemGroup>
          <For each={items}>
            {(person, index) => (
              <>
                <Item>
                  <ItemMedia>
                    <Avatar>
                      <AvatarImage src={person.avatar} class="grayscale" />
                      <AvatarFallback>
                        {person.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent class="gap-1">
                    <ItemTitle>{person.username}</ItemTitle>
                    <ItemDescription>{person.email}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="ghost" size="icon" class="rounded-full">
                      <PlusIcon />
                    </Button>
                  </ItemActions>
                </Item>
                <Show when={index() !== items.length - 1}>
                  <ItemSeparator />
                </Show>
              </>
            )}
          </For>
        </ItemGroup>
      </div>
    );
  },
};
export const HeaderStory: Story = {
  name: "Header",
  render: (props) => {
    const items = [
      {
        name: "v0-1.5-sm",
        description: "Everyday tasks and UI generation.",
        image:
          "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop",
        credit: "Valeria Reverdo on Unsplash",
      },
      {
        name: "v0-1.5-lg",
        description: "Advanced thinking or reasoning.",
        image:
          "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop",
        credit: "Michael Oeser on Unsplash",
      },
      {
        name: "v0-2.0-mini",
        description: "Open Source model for everyone.",
        image:
          "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop",
        credit: "Cherry Laithang on Unsplash",
      },
    ];
    return (
      <div class="flex w-full max-w-xl flex-col gap-6">
        <ItemGroup class="grid grid-cols-3 gap-4" {...props}>
          <For each={items}>
            {(model) => (
              <Item variant="outline">
                <ItemHeader>
                  <img
                    src={model.image}
                    alt={model.name}
                    width={128}
                    height={128}
                    class="aspect-square w-full rounded-sm object-cover"
                  />
                </ItemHeader>
                <ItemContent>
                  <ItemTitle>{model.name}</ItemTitle>
                  <ItemDescription>{model.description}</ItemDescription>
                </ItemContent>
              </Item>
            )}
          </For>
        </ItemGroup>
      </div>
    );
  },
};
export const LinkStory: Story = {
  name: "Link",
  render: (props) => (
    <div class="flex w-full max-w-md flex-col gap-4">
      <Item as="a" href="#" {...props}>
        <ItemContent>
          <ItemTitle>Visit our documentation</ItemTitle>
          <ItemDescription>
            Learn how to get started with our components.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon class="size-4" />
        </ItemActions>
      </Item>
      <Item
        as="a"
        variant="outline"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        <ItemContent>
          <ItemTitle>External resource</ItemTitle>
          <ItemDescription>
            Opens in a new tab with security attributes.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <ExternalLinkIcon class="size-4" />
        </ItemActions>
      </Item>
    </div>
  ),
};
export const DropdownStory: Story = {
  name: "Dropdown",
  render: (props) => {
    const items = [
      {
        username: "shadcn",
        avatar: "https://github.com/shadcn.png",
        email: "shadcn@vercel.com",
      },
      {
        username: "maxleiter",
        avatar: "https://github.com/maxleiter.png",
        email: "maxleiter@vercel.com",
      },
      {
        username: "evilrabbit",
        avatar: "https://github.com/evilrabbit.png",
        email: "evilrabbit@vercel.com",
      },
    ];
    return (
      <div class="flex min-h-64 w-full max-w-md flex-col items-center gap-6">
        <DropdownMenu placement="top-end">
          <DropdownMenuTrigger
            as={Button}
            variant="outline"
            size="sm"
            class="w-fit"
          >
            Select <ChevronDownIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-72 [--radius:0.65rem]">
            <For each={items}>
              {(person) => (
                <DropdownMenuItem key={person.username} class="p-0">
                  <Item
                    size="sm"
                    {...props}
                    class={cn("w-full p-2", props.class)}
                  >
                    <ItemMedia>
                      <Avatar class="size-8">
                        <AvatarImage src={person.avatar} class="grayscale" />
                        <AvatarFallback>
                          {person.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent class="gap-0.5">
                      <ItemTitle>{person.username}</ItemTitle>
                      <ItemDescription>{person.email}</ItemDescription>
                    </ItemContent>
                  </Item>
                </DropdownMenuItem>
              )}
            </For>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};
