import * as ResizablePrimitive from "corvu/resizable";
import GripVerticalIcon from "lucide-solid/icons/grip-vertical";
import { type ComponentProps, Show, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

const useResizable = ResizablePrimitive.useContext;
const useResizablePanel = ResizablePrimitive.usePanelContext;

function Resizable(props: ComponentProps<typeof ResizablePrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ResizablePrimitive.Root
      data-slot="resizable"
      class={cn(
        "flex size-full data-[orientation=vertical]:flex-col",
        local.class,
      )}
      {...rest}
    />
  );
}

function ResizablePanel(
  props: ComponentProps<typeof ResizablePrimitive.Panel>,
) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle(
  props: ComponentProps<typeof ResizablePrimitive.Handle> & {
    withHandle?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "withHandle"]);

  return (
    <ResizablePrimitive.Handle
      data-slot="resizable-handle"
      class={cn(
        "relative flex w-px items-center justify-center bg-border",
        "focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        "after:-translate-x-1/2 after:absolute after:inset-y-0 after:left-1/2 after:w-1",
        "data-[orientation=vertical]:h-px",
        "data-[orientation=vertical]:w-full",
        "data-[orientation=vertical]:after:left-0",
        "data-[orientation=vertical]:after:h-1",
        "data-[orientation=vertical]:after:w-full",
        "data-[orientation=vertical]:after:translate-x-0",
        "data-[orientation=vertical]:after:-translate-y-1/2",
        "[&[data-orientation=vertical]>div]:rotate-90",
        local.class,
      )}
      {...rest}
    >
      <Show when={local.withHandle}>
        <div class="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border">
          <GripVerticalIcon class="size-2.5" />
        </div>
      </Show>
    </ResizablePrimitive.Handle>
  );
}

export {
  Resizable,
  ResizablePanel,
  ResizableHandle,
  // Hooks
  useResizable,
  useResizablePanel,
};
