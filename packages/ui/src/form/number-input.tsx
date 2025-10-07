import type * as NumberFieldPrimitive from "@kobalte/core/number-field";
import { useStore } from "@tanstack/solid-form";
import { Show, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import { ButtonGroup } from "../ui/button-group.jsx";
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldDescription,
  NumberFieldError,
  NumberFieldHiddenInput,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldLabel,
} from "../ui/number-field.jsx";
import type { FormProps } from "./types.js";
import { squash, useField } from "./utils.js";

export interface FormNumberInputProps
  extends FormProps<
    NumberFieldPrimitive.NumberFieldRootOptions,
    number | string
  > {}

export function FormNumberInput(props: FormNumberInputProps) {
  const [local, rest] = splitProps(props, [
    "field",
    "class",
    "label",
    "description",
  ]);

  const field = useField<number | string>(() => local.field);
  const value = useStore(field().store, (state) => state.value);
  const errors = useStore(field().store, (state) => state.meta.errors);

  return (
    <NumberField
      data-slot="form-number-input"
      name={field().name}
      value={value()}
      onChange={field().handleChange}
      onBlur={field().handleBlur}
      validationState={errors().length > 0 ? "invalid" : "valid"}
      class={cn("group relative grid gap-1", local.class)}
      {...rest}
    >
      <Show when={local.label}>
        <NumberFieldLabel data-slot="form-number-input-label">
          {local.label}
        </NumberFieldLabel>
      </Show>
      <Show when={local.description}>
        <NumberFieldDescription data-slot="form-number-input-description">
          {local.description}
        </NumberFieldDescription>
      </Show>
      <NumberFieldHiddenInput />
      <ButtonGroup>
        <NumberFieldInput />
        <NumberFieldIncrementTrigger />
        <NumberFieldDecrementTrigger />
      </ButtonGroup>
      <NumberFieldError data-slot="form-number-input-error">
        {squash(errors())}
      </NumberFieldError>
    </NumberField>
  );
}
