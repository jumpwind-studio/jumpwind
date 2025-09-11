import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import { expect, fn, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "@/registry/jumpwind/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/jumpwind/ui/drawer";

type DrawerStoryComponent = Component<
  PickPartial<ComponentProps<typeof Drawer>, "children">
>;

/**
 * A drawer component for React.
 */
const meta = {
  title: "@jumpwind/ui/Drawer",
  component: Drawer as DrawerStoryComponent,
  args: {
    onOpenChange: fn(),
  },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger as={Button} variant="outline">
        Open
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose class="rounded bg-primary px-4 py-2 text-primary-foreground">
            Submit
          </DrawerClose>
          <DrawerClose class="hover:underline">Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<DrawerStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the drawer.
 */
export const Default = {} satisfies Story;

export const ShouldOpenCloseWithSubmit = {
  name: "when clicking Submit button, should close the drawer",
  tags: ["!dev", "!autodocs"],
  play: async ({ args, canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("Open the drawer", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      await expect(args.onOpenChange).toHaveBeenCalled();

      const dialog = await canvasBody.findByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("data-state", "open");
    });

    await step("Close the drawer", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /submit/i }),
        { delay: 100 },
      );
      await expect(args.onOpenChange).toHaveBeenCalled();
      expect(await canvasBody.findByRole("dialog")).toHaveAttribute(
        "data-state",
        "closed",
      );
    });
  },
} satisfies Story;

export const ShouldOpenCloseWithCancel = {
  name: "when clicking Cancel button, should close the drawer",
  tags: ["!dev", "!autodocs"],
  play: async ({ args, canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("Open the drawer", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      await expect(args.onOpenChange).toHaveBeenCalled();

      const dialog = await canvasBody.findByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("data-state", "open");
    });

    await step("Close the drawer", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /cancel/i }),
        { delay: 100 },
      );
      await expect(args.onOpenChange).toHaveBeenCalled();
      expect(await canvasBody.findByRole("dialog")).toHaveAttribute(
        "data-state",
        "closed",
      );
    });
  },
} satisfies Story;
