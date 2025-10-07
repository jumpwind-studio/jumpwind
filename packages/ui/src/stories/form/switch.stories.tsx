import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createForm } from "../../form/context.js";
import { FormSwitch } from "../../form/switch.jsx";

type SwitchStoryComponent = Component<ComponentProps<typeof FormSwitch>>;

/**
 * An input where the user selects a value from within a given range.
 */
const meta = {
  title: "@jumpwind/form/Switch",
  component: FormSwitch as SwitchStoryComponent,
  parameters: { layout: "padded" },
  args: {
    defaultChecked: true,
    label: "Multi-factor authentication",
    description:
      "Enable multi-factor authentication. If you do not have a two-factor device, you can use a one-time code sent to your email.",
  },
  render: (args) => {
    const form = createForm(() => ({
      defaultValues: {
        mfa: args.defaultChecked,
      },
    }));
    return (
      <form.AppForm>
        <form.AppField name="mfa">
          {(field) => <field.Switch {...args} />}
        </form.AppField>
      </form.AppForm>
    );
  },
} satisfies Meta<SwitchStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the slider.
 */
export const Default: Story = {};
