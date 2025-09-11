import type * as RadioGroupPrimitive from "@kobalte/core/radio-group";
import { type AnyFieldApi, useStore } from "@tanstack/solid-form";
import { For, Show, splitProps } from "solid-js";
import {
  FieldDescription,
  FieldLabel,
  FieldMessage,
} from "../form/field.jsx"
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupErrorMessage,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemInput,
  RadioGroupItemLabel,
  RadioGroupLabel,
} from "../ui/radio-group.jsx"

export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type FormRadioGroupProps<
  TOption extends Option,
  TField extends AnyFieldApi = AnyFieldApi,
> = RadioGroupPrimitive.RadioGroupRootOptions & {
  field: TField;
  items: TOption<InferFieldType<TField>>[];
  class?: string;
  description?: string;
  label?: string;
};

export function FormRadioGroup<TField extends AnyFieldApi = AnyFieldApi>(
  props: FormRadioGroupProps<TField>,
) {
  const [local, rest] = splitProps(props, [
    "field",
    "class",
    "label",
    "description",
    "items",
  ]);

  const value = useStore(local.field.store, (state) => state.value);
  const errors = useStore(local.field.store, (state) => state.meta.errors);
  const hasError = () => errors()?.length > 0;
  const firstError = () => errors().at(0);
  const validationState = () => (hasError() ? "invalid" : "valid");

  return (
    <RadioGroup
      data-slot="form-radio-group"
      name={local.field.name}
      value={local.field.state.value}
      onChange={local.field.handleChange}
      onBlur={local.field.handleBlur}
      validationState={validationState()}
      class={local.class}
      {...rest}
    >
      <Show when={local.label}>
        <RadioGroupLabel as={FieldLabel} data-slot="form-radio-group-label">
          {local.label}
        </RadioGroupLabel>
      </Show>
      <For each={local.items}>
        {(item) => (
          <RadioGroupItem value={item.value}>
            <RadioGroupItemInput aria-label={local.field.name} />
            <RadioGroupItemControl />
            <RadioGroupItemLabel>{item.label}</RadioGroupItemLabel>
          </RadioGroupItem>
        )}
      </For>
      <div class="space-y-1 leading-none">
        <Show when={local.description}>
          <RadioGroupDescription
            as={FieldDescription}
            data-slot="form-radio-group-description"
          >
            {local.description}
          </RadioGroupDescription>
        </Show>
        <RadioGroupErrorMessage
          as={FieldMessage}
          data-slot="form-radio-group-error-message"
        >
          {firstError()}
        </RadioGroupErrorMessage>
      </div>
    </RadioGroup>
  );
}
