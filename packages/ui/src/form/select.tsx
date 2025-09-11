import type * as SelectPrimitive from "@kobalte/core/select";
import { useStore } from "@tanstack/solid-form";
import { Show, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import {
  Select,
  SelectContent,
  SelectDescription,
  SelectErrorMessage,
  SelectHiddenSelect,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import { type FieldApi, useField } from "./context.jsx";
import { squash } from "./utils.jsx";

export type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type FormSelectProps = SelectPrimitive.SelectRootOptions<
  Option,
  never
> & {
  field?: FieldApi<string>;
  class?: string;
  description?: string;
  label?: string;
};

export function FormSelect(props: FormSelectProps) {
  const [local, _, rest] = splitProps(
    props,
    ["field", "class", "label", "description", "options"],
    ["defaultValue", "value", "onChange"],
  );

  const field = useField<string>(() => local.field);
  const value = useStore(field().store, (state) =>
    local.options.find((option) => option.value === state.value),
  );
  const errors = useStore(field().store, (state) => state.meta.errors);

  return (
    <Select<Option>
      data-slot="form-select"
      {...rest}
      name={field().name}
      options={local.options}
      optionValue="value"
      optionTextValue="label"
      optionDisabled="disabled"
      value={value()}
      onChange={(option) => {
        if (!option) return;
        field().handleChange(() => option.value);
      }}
      onBlur={field().handleBlur}
      validationState={errors().length > 0 ? "invalid" : "valid"}
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.textValue}</SelectItem>
      )}
      class={cn("group relative grid max-w-52 gap-2", local.class)}
      multiple={false}
    >
      <Show when={local.label}>
        <SelectLabel data-slot="form-select-label">{local.label}</SelectLabel>
      </Show>
      <Show when={local.description}>
        <SelectDescription data-slot="form-select-description">
          {local.description}
        </SelectDescription>
      </Show>
      <SelectHiddenSelect />
      <SelectTrigger data-slot="form-select-trigger" class="max-w-52">
        <SelectValue<Option>>
          {(state) => state.selectedOption()?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent<Option> data-slot="form-select-content" />
      <SelectErrorMessage data-slot="form-select-error-message">
        {squash(errors())}
      </SelectErrorMessage>
    </Select>
  );
}
