import { type AnyFieldApi, useStore } from "@tanstack/solid-form";
import { type Accessor, createMemo } from "solid-js";
import { useFieldContext } from "./context.js";
import type { FieldApiWithData } from "./types.js";

export function useField<TData = string>(
  field?: Accessor<FieldApiWithData<TData> | undefined>,
) {
  return createMemo(() => {
    const f = field?.();
    if (f) return f;
    const ctx = useFieldContext<TData>();
    if (ctx) return ctx();
    throw new Error("useField must be used inside a `Field` component.");
  });
}

export function isErrored(...errors: unknown[]) {
  return errors.length > 0;
}

export function useIsErrored<FieldApi extends AnyFieldApi = AnyFieldApi>(
  field: FieldApi,
) {
  return useStore(field.store, (state) => isErrored(state.meta.errors));
}

export function getValidationState(...errors: unknown[]) {
  return errors.length > 0 ? "invalid" : "valid";
}

export function useValidationState<FieldApi extends AnyFieldApi = AnyFieldApi>(
  field: FieldApi,
) {
  return useStore(field.store, (state) =>
    getValidationState(state.meta.errors),
  );
}

export function squash(...errors: unknown[]) {
  const err = errors.at(0);
  if (!err) return;
  if (typeof err === "string") return err;
  if (typeof err === "object") {
    if ("message" in err && typeof err.message === "string") {
      return err.message;
    }
  }

  return String(err);
}

export function useSquash<FieldApi extends AnyFieldApi = AnyFieldApi>(
  field: FieldApi,
) {
  return useStore(field.store, (state) => squash(state.meta.errors));
}
