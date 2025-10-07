import type * as SwitchPrimitive from "@kobalte/core/switch";
import { useStore } from "@tanstack/solid-form";
import { Show, splitProps } from "solid-js";
import {
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field.jsx";
import {
  Switch,
  SwitchControl,
  SwitchDescription,
  SwitchError,
  SwitchInput,
  SwitchLabel,
} from "../ui/switch.jsx";
import type { FormProps } from "./types.js";
import { squash, useField } from "./utils.js";

export interface FormSwitchProps
  extends FormProps<SwitchPrimitive.SwitchRootOptions, boolean> {}

export function FormSwitch(props: FormSwitchProps) {
  const [local, rest] = splitProps(props, [
    "field",
    "class",
    "label",
    "description",
  ]);

  const field = useField<boolean>(() => local.field);
  const value = useStore(field().store, (state) => state.value);
  const errors = useStore(field().store, (state) => state.meta.errors);

  return (
    <Switch
      data-slot="form-switch"
      name={field().name}
      checked={value()}
      onChange={field().handleChange}
      onBlur={field().handleBlur}
      validationState={errors().length > 0 ? "invalid" : "valid"}
      class={local.class}
      {...rest}
    >
      <SwitchInput data-slot="form-switch-input" />
      <FieldContent>
        <Show when={local.label}>
          <SwitchLabel as={FieldLabel} data-slot="form-switch-label">
            {local.label}
          </SwitchLabel>
        </Show>
        <Show when={local.description}>
          <SwitchDescription
            as={FieldDescription}
            data-slot="form-switch-description"
          >
            {local.description}
          </SwitchDescription>
        </Show>
        <SwitchError as={FieldError} data-slot="form-switch-error">
          {squash(errors())}
        </SwitchError>
      </FieldContent>
      <SwitchControl data-slot="form-switch-control" />
    </Switch>
  );
}
