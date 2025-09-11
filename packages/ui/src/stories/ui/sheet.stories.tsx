import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "../../ui/button.jsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet.jsx";

type SheetStoryComponent = Component<
  PickPartial<ComponentProps<typeof Sheet>, "children">
>;

/**
 * Extends the Dialog component to display content that complements the main
 * content of the screen.
 */
const meta = {
  title: "@jumpwind/ui/Sheet",
  component: Sheet as SheetStoryComponent,
  argTypes: {
    side: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "radio",
      },
    },
  },
  args: {
    side: "right",
  },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger as={Button} variant="outline">
        Open
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose as={Button} variant="outline">
            Cancel
          </SheetClose>
          <SheetClose as={Button}>Submit</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<SheetStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the sheet.
 */
export const Default: Story = {};

export const ShouldOpenCloseWithSubmit: Story = {
  name: "when clicking Submit button, should close the sheet",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("open the sheet", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      const sheet = await canvasBody.findByRole("dialog");
      expect(sheet).toBeInTheDocument();
      expect(sheet).toHaveAttribute("data-state", "open");
    });

    await step("close the sheet", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /submit/i }),
      );
      expect(await canvasBody.findByRole("dialog")).toHaveAttribute(
        "data-state",
        "closed",
      );
    });
  },
};

export const ShouldOpenCloseWithCancel: Story = {
  name: "when clicking Cancel button, should close the sheet",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("open the sheet", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      const sheet = await canvasBody.findByRole("dialog");
      expect(sheet).toBeInTheDocument();
      expect(sheet).toHaveAttribute("data-state", "open");
    });

    await step("close the sheet", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /cancel/i }),
      );
      expect(await canvasBody.findByRole("dialog")).toHaveAttribute(
        "data-state",
        "closed",
      );
    });
  },
};

export const ShouldOpenCloseWithClose: Story = {
  name: "when clicking Close icon, should close the sheet",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("open the sheet", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      const sheet = await canvasBody.findByRole("dialog");
      expect(sheet).toBeInTheDocument();
      expect(sheet).toHaveAttribute("data-state", "open");
    });

    await step("close the sheet", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /close/i }),
      );
      expect(await canvasBody.findByRole("dialog")).toHaveAttribute(
        "data-state",
        "closed",
      );
    });
  },
};
