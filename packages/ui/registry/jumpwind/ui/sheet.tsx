import { cn } from "@/components/ui/utils";
import * as SheetPrimitive from "corvu/dialog";
import XIcon from "lucide-solid/icons/x";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";

const useSheet = SheetPrimitive.useContext;

function Sheet(props: ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal(props: ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay(props: ComponentProps<typeof SheetPrimitive.Overlay>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SheetPrimitive.Overlay
      class={cn(
        "data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/80 data-closed:animate-out data-open:animate-in",
        local.class,
      )}
      data-slot="sheet-overlay"
      {...rest}
    />
  );
}

function SheetContent(
  props: ComponentProps<typeof SheetPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
  },
) {
  const defaultedProps = mergeProps(
    {
      side: "right",
    } satisfies ComponentProps<typeof SheetPrimitive.Content>,
    props,
  );
  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "children",
    "side",
  ]);

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        class={cn(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-closed:animate-out data-open:animate-in data-closed:duration-300 data-open:duration-500",
          local.side === "right" &&
            "data-closed:slide-out-to-right data-open:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          local.side === "left" &&
            "data-closed:slide-out-to-left data-open:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          local.side === "top" &&
            "data-closed:slide-out-to-top data-open:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          local.side === "bottom" &&
            "data-closed:slide-out-to-bottom data-open:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          local.class,
        )}
        data-slot="sheet-content"
        {...rest}
      >
        {local.children}
        <SheetPrimitive.Close class="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-open:bg-secondary">
          <XIcon class="size-4" />
          <span class="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("flex flex-col gap-1.5 p-4", local.class)}
      data-slot="sheet-header"
      {...rest}
    />
  );
}

function SheetFooter(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("mt-auto flex flex-col gap-2 p-4", local.class)}
      data-slot="sheet-footer"
      {...rest}
    />
  );
}

function SheetTitle(props: ComponentProps<typeof SheetPrimitive.Label>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SheetPrimitive.Label
      class={cn("font-semibold text-foreground tracking-tight", local.class)}
      data-slot="sheet-title"
      {...rest}
    />
  );
}

function SheetDescription(
  props: ComponentProps<typeof SheetPrimitive.Description>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SheetPrimitive.Description
      class={cn("text-muted-foreground text-sm", local.class)}
      data-slot="sheet-description"
      {...rest}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetOverlay,
  useSheet,
};
