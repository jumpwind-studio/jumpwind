import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as TextFieldPrimitive from "@kobalte/core/text-field";
import { Label, type LabelVariantProps, labelVariants } from "@/components/ui/label";
import { cn } from "@/registry/jumpwind/lib/utils";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export type TextFieldProps<T extends ValidComponent = "div"> =
  TextFieldPrimitive.TextFieldRootProps<T> & {
    class?: string;
    error?: string;
  };

export const TextField = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TextFieldProps<T>>,
) => {
  const [local, rest] = splitProps(props as TextFieldProps, ["class", "error"]);

  return (
    <TextFieldPrimitive.Root
      class={cn("space-y-1", local.class)}
      data-slot="text-field"
      validationState={
        rest.validationState ?? (local.error ? "invalid" : "valid")
      }
      {...rest}
    />
  );
};

export type TextFieldInputProps<T extends ValidComponent = "input"> =
  TextFieldPrimitive.TextFieldInputProps<T> & {
    class?: string;
  };

export const TextFieldInput = <T extends ValidComponent = "input">(
  props: PolymorphicProps<T, TextFieldInputProps<T>>,
) => {
  const [local, rest] = splitProps(props as TextFieldInputProps, ["class"]);

  return (
    <TextFieldPrimitive.Input
      class={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground invalid:ring-2 invalid:ring-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      data-slot="text-field-input"
      {...rest}
    />
  );
};

export type TextFieldTextAreaProps<T extends ValidComponent = "textarea"> =
  TextFieldPrimitive.TextFieldTextAreaProps<T> & {
    class?: string;
  };

export const TextFieldTextarea = <T extends ValidComponent = "textarea">(
  props: PolymorphicProps<T, TextFieldTextAreaProps<T>>,
) => {
  const [local, rest] = splitProps(props as TextFieldTextAreaProps, ["class"]);

  return (
    <TextFieldPrimitive.TextArea
      class={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      data-slot="text-field-textarea"
      {...rest}
    />
  );
};

export type TextFieldLabelProps<T extends ValidComponent = "label"> =
  TextFieldPrimitive.TextFieldLabelProps<T> & {
    class?: string;
  };

export const TextFieldLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, TextFieldLabelProps<T>>,
) => {
  const [local, rest] = splitProps(props as TextFieldLabelProps, ["class"]);

  return (
    <TextFieldPrimitive.Label
      as={Label}
      class={local.class}
      data-slot="text-field-label"
      {...rest}
    />
  );
};

export type TextFieldErrorMessageProps<T extends ValidComponent = "div"> =
  TextFieldPrimitive.TextFieldErrorMessageProps<T> &
    LabelVariantProps & {
      class?: string;
    };

export const TextFieldMessage = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TextFieldErrorMessageProps<T>>,
) => {
  const [local, rest] = splitProps(props as TextFieldErrorMessageProps, [
    "class",
    "variant",
  ]);

  return (
    <TextFieldPrimitive.ErrorMessage
      class={cn(
        labelVariants({ variant: local.variant ?? "error" }),
        local.class,
      )}
      data-slot="text-field-message"
      {...rest}
    />
  );
};

export type TextFieldDescriptionProps<T extends ValidComponent = "div"> =
  TextFieldPrimitive.TextFieldDescriptionProps<T> &
    LabelVariantProps & {
      class?: string;
    };

export const TextFieldDescription = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TextFieldDescriptionProps<T>>,
) => {
  const [local, rest] = splitProps(props as TextFieldDescriptionProps, [
    "class",
    "variant",
  ]);

  return (
    <TextFieldPrimitive.Description
      class={cn(
        labelVariants({ variant: local.variant ?? "description" }),
        local.class,
      )}
      data-slot="text-field-description"
      {...rest}
    />
  );
};
