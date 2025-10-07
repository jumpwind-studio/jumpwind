import * as SwitchPrimitive from "@kobalte/core/switch";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

const useSwitch = SwitchPrimitive.useSwitchContext;

function Switch(props: ComponentProps<typeof SwitchPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      class={cn("group relative flex items-center space-x-2", local.class)}
      {...rest}
    />
  );
}

function SwitchInput(props: ComponentProps<typeof SwitchPrimitive.Input>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SwitchPrimitive.Input
      data-slot="switch-input"
      class={cn("peer", local.class)}
      {...rest}
    />
  );
}

function SwitchControl(props: ComponentProps<typeof SwitchPrimitive.Control>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SwitchPrimitive.Control
      data-slot="switch-control"
      class={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs outline-none transition-all",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "not-data-checked:bg-input data-checked:bg-primary",
        "dark:not-data-checked:bg-input/80",
        local.class,
      )}
      {...rest}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        class={cn(
          "pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform",
          "not-data-checked:translate-x-0 data-checked:translate-x-[calc(100%-2px)]",
          "dark:not-data-checked:bg-foreground dark:data-checked:bg-primary-foreground",
        )}
      />
    </SwitchPrimitive.Control>
  );
}

function SwitchLabel(props: ComponentProps<typeof SwitchPrimitive.Label>) {
  return <SwitchPrimitive.Label data-slot="switch-label" {...props} />;
}

function SwitchDescription(
  props: ComponentProps<typeof SwitchPrimitive.Description>,
) {
  return (
    <SwitchPrimitive.Description data-slot="switch-description" {...props} />
  );
}

function SwitchError(
  props: ComponentProps<typeof SwitchPrimitive.ErrorMessage>,
) {
  return <SwitchPrimitive.ErrorMessage data-slot="switch-error" {...props} />;
}

export {
  Switch,
  SwitchInput,
  SwitchControl,
  // Forms
  SwitchLabel,
  SwitchDescription,
  SwitchError,
  // Hooks
  useSwitch,
};
