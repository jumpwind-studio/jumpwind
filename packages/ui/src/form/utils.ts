import { useStore } from "@tanstack/solid-form";
import type { FieldApi } from "./context.jsx";

export function isErrored(...errors: unknown[]) {
  return errors.length > 0;
}

export function useIsErrored<TData>(field: FieldApi<TData>) {
  return useStore(field.store, (state) => isErrored(state.meta.errors));
}

export function getValidationState(...errors: unknown[]) {
  return errors.length > 0 ? "invalid" : "valid";
}

export function useValidationState<TData>(field: FieldApi<TData>) {
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

export function useSquash<TData>(field: FieldApi<TData>) {
  return useStore(field.store, (state) => squash(state.meta.errors));
}

export function pretty<TData>(_field: FieldApi<TData>) {}
