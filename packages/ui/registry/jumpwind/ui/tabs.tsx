import * as TabsPrimitive from "@kobalte/core/tabs";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

const useTabs = TabsPrimitive.useTabsContext;

function Tabs(props: ComponentProps<typeof TabsPrimitive.Root<"div">>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TabsPrimitive.Root
      as="div"
      data-slot="tabs"
      class={cn("flex flex-col gap-2", local.class)}
      {...rest}
    />
  );
}

function TabsList(props: ComponentProps<typeof TabsPrimitive.List<"div">>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TabsPrimitive.List
      as="div"
      data-slot="tabs-list"
      class={cn(
        "inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        local.class,
      )}
      {...rest}
    />
  );
}

function TabsTrigger(
  props: ComponentProps<typeof TabsPrimitive.Trigger<"button">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TabsPrimitive.Trigger
      as="button"
      data-slot="tabs-trigger"
      class={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-2 py-1 font-medium text-sm outline-ring/50 ring-ring/10 transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50 aria-invalid:focus-visible:ring-0 data-selected:bg-background data-selected:text-foreground data-selected:shadow-sm dark:outline-ring/40 dark:ring-ring/20 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    />
  );
}

function TabsContent(
  props: ComponentProps<typeof TabsPrimitive.Content<"div">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TabsPrimitive.Content
      as="div"
      data-slot="tabs-content"
      class={cn(
        "flex-1 outline-ring/50 ring-ring/10 transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-4 aria-invalid:focus-visible:ring-0 dark:outline-ring/40 dark:ring-ring/20",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  // Hooks
  useTabs,
};
