import BellRingIcon from "lucide-solid/icons/bell-ring";
import { For } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "@/registry/jumpwind/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/jumpwind/ui/card";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

/**
 * Displays a card with header, content, and footer.
 */
const meta = {
  title: "@jumpwind/ui/Card",
  component: Card,
  argTypes: {},
  args: {
    class: "w-96",
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <For each={notifications}>
          {(notification) => (
            <div class="flex items-center gap-4">
              <BellRingIcon class="size-6" />
              <div>
                <p>{notification.title}</p>
                <p class="text-foreground/60">{notification.description}</p>
              </div>
            </div>
          )}
        </For>
      </CardContent>
      <CardFooter>
        <Button variant="link">Close</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the card.
 */
export const Default: Story = {};
