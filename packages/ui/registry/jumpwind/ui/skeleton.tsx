import { cn } from "@/registry/jumpwind/lib/utils";
import { type ComponentProps, splitProps } from "solid-js";

function Skeleton(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("animate-pulse rounded-md bg-accent", local.class)}
      data-slot="skeleton"
      {...rest}
    />
  );
}

export { Skeleton };
