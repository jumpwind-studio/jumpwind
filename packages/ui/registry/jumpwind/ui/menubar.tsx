import * as MenubarPrimitive from "@kobalte/core/menubar";
import CheckIcon from "lucide-solid/icons/check";
import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import CircleIcon from "lucide-solid/icons/circle";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

const useMenubar = MenubarPrimitive.useMenubarContext;

function Menubar(props: ComponentProps<typeof MenubarPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      class={cn(
        "flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs",
        local.class,
      )}
      {...rest}
    />
  );
}

function MenubarMenu(props: ComponentProps<typeof MenubarPrimitive.Menu>) {
  const defaultedProps = mergeProps(
    {
      gutter: 8, // sideOffset
      shift: -4, // alignOffset
      placement: "bottom-start", // align
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

function MenubarRadioGroup<TValue = string>(
  props: ComponentProps<typeof MenubarPrimitive.RadioGroup<TValue>>,
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
      data-slot="menubar-trigger"
      class={cn(
        "flex select-none items-center rounded-sm px-2 py-1 font-medium text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-expanded:bg-accent data-expanded:text-accent-foreground",
        local.class,
      )}
      {...rest}
    />
  );
}

function MenubarContent(
  props: ComponentProps<typeof MenubarPrimitive.Content<"div">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        as="div"
        data-slot="menubar-content"
        class={cn(
          "data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-48 origin-(--kb-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-expanded:animate-in",
          local.class,
        )}
        {...rest}
      />
    </MenubarPortal>
  );
}

function MenubarItem(
  props: ComponentProps<typeof MenubarPrimitive.Item<"div">> & {
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
      as="div"
      data-slot="menubar-item"
      data-inset={local.inset}
      data-variant={local.variant}
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-8 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive!",
        local.class,
      )}
      {...rest}
    />
  );
}

function MenubarCheckboxItem(
  props: ComponentProps<typeof MenubarPrimitive.CheckboxItem<"div">>,
) {
  const [local, rest] = splitProps(props, ["class", "children", "checked"]);

  return (
    <MenubarPrimitive.CheckboxItem
      as="div"
      data-slot="menubar-checkbox-item"
      checked={local.checked}
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
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

function MenubarRadioItem<TValue = string>(
  props: ComponentProps<typeof MenubarPrimitive.RadioItem<TValue, "div">>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <MenubarPrimitive.RadioItem
      as="div"
      data-slot="menubar-radio-item"
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
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
  props: ComponentProps<typeof MenubarPrimitive.ItemLabel<"div">> & {
    inset?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "inset"]);

  return (
    <MenubarPrimitive.ItemLabel
      as="div"
      data-slot="menubar-label"
      class={cn("px-2 py-1.5 font-medium text-sm data-inset:pl-8", local.class)}
      data-inset={local.inset}
      {...rest}
    />
  );
}

function MenubarSeparator(
  props: ComponentProps<typeof MenubarPrimitive.Separator<"hr">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <MenubarPrimitive.Separator
      as="hr"
      data-slot="menubar-separator"
      class={cn("-mx-1 my-1 h-px bg-border", local.class)}
      {...rest}
    />
  );
}

function MenubarShortcut(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      data-slot="menubar-shortcut"
      class={cn(
        "ml-auto text-muted-foreground text-xs tracking-widest",
        local.class,
      )}
      {...rest}
    />
  );
}

function MenubarSub(props: ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger(
  props: ComponentProps<typeof MenubarPrimitive.SubTrigger<"div">> & {
    inset?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "children", "inset"]);

  return (
    <MenubarPrimitive.SubTrigger
      as="div"
      data-slot="menubar-sub-trigger"
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-expanded:bg-accent data-inset:pl-8 data-expanded:text-accent-foreground",
        local.class,
      )}
      data-inset={local.inset}
      {...rest}
    >
      {local.children}
      <ChevronRightIcon class="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
}

function MenubarSubContent(
  props: ComponentProps<typeof MenubarPrimitive.SubContent<"div">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <MenubarPrimitive.SubContent
      as="div"
      data-slot="menubar-sub-content"
      class={cn(
        "data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 origin-(--kb-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-closed:animate-out data-expanded:animate-in",
        local.class,
      )}
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
  // Hooks
  useMenubar,
};
