import type * as CheckboxPrimitive from "@kobalte/core/checkbox";
import { useStore } from "@tanstack/solid-form";
import { Show, splitProps } from "solid-js";
import {
  Checkbox,
  CheckboxControl,
  CheckboxDescription,
  CheckboxError,
  CheckboxInput,
  CheckboxLabel,
} from "../ui/checkbox.jsx";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field.jsx";
import type { FormProps } from "./types.js";
import { squash, useField } from "./utils.js";

export interface FormCheckboxProps
  extends FormProps<CheckboxPrimitive.CheckboxRootOptions, boolean> {}

export function FormCheckbox(props: FormCheckboxProps) {
  const [local, rest] = splitProps(props, [
    "field",
    "class",
    "label",
    "description",
  ]);

  const field = useField<boolean>(() => local.field);
  const value = useStore(field().store, (state) => state.value);
  const errors = useStore(field().store, (state) => state.meta.errors);

  return (
    <Checkbox
      data-slot="form-checkbox"
      name={field().name}
      checked={value()}
      onChange={field().handleChange}
      onBlur={field().handleBlur}
      validationState={errors().length > 0 ? "invalid" : "valid"}
      class={local.class}
      {...rest}
    >
      <Field orientation="horizontal">
        <CheckboxInput data-slot="form-checkbox-input" />
        <CheckboxControl data-slot="form-checkbox-control" />
        <FieldContent>
          <Show when={local.label}>
            <CheckboxLabel as={FieldLabel} data-slot="form-checkbox-label">
              {local.label}
            </CheckboxLabel>
          </Show>
          <Show when={local.description}>
            <CheckboxDescription
              as={FieldDescription}
              data-slot="form-checkbox-description"
            >
              {local.description}
            </CheckboxDescription>
          </Show>
          <CheckboxError as={FieldError} data-slot="form-checkbox-error">
            {squash(errors())}
          </CheckboxError>
        </FieldContent>
      </Field>
    </Checkbox>
  );
}
