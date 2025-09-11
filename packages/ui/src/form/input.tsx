import type * as TextFieldPrimitive from "@kobalte/core/text-field";
import { useStore } from "@tanstack/solid-form";
import { type JSX, Show, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import {
  TextField,
  TextFieldDescription,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
  TextFieldTextarea,
} from "../ui/text-field.jsx";
import { FieldApi, useField } from "./context.jsx";
import { squash } from "./utils.js";

export interface FormInputProps<TMultiline extends boolean = false>
  extends TextFieldPrimitive.TextFieldRootOptions {
  field: FieldApi<string>;
  class?: string;
  children?: JSX.Element;
  label?: string;
  description?: string;
  multiline?: TMultiline;
}

export function FormInput<TMultiline extends boolean = false>(
  props: FormInputProps<TMultiline>,
) {
  const [local, rest] = splitProps(props, [
    "field",
    "class",
    "children",
    "label",
    "description",
    "multiline",
  ]);

  const field = useField<string>(() => local.field);
  const value = useStore(field().store, (state) => state.value);
  const errors = useStore(field().store, (state) => state.meta.errors);

  return (
    <TextField
      data-slot="form-input"
      name={field().name}
      value={value()}
      onChange={field().handleChange}
      onBlur={field().handleBlur}
      validationState={errors().length > 0 ? "invalid" : "valid"}
      class={cn("group relative grid gap-1.5", local.class)}
      {...rest}
    >
      <Show when={local.label}>
        <TextFieldLabel data-slot="form-input-label">
          {local.label}
        </TextFieldLabel>
      </Show>
      <Show
        fallback={
          <TextFieldInput
            data-slot="form-input-input"
            name={local.field.name}
            aria-label={local.field.name}
          />
        }
        when={local.multiline}
      >
        <TextFieldTextarea
          data-slot="form-input-textarea"
          name={local.field.name}
          aria-label={local.field.name}
          autoResize
        />
      </Show>
      {local.children}
      <Show when={local.description}>
        <TextFieldDescription data-slot="form-input-description">
          {local.description}
        </TextFieldDescription>
      </Show>
      <TextFieldErrorMessage data-slot="form-input-error-message">
        {squash(errors())}
      </TextFieldErrorMessage>
    </TextField>
  );
}
