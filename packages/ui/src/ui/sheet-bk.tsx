import type { Side } from "@corvu/utils";
import {
  createKeyedContext,
  useKeyedContext,
} from "@corvu/utils/create/keyedContext";
import * as SheetPrimitive from "corvu/dialog";
import XIcon from "lucide-solid/icons/x";
import {
  type ComponentProps,
  createContext,
  mergeProps,
  splitProps,
  useContext,
} from "solid-js";
import { cn } from "../lib/utils.js";

export type SheetContextValue = SheetPrimitive.ContextValue & {
  side?: Side;
};

const SheetContext = createContext<SheetContextValue>();

export const createSheetContext = (contextId?: string) => {
  if (contextId === undefined) return SheetContext;

  const context = createKeyedContext<SheetContextValue>(`drawer-${contextId}`);
  return context;
};

/** Context which exposes various properties to interact with the drawer. Optionally provide a contextId to access a keyed context. */
export const useSheetContext = (contextId?: string) => {
  if (contextId === undefined) {
    const context = useContext(SheetContext);
    if (!context) {
      throw new Error(
        "[corvu]: Sheet context not found. Make sure to wrap Sheet components in <Sheet.Root>",
      );
    }
    return context;
  }

  const context = useKeyedContext<SheetContextValue>(`drawer-${contextId}`);
  if (!context) {
    throw new Error(
      `[corvu]: Sheet context with id "${contextId}" not found. Make sure to wrap Sheet components in <Sheet.Root contextId="${contextId}">`,
    );
  }
  return context;
};

const useSheet = SheetPrimitive.useContext;

type SheetProps = ComponentProps<typeof SheetPrimitive.Root> & {
  /**
   * The `side` to open on.
   * @defaultValue `'right'`
   */
  side?: Side;
};

function Sheet(props: SheetProps) {
  const defaultedProps = mergeProps(
    { side: "right" } satisfies Partial<typeof props>,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, ["side"]);

  return (
    <SheetContext.Provider value={{ side: local.side }}>
      <SheetPrimitive.Root data-slot="sheet" {...rest} />
    </SheetContext.Provider>
  );
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

// const sheetVariants = tv({
//   base: "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-closed:animate-out data-open:animate-in data-closed:duration-300 data-open:duration-500",
//   variants: {
//     side: {
//       right:
//         "data-closed:slide-out-to-right data-open:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
//       left: "data-closed:slide-out-to-left data-open:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
//       top: "data-closed:slide-out-to-top data-open:slide-in-from-top inset-x-0 top-0 h-auto border-b",
//       bottom:
//         "data-closed:slide-out-to-bottom data-open:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
//     },
//   },
//   defaultVariants: {
//     side: "right",
//   },
// });

// export type SheetVariantProps = VariantProps<typeof sheetVariants>;

function SheetContent(props: ComponentProps<typeof SheetPrimitive.Content>) {
  const defaultedProps = mergeProps(
    { side: "right" } satisfies typeof props,
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
        data-slot="sheet-content"
        class={cn(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-closed:animate-out data-open:animate-in data-closed:duration-300 data-open:duration-500",
          // Right
          "in-data-[side=right]:data-closed:slide-out-to-right in-data-[side=right]:data-open:slide-in-from-right in-data-[side=right]:inset-y-0 in-data-[side=right]:right-0 in-data-[side=right]:h-full in-data-[side=right]:w-3/4 in-data-[side=right]:border-l in-data-[side=right]:sm:max-w-sm",
          // Left
          "in-data-[side=left]:data-closed:slide-out-to-left in-data-[side=left]:data-open:slide-in-from-left in-data-[side=left]:inset-y-0 in-data-[side=left]:left-0 in-data-[side=left]:h-full in-data-[side=left]:w-3/4 in-data-[side=left]:border-r in-data-[side=left]:sm:max-w-sm",
          // Top
          "in-data-[side=top]:data-closed:slide-out-to-top in-data-[side=top]:data-open:slide-in-from-top in-data-[side=top]:inset-x-0 in-data-[side=top]:top-0 in-data-[side=top]:h-auto in-data-[side=top]:border-b",
          // Down
          "in-data-[side=down]:data-closed:slide-out-to-bottom in-data-[side=down]:data-open:slide-in-from-bottom in-data-[side=down]:inset-x-0 in-data-[side=down]:bottom-0 in-data-[side=down]:h-auto in-data-[side=down]:border-t",
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
  // sheetVariants,
};
