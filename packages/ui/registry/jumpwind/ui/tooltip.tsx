import * as TooltipPrimitive from "corvu/tooltip";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

const useTooltip = TooltipPrimitive.useContext;

function Tooltip(props: ComponentProps<typeof TooltipPrimitive.Root>) {
  const defaultedProps = mergeProps(
    {
      openDelay: 0,
      skipDelayDuration: 300, // Match Radix default
      placement: "top",
    } satisfies Partial<typeof props>,
    props,
  );

  return <TooltipPrimitive.Root data-slot="tooltip" {...defaultedProps} />;
}

function TooltipAnchor(props: ComponentProps<typeof TooltipPrimitive.Anchor>) {
  return <TooltipPrimitive.Anchor data-slot="tooltip-anchor" {...props} />;
}

function TooltipTrigger(
  props: ComponentProps<typeof TooltipPrimitive.Trigger>,
) {
  return (
    <TooltipAnchor>
      <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
    </TooltipAnchor>
  );
}

function TooltipContent(
  props: ComponentProps<typeof TooltipPrimitive.Content>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        class={cn(
          "z-50 w-fit text-balance rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs",
          "fade-in-0 zoom-in-95 animate-in",
          "data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:animate-out",
          "data-[placement*=bottom]:slide-in-from-top-2",
          "data-[placement*=left]:slide-in-from-right-2",
          "data-[placement*=right]:slide-in-from-left-2",
          "data-[placement*=top]:slide-in-from-bottom-2",
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <TooltipPrimitive.Arrow
          class={cn(
            "z-50 size-2.5 text-primary",
            // "translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px]",
          )}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  // Hooks
  useTooltip,
};
