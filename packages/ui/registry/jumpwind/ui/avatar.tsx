import * as AvatarPrimitive from "@kobalte/core/image";
import { cn } from "@/components/ui/utils";
import { type ComponentProps, splitProps } from "solid-js";

function Avatar(props: ComponentProps<typeof AvatarPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      class={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full items-center justify-center",
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
        "bg-muted flex size-full items-center justify-center rounded-full",
        local.class,
      )}
      {...rest}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
