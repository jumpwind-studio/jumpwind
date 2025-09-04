import { createFormHookContexts, useStore } from "@tanstack/solid-form";
import {
  type ComponentProps,
  children,
  createContext,
  createMemo,
  createUniqueId,
  Show,
  splitProps,
  useContext,
} from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

const { useFieldContext, useFormContext, fieldContext, formContext } =
  createFormHookContexts();

function Form(props: ComponentProps<"form">) {
  const form = useFormContext();

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        form.handleSubmit();
      }}
      {...props}
    />
  );
}

function makeFormItem(id: string) {
  const field = useFieldContext();

  const errors = useStore(field().store, (state) => state.meta.errors);
  const isTouched = useStore(field().store, (state) => state.meta.isTouched);
  const submissionAttempts = useStore(
    field().form.store,
    (state) => state.submissionAttempts,
  );

  const error = createMemo<string>(() => {
    const showError = isTouched() || submissionAttempts() > 0;
    if (!showError) return undefined;
    const errs = errors();
    if (!errs) return;

    const error = errs[0];

    if (typeof error === "string") return error;
    if (typeof error === "object") {
      if ("message" in error && typeof error.message === "string")
        return error.message;
    }

    return String(error);
  });

  return {
    id: id,
    formControlId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: error,
  };
}

type FormItemContextValue = ReturnType<typeof makeFormItem>;

const FormItemContext = createContext<FormItemContextValue>();

function useFormItem() {
  const formItem = useContext(FormItemContext);
  if (!formItem) {
    throw new Error("useFormItemContext must be used within a <FormItem />");
  }
  return formItem;
}

function FormItem(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  const id = createUniqueId();
  const formItem = makeFormItem(id);

  return (
    <FormItemContext.Provider value={formItem}>
      <div
        data-slot="form-item"
        class={cn("grid gap-2", local.class)}
        {...rest}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel(props: ComponentProps<"label">) {
  const [local, rest] = splitProps(props, ["class"]);
  const formItem = useFormItem();

  return (
    <label
      data-slot="form-label"
      bool:data-error={!!formItem.error()}
      class={cn("data-[error=true]:text-destructive", local.class)}
      for={formItem.formControlId}
      {...rest}
    />
  );
}

function FormControl(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  const formItem = useFormItem();

  const describedBy = () =>
    formItem.error() != null
      ? `${formItem.formDescriptionId} ${formItem.formMessageId}`
      : `${formItem.formDescriptionId}`;

  return (
    <div
      data-slot="form-control"
      id={formItem.formControlId}
      aria-describedby={describedBy()}
      bool:aria-invalid={!!formItem.error()}
      class={local.class}
      {...rest}
    />
  );
}

function FormDescription(props: ComponentProps<"p">) {
  const [local, rest] = splitProps(props, ["class"]);

  const formItem = useFormItem();

  return (
    <p
      data-slot="form-description"
      id={formItem.formDescriptionId}
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  );
}

function FormMessage(props: ComponentProps<"p">) {
  const [local, rest] = splitProps(props, ["class"]);

  const formItem = useFormItem();
  const body = children(() => formItem.error() ?? props.children);

  return (
    <Show when={body()}>
      {(c) => (
        <p
          data-slot="form-message"
          id={formItem.formMessageId}
          class={cn("text-destructive text-sm", local.class)}
          {...rest}
        >
          {c()}
        </p>
      )}
    </Show>
  );
}

export {
  Form,
  type FormItem,
  type FormLabel,
  type FormControl,
  type FormDescription,
  type FormMessage,
  fieldContext,
  useFieldContext,
  formContext,
  useFormContext,
};
