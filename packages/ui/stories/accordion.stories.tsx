import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/jumpwind/ui/accordion";

const meta = {
  title: "@jumpwind/ui/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    multiple: {
      control: "boolean",
      description: "Whether multiple items can be open at once",
    },
    collapsible: {
      control: "boolean",
      description: "Whether items can be collapsed",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Accordion class="w-full max-w-md" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and uses semantic HTML.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  args: {
    collapsible: true,
  },
};

export const Multiple: Story = {
  render: (args) => (
    <Accordion class="w-full max-w-md" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
        <AccordionContent>
          Yes! When multiple is enabled, you can have several accordion items
          open at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          Simply set the `multiple` prop to true and users can expand multiple
          sections simultaneously.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What about performance?</AccordionTrigger>
        <AccordionContent>
          The accordion is built with performance in mind and handles multiple
          open items efficiently.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  args: {
    multiple: true,
    collapsible: true,
  },
};

export const SingleExpanded: Story = {
  render: (args) => (
    <Accordion class="w-full max-w-md" value="item-2" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting Started</AccordionTrigger>
        <AccordionContent>
          Learn the basics of using our accordion component in your project.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Configuration</AccordionTrigger>
        <AccordionContent>
          This item is expanded by default. You can control which items are open
          using the `value` prop on the Accordion root.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Advanced Usage</AccordionTrigger>
        <AccordionContent>
          Explore advanced patterns and customization options available.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  args: {
    collapsible: true,
  },
};

export const NonCollapsible: Story = {
  render: (args) => (
    <Accordion class="w-full max-w-md" value="item-1" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Always Open Section</AccordionTrigger>
        <AccordionContent>
          When collapsible is false, at least one item must remain open at all
          times.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Secondary Section</AccordionTrigger>
        <AccordionContent>
          Users can switch between items, but cannot collapse all items.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Section</AccordionTrigger>
        <AccordionContent>
          This ensures there's always content visible to the user.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  args: {
    collapsible: false,
  },
};

export const CustomContent: Story = {
  render: (args) => (
    <Accordion class="w-full max-w-lg" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Rich Content Example</AccordionTrigger>
        <AccordionContent>
          <div class="space-y-4">
            <p class="text-sm text-muted-foreground">
              Accordion content can contain any JSX elements:
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Lists and structured content</li>
              <li>Links and interactive elements</li>
              <li>Images and media</li>
            </ul>
            <div class="p-3 bg-muted rounded-md">
              <code class="text-xs">Code blocks and formatted text</code>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Interactive Elements</AccordionTrigger>
        <AccordionContent>
          <div class="space-y-3">
            <p class="text-sm">You can include interactive elements:</p>
            <div class="flex gap-2">
              <button class="px-3 py-1 bg-primary text-primary-foreground rounded-md text-xs">
                Button
              </button>
              <input
                type="text"
                placeholder="Input field"
                class="px-2 py-1 border rounded-md text-xs flex-1"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  args: {
    collapsible: true,
  },
};
