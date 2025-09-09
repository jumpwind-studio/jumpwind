import { expect, userEvent, waitFor } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/jumpwind/ui/tabs";

/**
 * A set of layered sections of content—known as tab panels—that are displayed
 * one at a time.
 */
const meta = {
  title: "@jumpwind/ui/Tabs",
  component: Tabs,
  argTypes: {},
  args: {
    defaultValue: "account",
    class: "w-96",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList class="grid grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the tabs.
 */
export const Default: Story = {};

export const ShouldChangeTabs: Story = {
  name: "when clicking a tab, should change the content",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, step }) => {
    const tabs = await canvas.findAllByRole("tab");

    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      if (!tab) continue;
      await step(`click the '${tab.innerText}' tab`, async () => {
        await userEvent.click(tab);
        await waitFor(() =>
          expect(tab).toHaveAttribute("aria-selected", "true"),
        );
        await expect(
          canvas.queryByRole("tabpanel", { name: tab.innerText }),
        ).toBeVisible();
      });

      await step("check other tabs are not selected", async () => {
        for (let j = 0; j < tabs.length; j++) {
          const otherTab = tabs[j];
          if (!otherTab) continue;
          if (j !== i) {
            expect(otherTab).toHaveAttribute("aria-selected", "false");
            expect(
              canvas.queryByRole("tabpanel", {
                name: otherTab.innerText,
              }),
            ).toBeNull();
          }
        }
      });
    }
  },
};
