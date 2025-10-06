import {
  type AnyFieldApi,
  type AnyFormApi,
  createFormHook,
  createFormHookContexts,
} from "@tanstack/solid-form";
import { type Accessor, createMemo, lazy } from "solid-js";

export const { useFieldContext, useFormContext, fieldContext, formContext } =
  createFormHookContexts();

export type FieldApi<TData> = AnyFieldApi;
export type FormApi<TData> = AnyFormApi;

export function useField<TData>(field?: Accessor<FieldApi<TData> | undefined>) {
  return createMemo<FieldApi<TData>>(() => {
    const f = field?.();
    if (f) return f;
    const ctx = useFieldContext<TData>();
    if (ctx) return ctx();
    throw new Error("useField must be used inside a `Field` component.");
  });
}

const FormCheckbox = lazy(() =>
  import("@jumpwind/ui/form").then((mod) => ({ default: mod.FormCheckbox })),
);
const FormInput = lazy(() =>
  import("@jumpwind/ui/form").then((mod) => ({ default: mod.FormInput })),
);
const FormOtp = lazy(() =>
  import("@jumpwind/ui/form").then((mod) => ({ default: mod.FormOtp })),
);
const FormRadioGroup = lazy(() =>
  import("@jumpwind/ui/form").then((mod) => ({ default: mod.FormRadioGroup })),
);
const FormSelect = lazy(() =>
  import("@jumpwind/ui/form").then((mod) => ({ default: mod.FormSelect })),
);
const FormSwitch = lazy(() =>
  import("@jumpwind/ui/form").then((mod) => ({ default: mod.FormSwitch })),
);
const FormSlider = lazy(() =>
  import("@jumpwind/ui/form").then((mod) => ({ default: mod.FormSlider })),
);
const FormNumberInput = lazy(() =>
  import("@jumpwind/ui/form").then((mod) => ({ default: mod.FormNumberInput })),
);

const FormSubmitButton = lazy(() =>
  import("@jumpwind/ui/form").then((mod) => ({
    default: mod.FormSubmitButton,
  })),
);

export const { useAppForm: createForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Checkbox: FormCheckbox,
    Input: FormInput,
    NumberInput: FormNumberInput,
    Otp: FormOtp,
    RadioGroup: FormRadioGroup,
    Select: FormSelect,
    Slider: FormSlider,
    Switch: FormSwitch,
  },
  formComponents: {
    SubmitButton: FormSubmitButton,
  },
});
