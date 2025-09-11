import * as HoverCardPrimitive from "@kobalte/core/hover-card";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

const useHoverCard = HoverCardPrimitive.useHoverCardContext;

function HoverCard(props: ComponentProps<typeof HoverCardPrimitive.Root>) {
  const defaultedProps = mergeProps(
    {
      placement: "bottom",
      gutter: 4,
    } satisfies HoverCardPrimitive.HoverCardRootProps,
    props,
  );
  const [local, rest] = splitProps(defaultedProps, ["placement", "gutter"]);

  return (
    <HoverCardPrimitive.Root
      data-slot="hover-card"
      gutter={local.gutter}
      placement={local.placement}
      {...rest}
    />
  );
}

function HoverCardTrigger(
  props: ComponentProps<typeof HoverCardPrimitive.Trigger>,
) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

function HoverCardContent(
  props: ComponentProps<typeof HoverCardPrimitive.Content>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        class={cn(
          "data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--kb-hovercard-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-closed:animate-out data-expanded:animate-in",
          local.class,
        )}
        {...rest}
      />
    </HoverCardPrimitive.Portal>
  );
}

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  // Hooks
  useHoverCard,
};
