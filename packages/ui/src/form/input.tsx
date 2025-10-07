import type * as TextFieldPrimitive from "@kobalte/core/text-field";
import { useStore } from "@tanstack/solid-form";
import { type JSX, Show, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import {
  TextField,
  TextFieldDescription,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "../ui/text-field.jsx";
import type { FormProps } from "./types.js";
import { squash, useField } from "./utils.js";

export interface FormInputProps
  extends FormProps<TextFieldPrimitive.TextFieldRootOptions> {
  placeholder?: string;
  autocomplete?: JSX.HTMLAutocomplete;
  type?: JSX.InputHTMLAttributes<HTMLInputElement>["type"];
}

export function FormInput(props: FormInputProps) {
  const [local, rest] = splitProps(props, [
    "field",
    "class",
    "label",
    "description",
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
      <TextFieldInput data-slot="form-input-input" aria-label={local.label} />
      <Show when={local.description}>
        <TextFieldDescription data-slot="form-input-description">
          {local.description}
        </TextFieldDescription>
      </Show>
      <TextFieldError data-slot="form-input-error">
        {squash(errors())}
      </TextFieldError>
    </TextField>
  );
}
