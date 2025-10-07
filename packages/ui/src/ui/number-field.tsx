import * as NumberFieldPrimitive from "@kobalte/core/number-field";
import ChevronDownIcon from "lucide-solid/icons/chevron-down";
import ChevronUpIcon from "lucide-solid/icons/chevron-up";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import { Button } from "./button.jsx";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field.jsx";
import { Input } from "./input.jsx";

const useNumberField = NumberFieldPrimitive.useNumberFieldContext;

function NumberField(
  props: ComponentProps<typeof NumberFieldPrimitive.Root<"div">>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <NumberFieldPrimitive.Root as={Field} data-slot="number-field" {...rest}>
      <div class={cn("grid gap-1.5 *:not-first:mt-2", local.class)}>
        {local.children}
      </div>
    </NumberFieldPrimitive.Root>
  );
}

function NumberFieldHiddenInput(
  props: ComponentProps<typeof NumberFieldPrimitive.HiddenInput>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NumberFieldPrimitive.HiddenInput
      data-slot="number-field-hidden-input"
      type="number"
      class={cn(local.class)}
      {...rest}
    />
  );
}

function NumberFieldGroup(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="number-field-group"
      class={cn(
        "relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-md border border-input text-sm shadow-xs outline-none transition-[color,box-shadow] data-focus-within:border-ring data-disabled:opacity-50 data-focus-within:ring-[3px] data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:border-destructive data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40",
        local.class,
      )}
      {...rest}
    />
  );
}

function NumberFieldInput(
  props: ComponentProps<typeof NumberFieldPrimitive.Input<"input">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NumberFieldPrimitive.Input
      as={Input}
      data-slot="number-field-input"
      class={cn(
        "flex-1 bg-background px-3 py-2 text-foreground tabular-nums",
        local.class,
      )}
      {...rest}
    />
  );
}

function NumberFieldIncrementTrigger(
  props: ComponentProps<typeof NumberFieldPrimitive.IncrementTrigger<"button">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NumberFieldPrimitive.IncrementTrigger
      as={Button}
      data-slot="number-field-increment-trigger"
      variant="outline"
      class={cn(
        // "-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-muted-foreground/80 text-sm transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <ChevronUpIcon>
        <title>Increment</title>
      </ChevronUpIcon>
    </NumberFieldPrimitive.IncrementTrigger>
  );
}

function NumberFieldDecrementTrigger(
  props: ComponentProps<typeof NumberFieldPrimitive.DecrementTrigger<"button">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NumberFieldPrimitive.DecrementTrigger
      as={Button}
      data-slot="number-field-decrement-trigger"
      variant="outline"
      class={cn(
        // "-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-muted-foreground/80 text-sm transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <ChevronDownIcon>
        <title>Decrement</title>
      </ChevronDownIcon>
    </NumberFieldPrimitive.DecrementTrigger>
  );
}

function NumberFieldLabel(
  props: ComponentProps<typeof NumberFieldPrimitive.Label>,
) {
  return (
    <NumberFieldPrimitive.Label
      as={FieldLabel}
      data-slot="number-field-label"
      {...props}
    />
  );
}

function NumberFieldDescription(
  props: ComponentProps<typeof NumberFieldPrimitive.Description>,
) {
  return (
    <NumberFieldPrimitive.Description
      as={FieldDescription}
      data-slot="number-field-description"
      {...props}
    />
  );
}

function NumberFieldError(
  props: ComponentProps<typeof NumberFieldPrimitive.ErrorMessage>,
) {
  return (
    <NumberFieldPrimitive.ErrorMessage
      as={FieldError}
      data-slot="number-field-error"
      {...props}
    />
  );
}

export {
  NumberField,
  NumberFieldHiddenInput,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrementTrigger,
  NumberFieldIncrementTrigger,
  // Forms
  NumberFieldLabel,
  NumberFieldDescription,
  NumberFieldError,
  // Hooks
  useNumberField,
};
