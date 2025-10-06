import type { AnyFieldApi } from "@tanstack/solid-form";

export type FormProps<T> = T & {
  field?: AnyFieldApi;
  class?: string;
  label?: string;
  description?: string;
};
