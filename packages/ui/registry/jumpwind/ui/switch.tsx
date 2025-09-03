import * as SwitchPrimitive from "@kobalte/core/switch";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

const SwitchLabel = SwitchPrimitive.Label;
const SwitchDescription = SwitchPrimitive.Description;
const SwitchMessage = SwitchPrimitive.ErrorMessage;

function SwitchRoot(props: ComponentProps<typeof SwitchPrimitive.Root<"div">>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SwitchPrimitive.Root
      as="div"
      data-slot="switch"
      class={cn("group relative flex items-start space-x-2", local.class)}
      {...rest}
    />
  );
}

function SwitchInput(
  props: ComponentProps<typeof SwitchPrimitive.Input<"input">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SwitchPrimitive.Input
      as="input"
      data-slot="switch-input"
      class={cn("peer", local.class)}
      {...rest}
    />
  );
}

function SwitchControl(
  props: ComponentProps<typeof SwitchPrimitive.Control<"div">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SwitchPrimitive.Control
      as="div"
      data-slot="switch-control"
      class={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent not-data-checked:bg-input shadow-xs outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary dark:not-data-checked:bg-input/80",
        local.class,
      )}
      {...rest}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        class={cn(
          "pointer-events-none block size-4 not-data-checked:translate-x-0 rounded-full bg-background ring-0 transition-transform data-checked:translate-x-[calc(100%-2px)] dark:not-data-checked:bg-foreground dark:data-checked:bg-primary-foreground",
        )}
      />
    </SwitchPrimitive.Control>
  );
}

export {
  SwitchRoot,
  SwitchInput,
  SwitchControl,
  // Forms
  SwitchLabel,
  SwitchDescription,
  SwitchMessage,
};
