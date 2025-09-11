import type * as CheckboxPrimitive from "@kobalte/core/checkbox";
import { useStore } from "@tanstack/solid-form";
import { Show, splitProps } from "solid-js";
import { type FieldApi, useField } from "../form/context.jsx"
import {
  FieldDescription,
  FieldLabel,
  FieldMessage,
} from "../form/field.jsx"
import { squash } from "../form/utils.jsx"
import {
  Checkbox,
  CheckboxControl,
  CheckboxDescription,
  CheckboxInput,
  CheckboxLabel,
  CheckboxMessage,
} from "../ui/checkbox.jsx"

export interface FormCheckboxProps
  extends CheckboxPrimitive.CheckboxRootOptions {
  field: FieldApi<boolean>;
  class?: string;
  label?: string;
  description?: string;
}

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
      <CheckboxInput data-slot="form-checkbox-input" />
      <CheckboxControl data-slot="form-checkbox-control" />
      <div class="space-y-1 leading-none">
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
        <CheckboxMessage as={FieldMessage} data-slot="form-checkbox-message">
          {squash(errors())}
        </CheckboxMessage>
      </div>
    </Checkbox>
  );
}
