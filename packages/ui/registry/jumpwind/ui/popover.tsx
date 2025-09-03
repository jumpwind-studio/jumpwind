import * as PopoverPrimitive from "corvu/popover";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

const usePopover = PopoverPrimitive.useContext;
const usePopoverDialog = PopoverPrimitive.useDialogContext;

function Popover(props: ComponentProps<typeof PopoverPrimitive.Root>) {
  const defaultedProps = mergeProps(
    {
      placement: "bottom",
      floatingOptions: { offset: 4 },
    } satisfies Partial<typeof props>,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, ["children"]);

  return (
    <PopoverPrimitive.Root data-slot="popover" {...rest}>
      {local.children}
    </PopoverPrimitive.Root>
  );
}

function PopoverAnchor(
  props: ComponentProps<typeof PopoverPrimitive.Anchor<"div">>,
) {
  return (
    <PopoverPrimitive.Anchor as="div" data-slot="popover-anchor" {...props} />
  );
}

function PopoverTrigger(
  props: ComponentProps<typeof PopoverPrimitive.Trigger<"button">>,
) {
  return (
    <PopoverPrimitive.Trigger
      as="button"
      data-slot="popover-trigger"
      {...props}
    />
  );
}

function PopoverContent(
  props: ComponentProps<typeof PopoverPrimitive.Content<"div">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        as="div"
        data-slot="popover-content"
        class={cn(
          "data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[placement*=bottom]:slide-in-from-top-2 data-[placement*=left]:slide-in-from-right-2 data-[placement*=right]:slide-in-from-left-2 data-[placement*=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-closed:animate-out data-open:animate-in",
          local.class,
        )}
        {...rest}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverOverlay(
  props: ComponentProps<typeof PopoverPrimitive.Overlay<"div">>,
) {
  return (
    <PopoverPrimitive.Overlay as="div" data-slot="popover-overlay" {...props} />
  );
}

function PopoverArrow(
  props: ComponentProps<typeof PopoverPrimitive.Arrow<"div">>,
) {
  return (
    <PopoverPrimitive.Arrow as="div" data-slot="popover-arrow" {...props} />
  );
}

function PopoverClose(
  props: ComponentProps<typeof PopoverPrimitive.Close<"button">>,
) {
  return (
    <PopoverPrimitive.Close as="button" data-slot="popover-close" {...props} />
  );
}

function PopoverLabel(
  props: ComponentProps<typeof PopoverPrimitive.Label<"h2">>,
) {
  return (
    <PopoverPrimitive.Label as="h2" data-slot="popover-label" {...props} />
  );
}

function PopoverDescription(
  props: ComponentProps<typeof PopoverPrimitive.Description<"p">>,
) {
  return (
    <PopoverPrimitive.Description
      as="p"
      data-slot="popover-description"
      {...props}
    />
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverOverlay,
  PopoverContent,
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverLabel,
  PopoverDescription,
  // Hooks
  usePopover,
  usePopoverDialog,
};
