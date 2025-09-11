import type { Component, ComponentProps } from "solid-js";
import { toast } from "solid-sonner";
import { action } from "storybook/actions";
import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "../../ui/button.jsx";
import { Toaster } from "../../ui/sonner.jsx";

type SonnerStoryComponent = Component<ComponentProps<typeof Toaster>>;

/**
 * An opinionated toast component for React.
 */
const meta = {
  title: "@jumpwind/ui/Sonner",
  component: Toaster as SonnerStoryComponent,
  argTypes: {
    position: {
      control: { type: "select" },
      options: [
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
        "top-center",
        "bottom-center",
      ],
    },
  },
  args: {
    position: "bottom-right",
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div class="flex min-h-96 items-center justify-center space-x-2">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: new Date().toLocaleString(),
            action: {
              label: "Undo",
              onClick: action("Undo clicked"),
            },
          })
        }
      >
        Show Toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
} satisfies Meta<SonnerStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the toaster.
 */
export const Default: Story = {};

export const ShouldShowToast: Story = {
  name: "when clicking Show Toast button, should show a toast",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);
    const triggerBtn = await canvasBody.findByRole("button", {
      name: /show/i,
    });

    await step("create a toast", async () => {
      await userEvent.click(triggerBtn);
      await waitFor(() =>
        expect(canvasBody.queryByRole("listitem")).toBeInTheDocument(),
      );
    });

    await step("create more toasts", async () => {
      await userEvent.click(triggerBtn);
      await userEvent.click(triggerBtn);
      await waitFor(() =>
        expect(canvasBody.getAllByRole("listitem")).toHaveLength(3),
      );
    });
  },
};

export const ShouldCloseToast: Story = {
  name: "when clicking the close button, should close the toast",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);
    const triggerBtn = await canvasBody.findByRole("button", {
      name: /show/i,
    });

    await step("create a toast", async () => {
      await userEvent.click(triggerBtn);
    });

    await step("close the toast", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /undo/i }),
      );
      await waitFor(() =>
        expect(canvasBody.queryByRole("listitem")).not.toBeInTheDocument(),
      );
    });
  },
};
