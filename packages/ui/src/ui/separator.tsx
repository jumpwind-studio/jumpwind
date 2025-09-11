import { Dynamic } from "@corvu/utils/dynamic";
import type { ComponentProps } from "solid-js";
import { mergeProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

function Separator(
  props: ComponentProps<"hr"> & {
    orientation?: "horizontal" | "vertical";
  },
) {
  const defaultedProps = mergeProps(
    { orientation: "horizontal" } satisfies Partial<typeof props>,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, ["class", "orientation"]);

  return (
    <Dynamic
      as="hr"
      data-slot="separator"
      aria-orientation={
        local.orientation === "vertical" ? "vertical" : undefined
      }
      data-orientation={local.orientation}
      role={(props as any).as !== "hr" ? "separator" : undefined} // TODO
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
