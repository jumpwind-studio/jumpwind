import { cn } from "@/components/ui/utils";
import { type ComponentProps, type JSX, splitProps } from "solid-js";
import { Toaster as Sonner, toast as sonner } from "solid-sonner";

const toast = sonner;

function Toaster(props: ComponentProps<typeof Sonner>) {
  const [local, rest] = splitProps(props, ["class", "style", "theme"]);

  return (
    <Sonner
      class={cn("toaster group", local.class)}
      position="top-right"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          ...local.style,
        } as JSX.CSSProperties
      }
      theme={local.theme}
      {...rest}
    />
  );
}

export { toast, Toaster };
