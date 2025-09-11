import * as DrawerPrimitive from "corvu/drawer";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

const useDrawer = DrawerPrimitive.useContext;
const useDrawerDialog = DrawerPrimitive.useDialogContext;

function Drawer(props: ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger(props: ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal(props: ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose(props: ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay(props: ComponentProps<typeof DrawerPrimitive.Overlay>) {
  const [local, rest] = splitProps(props, ["class"]);

  const { openPercentage } = useDrawer();

  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      class={cn(
        "fixed inset-0 z-50 bg-black/50",
        "data-closed:animate-out data-open:animate-in",
        "data-transitioning:transition-colors data-transitioning:duration-300",
        local.class,
      )}
      style={{
        "background-color": `rgb(0 0 0 / ${0.8 * openPercentage()})`,
      }}
      {...rest}
    />
  );
}

function DrawerContent(props: ComponentProps<typeof DrawerPrimitive.Content>) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        class={cn(
          "group/drawer-content fixed z-50 flex h-auto flex-col bg-background",
          "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:mb-24 data-[side=top]:max-h-[80vh] data-[side=top]:rounded-b-lg data-[side=top]:border-b",
          "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:mt-24 data-[side=bottom]:max-h-[80vh] data-[side=bottom]:rounded-t-lg data-[side=bottom]:border-t",
          "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:sm:max-w-sm",
          "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:sm:max-w-sm",
          local.class,
        )}
        {...rest}
      >
        <div class="mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full bg-muted group-data-side=bottom/drawer-content:block" />
        {local.children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="drawer-header"
      class={cn(
        "flex flex-col gap-0.5 p-4 group-data-[side=bottom]/drawer-content:text-center group-data-[side=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        local.class,
      )}
      {...rest}
    />
  );
}

function DrawerFooter(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="drawer-footer"
      class={cn("mt-auto flex flex-col gap-2 p-4", local.class)}
      {...rest}
    />
  );
}

function DrawerTitle(props: ComponentProps<typeof DrawerPrimitive.Label>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DrawerPrimitive.Label
      data-slot="drawer-title"
      class={cn("font-semibold text-foreground", local.class)}
      {...rest}
    />
  );
}

function DrawerDescription(
  props: ComponentProps<typeof DrawerPrimitive.Description>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  // Hooks
  useDrawer,
  useDrawerDialog,
};
