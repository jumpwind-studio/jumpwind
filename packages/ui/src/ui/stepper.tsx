import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import * as StepperPrimitive from "../primitives/stepper/index.js";

const useStepper = StepperPrimitive.useContext;
const useStepperItem = StepperPrimitive.useItemContext;

function Stepper(
  props: ComponentProps<typeof StepperPrimitive.Root> & {
    class?: string;
  },
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div class={local.class}>
      <StepperPrimitive.Root data-slot="stepper" {...rest} />
    </div>
  );
}

function StepperItem(props: ComponentProps<typeof StepperPrimitive.Item>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <StepperPrimitive.Item
      data-slot="stepper-item"
      class={cn("border-b last:border-b-0", local.class)}
      {...rest}
    />
  );
}

function StepperTrigger(
  props: ComponentProps<typeof StepperPrimitive.Trigger>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <StepperPrimitive.Trigger
      data-slot="stepper-trigger"
      class={cn(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </StepperPrimitive.Trigger>
  );
}

function StepperContent(
  props: ComponentProps<typeof StepperPrimitive.Content>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <StepperPrimitive.Content
      data-slot="stepper-content"
      class="overflow-hidden text-sm"
      {...rest}
    >
      <div class={cn("pt-0 pb-4", local.class)}>{local.children}</div>
    </StepperPrimitive.Content>
  );
}

export {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperContent,
  // Hooks
  useStepper,
  useStepperItem,
};
