import * as TextFieldPrimitive from "@kobalte/core/text-field";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

function TextField(
  props: ComponentProps<typeof TextFieldPrimitive.Root<"div">>,
) {
  const [local, rest] = splitProps(props, ["class", "as"]);

  return (
    <TextFieldPrimitive.Root
      as="div"
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
      as="input"
      data-slot="text-field-input"
      class={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground invalid:ring-2 invalid:ring-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
      as="textarea"
      data-slot="text-field-textarea"
      class={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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

function TextFieldMessage(
  props: ComponentProps<typeof TextFieldPrimitive.ErrorMessage>,
) {
  return (
    <TextFieldPrimitive.ErrorMessage
      data-slot="text-field-message"
      {...props}
    />
  );
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

export {
  TextField,
  TextFieldInput,
  TextFieldTextarea,
  // Form
  TextFieldDescription,
  TextFieldLabel,
  TextFieldMessage,
};
