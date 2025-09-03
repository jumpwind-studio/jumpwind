import { cn } from "@/registry/jumpwind/lib/utils";
import * as DialogPrimitive from "corvu/dialog";
import XIcon from "lucide-solid/icons/x";
import { type ComponentProps, splitProps } from "solid-js";

const useDialog = DialogPrimitive.useContext;

function Dialog(
  props: ComponentProps<typeof DialogPrimitive.Root> & {
    onClose?: () => void;
  },
) {
  const [local, rest] = splitProps(props, [
    "onContentPresentChange",
    "onClose",
  ]);

  return (
    <DialogPrimitive.Root
      data-slot="dialog"
      onContentPresentChange={(present) => {
        local.onContentPresentChange?.(present);
        if (!present) {
          local.onClose?.();
        }
      }}
      {...rest}
    />
  );
}

function DialogTrigger(props: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(props: ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose(props: ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay(props: ComponentProps<typeof DialogPrimitive.Overlay>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DialogPrimitive.Overlay
      class={cn(
        // "data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/80 data-closed:animate-out data-open:animate-in",
        "data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/50 data-closed:animate-out data-open:animate-in",
        local.class,
      )}
      data-slot="dialog-overlay"
      {...rest}
    />
  );
}

function DialogContent(
  props: ComponentProps<typeof DialogPrimitive.Content> & {
    onClose?: (e: MouseEvent) => void;
  },
) {
  const [local, rest] = splitProps(props, ["class", "children", "onClose"]);

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        class={cn(
          "data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-closed:animate-out data-open:animate-in sm:max-w-lg",
          local.class,
        )}
        data-slot="dialog-content"
        {...rest}
      >
        {local.children}
        <DialogClose
          class="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-open:bg-accent data-open:text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
          onClick={local.onClose}
        >
          <XIcon />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("flex flex-col gap-2 text-center sm:text-left", local.class)}
      data-slot="dialog-header"
      {...rest}
    />
  );
}

function DialogFooter(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        local.class,
      )}
      data-slot="dialog-footer"
      {...rest}
    />
  );
}

function DialogTitle(props: ComponentProps<typeof DialogPrimitive.Label>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DialogPrimitive.Label
      class={cn("font-semibold text-lg leading-none", local.class)}
      data-slot="dialog-title"
      {...rest}
    />
  );
}

function DialogDescription(
  props: ComponentProps<typeof DialogPrimitive.Description>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DialogPrimitive.Description
      class={cn("text-muted-foreground text-sm", local.class)}
      data-slot="dialog-description"
      {...rest}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  useDialog,
};
