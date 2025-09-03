import { cn } from "@/components/ui/utils";
import * as PopoverPrimitive from "corvu/popover";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";

const usePopover = PopoverPrimitive.useContext;
const usePopoverDialog = PopoverPrimitive.useDialogContext;

function Popover(props: ComponentProps<typeof PopoverPrimitive.Root>) {
  const defaultedProps = mergeProps(
    {
      placement: "bottom",
      floatingOptions: { offset: 4 },
    } satisfies Partial<ComponentProps<typeof PopoverPrimitive.Root>>,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, ["children"]);

  return (
    <PopoverPrimitive.Root data-slot="popover" {...rest}>
      {local.children}
    </PopoverPrimitive.Root>
  );
}

function PopoverAnchor(props: ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverTrigger(
  props: ComponentProps<typeof PopoverPrimitive.Trigger>,
) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent(
  props: ComponentProps<typeof PopoverPrimitive.Content>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        class={cn(
          "data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[placement*=bottom]:slide-in-from-top-2 data-[placement*=left]:slide-in-from-right-2 data-[placement*=right]:slide-in-from-left-2 data-[placement*=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-closed:animate-out data-open:animate-in",
          local.class,
        )}
        data-slot="popover-content"
        {...rest}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverOverlay(
  props: ComponentProps<typeof PopoverPrimitive.Overlay>,
) {
  return <PopoverPrimitive.Overlay data-slot="popover-overlay" {...props} />;
}

function PopoverArrow(props: ComponentProps<typeof PopoverPrimitive.Arrow>) {
  return <PopoverPrimitive.Arrow data-slot="popover-arrow" {...props} />;
}

function PopoverClose(props: ComponentProps<typeof PopoverPrimitive.Close>) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

function PopoverLabel(props: ComponentProps<typeof PopoverPrimitive.Label>) {
  return <PopoverPrimitive.Label data-slot="popover-label" {...props} />;
}

function PopoverDescription(
  props: ComponentProps<typeof PopoverPrimitive.Description>,
) {
  return (
    <PopoverPrimitive.Description data-slot="popover-description" {...props} />
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
  usePopover,
  usePopoverDialog,
};
