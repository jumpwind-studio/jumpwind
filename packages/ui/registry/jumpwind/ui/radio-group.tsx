import * as RadioGroupPrimitive from "@kobalte/core/radio-group";
import DotIcon from "lucide-solid/icons/dot";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

const useRadioGroup = RadioGroupPrimitive.useRadioGroupContext;

const RadioGroupLabel = RadioGroupPrimitive.Label;
const RadioGroupDescription = RadioGroupPrimitive.Description;
const RadioGroupMessage = RadioGroupPrimitive.ErrorMessage;

function RadioGroup(
  props: ComponentProps<typeof RadioGroupPrimitive.Root<"div">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.Root
      as="div"
      data-slot="radio-group"
      class={cn("grid gap-3", local.class)}
      {...rest}
    />
  );
}

function RadioGroupItem(
  props: ComponentProps<typeof RadioGroupPrimitive.Item<"div">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.Item
      as="div"
      data-slot="radio-group-item"
      class={cn("flex items-center gap-x-2", local.class)} // TODO: verify these styles (in solid-ui, shadcn)
      {...rest}
    />
  );
}

function RadioGroupItemInput(
  props: ComponentProps<typeof RadioGroupPrimitive.ItemInput<"input">>,
) {
  return (
    <RadioGroupPrimitive.ItemInput
      as="input"
      data-slot="radio-group-input"
      {...props}
    />
  );
}

function RadioGroupItemControl(
  props: ComponentProps<typeof RadioGroupPrimitive.ItemControl<"div">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.ItemControl
      as="div"
      data-slot="radio-group-control"
      class={cn(
        // "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        "flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-primary shadow transition-shadow focus:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-foreground",
        local.class,
      )}
      {...rest}
    >
      <RadioGroupPrimitive.ItemIndicator
        data-slot="radio-group-indicator"
        class="size-2 rounded-full data-checked:bg-red-300 data-checked:text-red-300"
      >
        <DotIcon class="size-2" />
      </RadioGroupPrimitive.ItemIndicator>
    </RadioGroupPrimitive.ItemControl>
  );
}

function RadioGroupItemLabel(
  props: ComponentProps<typeof RadioGroupPrimitive.ItemLabel<"label">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.ItemLabel
      as="label"
      data-slot="radio-group-item-label"
      class={cn(
        "font-medium text-primary text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
  RadioGroupItemInput,
  RadioGroupItemControl,
  // Forms
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupMessage,
  // Hooks
  useRadioGroup,
};
