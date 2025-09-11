import type * as TextFieldPrimitive from "@kobalte/core/text-field";
import { type AnyFieldApi, useStore } from "@tanstack/solid-form";
import { type JSX, Show, splitProps } from "solid-js";
import {
  FieldDescription,
  FieldLabel,
  FieldMessage,
} from "@/registry/jumpwind/form/field";
import { cn } from "../lib/utils.js";
import {
  TextField,
  TextFieldDescription,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
  TextFieldTextarea,
} from "@/registry/jumpwind/ui/text-field";

export interface FormInputProps<
  TField extends AnyFieldApi = AnyFieldApi,
  TMultiline extends boolean = false,
> extends TextFieldPrimitive.TextFieldRootOptions {
  field: TField;
  class?: string;
  children?: JSX.Element;
  label?: string;
  description?: string;
  multiline?: TMultiline;
}

export function FormInput<
  TField extends AnyFieldApi = AnyFieldApi,
  TMultiline extends boolean = false,
>(props: FormInputProps<TField, TMultiline>) {
  const [local, rest] = splitProps(props, [
    "field",
    "class",
    "children",
    "label",
    "description",
    "multiline",
  ]);

  const errors = useStore(local.field.store, (state) => state.meta.errors);
  const hasError = () => errors()?.length > 0;
  const firstError = () => errors().at(0);
  const validationState = () => (hasError() ? "invalid" : "valid");

  return (
    <TextField
      data-slot="form-input"
      name={local.field.name}
      value={local.field.state.value}
      onChange={local.field.handleChange}
      onBlur={local.field.handleBlur}
      validationState={validationState()}
      class={cn("group relative grid gap-1.5", local.class)}
      {...rest}
    >
      <Show when={local.label}>
        <TextFieldLabel as={FieldLabel} data-slot="form-input-label">
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
        <TextFieldDescription
          as={FieldDescription}
          data-slot="form-input-description"
        >
          {local.description}
        </TextFieldDescription>
      </Show>
      <TextFieldErrorMessage as={FieldMessage} data-slot="form-input-message">
        {firstError()}
      </TextFieldErrorMessage>
    </TextField>
  );
}
