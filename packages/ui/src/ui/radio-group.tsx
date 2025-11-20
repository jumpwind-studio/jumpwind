import { CircleIcon } from "@jumpwind/icons";
import * as RadioGroupPrimitive from "@kobalte/core/radio-group";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

const useRadioGroup = RadioGroupPrimitive.useRadioGroupContext;

function RadioGroup(props: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      class={cn("grid gap-3", local.class)}
      {...rest}
    />
  );
}

function RadioGroupItem(
  props: ComponentProps<typeof RadioGroupPrimitive.Item>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      class={cn("flex items-center gap-x-2", local.class)}
      {...rest}
    />
  );
}

function RadioGroupItemInput(
  props: ComponentProps<typeof RadioGroupPrimitive.ItemInput>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.ItemInput
      data-slot="radio-group-input"
      class={cn("peer", local.class)}
      {...rest}
    />
  );
}

function RadioGroupItemControl(
  props: ComponentProps<typeof RadioGroupPrimitive.ItemControl>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.ItemControl
      data-slot="radio-group-control"
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
      <RadioGroupPrimitive.ItemIndicator data-slot="radio-group-indicator">
        <CircleIcon class="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-2 fill-primary" />
      </RadioGroupPrimitive.ItemIndicator>
    </RadioGroupPrimitive.ItemControl>
  );
}

function RadioGroupItemLabel(
  props: ComponentProps<typeof RadioGroupPrimitive.ItemLabel>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.ItemLabel
      data-slot="radio-group-item-label"
      class={cn(
        "font-medium text-primary text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        local.class,
      )}
      {...rest}
    />
  );
}

function RadioGroupLabel(
  props: ComponentProps<typeof RadioGroupPrimitive.Label>,
) {
  return <RadioGroupPrimitive.Label data-slot="radio-group-label" {...props} />;
}

function RadioGroupDescription(
  props: ComponentProps<typeof RadioGroupPrimitive.Description>,
) {
  return (
    <RadioGroupPrimitive.Description
      data-slot="radio-group-description"
      {...props}
    />
  );
}

function RadioGroupError(
  props: ComponentProps<typeof RadioGroupPrimitive.ErrorMessage>,
) {
  return (
    <RadioGroupPrimitive.ErrorMessage
      data-slot="radio-group-error"
      {...props}
    />
  );
}

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemInput,
  RadioGroupItemControl,
  RadioGroupItemLabel,
  // Forms
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupError,
  // Hooks
  useRadioGroup,
};
