import { type AnyFieldApi, useStore } from "@tanstack/solid-form";

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
