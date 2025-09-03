import * as NumberFieldPrimitive from "@kobalte/core/number-field";
import { cn } from "@/registry/jumpwind/lib/utils";
import ChevronDownIcon from "lucide-solid/icons/chevron-down";
import ChevronUpIcon from "lucide-solid/icons/chevron-up";
import { type ComponentProps, splitProps } from "solid-js";

const FormNumberFieldLabel = NumberFieldPrimitive.Label;
const FormNumberFieldDescription = NumberFieldPrimitive.Description;
const FormNumberFieldMessage = NumberFieldPrimitive.ErrorMessage;

function NumberFieldRoot(
  props: ComponentProps<typeof NumberFieldPrimitive.Root>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <NumberFieldPrimitive.Root data-slot="number-field" {...rest}>
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
      class={cn(local.class)}
      data-slot="number-field-hidden-input"
      type="number"
      {...rest}
    />
  );
}

function NumberFieldGroup(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-md border border-input text-sm shadow-xs outline-none transition-[color,box-shadow] data-focus-within:border-ring data-disabled:opacity-50 data-focus-within:ring-[3px] data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:border-destructive data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40",
        local.class,
      )}
      data-slot="number-field-group"
      {...rest}
    />
  );
}

function NumberFieldInput(
  props: ComponentProps<typeof NumberFieldPrimitive.Input>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NumberFieldPrimitive.Input
      class={cn(
        "flex-1 bg-background px-3 py-2 text-foreground tabular-nums",
        local.class,
      )}
      data-slot="number-field-input"
      {...rest}
    />
  );
}

function NumberFieldIncrementTrigger(
  props: ComponentProps<typeof NumberFieldPrimitive.IncrementTrigger>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NumberFieldPrimitive.IncrementTrigger
      class={cn(
        "-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-muted-foreground/80 text-sm transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      data-slot="number-field-increment-trigger"
      {...rest}
    >
      <ChevronUpIcon class="size-4">
        <title>Increment</title>
      </ChevronUpIcon>
    </NumberFieldPrimitive.IncrementTrigger>
  );
}

function NumberFieldDecrementTrigger(
  props: ComponentProps<typeof NumberFieldPrimitive.DecrementTrigger>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NumberFieldPrimitive.DecrementTrigger
      class={cn(
        "-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-muted-foreground/80 text-sm transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      data-slot="number-field-decrement-trigger"
      {...rest}
    >
      <ChevronDownIcon class="size-4">
        <title>Decrement</title>
      </ChevronDownIcon>
    </NumberFieldPrimitive.DecrementTrigger>
  );
}

/**
 * Preassembled number-field.
 */
export function NumberField(props: ComponentProps<typeof NumberFieldRoot>) {
  return (
    <NumberFieldRoot data-slot="number-field" {...props}>
      <NumberFieldGroup>
        <NumberFieldDecrementTrigger />
        <NumberFieldInput />
        <NumberFieldIncrementTrigger />
      </NumberFieldGroup>
    </NumberFieldRoot>
  );
}

export {
  NumberFieldRoot,
  NumberFieldHiddenInput,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrementTrigger,
  NumberFieldIncrementTrigger,
  // Forms
  FormNumberFieldLabel,
  FormNumberFieldDescription,
  FormNumberFieldMessage,
};
