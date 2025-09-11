import BellRingIcon from "lucide-solid/icons/bell-ring";
import { For } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "../../ui/button.jsx"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card.jsx"

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
  args: {},
  render: (args) => (
    <Card class="w-full max-w-sm" {...args}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Button variant="link">Dismiss</Button>
        </CardAction>
      </CardHeader>
      <CardContent class="grid gap-4">
        <For each={notifications}>
          {(notification) => (
            <div class="flex items-center gap-4">
              <BellRingIcon class="size-5" />
              <div>
                <p class="font-base text-sm">{notification.title}</p>
                <p class="text-muted-foreground text-sm">
                  {notification.description}
                </p>
              </div>
            </div>
          )}
        </For>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">Close</Button>
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
