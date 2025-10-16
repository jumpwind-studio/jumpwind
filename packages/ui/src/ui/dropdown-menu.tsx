import * as DropdownMenuPrimitive from "@kobalte/core/dropdown-menu";
import CheckIcon from "lucide-solid/icons/check";
import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import CircleIcon from "lucide-solid/icons/circle";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

function DropdownMenu(
  props: ComponentProps<typeof DropdownMenuPrimitive.Root>,
) {
  const defaultedProps = mergeProps(
    { gutter: 4 } satisfies ComponentProps<typeof DropdownMenuPrimitive.Root>,
    props,
  );

  return (
    <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...defaultedProps} />
  );
}

function DropdownMenuPortal(
  props: ComponentProps<typeof DropdownMenuPrimitive.Portal>,
) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger(
  props: ComponentProps<typeof DropdownMenuPrimitive.Trigger>,
) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent(
  props: ComponentProps<typeof DropdownMenuPrimitive.Content>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DropdownMenuPortal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        class={cn(
          "z-50 min-w-32 overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          "max-h-(--kb-popper-content-available-height)",
          "origin-(--kb-menu-content-transform-origin)",
          "data-expanded:fade-in-0 data-expanded:zoom-in-95 data-expanded:animate-in",
          "data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:animate-out",
          "data-[placement*=bottom]:slide-in-from-top-2",
          "data-[placement*=left]:slide-in-from-right-2",
          "data-[placement*=right]:slide-in-from-left-2",
          "data-[placement*=top]:slide-in-from-bottom-2",
          // "origin-(--kb-popper-content-overflow-padding)", NOTE: unsure what to do with this
          local.class,
          local.class,
        )}
        {...rest}
      />
    </DropdownMenuPortal>
  );
}

function DropdownMenuGroup(
  props: ComponentProps<typeof DropdownMenuPrimitive.Group>,
) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem(
  props: ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
  },
) {
  const [local, rest] = splitProps(props, ["class", "inset", "variant"]);

  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      bool:data-inset={local.inset}
      data-variant={local.variant}
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "dark:data-[variant=destructive]:focus:bg-destructive/20",
        "data-[variant=destructive]:*:[svg]:!text-destructive data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive",
        "data-inset:pl-8",
        local.class,
      )}
      {...rest}
    />
  );
}

function DropdownMenuCheckboxItem(
  props: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    >
      <DropdownMenuPrimitive.ItemIndicator class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <CheckIcon class="size-3.5" />
      </DropdownMenuPrimitive.ItemIndicator>
      {local.children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup<TValue = string>(
  props: ComponentProps<typeof DropdownMenuPrimitive.RadioGroup<TValue>>,
) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem<TValue = string>(
  props: ComponentProps<typeof DropdownMenuPrimitive.RadioItem<TValue>>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon class="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel(props: ComponentProps<"div"> & { inset?: boolean }) {
  const [local, rest] = splitProps(props, ["class", "inset"]);

  return (
    <div
      data-slot="dropdown-menu-label"
      class={cn("px-2 py-1.5 font-medium text-sm data-inset:pl-8", local.class)}
      bool:data-inset={local.inset}
      {...rest}
    />
  );
}

function DropdownMenuGroupLabel(
  props: ComponentProps<typeof DropdownMenuPrimitive.GroupLabel> & {
    inset?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "inset"]);

  return (
    <DropdownMenuPrimitive.GroupLabel
      data-slot="dropdown-menu-group-label"
      class={cn(
        "px-2 py-1.5 font-medium text-muted-foreground text-xs data-inset:pl-8",
        local.class,
      )}
      bool:data-inset={local.inset}
      {...rest}
    />
  );
}

function DropdownMenuSeparator(
  props: ComponentProps<typeof DropdownMenuPrimitive.Separator>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      class={cn("-mx-1 my-1 h-px bg-muted", local.class)}
      {...rest}
    />
  );
}

function DropdownMenuShortcut(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      data-slot="dropdown-menu-shortcut"
      class={cn(
        "ml-auto text-muted-foreground text-xs tracking-widest",
        local.class,
      )}
      {...rest}
    />
  );
}

function DropdownMenuSub(props: DropdownMenuPrimitive.DropdownMenuSubProps) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger(
  props: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "children", "inset"]);

  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-expanded:bg-accent data-inset:pl-8 data-expanded:text-accent-foreground",
        local.class,
      )}
      bool:data-inset={local.inset}
      {...rest}
    >
      {local.children}
      <ChevronRightIcon class="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent(
  props: ComponentProps<typeof DropdownMenuPrimitive.SubContent>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      class={cn(
        "data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 origin-(--kb-popper-content-overflow-padding) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-closed:animate-out data-expanded:animate-in",
        "origin-(--kb-menu-content-transform-origin)",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuGroupLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
};
