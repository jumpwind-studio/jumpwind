import { type ComponentProps, type JSX, splitProps } from "solid-js";
import { Toaster as Sonner, toast as sonner } from "solid-sonner";
import { cn } from "@/registry/jumpwind/lib/utils";

const toast = sonner;

function Toaster(props: ComponentProps<typeof Sonner>) {
  const [local, rest] = splitProps(props, ["class", "style", "theme"]);

  return (
    <Sonner
      data-class="toaster"
      position="top-right"
      theme={local.theme}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          ...local.style,
        } as JSX.CSSProperties
      }
      class={cn("toaster group", local.class)}
      {...rest}
    />
  );
}

export { toast, Toaster };
