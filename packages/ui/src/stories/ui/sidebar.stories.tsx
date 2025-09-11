import type { PickPartial } from "@jumpwind/utils";
import CalendarIcon from "lucide-solid/icons/calendar";
import ChevronUpIcon from "lucide-solid/icons/chevron-up";
import HomeIcon from "lucide-solid/icons/home";
import InboxIcon from "lucide-solid/icons/inbox";
import SearchIcon from "lucide-solid/icons/search";
import SettingsIcon from "lucide-solid/icons/settings";
import User2Icon from "lucide-solid/icons/user-2";
import { type Component, type ComponentProps, For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { userEvent } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu.jsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../../ui/sidebar.jsx";

type SidebarStoryComponent = Component<
  PickPartial<ComponentProps<typeof Sidebar>, "children">
>;

/**
 * A composable, themeable and customizable sidebar component.
 */
const meta = {
  title: "@jumpwind/ui/Sidebar",
  component: Sidebar,
  argTypes: {
    side: {
      options: ["left", "right"],
      control: { type: "radio" },
    },
    variant: {
      options: ["sidebar", "floating", "inset"],
      control: { type: "radio" },
    },
    collapsible: {
      options: ["offcanvas", "icon", "none"],
      control: { type: "radio" },
    },
  },
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "icon",
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
        <section class="m-4">
          <SidebarTrigger />
          <div class="size-full" />
        </section>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<SidebarStoryComponent>;

export default meta;

type Story = StoryObj<typeof Sidebar>;

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: HomeIcon,
  },
  {
    title: "Inbox",
    url: "#",
    icon: InboxIcon,
  },
  {
    title: "Calendar",
    url: "#",
    icon: CalendarIcon,
  },
  {
    title: "Search",
    url: "#",
    icon: SearchIcon,
  },
  {
    title: "Settings",
    url: "#",
    icon: SettingsIcon,
  },
];

/**
 * A simple sidebar with a group of menu items.
 */
export const Simple: Story = {
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <For each={items}>
                {(item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={item.title}>
                      <Dynamic component={item.icon} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </For>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  ),
};

/**
 * A simple sidebar with a footer menu item.
 */
export const Footer: Story = {
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu sameWidth>
              <DropdownMenuTrigger as={SidebarMenuButton}>
                <User2Icon /> Username
                <ChevronUpIcon class="ml-auto" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  ),
};

export const ShouldCloseOpen: Story = {
  ...Simple,
  name: "when clicking the trigger, should close and open the sidebar",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, step }) => {
    const sidebarBtn = await canvas.findByRole("button", {
      name: /toggle/i,
    });
    await step("close the sidebar", async () => {
      await userEvent.click(sidebarBtn);
    });

    await step("reopen the sidebar", async () => {
      await userEvent.click(sidebarBtn);
    });
  },
};
