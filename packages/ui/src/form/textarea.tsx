import type * as TextFieldPrimitive from "@kobalte/core/text-field";
import { useStore } from "@tanstack/solid-form";
import { Show, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import {
  TextField,
  TextFieldDescription,
  TextFieldError,
  TextFieldLabel,
  TextFieldTextarea,
} from "../ui/text-field.jsx";
import { useField } from "./context.js";
import type { FormProps } from "./types.js";
import { squash } from "./utils.js";

export interface FormTextareaProps
  extends FormProps<TextFieldPrimitive.TextFieldRootOptions> {}

export function FormTextarea(props: FormTextareaProps) {
  const [local, rest] = splitProps(props, [
    "field",
    "class",
    "label",
    "description",
    "value",
  ]);

  const field = useField<string>(() => local.field);
  const value = useStore(field().store, (state) => state.value);
  const errors = useStore(field().store, (state) => state.meta.errors);

  return (
    <TextField
      data-slot="form-textarea"
      name={field().name}
      value={value()}
      onChange={field().handleChange}
      onBlur={field().handleBlur}
      validationState={errors().length > 0 ? "invalid" : "valid"}
      class={cn("group relative grid gap-1", local.class)}
      {...rest}
    >
      <Show when={local.label}>
        <TextFieldLabel data-slot="form-input-label">
          {local.label}
        </TextFieldLabel>
      </Show>
      <TextFieldTextarea
        data-slot="form-input-textarea"
        aria-label={local.label}
        autoResize
      />
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
