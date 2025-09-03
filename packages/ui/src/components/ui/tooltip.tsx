import { cn } from "@/components/ui/utils";
import * as TooltipPrimitive from "corvu/tooltip";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";

const useTooltip = TooltipPrimitive.useContext;

function Tooltip(props: ComponentProps<typeof TooltipPrimitive.Root>) {
  const defaultedProps = mergeProps(
    {
      openDelay: 0,
      skipDelayDuration: 300, // Match Radix default
    } satisfies Omit<ComponentProps<typeof TooltipPrimitive.Root>, "children">,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, ["children", "openDelay"]);

  return (
    <TooltipPrimitive.Root
      data-slot="tooltip"
      openDelay={local.openDelay}
      {...rest}
    >
      {(rootProps) => (
        <TooltipPrimitive.Anchor data-slot="tooltip-anchor">
          {typeof local.children === "function"
            ? local.children(rootProps)
            : local.children}
        </TooltipPrimitive.Anchor>
      )}
    </TooltipPrimitive.Root>
  );
}

function TooltipTrigger(
  props: ComponentProps<typeof TooltipPrimitive.Trigger>,
) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent(
  props: ComponentProps<typeof TooltipPrimitive.Content>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        class={cn(
          "fade-in-0 zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 data-[placement*=bottom]:slide-in-from-top-2 data-[placement*=left]:slide-in-from-right-2 data-[placement*=right]:slide-in-from-left-2 data-[placement*=top]:slide-in-from-bottom-2 z-50 w-fit animate-in text-balance rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs data-closed:animate-out",
          local.class,
        )}
        data-slot="tooltip-content"
        {...rest}
      >
        {local.children}
        <TooltipPrimitive.Arrow class="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-primary fill-primary" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, useTooltip };
