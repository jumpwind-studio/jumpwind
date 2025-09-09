import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerVariants,
} from "@/registry/jumpwind/ui/navigation-menu";

type NavigationMenuStoryComponent = Component<
  PickPartial<ComponentProps<typeof NavigationMenu>, "children">
>;

/**
 * A collection of links for navigating websites.
 */
const meta = {
  title: "@jumpwind/ui/NavigationMenu",
  component: NavigationMenu,
  argTypes: {},
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink class={navigationMenuTriggerVariants()}>
            Overview
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger class={navigationMenuTriggerVariants()}>
              Documentation
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-96 p-2">
                <li>
                  <NavigationMenuLink class={navigationMenuTriggerVariants()}>
                    API Reference
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink class={navigationMenuTriggerVariants()}>
                    Getting Started
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink class={navigationMenuTriggerVariants()}>
                    Guides
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            class={navigationMenuTriggerVariants()}
            href="https:www.google.com"
            target="_blank"
          >
            External
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<NavigationMenuStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the navigation menu.
 */
export const Default: Story = {};
