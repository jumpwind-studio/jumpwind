import type { AnyFieldApi } from "@tanstack/solid-form";
import type * as OtpPrimitive from "corvu/otp-field";
import type { ValidComponent } from "solid-js";
import { Show, splitProps } from "solid-js";
import { Form } from "@/registry/jumpwind/form";
import {
  FieldDescription,
  FieldLabel,
  FieldMessage,
} from "@/registry/jumpwind/form/field";
import { cn } from "@/registry/jumpwind/lib/utils";
import {
  Otp,
  OtpGroup,
  OtpHiddenInput,
  OtpSeparator,
  OtpSlot,
} from "@/registry/jumpwind/ui/input-otp";

export type OtpFieldProps<
  TField extends AnyFieldApi,
  T extends ValidComponent = "div",
> = Partial<OtpPrimitive.RootProps<T>> & {
  class?: string;
  field: TField;
  label: string;
  description: string;
  disabled: boolean;
  required: boolean;
};

export function OtpField<
  TField extends AnyFieldApi,
  T extends ValidComponent = "div",
>(props: OtpPrimitive.DynamicProps<T, OtpFieldProps<TField, T>>) {
  const [local, rootProps, rest] = splitProps(
    props,
    ["field", "class", "label", "description"],
    ["disabled", "required", "onComplete"],
  );

  const firstError = () => Form.squash(local.field);
  const validationState = () => (firstError() != null ? "invalid" : "valid");

  return (
    <Otp
      data-slot="form-otp"
      name={local.field.name}
      value={local.field.state.value}
      onValueChange={local.field.handleChange}
      validationState={validationState()}
      maxLength={6}
      class={cn("group relative", local.class)}
      {...rootProps}
      {...rest}
    >
      <Show when={local.label}>
        <FieldLabel data-slot="form-otp-label">{local.label}</FieldLabel>
      </Show>
      <OtpHiddenInput
        aria-label={local.field.name}
        onBlur={local.field.handleBlur}
      />
      <OtpGroup>
        <OtpSlot index={0} />
        <OtpSlot index={1} />
        <OtpSlot index={2} />
      </OtpGroup>
      <OtpSeparator />
      <OtpGroup>
        <OtpSlot index={3} />
        <OtpSlot index={4} />
        <OtpSlot index={5} />
      </OtpGroup>
      <Show when={local.description}>
        <FieldDescription data-slot="form-otp-description">
          {local.description}
        </FieldDescription>
      </Show>
      <FieldMessage data-slot="form-otp-message">{firstError()}</FieldMessage>
    </Otp>
  );
}
