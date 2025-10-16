import createOnce from "@corvu/utils/create/once";
import * as TextFieldPrimitive from "@kobalte/core/text-field";
import { useStore } from "@tanstack/solid-form";
import {
  type ComponentProps,
  type JSX,
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
} from "../ui/field.jsx";
import { Input } from "../ui/input.jsx";
import type { FormProps } from "./types.js";
import { squash, useField } from "./utils.js";

export interface FormInputProps
  extends FormProps<TextFieldPrimitive.TextFieldRootOptions> {
  placeholder?: string;
  autocomplete?: JSX.HTMLAutocomplete;
  type?: JSX.InputHTMLAttributes<HTMLInputElement>["type"];
}

function FormInputRoot(props: ComponentProps<typeof TextFieldPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["field", "class"]);

  const field = useField<string>(() => local.field);
  const value = useStore(field().store, (state) => state.value);
  const validationState = useStore(field().store, (state) =>
    state.meta.errors.length > 0 ? "invalid" : "valid",
  );

  return (
    <TextFieldPrimitive.Root
      data-slot="form-input-root"
      name={field().name}
      value={value()}
      onChange={field().handleChange}
      onBlur={field().handleBlur}
      validationState={validationState()}
      class={cn("group relative grid gap-1.5", local.class)}
      {...rest}
    />
  );
}

function FormInput(props: ComponentProps<typeof TextFieldPrimitive.Input>) {
  const [local, rest] = splitProps(props, ["type", "label"]);

  return (
    <TextFieldPrimitive.Input
      data-slot="form-input-input"
      type={local.type ?? "text"}
      autocorrect={local.type === "password" ? "off" : undefined}
      aria-label={local.label}
      {...rest}
    />
  );
}

function FormInputLabel(
  props: ComponentProps<typeof TextFieldPrimitive.Label>,
) {
  const [local, rest] = splitProps(props, ["children"]);

  const memoizedChildren = createOnce(() => local.children);

  return (
    <Show when={local.children !== undefined}>
      <TextFieldPrimitive.Label data-slot="form-input-label" {...rest}>
        {untrack(() => memoizedChildren()())}
      </TextFieldPrimitive.Label>
    </Show>
  );
}

function FormInputDescription(
  props: ComponentProps<typeof TextFieldPrimitive.Description>,
) {
  const [local, rest] = splitProps(props, ["children"]);

  const memoizedChildren = createOnce(() => local.children);

  return (
    <Show when={local.children !== undefined}>
      <TextFieldPrimitive.Description
        data-slot="form-input-description"
        {...rest}
      >
        {untrack(() => memoizedChildren()())}
      </TextFieldPrimitive.Description>
    </Show>
  );
}

function FormInputError(
  props: ComponentProps<typeof TextFieldPrimitive.ErrorMessage>,
) {
  const [local, rest] = splitProps(props, ["field"]);

  const field = useField<string>(() => local.field);

  const squashedErrors = useStore(field().store, (state) =>
    squash(state.meta.errors),
  );

  return (
    <TextFieldPrimitive.ErrorMessage data-slot="form-input-error" {...rest}>
      {squashedErrors()}
    </TextFieldPrimitive.ErrorMessage>
  );
}

function FormInputField(props: FormInputProps) {
  const [local, input, rest] = splitProps(
    props,
    ["class", "label", "description"],
    ["type", "placeholder"],
  );

  return (
    <FormInputRoot
      as={Field}
      data-slot="form-input"
      class={local.class}
      {...rest}
    >
      <FormInputLabel as={FieldLabel}>{local.label}</FormInputLabel>
      <FormInput as={Input} {...input} />
      <FormInputDescription as={FieldDescription}>
        {local.description}
      </FormInputDescription>
      <FormInputError as={FieldError} />
    </FormInputRoot>
  );
}

export {
  FormInputField,
  FormInputRoot,
  FormInput,
  FormInputLabel,
  FormInputDescription,
  FormInputError,
};

// import type * as TextFieldPrimitive from "@kobalte/core/text-field";
// import { useStore } from "@tanstack/solid-form";
// import { type JSX, Show, splitProps } from "solid-js";
// import { cn } from "../lib/utils.js";
// import {
//   TextField,
//   TextFieldDescription,
//   TextFieldError,
//   TextFieldInput,
//   TextFieldLabel,
// } from "../ui/text-field.jsx";
// import type { FormProps } from "./types.js";
// import { squash, useField } from "./utils.js";
//
// export interface FormInputProps
//   extends FormProps<TextFieldPrimitive.TextFieldRootOptions> {
//   placeholder?: string;
//   autocomplete?: JSX.HTMLAutocomplete;
//   type?: JSX.InputHTMLAttributes<HTMLInputElement>["type"];
// }
//
// export function FormInput(props: FormInputProps) {
//   const [local, rest] = splitProps(props, [
//     "field",
//     "class",
//     "label",
//     "description",
//   ]);
//
//   const field = useField<string>(() => local.field);
//   const value = useStore(field().store, (state) => state.value);
//   const errors = useStore(field().store, (state) => state.meta.errors);
//
//   return (
//     <TextField
//       data-slot="form-input"
//       name={field().name}
//       value={value()}
//       onChange={field().handleChange}
//       onBlur={field().handleBlur}
//       validationState={errors().length > 0 ? "invalid" : "valid"}
//       class={cn("group relative grid gap-1.5", local.class)}
//       {...rest}
//     >
//       <Show when={local.label}>
//         <TextFieldLabel data-slot="form-input-label">
//           {local.label}
//         </TextFieldLabel>
//       </Show>
//       <TextFieldInput data-slot="form-input-input" aria-label={local.label} />
//       <Show when={local.description}>
//         <TextFieldDescription data-slot="form-input-description">
//           {local.description}
//         </TextFieldDescription>
//       </Show>
//       <TextFieldError data-slot="form-input-error">
//         {squash(errors())}
//       </TextFieldError>
//     </TextField>
//   );
// }
