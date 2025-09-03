import { cn } from "@/registry/jumpwind/lib/utils";
import * as ResizablePrimitive from "corvu/resizable";
import GripVerticalIcon from "lucide-solid/icons/grip-vertical";
import { type ComponentProps, Show, splitProps } from "solid-js";

const useResizable = ResizablePrimitive.useContext;
const useResizablePanel = ResizablePrimitive.usePanelContext;

function ResizablePanelGroup(
  props: ComponentProps<typeof ResizablePrimitive.Root>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ResizablePrimitive.Root
      class={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        local.class,
      )}
      data-slot="resizable-panel-group"
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
      class={cn(
        "after:-translate-x-1/2 data-[panel-group-direction=vertical]:after:-translate-y-1/2 relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        local.class,
      )}
      data-slot="resizable-handle"
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
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  useResizable,
  useResizablePanel,
};
