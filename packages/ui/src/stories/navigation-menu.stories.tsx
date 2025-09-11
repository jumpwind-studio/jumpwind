import type { PickPartial } from "@jumpwind/utils";
import CircleIcon from "lucide-solid/icons/circle";
import CircleCheckIcon from "lucide-solid/icons/circle-check";
import CircleHelpIcon from "lucide-solid/icons/circle-help";
import {
  type Component,
  type ComponentProps,
  createSignal,
  For,
} from "solid-js";
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

function ListItem(props: ComponentProps<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink as="a" href={props.href}>
        <div class="font-medium text-sm leading-none">{props.title}</div>
        <p class="line-clamp-2 text-muted-foreground text-sm leading-snug">
          {props.children}
        </p>
      </NavigationMenuLink>
    </li>
  );
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

type NavigationMenuStoryComponent = Component<
  PickPartial<ComponentProps<typeof NavigationMenu>, "children">
>;

/**
 * A collection of links for navigating websites.
 */
const meta = {
  title: "@jumpwind/ui/NavigationMenu",
  component: NavigationMenu as NavigationMenuStoryComponent,
  argTypes: {},
  args: {
    viewport: false,
  },
  render: (args) => {
    const [value, setValue] = createSignal<string>("item-components");
    return (
      <div class="min-h-[200px]">
        <NavigationMenu
          value={value()}
          onValueChange={setValue}
          viewport={false}
          {...args}
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Home</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li class="row-span-3">
                    <NavigationMenuLink
                      as="a"
                      href="/"
                      class="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md"
                    >
                      <div class="mt-4 mb-2 font-medium text-lg">shadcn/ui</div>
                      <p class="text-muted-foreground text-sm leading-tight">
                        Beautifully designed components built with Tailwind CSS.
                      </p>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem id="item-components">
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <For each={components}>
                    {(component) => (
                      <ListItem title={component.title} href={component.href}>
                        {component.description}
                      </ListItem>
                    )}
                  </For>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                as="a"
                href="/docs"
                class={navigationMenuTriggerVariants()}
              >
                Docs
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>List</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-[300px] gap-4">
                  <li>
                    <NavigationMenuLink as="a" href="#">
                      <div class="font-medium">Components</div>
                      <div class="text-muted-foreground">
                        Browse all components in the library.
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink as="a" href="#">
                      <div class="font-medium">Documentation</div>
                      <div class="text-muted-foreground">
                        Learn how to use the library.
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink as="a" href="#">
                      <div class="font-medium">Blog</div>
                      <div class="text-muted-foreground">
                        Read our latest blog posts.
                      </div>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink as="a" href="#">
                      Components
                    </NavigationMenuLink>
                    <NavigationMenuLink as="a" href="#">
                      Documentation
                    </NavigationMenuLink>
                    <NavigationMenuLink as="a" href="#">
                      Blocks
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink
                      as="a"
                      href="#"
                      class="flex-row items-center gap-2"
                    >
                      <CircleHelpIcon />
                      Backlog
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      as="a"
                      href="#"
                      class="flex-row items-center gap-2"
                    >
                      <CircleIcon />
                      To Do
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      as="a"
                      href="#"
                      class="flex-row items-center gap-2"
                    >
                      <CircleCheckIcon />
                      Done
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    );
  },
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
