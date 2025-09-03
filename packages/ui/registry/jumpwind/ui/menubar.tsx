import * as MenubarPrimitive from "@kobalte/core/menubar";
import { cn } from "@/components/ui/utils";
import CheckIcon from "lucide-solid/icons/check";
import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import CircleIcon from "lucide-solid/icons/circle";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";

function Menubar(props: ComponentProps<typeof MenubarPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <MenubarPrimitive.Root
      class={cn(
        "flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs",
        local.class,
      )}
      data-slot="menubar"
      {...rest}
    />
  );
}

function MenubarMenu(props: ComponentProps<typeof MenubarPrimitive.Menu>) {
  const defaultedProps = mergeProps(
    {
      placement: "bottom-start", // align
      gutter: 8, // sideOffset
      shift: -4, // alignOffset
    } satisfies ComponentProps<typeof MenubarPrimitive.Menu>,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, ["placement"]);

  return (
    <MenubarPrimitive.Menu
      data-slot="menubar-menu"
      placement={local.placement}
      {...rest}
    />
  );
}

function MenubarGroup(props: ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}

function MenubarPortal(props: ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarRadioGroup(
  props: ComponentProps<typeof MenubarPrimitive.RadioGroup>,
) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  );
}

function MenubarTrigger(
  props: ComponentProps<typeof MenubarPrimitive.Trigger>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <MenubarPrimitive.Trigger
      class={cn(
        "flex select-none items-center rounded-sm px-2 py-1 font-medium text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-expanded:bg-accent data-expanded:text-accent-foreground",
        local.class,
      )}
      data-slot="menubar-trigger"
      {...rest}
    />
  );
}

function MenubarContent(
  props: ComponentProps<typeof MenubarPrimitive.Content>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        class={cn(
          "data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-48 origin-(--kb-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-expanded:animate-in",
          local.class,
        )}
        data-slot="menubar-content"
        {...rest}
      />
    </MenubarPortal>
  );
}

function MenubarItem(
  props: ComponentProps<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
  },
) {
  const defaultedProps = mergeProps(
    {
      variant: "default",
    } satisfies { variant?: "default" | "destructive" },
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "inset",
    "variant",
  ]);

  return (
    <MenubarPrimitive.Item
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-8 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive!",
        local.class,
      )}
      data-inset={local.inset}
      data-slot="menubar-item"
      data-variant={local.variant}
      {...rest}
    />
  );
}

function MenubarCheckboxItem(
  props: ComponentProps<typeof MenubarPrimitive.CheckboxItem>,
) {
  const [local, rest] = splitProps(props, ["class", "children", "checked"]);

  return (
    <MenubarPrimitive.CheckboxItem
      checked={local.checked}
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      data-slot="menubar-checkbox-item"
      {...rest}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon class="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {local.children}
    </MenubarPrimitive.CheckboxItem>
  );
}

function MenubarRadioItem(
  props: ComponentProps<typeof MenubarPrimitive.RadioItem>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <MenubarPrimitive.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      data-slot="menubar-radio-item"
      {...rest}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon class="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {local.children}
    </MenubarPrimitive.RadioItem>
  );
}

function MenubarLabel(
  props: ComponentProps<typeof MenubarPrimitive.ItemLabel> & {
    inset?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "inset"]);

  return (
    <MenubarPrimitive.ItemLabel
      class={cn("px-2 py-1.5 font-medium text-sm data-inset:pl-8", local.class)}
      data-inset={local.inset}
      data-slot="menubar-label"
      {...rest}
    />
  );
}

function MenubarSeparator(
  props: ComponentProps<typeof MenubarPrimitive.Separator>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <MenubarPrimitive.Separator
      class={cn("-mx-1 my-1 h-px bg-border", local.class)}
      data-slot="menubar-separator"
      {...rest}
    />
  );
}

function MenubarShortcut(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      class={cn(
        "ml-auto text-muted-foreground text-xs tracking-widest",
        local.class,
      )}
      data-slot="menubar-shortcut"
      {...rest}
    />
  );
}

function MenubarSub(props: ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger(
  props: ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "children", "inset"]);

  return (
    <MenubarPrimitive.SubTrigger
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-expanded:bg-accent data-inset:pl-8 data-expanded:text-accent-foreground",
        local.class,
      )}
      data-inset={local.inset}
      data-slot="menubar-sub-trigger"
      {...rest}
    >
      {local.children}
      <ChevronRightIcon class="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
}

function MenubarSubContent(
  props: ComponentProps<typeof MenubarPrimitive.SubContent>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <MenubarPrimitive.SubContent
      class={cn(
        "data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 origin-(--kb-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-closed:animate-out data-expanded:animate-in",
        local.class,
      )}
      data-slot="menubar-sub-content"
      {...rest}
    />
  );
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
