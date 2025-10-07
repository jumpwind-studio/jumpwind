import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createForm } from "../../form/context.js";
import { FormInput } from "../../form/input.jsx";

type InputStoryComponent = Component<ComponentProps<typeof FormInput>>;

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  title: "@jumpwind/form/Input",
  component: FormInput as InputStoryComponent,
  parameters: { layout: "padded" },
  argTypes: {},
  args: {
    disabled: false,
  },
  render: () => {
    const form = createForm(() => ({
      defaultValues: {
        username: "",
        password: "",
      },
    }));
    return (
      <form.AppForm>
        <div class="w-full max-w-md">
          <form.FieldSet>
            <form.FieldGroup>
              <form.AppField name="username">
                {(field) => (
                  <field.Input
                    label="Username"
                    description="Choose a unique username for your account."
                    placeholder="Max Leiter"
                  />
                )}
              </form.AppField>

              <form.AppField name="password">
                {(field) => (
                  <field.Input
                    type="password"
                    label="Password"
                    description="Must be at least 8 characters long."
                    placeholder="********"
                  />
                )}
              </form.AppField>
            </form.FieldGroup>
          </form.FieldSet>
        </div>
      </form.AppForm>
    );
  },
} satisfies Meta<InputStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the checkbox.
 */

export const DefaultStory: Story = { name: "Default" };
