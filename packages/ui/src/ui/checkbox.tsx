import * as CheckboxPrimitive from "@kobalte/core/checkbox";
import CheckIcon from "lucide-solid/icons/check";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import { labelVariants } from "./label.jsx"

const useCheckbox = CheckboxPrimitive.useCheckboxContext;

function Checkbox(props: ComponentProps<typeof CheckboxPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      class={cn(
        // "group relative flex items-start space-x-2",
        "group/checkbox flex flex-row items-center gap-2",
        local.class,
      )}
      {...rest}
    />
  );
}

function CheckboxInput(props: ComponentProps<typeof CheckboxPrimitive.Input>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CheckboxPrimitive.Input
      data-slot="checkbox-input"
      class={cn("peer", local.class)}
      {...rest}
    />
  );
}

function CheckboxControl(
  props: ComponentProps<typeof CheckboxPrimitive.Control>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CheckboxPrimitive.Control
      data-slot="checkbox-control"
      class={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs outline-none transition-shadow dark:bg-input/30",
        // focus-visible
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        // invalid
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        // checked
        "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        // disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        class="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon class="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Control>
  );
}

function CheckboxLabel(props: ComponentProps<typeof CheckboxPrimitive.Label>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CheckboxPrimitive.Label
      data-slot="checkbox-label"
      class={labelVariants({ variant: "label", class: local.class })}
      {...rest}
    />
  );
}

function CheckboxDescription(
  props: ComponentProps<typeof CheckboxPrimitive.Description>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CheckboxPrimitive.Description
      data-slot="checkbox-description"
      class={labelVariants({ variant: "description", class: local.class })}
      {...rest}
    />
  );
}

function CheckboxMessage(
  props: ComponentProps<typeof CheckboxPrimitive.ErrorMessage>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CheckboxPrimitive.ErrorMessage
      data-slot="checkbox-message"
      class={labelVariants({ variant: "error", class: local.class })}
      {...rest}
    />
  );
}

export {
  Checkbox,
  CheckboxInput,
  CheckboxControl,
  // Forms
  CheckboxLabel,
  CheckboxDescription,
  CheckboxMessage,
  // Hooks
  useCheckbox,
};
