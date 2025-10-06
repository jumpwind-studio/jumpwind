import * as SelectPrimitive from "@kobalte/core/select";
import * as SeparatorPrimitive from "@kobalte/core/separator";
import CheckIcon from "lucide-solid/icons/check";
import ChevronDownIcon from "lucide-solid/icons/chevron-down";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field.jsx";

const useSelect = SelectPrimitive.useSelectContext;

function Select<TOption>(
  props: ComponentProps<typeof SelectPrimitive.Root<TOption>>,
) {
  return (
    <SelectPrimitive.Root<TOption, never, "div">
      as={Field}
      data-slot="select"
      {...props}
    />
  );
}

function SelectHiddenSelect(
  props: ComponentProps<typeof SelectPrimitive.HiddenSelect>,
) {
  return <SelectPrimitive.HiddenSelect data-slot="hidden-select" {...props} />;
}

function SelectValue<TOption>(
  props: ComponentProps<typeof SelectPrimitive.Value<TOption>>,
) {
  return (
    <SelectPrimitive.Value<TOption, "span">
      data-slot="select-value"
      {...props}
    />
  );
}

function SelectTrigger(
  props: ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: "sm" | "default";
  },
) {
  const [local, rest] = splitProps(props, ["class", "size", "children"]);

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={local.size}
      class={cn(
        "flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[size=default]:h-9 data-[size=sm]:h-8 data-placeholder:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:hover:bg-input/50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <SelectPrimitive.Icon>
        <ChevronDownIcon class="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent<TOption>(
  props: ComponentProps<typeof SelectPrimitive.Content> & {
    position?: "item-aligned" | "popper";
  },
) {
  const defaultedProps = mergeProps(
    {
      position: "popper",
    } satisfies typeof props,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "position",
    "children",
  ]);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-position={local.position}
        class={cn(
          "data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 data-[placement*=bottom]:slide-in-from-top-2 data-[placement*=left]:slide-in-from-right-2 data-[placement*=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 relative z-50 max-h-(-kb-popper-available-height) min-w-32 origin-(--kb-select-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-closed:animate-out data-expanded:animate-in",
          local.position === "popper" &&
            "data-[placement*=left]:-translate-x-1 data-[placement*=top]:-translate-y-1 data-[placement*=right]:translate-x-1 data-[placement*=bottom]:translate-y-1",
          local.class,
        )}
        {...rest}
      >
        <SelectPrimitive.Listbox<TOption>
          class={cn(
            "p-1",
            local.position === "popper" &&
              "h-(--kb-popper-available-height) w-full min-w-(--kb-popper-available-width) scroll-my-1",
          )}
        />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectSection(props: ComponentProps<typeof SelectPrimitive.Section>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SelectPrimitive.Section
      data-slot="select-section"
      class={cn("px-2 py-1.5 text-muted-foreground text-xs", local.class)}
      {...rest}
    />
  );
}

function SelectItem(props: ComponentProps<typeof SelectPrimitive.Item>) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      class={cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        local.class,
      )}
      {...rest}
    >
      <span class="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon class="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemLabel>{local.children}</SelectPrimitive.ItemLabel>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator(
  props: ComponentProps<typeof SeparatorPrimitive.Root>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SeparatorPrimitive.Root
      data-slot="select-separator"
      class={cn("-mx-1 pointer-events-none my-1 h-px bg-border", local.class)}
      {...rest}
    />
  );
}

function SelectLabel(props: ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      as={FieldLabel}
      data-slot="select-label"
      {...props}
    />
  );
}

function SelectDescription(
  props: ComponentProps<typeof SelectPrimitive.Description>,
) {
  return (
    <SelectPrimitive.Description
      as={FieldDescription}
      data-slot="select-description"
      {...props}
    />
  );
}

function SelectError(
  props: ComponentProps<typeof SelectPrimitive.ErrorMessage>,
) {
  return (
    <SelectPrimitive.ErrorMessage
      as={FieldError}
      data-slot="select-error"
      {...props}
    />
  );
}

export {
  Select,
  SelectHiddenSelect,
  SelectContent,
  SelectItem,
  SelectSection,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  // Forms
  SelectLabel,
  SelectDescription,
  SelectError,
  // Hooks
  useSelect,
};
