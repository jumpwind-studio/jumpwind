import createControllableSignal from "@corvu/utils/create/controllableSignal";
import type * as SelectPrimitive from "@kobalte/core/select";
import { useStore } from "@tanstack/solid-form";
import { Show, splitProps } from "solid-js";
import { type FieldApi, useField } from "../form/context.jsx"
import {
  FieldDescription,
  FieldLabel,
  FieldMessage,
} from "../form/field.jsx"
import { squash } from "../form/utils.jsx"
import { cn } from "../lib/utils.js";
import {
  Select,
  SelectContent,
  SelectDescription,
  SelectHiddenSelect,
  SelectItem,
  SelectLabel,
  SelectMessage,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx"

export type Option<TValue extends string = string> = {
  value: TValue;
  label: string;
  disabled?: boolean;
};

type AnyOption = Option<any>;

type InferOptionValue<T extends AnyOption> = T extends Option<infer U>
  ? U
  : never;

export type FormSelectProps<TValue extends string = string> =
  SelectPrimitive.SelectRootOptions<Option<TValue>> & {
    field?: FieldApi<TValue>;
    class?: string;
    description?: string;
    label?: string;
    options: Option<TValue>[];
  };

export function FormSelect<TValue extends string = string>(
  props: FormSelectProps<TValue>,
) {
  const [local, rest] = splitProps(props, [
    "field",
    "class",
    "label",
    "description",
    "options",
  ]);

  const field = useField<TValue>(() => local.field);
  const errors = useStore(field().store, (state) => state.meta.errors);
  const [value, setValue] = createControllableSignal<Option<TValue>>({
    value: useStore(field().store, (state) =>
      local.options.find((option) => option.value === state.value),
    ),
    onChange: (value) => {
      const newValue = local.options.find(
        (option) => option.value === value.value,
      );
      return field().handleChange((prev) => {
        return newValue ? newValue.value : prev;
      });
    },
  });

  return (
    <Select
      data-slot="form-select"
      name={field().name}
      multiple={false}
      options={local.options}
      value={value()}
      onChange={setValue}
      onBlur={field().handleBlur}
      optionValue={(option) => option.value}
      optionTextValue={(option) => option.label}
      optionDisabled={(option) => option.disabled ?? false}
      validationState={errors().length > 0 ? "invalid" : "valid"}
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.textValue}</SelectItem>
      )}
      class={cn("group relative grid max-w-52 gap-2", local.class)}
      {...rest}
    >
      <Show when={local.label}>
        <SelectLabel as={FieldLabel} data-slot="form-select-label">
          {local.label}
        </SelectLabel>
      </Show>
      <Show when={local.description}>
        <SelectDescription
          as={FieldDescription}
          data-slot="form-select-description"
        >
          {local.description}
        </SelectDescription>
      </Show>
      <SelectHiddenSelect />
      <SelectTrigger data-slot="form-select-trigger" class="max-w-52">
        <SelectValue<Option<TValue>>>
          {(state) => state.selectedOption()?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent data-slot="form-select-content" />
      <SelectMessage as={FieldMessage} data-slot="form-select-message">
        {squash(errors())}
      </SelectMessage>
    </Select>
  );
}
