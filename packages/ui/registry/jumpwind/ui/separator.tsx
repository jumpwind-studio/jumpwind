import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import { cn } from "@/components/ui/utils";
import type { ComponentProps, ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

export type SeparatorProps<T extends ValidComponent = "hr"> =
  ComponentProps<T> & {
    orientation?: "horizontal" | "vertical";
  };

const Separator = <T extends ValidComponent = "hr">(
  props: DynamicProps<T, SeparatorProps<T>>,
) => {
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
      aria-orientation={
        local.orientation === "vertical" ? "vertical" : undefined
      }
      as="hr"
      class={cn(
        "shrink-0 bg-border",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        local.class,
      )}
      data-orientation={local.orientation}
      data-slot="separator"
      role={props.as !== "hr" ? "separator" : undefined}
      {...rest}
    />
  );
};

export { Separator };
