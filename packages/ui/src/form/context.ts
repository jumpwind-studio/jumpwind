import { createFormHook, createFormHookContexts } from "@tanstack/solid-form";
import { lazy } from "solid-js";

export const { useFieldContext, useFormContext, fieldContext, formContext } =
  createFormHookContexts();

// biome-ignore-start format: One line per component
export const { useAppForm: createForm, withForm } = createFormHook({
  formContext,
  fieldContext,
  formComponents: {
    SubmitButton: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormSubmitButton }))),
    // Layout
    FieldRoot: lazy(() => import("@jumpwind/ui/field").then((m) => ({ default: m.Field }))),
    FieldGroup: lazy(() => import("@jumpwind/ui/field").then((m) => ({ default: m.FieldGroup }))),
    FieldLegend: lazy(() => import("@jumpwind/ui/field").then((m) => ({ default: m.FieldLegend }))),
    FieldSet: lazy(() => import("@jumpwind/ui/field").then((m) => ({ default: m.FieldSet }))),
    FieldContent: lazy(() => import("@jumpwind/ui/field").then((m) => ({ default: m.FieldContent }))),
    FieldTitle: lazy(() => import("@jumpwind/ui/field").then((m) => ({ default: m.FieldLabel }))),
    FieldSeparator: lazy(() => import("@jumpwind/ui/field").then((m) => ({ default: m.FieldSeparator }))),
    FieldLabel: lazy(() => import("@jumpwind/ui/field").then((m) => ({ default: m.FieldLabel }))),
    FieldDescription: lazy(() => import("@jumpwind/ui/field").then((m) => ({ default: m.FieldDescription }))),
    FieldError: lazy(() => import("@jumpwind/ui/field").then((m) => ({ default: m.FieldError }))),
  },
  fieldComponents: {
    // Components
    Checkbox: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormCheckbox }))),
    NumberInput: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormNumberInput }))),
    Otp: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormOtp }))),
    RadioGroup: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormRadioGroup }))),
    Select: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormSelect }))),
    Slider: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormSlider }))),
    Switch: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormSwitch }))),
    Textarea: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormTextarea }))),
    // FormInput
    InputField: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormInputField }))),
    InputRoot: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormInputRoot }))),
    Input: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormInput }))),
    InputLabel: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormInputLabel }))),
    InputDescription: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormInputDescription }))),
    InputError: lazy(() => import("@jumpwind/ui/form").then((m) => ({ default: m.FormInputError }))),
    // RadioGroup
  },
});
// biome-ignore-end format: Formatting
