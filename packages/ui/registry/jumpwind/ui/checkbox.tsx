import * as CheckboxPrimitive from "@kobalte/core/checkbox";
import CheckIcon from "lucide-solid/icons/check";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

function Checkbox(props: ComponentProps<typeof CheckboxPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      class={cn("group relative flex items-start space-x-2", local.class)}
      {...rest}
    />
  );
}

function CheckboxInput(props: ComponentProps<typeof CheckboxPrimitive.Input>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CheckboxPrimitive.Input
      data-slot="checkbox-input"
      class={cn("peer", local.class)}
      {...rest}
    />
  );
}

function CheckboxControl(
  props: ComponentProps<typeof CheckboxPrimitive.Control>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CheckboxPrimitive.Control
      data-slot="checkbox-control"
      class={cn(
        "size-4 shrink-0 rounded-[4px] border border-primary ring-offset-background",
        "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
        "data-checked:bg-primary data-checked:text-primary-foreground",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        class="flex items-center justify-center text-current"
      >
        <CheckIcon class="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Control>
  );
}

function CheckboxLabel(props: ComponentProps<typeof CheckboxPrimitive.Label>) {
  return <CheckboxPrimitive.Label data-slot="checkbox-label" {...props} />;
}

function CheckboxDescription(
  props: ComponentProps<typeof CheckboxPrimitive.Description>,
) {
  return (
    <CheckboxPrimitive.Description
      data-slot="checkbox-description"
      {...props}
    />
  );
}

function CheckboxMessage(
  props: ComponentProps<typeof CheckboxPrimitive.ErrorMessage>,
) {
  return (
    <CheckboxPrimitive.ErrorMessage data-slot="checkbox-message" {...props} />
  );
}

export {
  Checkbox,
  CheckboxInput,
  CheckboxControl,
  // Form
  CheckboxLabel,
  CheckboxDescription,
  CheckboxMessage,
};
