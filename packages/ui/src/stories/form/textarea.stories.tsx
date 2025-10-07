import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createForm } from "../../form/context.js";
import { FormTextarea } from "../../form/textarea.jsx";

type TextareaStoryComponent = Component<ComponentProps<typeof FormTextarea>>;

/**
 * An input where the user selects a value from within a given range.
 */
const meta = {
  title: "@jumpwind/form/Textarea",
  component: FormTextarea as TextareaStoryComponent,
  parameters: { layout: "padded" },
  args: {
    label: "Your Feedback",
    description: "All submissions are anonymous",
    placeholder: "Add any additional comments",
  },
  render: (args) => {
    const form = createForm(() => ({
      defaultValues: {
        value: "",
      },
    }));
    return (
      <form.AppForm>
        <form.AppField name="value">
          {(field) => <field.Textarea {...args} />}
        </form.AppField>
      </form.AppForm>
    );
  },
} satisfies Meta<TextareaStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the slider.
 */
export const Default: Story = {};
