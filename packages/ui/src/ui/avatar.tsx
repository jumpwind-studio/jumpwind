import * as AvatarPrimitive from "@kobalte/core/image";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

const useAvatar = AvatarPrimitive.useImageContext;

function Avatar(props: ComponentProps<typeof AvatarPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      class={cn(
        // "relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full",
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        local.class,
      )}
      {...rest}
    />
  );
}

function AvatarImage(props: ComponentProps<typeof AvatarPrimitive.Image>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      class={cn("aspect-square size-full", local.class)}
      {...rest}
    />
  );
}

function AvatarFallback(
  props: ComponentProps<typeof AvatarPrimitive.Fallback>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      class={cn(
        "flex size-full items-center justify-center rounded-full bg-muted",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  // Hooks
  useAvatar,
};
