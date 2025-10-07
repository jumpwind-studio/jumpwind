import type * as TextFieldPrimitive from "@kobalte/core/text-field";
import { useStore } from "@tanstack/solid-form";
import { Show, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import { FieldDescription, FieldError, FieldLabel } from "../ui/field.jsx";
import { InputGroup } from "../ui/input-group.jsx";
import {
  TextField,
  TextFieldDescription,
  TextFieldError,
  TextFieldLabel,
  TextFieldTextarea,
} from "../ui/text-field.jsx";
import type { FormProps } from "./types.js";
import { squash, useField } from "./utils.js";

export interface FormTextareaProps
  extends FormProps<TextFieldPrimitive.TextFieldRootOptions, string> {
  placeholder?: string;
}

export function FormTextarea(props: FormTextareaProps) {
  const [local, rest] = splitProps(props, [
    "field",
    "class",
    "label",
    "description",
    "value",
    "placeholder",
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
      class={cn("", local.class)}
      {...rest}
    >
      <Show when={local.label}>
        <TextFieldLabel as={FieldLabel} data-slot="form-textarea-label">
          {local.label}
        </TextFieldLabel>
      </Show>
      <InputGroup>
        <TextFieldTextarea
          data-slot="form-textarea-textarea"
          aria-label={local.label}
          placeholder={local.placeholder}
          autoResize
        />
      </InputGroup>
      <Show when={local.description}>
        <TextFieldDescription
          as={FieldDescription}
          data-slot="form-textarea-description"
        >
          {local.description}
        </TextFieldDescription>
      </Show>
      <TextFieldError as={FieldError} data-slot="form-textarea-error">
        {squash(errors())}
      </TextFieldError>
    </TextField>
  );
}
