import * as SwitchPrimitive from "@kobalte/core/switch";
import { cn } from "@/registry/jumpwind/lib/utils";
import { type ComponentProps, splitProps } from "solid-js";

const FormSwitchLabel = SwitchPrimitive.Label;
const FormSwitchDescription = SwitchPrimitive.Description;
const FormSwitchMessage = SwitchPrimitive.ErrorMessage;

function SwitchRoot(props: ComponentProps<typeof SwitchPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SwitchPrimitive.Root
      class={cn("group relative flex items-start space-x-2", local.class)}
      data-slot="switch"
      {...rest}
    />
  );
}

function SwitchInput(props: ComponentProps<typeof SwitchPrimitive.Input>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SwitchPrimitive.Input
      class={cn("peer", local.class)}
      data-slot="switch-input"
      {...rest}
    />
  );
}

function SwitchControl(props: ComponentProps<typeof SwitchPrimitive.Control>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SwitchPrimitive.Control
      class={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent not-data-checked:bg-input shadow-xs outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary dark:not-data-checked:bg-input/80",
        local.class,
      )}
      data-slot="switch-control"
      {...rest}
    >
      <SwitchPrimitive.Thumb
        class={cn(
          "pointer-events-none block size-4 not-data-checked:translate-x-0 rounded-full bg-background ring-0 transition-transform data-checked:translate-x-[calc(100%-2px)] dark:not-data-checked:bg-foreground dark:data-checked:bg-primary-foreground",
        )}
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Control>
  );
}

/**
 * Preassembled switch.
 */
function Switch(props: ComponentProps<typeof SwitchPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SwitchRoot class={cn(local.class)} data-slot="switch" {...rest}>
      <SwitchInput />
      <SwitchControl />
    </SwitchRoot>
  );
}

export {
  Switch,
  SwitchRoot,
  SwitchInput,
  SwitchControl,
  // Forms
  FormSwitchLabel,
  FormSwitchDescription,
  FormSwitchMessage,
};
