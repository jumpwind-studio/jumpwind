import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

export function SiteLayout(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn(
        "flex min-h-[calc(100%-var(--header-height))] flex-col justify-center",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
}
