import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Commandbox } from "../../ui/commandbox.jsx"

type CommandboxStoryComponent = Component<ComponentProps<typeof Commandbox>>;

const frameworks = [
  {
    value: "solid-js",
    label: "SolidJS",
  },
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

/**
 * Fast, composable, unstyled command menu for React.
 */
const meta = {
  title: "@jumpwind/ui/Commandbox",
  component: Commandbox as CommandboxStoryComponent,
  argTypes: {
    items: {
      control: { type: "object" },
    },
  },
  args: {
    items: frameworks,
  },
  render: (args) => <Commandbox {...args} />,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<CommandboxStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the command.
 */
export const Default: Story = {};

// export const WithDialog = {
//   tags: ["autodocs"],
//   render: () => {
//     const [isOpen, setIsOpen] = createSignal(false);
//
//     createShortcut(["Control", "J"], setIsOpen);
//
//     return (
//       <>
//         <button
//           type="button"
//           onClick={(e) => {
//             e.preventDefault();
//             setIsOpen(true);
//           }}
//           class="p-2 text-muted-foreground text-sm"
//         >
//           Press{" "}
//           <Kbd>
//             <KbdModifier>⌘</KbdModifier>
//             <KbdKey>J</KbdKey>
//           </Kbd>
//         </button>
//         <CommandDialog open={isOpen()} onOpenChange={setIsOpen}>
//           <CommandInput placeholder="Type a command or search..." />
//           <CommandList>
//             <CommandEmpty>No results found.</CommandEmpty>
//             <CommandGroup heading="Suggestions">
//               <CommandItem>Calendar</CommandItem>
//               <CommandItem>Search Emoji</CommandItem>
//               <CommandItem>Calculator</CommandItem>
//             </CommandGroup>
//           </CommandList>
//         </CommandDialog>
//       </>
//     );
//   },
// } satisfies Story;
//
// export const TypingInCombobox: Story = {
//   name: "when typing into the combobox, should filter results",
//   tags: ["!dev", "!autodocs"],
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const input = canvas.getByRole("combobox");
//
//     // Search for "calendar" which should return a single result
//     await userEvent.type(input, "calen", { delay: 100 });
//     expect(canvas.getAllByRole("option", { name: /calendar/i })).toHaveLength(
//       1,
//     );
//
//     await userEvent.clear(input);
//
//     // Search for "story" which should return multiple results
//     await userEvent.type(input, "se", { delay: 100 });
//     expect(canvas.getAllByRole("option").length).toBeGreaterThan(1);
//     expect(canvas.getAllByRole("option", { name: /search/i })).toHaveLength(1);
//
//     await userEvent.clear(input);
//
//     // Search for "story" which should return no results
//     await userEvent.type(input, "story", { delay: 100 });
//     expect(canvas.queryAllByRole("option", { hidden: false })).toHaveLength(0);
//     expect(canvas.getByText(/no results/i)).toBeVisible();
//   },
// };
