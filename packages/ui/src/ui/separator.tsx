import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import type { ComponentProps, ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

export type SeparatorProps<T extends ValidComponent = "hr"> =
  ComponentProps<T> & {
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
  };

function Separator<T extends ValidComponent = "hr">(
  props: DynamicProps<T, SeparatorProps<T>>,
) {
  const defaultedProps = mergeProps(
    {
      orientation: "horizontal",
      decorative: true,
    } as const satisfies SeparatorProps,
    props,
  );

  const [local, rest] = splitProps(defaultedProps as SeparatorProps, [
    "class",
    "orientation",
    "decorative",
  ]);

  return (
    <Dynamic
      as="hr"
      data-slot="separator"
      data-orientation={local.orientation}
      role={local.decorative ? "none" : "separator"}
      aria-orientation={
        !local.decorative && local.orientation === "vertical"
          ? local.orientation
          : undefined
      }
      class={cn(
        // Base
        "shrink-0 bg-border",
        // Vertical
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        // Horizontal
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        local.class,
      )}
      {...rest}
    />
  );
}

export { Separator };
