import type * as RadioGroupPrimitive from "@kobalte/core/radio-group";
import { useStore } from "@tanstack/solid-form";
import { For, Show, splitProps } from "solid-js";
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupError,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemInput,
  RadioGroupItemLabel,
  RadioGroupLabel,
} from "../ui/radio-group.jsx";
import { useField } from "./context.js";
import type { FormProps } from "./types.js";
import { squash } from "./utils.js";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type FormRadioGroupProps =
  FormProps<RadioGroupPrimitive.RadioGroupRootOptions> & {
    items: Option[];
  };

export function FormRadioGroup(props: FormRadioGroupProps) {
  const [local, rest] = splitProps(props, [
    "field",
    "class",
    "label",
    "description",
    "items",
  ]);

  const field = useField<string>(() => local.field);
  const value = useStore(field().store, (state) => state.value);
  const errors = useStore(field().store, (state) => state.meta.errors);

  return (
    <RadioGroup
      data-slot="form-radio-group"
      name={field().name}
      value={value()}
      onChange={field().handleChange}
      onBlur={field().handleBlur}
      validationState={errors().length > 0 ? "invalid" : "valid"}
      class={local.class}
      {...rest}
    >
      <Show when={local.label}>
        <RadioGroupLabel data-slot="form-radio-group-label">
          {local.label}
        </RadioGroupLabel>
      </Show>
      <For each={local.items}>
        {(item) => (
          <RadioGroupItem value={item.value}>
            <RadioGroupItemInput />
            <RadioGroupItemControl />
            <RadioGroupItemLabel>{item.label}</RadioGroupItemLabel>
          </RadioGroupItem>
        )}
      </For>
      <div class="space-y-1 leading-none">
        <Show when={local.description}>
          <RadioGroupDescription data-slot="form-radio-group-description">
            {local.description}
          </RadioGroupDescription>
        </Show>
        <RadioGroupError data-slot="form-radio-group-error">
          {squash(errors())}
        </RadioGroupError>
      </div>
    </RadioGroup>
  );
}
