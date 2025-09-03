import * as CheckboxPrimitive from "@kobalte/core/checkbox";
import { cn } from "@/registry/jumpwind/lib/utils";
import CheckIcon from "lucide-solid/icons/check";
import { type ComponentProps, splitProps } from "solid-js";

const FormCheckboxLabel = CheckboxPrimitive.Label;
const FormCheckboxDescription = CheckboxPrimitive.Description;
const FormCheckboxMessage = CheckboxPrimitive.ErrorMessage;

function CheckboxRoot(props: ComponentProps<typeof CheckboxPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CheckboxPrimitive.Root
      class={cn("group relative flex items-start space-x-2", local.class)}
      data-slot="checkbox"
      {...rest}
    />
  );
}

function CheckboxInput(props: ComponentProps<typeof CheckboxPrimitive.Input>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CheckboxPrimitive.Input
      class={cn("peer", local.class)}
      data-slot="checkbox-input"
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
      class={cn(
        "size-4 shrink-0 rounded-[4px] border border-primary ring-offset-background",
        "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
        "data-checked:bg-primary data-checked:text-primary-foreground",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        local.class,
      )}
      data-slot="checkbox-control"
      {...rest}
    >
      <CheckboxPrimitive.Indicator
        class="flex items-center justify-center text-current"
        data-slot="checkbox-indicator"
      >
        <CheckIcon class="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Control>
  );
}

/**
 * Preassembled checkbox.
 */
function Checkbox(props: ComponentProps<typeof CheckboxPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <CheckboxRoot class={local.class} {...rest}>
      {(state) => (
        <>
          <CheckboxInput />
          <CheckboxControl />
          {typeof local.children === "function"
            ? local.children(state)
            : local.children}
        </>
      )}
    </CheckboxRoot>
  );
}

export {
  Checkbox,
  CheckboxRoot,
  CheckboxInput,
  CheckboxControl,
  FormCheckboxLabel,
  FormCheckboxDescription,
  FormCheckboxMessage,
};
