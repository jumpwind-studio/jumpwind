import type * as SelectPrimitive from "@kobalte/core/select";
import { useStore } from "@tanstack/solid-form";
import { type Accessor, createMemo, on, Show, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import {
  Select,
  SelectContent,
  SelectDescription,
  SelectError,
  SelectHiddenSelect,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import type { FormProps } from "./types.js";
import { squash, useField } from "./utils.js";

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

function isOptions(items: (Option | string)[]): items is Option[] {
  return (
    items.length > 0 &&
    typeof items[0] === "object" &&
    items[0] !== null &&
    "label" in items[0] &&
    "value" in items[0]
  );
}

function isOption(value: Option | string): value is Option {
  return (
    typeof value === "object" &&
    value !== null &&
    "label" in value &&
    "value" in value
  );
}

function resolveOptions(items: Accessor<(Option | string)[]>) {
  return createMemo<Option[]>(
    on(items, (items) =>
      isOptions(items)
        ? items
        : items.map((item) =>
            isOption(item)
              ? item
              : {
                  value: item,
                  label: String(item),
                  disabled: false,
                },
          ),
    ),
  );
}

export type FormSelectProps = FormProps<
  Exclude<
    SelectPrimitive.SelectRootOptions<Option | string>,
    { multiple: true }
  >,
  string
>;

export function FormSelect(props: FormSelectProps) {
  const [local, _, rest] = splitProps(
    props,
    ["field", "class", "label", "description", "options"],
    ["defaultValue", "value", "onChange"],
  );

  const field = useField<string>(() => local.field);
  const options = resolveOptions(() => local.options);
  const value = useStore(field().store, (state) =>
    options().find((option) => option.value === state.value),
  );
  const errors = useStore(field().store, (state) => state.meta.errors);

  return (
    <Select<Option>
      data-slot="form-select"
      {...rest}
      name={field().name}
      options={options()}
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
      multiple={false}
      class={cn("group relative grid max-w-52 gap-2", local.class)}
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
      <SelectError data-slot="form-select-error">
        {squash(errors())}
      </SelectError>
    </Select>
  );
}
