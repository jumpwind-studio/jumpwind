import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import { fn, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog.jsx";
import { Button } from "../../ui/button.jsx";

type AlertDialogStoryComponent = Component<
  PickPartial<ComponentProps<typeof AlertDialog>, "children">
>;

/**
 * A modal dialog that interrupts the user with important content and expects
 * a response.
 */
const meta = {
  title: "@jumpwind/ui/AlertDialog",
  component: AlertDialog as AlertDialogStoryComponent,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger as={Button} variant="outline">
        Show Dialog
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Meta<AlertDialogStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the alert dialog.
 */
export const ShouldOpenClose = {
  name: "when alert dialog trigger is pressed, should open the dialog and be able to close it",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, canvas, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("open the alert dialog", async () => {
      await userEvent.click(
        canvas.getByRole("button", {
          name: /open/i,
        }),
      );
    });

    await step("close the alert dialog", async () => {
      await userEvent.click(
        canvasBody.getByRole("button", {
          name: /cancel/i,
        }),
        { delay: 100 },
      );
    });
  },
} satisfies Story;

export const Default = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger as={Button} variant="outline">
        Show Dialog
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={fn()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Story;

export const Destructive = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger>
        <Button variant="destructive">Delete Item</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this item? This action cannot be
            undone and will permanently remove the item from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={fn()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Story;

export const LongContent = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger>
        <Button variant="outline">Terms & Conditions</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Terms and Conditions</AlertDialogTitle>
          <AlertDialogDescription>
            Please read and accept our terms and conditions before proceeding.
            By clicking "Accept", you agree to the following terms:
            <br />
            <br />• You will use this service responsibly and in accordance with
            all applicable laws • You understand that your data may be processed
            according to our privacy policy • You acknowledge that the service
            is provided "as is" without warranties • You agree to indemnify us
            against any claims arising from your use
            <br />
            <br />
            These terms are subject to change at any time. Continued use of the
            service constitutes acceptance of any modifications.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Decline</AlertDialogCancel>
          <AlertDialogAction onClick={fn()}>Accept</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Story;

export const CustomActions = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger>
        <Button>Save Changes</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save Changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. What would you like to do?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="destructive">Discard</AlertDialogCancel>
          <AlertDialogAction variant="outline" onClick={fn()}>
            Save Draft
          </AlertDialogAction>
          <AlertDialogAction onClick={fn()}>Save & Publish</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Story;

export const SimpleConfirmation = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger>
        <Button variant="secondary">Log Out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log Out</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay Logged In</AlertDialogCancel>
          <AlertDialogAction onClick={fn()}>Log Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Story;

export const WarningDialog = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger>
        <Button variant="secondary">
          <span class="mr-2">!</span>
          Clear Cache
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span class="flex items-center gap-2">
              <span class="text-yellow-500">!</span>
              Clear Browser Cache
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Clearing your browser cache will remove all stored data, including:
            <br />
            <ul class="mt-2 ml-4 list-disc space-y-1">
              <li>Saved login sessions</li>
              <li>User preferences</li>
              <li>Temporary files</li>
              <li>Offline data</li>
            </ul>
            <br />
            You may need to log in again to various websites.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Cache</AlertDialogCancel>
          <AlertDialogAction variant="secondary" onClick={fn()}>
            Clear Cache
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Story;

export const NoDescription = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger>
        <Button variant="outline">Quick Action</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={fn()}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Story;
