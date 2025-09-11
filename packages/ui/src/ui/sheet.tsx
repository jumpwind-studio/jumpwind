import * as SheetPrimitive from "corvu/drawer";
import XIcon from "lucide-solid/icons/x";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { tv } from "tailwind-variants";
import { cn } from "../lib/utils.js";

const useSheet = SheetPrimitive.useContext;

const sheetVariants = tv({
  base: "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-closed:animate-out data-open:animate-in data-closed:duration-300 data-open:duration-500",
  variants: {
    side: {
      right:
        "data-closed:slide-out-to-right data-open:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      left: "data-closed:slide-out-to-left data-open:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      top: "data-closed:slide-out-to-top data-open:slide-in-from-top inset-x-0 top-0 h-auto border-b",
      bottom:
        "data-closed:slide-out-to-bottom data-open:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

function Sheet(props: ComponentProps<typeof SheetPrimitive.Root>) {
  const defaultedProps = mergeProps(
    { side: "right" } satisfies Partial<typeof props>,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, ["side"]);

  return <SheetPrimitive.Root data-slot="sheet" side={local.side} {...rest} />;
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
      data-slot="sheet-overlay"
      class={cn(
        "data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/80 data-closed:animate-out data-open:animate-in",
        local.class,
      )}
      {...rest}
    />
  );
}

function SheetContent(props: ComponentProps<typeof SheetPrimitive.Content>) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  const sheet = useSheet();

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        class={cn(
          sheetVariants({
            side: sheet.side(),
            class: [
              "data-transitioning:transition-transform data-transitioning:duration-500",
              local.class,
            ],
          }),
        )}
        {...rest}
      >
        {local.children}
        <SheetPrimitive.Close class="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-open:bg-secondary">
          <span class="sr-only">Close</span>
          <XIcon class="size-4" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="sheet-header"
      class={cn("flex flex-col gap-1.5 p-4", local.class)}
      {...rest}
    />
  );
}

function SheetFooter(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="sheet-footer"
      class={cn("mt-auto flex flex-col gap-2 p-4", local.class)}
      {...rest}
    />
  );
}

function SheetTitle(props: ComponentProps<typeof SheetPrimitive.Label>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SheetPrimitive.Label
      data-slot="sheet-title"
      class={cn("font-semibold text-foreground tracking-tight", local.class)}
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
      data-slot="sheet-description"
      class={cn("text-muted-foreground text-sm", local.class)}
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
  // Hooks
  useSheet,
  // Variants
  sheetVariants,
};
