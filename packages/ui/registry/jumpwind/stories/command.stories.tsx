import type { PickPartial } from "@jumpwind/utils";
import { createShortcut } from "@solid-primitives/keyboard";
import { type Component, type ComponentProps, createSignal } from "solid-js";
import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/jumpwind/ui/command";
import { Kbd, KbdKey, KbdModifier } from "@/registry/jumpwind/ui/kbd";

type CommandStoryComponent = Component<
  PickPartial<ComponentProps<typeof Command>, "children">
>;

/**
 * Fast, composable, unstyled command menu for React.
 */
const meta = {
  title: "@jumpwind/ui/Command",
  component: Command,
  argTypes: {},
  args: {
    class: "rounded-lg w-96 border shadow-md",
  },
  render: (args) => (
    <Command {...args}>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem disabled>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<CommandStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the command.
 */
export const Default: Story = {};

export const WithDialog = {
  tags: ["autodocs"],
  render: () => {
    const [isOpen, setIsOpen] = createSignal(false);

    createShortcut(["Control", "J"], setIsOpen);

    return (
      <>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          class="p-2 text-muted-foreground text-sm"
        >
          Press{" "}
          <Kbd>
            <KbdModifier>⌘</KbdModifier>
            <KbdKey>J</KbdKey>
          </Kbd>
        </button>
        <CommandDialog open={isOpen()} onOpenChange={setIsOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
} satisfies Story;

export const TypingInCombobox: Story = {
  name: "when typing into the combobox, should filter results",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");

    // Search for "calendar" which should return a single result
    await userEvent.type(input, "calen", { delay: 100 });
    expect(canvas.getAllByRole("option", { name: /calendar/i })).toHaveLength(
      1,
    );

    await userEvent.clear(input);

    // Search for "story" which should return multiple results
    await userEvent.type(input, "se", { delay: 100 });
    expect(canvas.getAllByRole("option").length).toBeGreaterThan(1);
    expect(canvas.getAllByRole("option", { name: /search/i })).toHaveLength(1);

    await userEvent.clear(input);

    // Search for "story" which should return no results
    await userEvent.type(input, "story", { delay: 100 });
    expect(canvas.queryAllByRole("option", { hidden: false })).toHaveLength(0);
    expect(canvas.getByText(/no results/i)).toBeVisible();
  },
};
