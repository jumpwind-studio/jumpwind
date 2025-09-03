import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/registry/jumpwind/lib/utils";
import { Command as CommandPrimitive } from "cmdk-solid";
import SearchIcon from "lucide-solid/icons/search";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";

function Command(props: ComponentProps<typeof CommandPrimitive>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive
      class={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        local.class,
      )}
      data-slot="command"
      {...rest}
    />
  );
}

function CommandDialog(
  props: ComponentProps<typeof Dialog> & {
    title?: string;
    description?: string;
  },
) {
  const defaultedProps = mergeProps(
    {
      title: "Command Palette",
      description: "Search for a command to run...",
    } satisfies Partial<ComponentProps<typeof Dialog>> & {
      title?: string;
      description?: string;
    },
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "children",
    "title",
    "description",
  ]);

  return (
    <Dialog {...rest}>
      {(state) => (
        <>
          <DialogHeader class="sr-only">
            <DialogTitle>{local.title}</DialogTitle>
            <DialogDescription>{local.description}</DialogDescription>
          </DialogHeader>
          <DialogContent class="overflow-hidden p-0">
            <Command class="**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
              {typeof local.children === "function"
                ? local.children(state)
                : local.children}
            </Command>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}

function CommandInput(props: ComponentProps<typeof CommandPrimitive.Input>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class="flex h-9 items-center gap-2 border-b px-3"
      data-slot="command-input-wrapper"
    >
      <SearchIcon class="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        class={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          local.class,
        )}
        data-slot="command-input"
        {...rest}
      />
    </div>
  );
}

function CommandList(props: ComponentProps<typeof CommandPrimitive.List>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.List
      class={cn(
        "max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden",
        local.class,
      )}
      data-slot="command-list"
      {...rest}
    />
  );
}

function CommandEmpty(props: ComponentProps<typeof CommandPrimitive.Empty>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.Empty
      class={cn("py-6 text-center text-sm", local.class)}
      data-slot="command-empty"
      {...rest}
    />
  );
}

function CommandGroup(props: ComponentProps<typeof CommandPrimitive.Group>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.Group
      class={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs",
        local.class,
      )}
      data-slot="command-group"
      {...rest}
    />
  );
}

function CommandSeparator(
  props: ComponentProps<typeof CommandPrimitive.Separator>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.Separator
      class={cn("-mx-1 h-px bg-border", local.class)}
      data-slot="command-separator"
      {...rest}
    />
  );
}

function CommandItem(props: ComponentProps<typeof CommandPrimitive.Item>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.Item
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      data-slot="command-item"
      {...rest}
    />
  );
}

function CommandShortcut(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      class={cn(
        "ml-auto text-muted-foreground text-xs tracking-widest",
        local.class,
      )}
      data-slot="command-shortcut"
      {...rest}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
