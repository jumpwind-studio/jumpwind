import type {
  AnyFieldApi,
  FieldApi as TanstackFieldApi,
} from "@tanstack/solid-form";

export type FormProps<T, TData = string> = T & {
  field?: FieldApiWithData<TData>;
  class?: string;
  label?: string;
  description?: string;
};

type Any = any;

export type InferFieldData<FieldApi extends AnyFieldApi> =
  FieldApi extends TanstackFieldApi<
    Any,
    Any,
    infer TData,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any
  >
    ? TData
    : never;

export type FieldApiWithData<TData> = TanstackFieldApi<
  Any,
  string,
  TData,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any
>;
