import * as RadioGroupPrimitive from "@kobalte/core/radio-group";
// import DotIcon from "lucide-solid/icons/dot";
import CircleIcon from "lucide-solid/icons/circle";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import { labelVariants } from "@/registry/jumpwind/ui/label";

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
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      class={cn("flex items-center gap-x-2", local.class)}
      {...rest}
    >
      <RadioGroupPrimitive.ItemInput
        data-slot="radio-group-input"
        class="peer"
      />
      <RadioGroupPrimitive.ItemControl
        data-slot="radio-group-control"
        class={cn(
          "relative aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs outline-none transition-[color,box-shadow] dark:bg-input/30",
          // Focus-visible
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Invalid
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        )}
      >
        <RadioGroupPrimitive.ItemIndicator data-slot="radio-group-indicator">
          <CircleIcon class="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-2 fill-primary" />
        </RadioGroupPrimitive.ItemIndicator>
      </RadioGroupPrimitive.ItemControl>
      {local.children}
    </RadioGroupPrimitive.Item>
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
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.Label
      data-slot="radio-group-label"
      class={labelVariants({ variant: "label", class: local.class })}
      {...rest}
    />
  );
}

function RadioGroupDescription(
  props: ComponentProps<typeof RadioGroupPrimitive.Description>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.Description
      data-slot="radio-group-description"
      class={labelVariants({ variant: "description", class: local.class })}
      {...rest}
    />
  );
}

function RadioGroupErrorMessage(
  props: ComponentProps<typeof RadioGroupPrimitive.ErrorMessage>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.ErrorMessage
      data-slot="radio-group-error-message"
      class={labelVariants({ variant: "error", class: local.class })}
      {...rest}
    />
  );
}

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
  // Forms
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupErrorMessage,
  // Hooks
  useRadioGroup,
};
