import * as TextFieldPrimitive from "@kobalte/core/text-field";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

const useTextField = TextFieldPrimitive.useTextFieldContext;

function TextField(props: ComponentProps<typeof TextFieldPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TextFieldPrimitive.Root
      data-slot="text-field"
      class={cn("space-y-1", local.class)}
      {...rest}
    />
  );
}

const TextFieldInput = (
  props: ComponentProps<typeof TextFieldPrimitive.Input<"input">>,
) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TextFieldPrimitive.Input
      data-slot="text-field-input"
      class={cn(
        // "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground invalid:ring-2 invalid:ring-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        local.class,
      )}
      {...rest}
    />
  );
};

function TextFieldTextarea(
  props: ComponentProps<typeof TextFieldPrimitive.TextArea<"textarea">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TextFieldPrimitive.TextArea
      data-slot="text-field-textarea"
      class={cn(
        // "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "field-sizing-content flex min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        local.class,
      )}
      {...rest}
    />
  );
}

function TextFieldLabel(
  props: ComponentProps<typeof TextFieldPrimitive.Label>,
) {
  return <TextFieldPrimitive.Label data-slot="text-field-label" {...props} />;
}

function TextFieldDescription(
  props: ComponentProps<typeof TextFieldPrimitive.Description>,
) {
  return (
    <TextFieldPrimitive.Description
      data-slot="text-field-description"
      {...props}
    />
  );
}

function TextFieldError(
  props: ComponentProps<typeof TextFieldPrimitive.ErrorMessage>,
) {
  return (
    <TextFieldPrimitive.ErrorMessage data-slot="text-field-error" {...props} />
  );
}

export {
  TextField,
  TextFieldInput,
  TextFieldTextarea,
  // Form
  TextFieldDescription,
  TextFieldLabel,
  TextFieldError,
  // Hooks
  useTextField,
};
