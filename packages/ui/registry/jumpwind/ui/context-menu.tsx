import * as ContextMenuPrimitive from "@kobalte/core/context-menu";
import { cn } from "@/registry/jumpwind/lib/utils";
import CheckIcon from "lucide-solid/icons/check";
import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import CircleIcon from "lucide-solid/icons/circle";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";

function ContextMenu(props: ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger(
  props: ComponentProps<typeof ContextMenuPrimitive.Trigger>,
) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

function ContextMenuGroup(
  props: ComponentProps<typeof ContextMenuPrimitive.Group>,
) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

function ContextMenuPortal(
  props: ComponentProps<typeof ContextMenuPrimitive.Portal>,
) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

function ContextMenuSub(
  props: ComponentProps<typeof ContextMenuPrimitive.Sub>,
) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuRadioGroup(
  props: ComponentProps<typeof ContextMenuPrimitive.RadioGroup>,
) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

function ContextMenuSubTrigger(
  props: ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "inset", "children"]);

  return (
    <ContextMenuPrimitive.SubTrigger
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-expanded:bg-accent data-inset:pl-8 data-expanded:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      data-inset={local.inset}
      data-slot="context-menu-sub-trigger"
      {...rest}
    >
      {local.children}
      <ChevronRightIcon class="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

function ContextMenuSubContent(
  props: ComponentProps<typeof ContextMenuPrimitive.SubContent>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ContextMenuPrimitive.SubContent
      class={cn(
        "data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 data-[placement*=bottom]:slide-in-from-top-2 data-[placement*=left]:slide-in-from-right-2 data-[placement*=right]:slide-in-from-left-2 data-[placement*=top]:slide-in-from-bottom-2 z-50 min-w-32 origin-(--kb-popper-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-closed:animate-out data-expanded:animate-in",
        local.class,
      )}
      data-slot="context-menu-sub-content"
      {...rest}
    />
  );
}

function ContextMenuContent(
  props: ComponentProps<typeof ContextMenuPrimitive.Content>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        class={cn(
          "data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 data-[placement*=bottom]:slide-in-from-top-2 data-[placement*=left]:slide-in-from-right-2 data-[placement*=right]:slide-in-from-left-2 data-[placement*=top]:slide-in-from-bottom-2 z-50 max-h-(--kb-popper-available-height) min-w-32 origin-(--kb-popper-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-closed:animate-out data-expanded:animate-in",
          local.class,
        )}
        data-slot="context-menu-content"
        {...rest}
      />
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuItem(
  props: ComponentProps<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
  },
) {
  const defaultedProps = mergeProps(
    {
      variant: "default",
    },
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "inset",
    "variant",
  ]);

  return (
    <ContextMenuPrimitive.Item
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-8 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive!",
        local.class,
      )}
      data-inset={local.inset}
      data-slot="context-menu-item"
      data-variant={local.variant}
      {...rest}
    />
  );
}

function ContextMenuCheckboxItem(
  props: ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>,
) {
  const [local, rest] = splitProps(props, ["class", "children", "checked"]);

  return (
    <ContextMenuPrimitive.CheckboxItem
      checked={local.checked}
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      data-slot="context-menu-checkbox-item"
      {...rest}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon class="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioItem(
  props: ComponentProps<typeof ContextMenuPrimitive.RadioItem>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ContextMenuPrimitive.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      data-slot="context-menu-radio-item"
      {...rest}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon class="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel(
  props: ComponentProps<typeof ContextMenuPrimitive.ItemLabel> & {
    inset?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "inset"]);

  return (
    <ContextMenuPrimitive.ItemLabel
      class={cn(
        "px-2 py-1.5 font-medium text-foreground text-sm data-inset:pl-8",
        local.class,
      )}
      data-inset={local.inset}
      data-slot="context-menu-label"
      {...rest}
    />
  );
}

function ContextMenuSeparator(
  props: ComponentProps<typeof ContextMenuPrimitive.Separator>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ContextMenuPrimitive.Separator
      class={cn("-mx-1 my-1 h-px bg-border", local.class)}
      data-slot="context-menu-separator"
      {...rest}
    />
  );
}

function ContextMenuShortcut(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      class={cn(
        "ml-auto text-muted-foreground text-xs tracking-widest",
        local.class,
      )}
      data-slot="context-menu-shortcut"
      {...rest}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
