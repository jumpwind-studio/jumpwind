import * as TextFieldPrimitive from "@kobalte/core/text-field";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";
import {
  type LabelVariantProps,
  labelVariants,
} from "@/registry/jumpwind/ui/label";

export function TextField(
  props: ComponentProps<typeof TextFieldPrimitive.Root<"div">> & {
    class?: string;
    error?: string;
  },
) {
  const [local, rest] = splitProps(props, [
    "class",
    "error",
    "validationState",
    "as",
  ]);

  return (
    <TextFieldPrimitive.Root
      as="div"
      data-slot="text-field"
      validationState={
        local.validationState ?? (local.error ? "invalid" : "valid")
      }
      class={cn("space-y-1", local.class)}
      {...rest}
    />
  );
}

export const TextFieldInput = (
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

export function TextFieldTextarea(
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

export function TextFieldLabel(
  props: ComponentProps<typeof TextFieldPrimitive.Label<"label">> &
    LabelVariantProps,
) {
  const [local, rest] = splitProps(props, ["class", "variant"]);

  return (
    <TextFieldPrimitive.Label
      as="label"
      data-slot="text-field-label"
      class={labelVariants({
        variant: local.variant ?? "error",
        class: local.class,
      })}
      {...rest}
    />
  );
}

export function TextFieldMessage(
  props: ComponentProps<typeof TextFieldPrimitive.ErrorMessage<"div">> &
    LabelVariantProps,
) {
  const [local, rest] = splitProps(props, ["class", "variant"]);

  return (
    <TextFieldPrimitive.ErrorMessage
      as="div"
      data-slot="text-field-message"
      class={labelVariants({
        variant: local.variant ?? "error",
        class: local.class,
      })}
      {...rest}
    />
  );
}

export function TextFieldDescription(
  props: ComponentProps<typeof TextFieldPrimitive.Description<"div">> &
    LabelVariantProps,
) {
  const [local, rest] = splitProps(props, ["class", "variant"]);

  return (
    <TextFieldPrimitive.Description
      as="div"
      data-slot="text-field-description"
      class={labelVariants({
        variant: local.variant ?? "description",
        class: local.class,
      })}
      {...rest}
    />
  );
}
