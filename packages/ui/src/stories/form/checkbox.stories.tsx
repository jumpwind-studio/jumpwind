import type { PickPartial } from "@jumpwind/utils";
import type { Component, ComponentProps } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { FormCheckbox } from "../../form/checkbox.jsx";
import { createForm } from "../../form/context.js";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../../ui/field.jsx";

type CheckboxStoryComponent = Component<
  PickPartial<ComponentProps<typeof FormCheckbox>, "children">
>;

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  title: "@jumpwind/form/Checkbox",
  component: FormCheckbox as CheckboxStoryComponent,
  parameters: { layout: "padded" },
  argTypes: {},
  args: {
    disabled: false,
  },
  render: () => {
    const form = createForm(() => ({
      defaultValues: {
        hard: true,
        external: false,
        media: false,
        servers: false,
        sync: true,
      },
    }));
    return (
      <form.AppForm>
        <div class="w-full max-w-md">
          <FieldGroup>
            <FieldSet>
              <FieldLegend variant="label">
                Show these items on the desktop
              </FieldLegend>
              <FieldDescription>
                Select the items you want to show on the desktop.
              </FieldDescription>
              <FieldGroup class="gap-3">
                <form.AppField name="hard">
                  {(field) => (
                    <form.FieldRoot orientation="horizontal">
                      <field.Checkbox label="Hard disks" />
                    </form.FieldRoot>
                  )}
                </form.AppField>
                <form.AppField name="external">
                  {(field) => (
                    <form.FieldRoot orientation="horizontal">
                      <field.Checkbox label="External disks" />
                    </form.FieldRoot>
                  )}
                </form.AppField>
                <form.AppField name="media">
                  {(field) => (
                    <form.FieldRoot orientation="horizontal">
                      <field.Checkbox label="CDs, DVDs, and iPods" />
                    </form.FieldRoot>
                  )}
                </form.AppField>
                <form.AppField name="servers">
                  {(field) => (
                    <form.FieldRoot orientation="horizontal">
                      <field.Checkbox label="Connected servers" />
                    </form.FieldRoot>
                  )}
                </form.AppField>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <form.AppField name="sync">
              {(field) => (
                <form.FieldRoot orientation="vertical">
                  <field.Checkbox
                    label="Sync Desktop & Documents folders"
                    description="Your Desktop & Documents folders are being synced with iCloud
                  Drive. You can access them from other devices."
                  />
                </form.FieldRoot>
              )}
            </form.AppField>
          </FieldGroup>
        </div>
      </form.AppForm>
    );
  },
} satisfies Meta<CheckboxStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the checkbox.
 */

export const DefaultStory: Story = { name: "Default" };

export const SimpleStory: Story = {
  name: "Simple",
  render: (args) => {
    const form = createForm(() => ({
      defaultValues: {
        terms: false,
      },
    }));
    return (
      <form.AppForm>
        <form.AppField name="terms">
          {(field) => (
            <field.Checkbox label="Accept terms and conditions" {...args} />
          )}
        </form.AppField>
      </form.AppForm>
    );
  },
} satisfies Story;
