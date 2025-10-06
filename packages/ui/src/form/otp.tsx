import { useStore } from "@tanstack/solid-form";
import type * as OtpPrimitive from "corvu/otp-field";
import { Show, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import { FieldDescription, FieldError, FieldLabel } from "../ui/field.jsx";
import {
  Otp,
  OtpGroup,
  OtpHiddenInput,
  OtpSeparator,
  OtpSlot,
} from "../ui/input-otp.jsx";
import { useField } from "./context.js";
import type { FormProps } from "./types.js";
import { squash } from "./utils.js";

export interface FormOtpProps
  extends FormProps<Omit<OtpPrimitive.RootProps, "maxLength">> {}

export function FormOtp(props: FormOtpProps) {
  const [local, rest] = splitProps(props, [
    "field",
    "class",
    "label",
    "description",
    "value",
  ]);

  const field = useField<string>(() => local.field);
  const value = useStore(field().store, (state) => state.value);
  const errors = useStore(field().store, (state) => state.meta.errors);

  return (
    <Otp
      data-slot="form-otp"
      name={field().name}
      value={value()}
      onValueChange={field().handleChange}
      onBlur={field().handleBlur}
      validationState={errors().length > 0 ? "invalid" : "valid"}
      maxLength={6}
      class={cn("group relative", local.class)}
      {...rest}
    >
      <Show when={local.label}>
        <FieldLabel data-slot="form-otp-label">{local.label}</FieldLabel>
      </Show>
      <OtpHiddenInput
        data-slot="form-otp-hidden-input"
        aria-label={local.label}
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
      <FieldError data-slot="form-otp-error">{squash(errors())}</FieldError>
    </Otp>
  );
}
