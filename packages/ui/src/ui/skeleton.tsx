import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

function Skeleton(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="skeleton"
      class={cn("animate-pulse rounded-md bg-accent", local.class)}
      {...rest}
    />
  );
}

export { Skeleton };
