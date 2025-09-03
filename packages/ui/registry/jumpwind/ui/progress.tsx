import * as ProgressPrimitive from "@kobalte/core/progress";
import { type ComponentProps, createMemo, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

function Progress(props: ComponentProps<typeof ProgressPrimitive.Root<"div">>) {
  const [local, rest] = splitProps(props, ["class", "value"]);

  const translateX = createMemo(() => {
    return `translateX(-${100 - (local.value || 0)}%)` as const;
  });

  return (
    <ProgressPrimitive.Root
      as="div"
      data-slot="progress"
      value={local.value}
      class={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        local.class,
      )}
      {...rest}
    >
      <ProgressPrimitive.Track>
        <ProgressPrimitive.Fill
          data-slot="progress-indicator"
          class="h-full w-full flex-1 bg-primary transition-all"
          style={{ transform: translateX() }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
