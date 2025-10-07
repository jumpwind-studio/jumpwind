import type * as RadioGroupPrimitive from "@kobalte/core/radio-group";
import { useStore } from "@tanstack/solid-form";
import { type Accessor, createMemo, For, on, Show, splitProps } from "solid-js";
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from "../ui/field.jsx";
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
import type { FormProps } from "./types.js";
import { squash, useField } from "./utils.js";

type Item = {
  label: string;
  value: string;
  disabled?: boolean;
};

function isItems(items: string[] | Item[]): items is Item[] {
  return (
    items.length > 0 &&
    typeof items[0] === "object" &&
    items[0] !== null &&
    "label" in items[0] &&
    "value" in items[0]
  );
}

function resolveItems(items: Accessor<string[] | Item[]>) {
  return createMemo<Item[]>(
    on(items, (items) =>
      isItems(items)
        ? items
        : items.map((item) => ({
            value: item,
            label: String(item),
            disabled: false,
          })),
    ),
  );
}

export type FormRadioGroupProps = FormProps<
  RadioGroupPrimitive.RadioGroupRootOptions,
  string
> & {
  items: string[] | Item[];
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
  const items = resolveItems(() => local.items);

  return (
    <FieldSet>
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
          <RadioGroupLabel as={FieldLabel} data-slot="form-radio-group-label">
            {local.label}
          </RadioGroupLabel>
        </Show>
        <Show when={local.description}>
          <RadioGroupDescription
            as={FieldDescription}
            data-slot="form-radio-group-description"
          >
            {local.description}
          </RadioGroupDescription>
        </Show>
        <For each={items()}>
          {(item) => (
            <RadioGroupItem value={item.value}>
              <RadioGroupItemInput />
              <RadioGroupItemControl />
              <RadioGroupItemLabel as={FieldLabel}>
                {item.label}
              </RadioGroupItemLabel>
            </RadioGroupItem>
          )}
        </For>
        <RadioGroupError as={FieldError} data-slot="form-radio-group-error">
          {squash(errors())}
        </RadioGroupError>
      </RadioGroup>
    </FieldSet>
  );
}
