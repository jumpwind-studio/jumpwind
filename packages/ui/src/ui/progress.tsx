import * as ProgressPrimitive from "@kobalte/core/progress";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import { type LabelVariantProps, labelVariants } from "./label.jsx";

const useProgress = ProgressPrimitive.useProgressContext;

function Progress(props: ComponentProps<typeof ProgressPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      class={cn("flex w-full flex-col gap-y-2", local.class)}
      {...rest}
    >
      {local.children}
      <ProgressPrimitive.Track class="h-2 w-full overflow-hidden rounded-full bg-primary/20">
        <ProgressPrimitive.Fill
          data-slot="progress-indicator"
          class={cn(
            "h-full w-(--kb-progress-fill-width) flex-1 bg-primary transition-all",
            "data-[progress=complete]:bg-primary/80",
          )}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

function ProgressValueLabel(
  props: ComponentProps<typeof ProgressPrimitive.ValueLabel> &
    LabelVariantProps,
) {
  const [local, rest] = splitProps(props, ["class", "variant"]);

  return (
    <ProgressPrimitive.ValueLabel
      data-slot="progress-value-label"
      class={labelVariants({
        variant: local.variant,
        class: local.class,
      })}
      {...rest}
    />
  );
}

function ProgressLabel(props: ComponentProps<typeof ProgressPrimitive.Label>) {
  return <ProgressPrimitive.Label data-slot="progress-label" {...props} />;
}

export {
  Progress,
  ProgressValueLabel,
  ProgressLabel,
  // Hooks
  useProgress,
};
