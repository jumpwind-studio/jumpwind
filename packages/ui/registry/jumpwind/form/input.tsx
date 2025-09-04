import type { AnyFieldApi } from "@tanstack/solid-form";
import {
  type ComponentProps,
  createMemo,
  type JSX,
  on,
  Show,
  splitProps,
} from "solid-js";
import {
  FieldDescription,
  FieldLabel,
  FieldMessage,
} from "@/registry/jumpwind/form/field";
import { cn } from "@/registry/jumpwind/lib/utils";
import {
  TextField,
  TextFieldDescription,
  TextFieldInput,
  TextFieldLabel,
  TextFieldMessage,
  TextFieldTextarea,
} from "@/registry/jumpwind/ui/text-field";

export interface FormInputProps<
  T extends AnyFieldApi = AnyFieldApi,
  TMultiline extends boolean = false,
> {
  field: T;
  class?: string;
  children?: JSX.Element;
  description?: string | undefined;
  disabled?: boolean | undefined;
  label?: string | undefined;
  multiline?: TMultiline | undefined;
  placeholder?: string | undefined;
  required?: boolean | undefined;
  type?: "text" | "email" | "tel" | "password" | "url" | "date" | undefined;
  autocomplete?: string | undefined;
  onError?: (errors: {
    errors: NonNullable<T["state"]["meta"]["errors"]>;
    errorMap: NonNullable<T["state"]["meta"]["errorMap"]>;
  }) => string;
  "~"?: TMultiline extends false
    ? { inputProps: ComponentProps<typeof TextFieldInput> }
    : { inputProps: ComponentProps<typeof TextFieldTextarea> };
}

export function FormInput<
  T extends AnyFieldApi = AnyFieldApi,
  TMultiline extends boolean = false,
>(props: FormInputProps<T, TMultiline>) {
  const [local, rootProps, inputProps, rest] = splitProps(
    props,
    [
      "field",
      "class",
      "children",
      "label",
      "description",
      "multiline",
      "onError",
      "~",
    ],
    ["disabled", "required"],
    ["placeholder", "type", "autocomplete"],
  );

  const errors = () => local.field.state.meta.errors ?? [];

  const fmtdErrors = createMemo(
    on(errors, (errors) => {
      if (!errors?.length) return undefined;

      if (local?.onError) {
        return local.onError({
          errors,
          errorMap: local.field.state.meta.errorMap,
        });
      }
      return (
        local.field.state.meta.errors.map((err) => err.message).at(0) ?? ""
      );
    }),
  );

  let descriptionRef: HTMLDivElement | undefined;
  let labelRef: HTMLLabelElement | undefined;

  return (
    <TextField
      data-slot="form-input"
      name={local.field.name}
      onBlur={local.field.handleBlur}
      onChange={(e) => local.field.handleChange(e)}
      validationState={errors().length > 0 ? "invalid" : "valid"}
      value={local.field.state.value}
      class={cn("group relative grid gap-1.5", local.class)}
      {...rootProps}
      {...rest}
    >
      <Show when={local.label}>
        <TextFieldLabel
          as={FieldLabel}
          data-slot="form-input-label"
          ref={labelRef}
        >
          {local.label}
        </TextFieldLabel>
      </Show>
      <Show
        when={local.multiline}
        fallback={
          <TextFieldInput
            aria-describedby={descriptionRef?.id}
            aria-label={local.field.name}
            aria-labelledby={labelRef?.id}
            name={local.field.name}
            {...inputProps}
            {...local["~"]?.inputProps}
          />
        }
      >
        <TextFieldTextarea
          aria-describedby={descriptionRef?.id}
          aria-label={local.field.name}
          aria-labelledby={labelRef?.id}
          autoResize
          name={local.field.name}
          {...inputProps}
          {...local["~"]?.inputProps}
        />
      </Show>
      {local.children}
      <Show when={local.description}>
        <TextFieldDescription
          as={FieldDescription}
          data-slot="form-input-description"
          ref={descriptionRef}
        >
          {local.description}
        </TextFieldDescription>
      </Show>
      <TextFieldMessage as={FieldMessage} data-slot="form-input-message">
        {fmtdErrors()}
      </TextFieldMessage>
    </TextField>
  );
}
