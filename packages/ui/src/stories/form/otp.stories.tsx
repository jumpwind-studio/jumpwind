import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createForm } from "../../form/context.js";
import { FormOtp } from "../../form/otp.jsx";

type OtpStoryComponent = Component<
  PickPartial<ComponentProps<typeof FormOtp>, "children">
>;

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  title: "@jumpwind/form/Otp",
  component: FormOtp as OtpStoryComponent,
  parameters: { layout: "padded" },
  argTypes: {},
  args: {},
  render: () => {
    const form = createForm(() => ({
      defaultValues: {
        value: "",
      },
    }));
    return (
      <form.AppForm>
        <form.AppField name="value">
          {(field) => (
            <form.FieldRoot orientation="vertical">
              <field.Otp
                label="One-time password"
                class="flex flex-col items-start"
                description="Enter the code sent to f*****@***"
              />
            </form.FieldRoot>
          )}
        </form.AppField>
      </form.AppForm>
    );
  },
} satisfies Meta<OtpStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the checkbox.
 */

export const DefaultStory: Story = { name: "Default" };
