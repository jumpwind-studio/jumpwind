import { isFunction } from "@corvu/utils";
import createControllableSignal from "@corvu/utils/create/controllableSignal";
import createOnce from "@corvu/utils/create/once";
import { createShortcut } from "@solid-primitives/keyboard";
// import { Command as CommandPrimitive, useCommandState } from "cmdk-solid";
import * as CommandPrimitive from "cmdk-solid";
import LoaderCircleIcon from "lucide-solid/icons/loader-circle";
import SearchIcon from "lucide-solid/icons/search";
import {
  type ComponentProps,
  mergeProps,
  SuspenseList,
  splitProps,
  untrack,
} from "solid-js";
import { cn } from "../lib/utils.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/registry/jumpwind/ui/dialog";
import { Skeleton } from "@/registry/jumpwind/ui/skeleton";

const useCommand = CommandPrimitive.useCommandState;

function Command(props: ComponentProps<typeof CommandPrimitive.CommandRoot>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SuspenseList revealOrder="together" tail="hidden">
      <CommandPrimitive.CommandRoot
        data-slot="command"
        class={cn(
          "group/command flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
          local.class,
        )}
        {...rest}
      />
    </SuspenseList>
  );
}

function CommandInput(
  props: ComponentProps<typeof CommandPrimitive.CommandInput>,
) {
  const [local, rest] = splitProps(props, ["class", "value", "onValueChange"]);

  const [value, setValue] = createControllableSignal({
    value: () => local.value,
    onChange: local.onValueChange,
  });

  // Use Ctrl+C to clear input
  createShortcut(["Control", "C"], () => setValue(""));

  return (
    <div
      data-slot="command-input-wrapper"
      class="flex h-9 items-center gap-2 border-b px-3"
    >
      <LoaderCircleIcon
        class={cn(
          "hidden size-4 shrink-0 animate-spin opacity-25 transition-discrete transition-transform duration-1000 ease-in-out",
          "group-data-loading/command:block",
        )}
      />
      <SearchIcon
        class={cn(
          "size-4 shrink-0 opacity-50",
          "group-data-loading/command:hidden",
        )}
      />
      <CommandPrimitive.CommandInput
        data-slot="command-input"
        value={value()}
        onValueChange={setValue}
        class={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          local.class,
        )}
        {...rest}
      />
    </div>
  );
}

function CommandList(
  props: ComponentProps<typeof CommandPrimitive.CommandList>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <CommandPrimitive.CommandList
      data-slot="command-list"
      class={cn(
        "scroll-py-1 overflow-y-auto overflow-x-hidden overscroll-contain",
        "transition-[height] duration-100 ease-in-out",
        // "h-(--cmdk-list-height) max-h-[500px] min-h-[300px]",
        "h-[min(300px,var(--cmdk-list-height))] max-h-[500px]",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </CommandPrimitive.CommandList>
  );
}

function CommandLoading(
  props: ComponentProps<typeof CommandPrimitive.CommandLoading>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandLoading
      data-slot="command-loading"
      role="status"
      class={cn(
        "flex flex-col gap-y-2 overflow-clip p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs",
        "h-(--cmdk-list-height)",
        // "max-h-[400px]",
        local.class,
      )}
      {...rest}
    >
      <span class="sr-only">Loading...</span>
      <Skeleton class="h-8 w-full flex-shrink-0 rounded-sm px-2 py-1.5 will-change-auto" />
    </CommandPrimitive.CommandLoading>
  );
}

// function CommandLoading(
//   props: ComponentProps<typeof CommandPrimitive.CommandLoading>,
// ) {
//   const [local, rest] = splitProps(props, ["class"]);
//
//   return (
//     <CommandPrimitive.CommandLoading
//       data-slot="command-loading"
//       role="status"
//       class={cn(
//         "flex flex-col gap-y-2 overflow-clip p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs",
//         "h-(--cmdk-list-height)",
//         "max-h-[400px]",
//         local.class,
//       )}
//       {...rest}
//     >
//       <span class="sr-only">Loading...</span>
//       <div class="my-1 flex h-full flex-col gap-y-2 overflow-hidden">
//         <Index each={Array(20).fill(0)}>
//           {(_) => (
//             <Skeleton class="clip-p h-8 w-full flex-shrink-0 rounded-sm px-2 py-1.5 will-change-auto" />
//           )}
//         </Index>
//       </div>
//     </CommandPrimitive.CommandLoading>
//   );
// }

function CommandEmpty(
  props: ComponentProps<typeof CommandPrimitive.CommandEmpty>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandEmpty
      data-slot="command-empty"
      class={cn(
        "py-6 text-center text-sm",
        // "h-[min(300px,var(--cmdk-list-height))] max-h-[400px]",
        local.class,
      )}
      {...rest}
    />
  );
}

function CommandGroup(
  props: ComponentProps<typeof CommandPrimitive.CommandGroup>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandGroup
      data-slot="command-group"
      class={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs",
        local.class,
      )}
      {...rest}
    />
  );
}

function CommandSeparator(
  props: ComponentProps<typeof CommandPrimitive.CommandSeparator>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandSeparator
      data-slot="command-separator"
      class={cn("-mx-1 h-px bg-border", local.class)}
      {...rest}
    />
  );
}

function CommandItem(
  props: ComponentProps<typeof CommandPrimitive.CommandItem>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandItem
      data-slot="command-item"
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    />
  );
}

function CommandShortcut(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      data-slot="command-shortcut"
      class={cn(
        "ml-auto text-muted-foreground text-xs tracking-widest",
        local.class,
      )}
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
      description: "Search...",
    } satisfies Partial<typeof props>,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "children",
    "title",
    "description",
  ]);

  // NOTE: Using `corvu` pattern for memoizing child components
  // Okay to remove if overkill
  const memoizedChildren = createOnce(() => local.children);

  return (
    <Dialog {...rest}>
      {(state) => {
        const resolveChildren = () => {
          const children = memoizedChildren()();
          if (isFunction(children)) return children(state);
          return children;
        };
        return (
          <>
            <DialogHeader class="sr-only">
              <DialogTitle>{local.title}</DialogTitle>
              <DialogDescription>{local.description}</DialogDescription>
            </DialogHeader>
            <DialogContent class="overflow-hidden p-0">
              <Command class="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
                {untrack(() => resolveChildren())}
              </Command>
            </DialogContent>
          </>
        );
      }}
    </Dialog>
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandLoading,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  // Hooks
  useCommand,
};
