import { isFunction } from "@corvu/utils";
import createOnce from "@corvu/utils/create/once";
import {
  type ComponentProps,
  For,
  type JSX,
  Match,
  mergeProps,
  type ParentProps,
  Show,
  Switch,
  splitProps,
  untrack,
} from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/utils.js";
import { Label } from "./label.jsx";
import { Separator } from "./separator.jsx";

function FieldSet(props: ComponentProps<"fieldset">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <fieldset
      data-slot="field-set"
      class={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        local.class,
      )}
      {...rest}
    />
  );
}

function FieldLegend(
  props: ComponentProps<"legend"> & { variant?: "legend" | "label" },
) {
  const defaultedProps = mergeProps({ variant: "legend" as const }, props);

  const [local, rest] = splitProps(defaultedProps, ["class", "variant"]);

  return (
    <legend
      data-slot="field-legend"
      data-variant={local.variant}
      class={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        local.class,
      )}
      {...rest}
    />
  );
}

function FieldGroup(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="field-group"
      class={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        local.class,
      )}
      {...rest}
    />
  );
}

const fieldVariants = tv({
  base: "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  variants: {
    orientation: {
      vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
      horizontal: [
        "flex-row items-center",
        "[&>[data-slot=field-label]]:flex-auto",
        "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      ],
      responsive: [
        "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
        "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
        "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      ],
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

type FieldVariantProps = VariantProps<typeof fieldVariants>;

function Field(props: ComponentProps<"div"> & FieldVariantProps) {
  const defaultedProps = mergeProps(
    { orientation: "vertical" as const },
    props,
  );

  const [local, rest] = splitProps(defaultedProps, ["class", "orientation"]);

  return (
    <div
      data-slot="field"
      role="group"
      data-orientation={local.orientation}
      class={fieldVariants({
        orientation: local.orientation,
        class: local.class,
      })}
      {...rest}
    />
  );
}

function FieldContent(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="field-content"
      class={cn(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        local.class,
      )}
      {...rest}
    />
  );
}

function FieldSeparator(props: ParentProps<ComponentProps<"div">>) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      data-slot="field-separator"
      data-content={!!local.children}
      class={cn(
        "-my-2 group-data-[variant=outline]/field-group:-mb-2 relative h-5 text-sm",
        local.class,
      )}
      {...rest}
    >
      <Separator class="absolute inset-0 top-1/2" />
      <Show when={local.children}>
        <span
          class="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content"
        >
          {local.children}
        </span>
      </Show>
    </div>
  );
}

function FieldTitle(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="field-title"
      class={cn(
        "flex w-fit items-center gap-2 font-medium text-sm leading-snug group-data-[disabled=true]/field:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
}

function FieldLabel(props: ComponentProps<typeof Label>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Label
      data-slot="field-label"
      class={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
        local.class,
      )}
      {...rest}
    />
  );
}

function FieldDescription(props: ComponentProps<"p">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <p
      data-slot="field-description"
      class={cn(
        "font-normal text-muted-foreground text-sm leading-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
        "nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5 last:mt-0",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        local.class,
      )}
      {...rest}
    />
  );
}

function FieldError<Errors extends { message?: string }[]>(
  props: Omit<ComponentProps<"div">, "children"> & {
    errors?: Errors;
    children?: JSX.Element | ((errors?: Errors) => JSX.Element);
  },
) {
  const [local, rest] = splitProps(props, ["class", "children", "errors"]);

  const memoizedChildren = createOnce(() => local.children);
  const resolveChildren = () => {
    const children = memoizedChildren()();
    return isFunction(children) ? children(local.errors) : children;
  };

  return (
    <Show when={resolveChildren() || local.errors}>
      <div
        role="alert"
        data-slot="field-error"
        class={cn("font-normal text-destructive text-sm", local.class)}
        {...rest}
      >
        <Switch>
          <Match when={resolveChildren()}>
            {untrack(() => resolveChildren())}
          </Match>
          <Match when={local.errors}>
            {(errors) => (
              <Show
                when={errors().length === 1 && errors()[0]?.message}
                fallback={
                  <ul class="ml-4 flex list-disc flex-col gap-1">
                    <For each={errors()}>
                      {(error) => (
                        <Show when={error?.message}>
                          {(message) => <li>{message()}</li>}
                        </Show>
                      )}
                    </For>
                  </ul>
                }
              >
                {(message) => message()}
              </Show>
            )}
          </Match>
        </Switch>
      </div>
    </Show>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
};
