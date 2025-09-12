import * as ComboboxPrimitive from "@kobalte/core/combobox";
import CheckIcon from "lucide-solid/icons/check";
import ChevronsUpDown from "lucide-solid/icons/chevrons-up-down";
import type { ComponentProps } from "solid-js";
import { Show, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

const useCombobox = ComboboxPrimitive.useComboboxContext;

function Combobox(props: ComponentProps<typeof ComboboxPrimitive.Root>) {
  return <ComboboxPrimitive.Root data-slot="combobox" {...props} />;
}

function ComboboxSection(
  props: ComponentProps<typeof ComboboxPrimitive.Section>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ComboboxPrimitive.Section
      data-slot="combobox-section"
      class={cn(
        "overflow-hidden p-1 px-2 py-1.5 font-medium text-muted-foreground text-xs",
        local.class,
      )}
      {...rest}
    />
  );
}

function ComboboxItem(props: ComponentProps<typeof ComboboxPrimitive.Item>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      class={cn(
        "relative flex cursor-default select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
}

function ComboboxItemLabel(
  props: ComponentProps<typeof ComboboxPrimitive.ItemLabel>,
) {
  return (
    <ComboboxPrimitive.ItemLabel data-slot="combobox-item-label" {...props} />
  );
}

function ComboboxItemIndicator(
  props: ComponentProps<typeof ComboboxPrimitive.ItemIndicator>,
) {
  const [local, rest] = splitProps(props, ["children"]);

  return (
    <ComboboxPrimitive.ItemIndicator
      data-slot="combobox-item-indicator"
      {...rest}
    >
      <Show when={local.children} fallback={<CheckIcon class="size-4" />}>
        {(children) => children()}
      </Show>
    </ComboboxPrimitive.ItemIndicator>
  );
}

function ComboboxControl(
  props: ComponentProps<typeof ComboboxPrimitive.Control>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ComboboxPrimitive.Control
      data-slot="combobox-control"
      class={cn("flex h-10 items-center rounded-md border px-3", local.class)}
      {...rest}
    />
  );
}

function ComboboxInput(props: ComponentProps<typeof ComboboxPrimitive.Input>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-input"
      class={cn(
        "flex size-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
}

function ComboboxTrigger(
  props: ComponentProps<typeof ComboboxPrimitive.Trigger>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      class={cn("size-4 opacity-50", local.class)}
      {...rest}
    >
      <ComboboxPrimitive.Icon data-slot="combobox-icon">
        <Show
          when={local.children}
          fallback={<ChevronsUpDown class="size-4" />}
        >
          {(children) => children()}
        </Show>
      </ComboboxPrimitive.Icon>
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxContent(
  props: ComponentProps<typeof ComboboxPrimitive.Content>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ComboboxPrimitive.Portal data-slot="combobox-portal">
      <ComboboxPrimitive.Content
        data-slot="combobox-content"
        class={cn(
          "fade-in-80 relative z-50 min-w-32 animate-in overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
          local.class,
        )}
        {...rest}
      >
        <ComboboxPrimitive.Listbox
          data-slot="combobox-listbox"
          class="m-0 p-1"
        />
      </ComboboxPrimitive.Content>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxHiddenSelect(
  props: ComponentProps<typeof ComboboxPrimitive.HiddenSelect>,
) {
  return (
    <ComboboxPrimitive.HiddenSelect
      data-slot="combobox-hidden-select"
      class="font-extralight text-xs"
      {...props}
    />
  );
}

export {
  Combobox,
  ComboboxItem,
  ComboboxItemLabel,
  ComboboxItemIndicator,
  ComboboxSection,
  ComboboxControl,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxHiddenSelect,
  ComboboxContent,
  // Hooks
  useCombobox,
};
