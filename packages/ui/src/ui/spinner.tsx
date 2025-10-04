import Loader2Icon from "lucide-solid/icons/loader-2";
import { type ComponentProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cn } from "../lib/utils.js";

function Spinner(props: ComponentProps<"svg">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Dynamic
      component={Loader2Icon}
      role="status"
      aria-label="Loading"
      class={cn("size-4 animate-spin", local.class)}
      {...rest}
    />
  );
}

export { Spinner };
