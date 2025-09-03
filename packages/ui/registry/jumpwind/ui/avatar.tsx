import * as AvatarPrimitive from "@kobalte/core/image";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

function Avatar(props: ComponentProps<typeof AvatarPrimitive.Root<"span">>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <AvatarPrimitive.Root
      as="span"
      data-slot="avatar"
      class={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full items-center justify-center",
        local.class,
      )}
      {...rest}
    />
  );
}

function AvatarImage(
  props: ComponentProps<typeof AvatarPrimitive.Image<"span">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <AvatarPrimitive.Image
      as="span"
      data-slot="avatar-image"
      class={cn("aspect-square size-full", local.class)}
      {...rest}
    />
  );
}

function AvatarFallback(
  props: ComponentProps<typeof AvatarPrimitive.Fallback<"span">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <AvatarPrimitive.Fallback
      as="span"
      data-slot="avatar-fallback"
      class={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        local.class,
      )}
      {...rest}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
