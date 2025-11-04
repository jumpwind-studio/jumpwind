import createOnce from "@corvu/utils/create/once";
import * as RadioGroupPrimitive from "@kobalte/core/radio-group";
import { useStore } from "@tanstack/solid-form";
import CircleIcon from "lucide-solid/icons/circle";
import {
  type Accessor,
  type ComponentProps,
  createMemo,
  For,
  on,
  Show,
  splitProps,
  untrack,
} from "solid-js";
import { cn } from "../lib/utils.js";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from "../ui/field.jsx";
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

// Radio Group

function FormRadioGroupRoot(
  props: ComponentProps<typeof RadioGroupPrimitive.Root>,
) {
  const [local, rest] = splitProps(props, ["field", "class"]);

  const field = useField<string>(() => local.field);
  const value = useStore(field().store, (state) => state.value);
  const validationState = useStore(field().store, (state) =>
    state.meta.errors.length > 0 ? "invalid" : "valid",
  );

  return (
    <RadioGroupPrimitive.Root
      data-slot="form-radio-group-root"
      name={field().name}
      value={value()}
      onChange={field().handleChange}
      onBlur={field().handleBlur}
      validationState={validationState()}
      class={cn("grid gap-3", local.class)}
      {...rest}
    />
  );
}

function FormRadioGroupLabel(
  props: ComponentProps<typeof RadioGroupPrimitive.Label>,
) {
  const [local, rest] = splitProps(props, ["children"]);

  const memoizedChildren = createOnce(() => local.children);

  return (
    <Show when={local.children !== undefined}>
      <RadioGroupPrimitive.Label data-slot="form-radio-group-label" {...rest}>
        {untrack(() => memoizedChildren()())}
      </RadioGroupPrimitive.Label>
    </Show>
  );
}

function FormRadioGroupDescription(
  props: ComponentProps<typeof RadioGroupPrimitive.Description>,
) {
  const [local, rest] = splitProps(props, ["children"]);

  const memoizedChildren = createOnce(() => local.children);

  return (
    <Show when={local.children !== undefined}>
      <RadioGroupPrimitive.Description
        data-slot="form-radio-group-description"
        {...rest}
      >
        {untrack(() => memoizedChildren()())}
      </RadioGroupPrimitive.Description>
    </Show>
  );
}

function FormRadioGroupError(
  props: ComponentProps<typeof RadioGroupPrimitive.ErrorMessage>,
) {
  const [local, rest] = splitProps(props, ["field"]);

  const field = useField<string>(() => local.field);

  const squashedErrors = useStore(field().store, (state) =>
    squash(state.meta.errors),
  );

  return (
    <RadioGroupPrimitive.ErrorMessage
      data-slot="form-radio-group-error"
      {...rest}
    >
      {squashedErrors()}
    </RadioGroupPrimitive.ErrorMessage>
  );
}

// Radio Item

function FormRadioItemRoot(
  props: ComponentProps<typeof RadioGroupPrimitive.Item>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.Item
      data-slot="form-radio-item-root"
      class={cn("flex items-center gap-x-2", local.class)}
      {...rest}
    />
  );
}

function FormRadioItemInput(
  props: ComponentProps<typeof RadioGroupPrimitive.ItemInput>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.ItemInput
      data-slot="form-radio-item-input"
      class={cn("peer", local.class)}
      {...rest}
    />
  );
}

function FormRadioItemControl(
  props: ComponentProps<typeof RadioGroupPrimitive.ItemControl>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.ItemControl
      data-slot="form-radio-item-control"
      class={cn(
        // Base
        "relative aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs outline-none transition-[color,box-shadow] dark:bg-input/30",
        // Focus-visible
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Invalid
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        local.class,
      )}
      {...rest}
    >
      <RadioGroupPrimitive.ItemIndicator data-slot="form-radio-item-indicator">
        <CircleIcon class="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-2 fill-primary" />
      </RadioGroupPrimitive.ItemIndicator>
    </RadioGroupPrimitive.ItemControl>
  );
}

function FormRadioItemLabel(
  props: ComponentProps<typeof RadioGroupPrimitive.ItemLabel>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.ItemLabel
      data-slot="form-radio-item-label"
      class={cn(
        "font-medium text-primary text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        local.class,
      )}
      {...rest}
    />
  );
}

function FormRadioItemField(
  props: FormProps<RadioGroupPrimitive.RadioGroupItemOptions>,
) {
  const [local, rest] = splitProps(props, ["class", "value", "label"]);

  return (
    <FormRadioItemRoot
      as={Field}
      data-slot="form-radio-item"
      value={local.value}
      class={local.class}
      {...rest}
    >
      <FormRadioItemInput />
      <FormRadioItemControl />
      <FormRadioItemLabel as={FieldLabel}>{local.label}</FormRadioItemLabel>
    </FormRadioItemRoot>
  );
}

function FormRadioGroupField(
  props: FormProps<RadioGroupPrimitive.RadioGroupRootOptions> & {
    items: string[] | Item[];
  },
) {
  const [local, rest] = splitProps(props, [
    "class",
    "label",
    "description",
    "items",
  ]);

  const items = resolveItems(() => local.items);

  return (
    <FormRadioGroupRoot
      as={FieldSet}
      data-slot="form-radio-group"
      class={local.class}
      {...rest}
    >
      <FormRadioGroupLabel as={FieldLabel}>{local.label}</FormRadioGroupLabel>
      <For each={items()}>{(item) => <FormRadioItemField {...item} />}</For>
      <FormRadioGroupDescription as={FieldDescription}>
        {local.description}
      </FormRadioGroupDescription>
      <FormRadioGroupError as={FieldError} />
    </FormRadioGroupRoot>
  );
}

export {
  // Group
  FormRadioGroupRoot,
  FormRadioGroupLabel,
  FormRadioGroupDescription,
  FormRadioGroupError,
  // Item
  FormRadioItemRoot,
  FormRadioItemInput,
  FormRadioItemLabel,
  FormRadioItemControl,
  // Field
  FormRadioGroupField,
  FormRadioItemField,
};
