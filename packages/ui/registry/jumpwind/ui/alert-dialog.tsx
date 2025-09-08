import * as AlertDialogPrimitive from "corvu/dialog";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";
import {
  type ButtonVariantProps,
  buttonVariants,
} from "@/registry/jumpwind/ui/button";

const useAlertDialog = AlertDialogPrimitive.useContext;

function AlertDialog(props: ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger(
  props: ComponentProps<typeof AlertDialogPrimitive.Trigger>,
) {
  return (
    <AlertDialogPrimitive.Trigger
      as="button"
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

function AlertDialogPortal(
  props: ComponentProps<typeof AlertDialogPrimitive.Portal>,
) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

function AlertDialogOverlay(
  props: ComponentProps<typeof AlertDialogPrimitive.Overlay>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <AlertDialogPrimitive.Overlay
      as="div"
      data-slot="alert-dialog-overlay"
      class={cn(
        "data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/50 data-closed:animate-out data-open:animate-in",
        local.class,
      )}
      {...rest}
    />
  );
}

function AlertDialogContent(
  props: ComponentProps<typeof AlertDialogPrimitive.Content>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        as="div"
        data-slot="alert-dialog-content"
        class={cn(
          "data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-closed:animate-out data-open:animate-in sm:max-w-lg",
          local.class,
        )}
        {...rest}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="alert-dialog-header"
      class={cn("flex flex-col gap-2 text-center sm:text-left", local.class)}
      {...rest}
    />
  );
}

function AlertDialogFooter(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="alert-dialog-footer"
      class={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        local.class,
      )}
      {...rest}
    />
  );
}

function AlertDialogTitle(
  props: ComponentProps<typeof AlertDialogPrimitive.Label<"h2">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <AlertDialogPrimitive.Label
      as="h2"
      data-slot="alert-dialog-title"
      class={cn("font-semibold text-lg", local.class)}
      {...rest}
    />
  );
}

function AlertDialogDescription(
  props: ComponentProps<typeof AlertDialogPrimitive.Description>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  );
}

function AlertDialogAction(
  props: ComponentProps<"button"> & ButtonVariantProps,
) {
  const [local, rest] = splitProps(props, ["class", "size", "variant"]);

  return (
    <button
      data-slot="alert-dialog-action"
      class={buttonVariants({
        size: local.size,
        variant: local.variant,
        class: local.class,
      })}
      {...rest}
    />
  );
}

function AlertDialogCancel(
  props: ComponentProps<typeof AlertDialogPrimitive.Close<"button">> &
    ButtonVariantProps,
) {
  const [local, rest] = splitProps(props, ["class", "size", "variant"]);

  return (
    <AlertDialogPrimitive.Close
      as="button"
      data-slot="alert-dialog-cancel"
      class={buttonVariants({
        size: local.size,
        variant: local.variant ?? "outline",
        class: local.class,
      })}
      {...rest}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  // Hooks
  useAlertDialog,
};
