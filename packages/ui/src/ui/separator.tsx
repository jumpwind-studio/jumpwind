import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import type { ComponentProps, ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

export type SeparatorProps<T extends ValidComponent = "hr"> =
  ComponentProps<T> & {
    orientation?: "horizontal" | "vertical";
  };

function Separator<T extends ValidComponent = "hr">(
  props: DynamicProps<T, SeparatorProps<T>>,
) {
  const defaultedProps = mergeProps(
    { orientation: "horizontal" } satisfies SeparatorProps,
    props,
  );

  const [local, rest] = splitProps(defaultedProps as SeparatorProps, [
    "class",
    "orientation",
  ]);

  return (
    <Dynamic
      as="hr"
      data-slot="separator"
      aria-orientation={
        local.orientation === "vertical" ? "vertical" : undefined
      }
      data-orientation={local.orientation}
      role={props.as !== "hr" ? "separator" : undefined}
      class={cn(
        "shrink-0 bg-border",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        local.class,
      )}
      {...rest}
    />
  );
}

export { Separator };
