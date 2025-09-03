import * as ProgressPrimitive from "@kobalte/core/progress";
import { cn } from "@/registry/jumpwind/lib/utils";
import { type ComponentProps, splitProps } from "solid-js";

function Progress(props: ComponentProps<typeof ProgressPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class", "value"]);

  return (
    <ProgressPrimitive.Root
      class={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        local.class,
      )}
      data-slot="progress"
      value={local.value}
      {...rest}
    >
      <ProgressPrimitive.Track>
        <ProgressPrimitive.Fill
          class="h-full w-full flex-1 bg-primary transition-all"
          data-slot="progress-indicator"
          style={{ transform: `translateX(-${100 - (local.value || 0)}%)` }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
