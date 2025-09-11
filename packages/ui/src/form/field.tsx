import { type ComponentProps, Show, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import { Label } from "../ui/label.jsx";

function FieldLabel(props: ComponentProps<"label">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Label
      data-slot="field-label"
      class={cn(
        "invalid:text-destructive group-invalid:text-destructive data-invalid:text-destructive group-data-invalid:text-destructive",
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
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  );
}

function FieldMessage(props: ComponentProps<"p">) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <Show when={local.children}>
      <p
        data-slot="field-message"
        class={cn("font-medium text-destructive text-sm", local.class)}
        {...rest}
      >
        {local.children}
      </p>
    </Show>
  );
}

export { FieldDescription, FieldLabel, FieldMessage };
