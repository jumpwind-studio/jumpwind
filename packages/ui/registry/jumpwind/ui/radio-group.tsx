import * as RadioGroupPrimitive from "@kobalte/core/radio-group";
import { cn } from "@/registry/jumpwind/lib/utils";
import DotIcon from "lucide-solid/icons/dot";
import { type ComponentProps, For, splitProps } from "solid-js";

const FormRadioGroupLabel = RadioGroupPrimitive.Label;
const FormRadioGroupDescription = RadioGroupPrimitive.Description;
const FormRadioGroupMessage = RadioGroupPrimitive.ErrorMessage;

function RadioGroupRoot(
  props: ComponentProps<typeof RadioGroupPrimitive.Root>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.Root
      class={cn("grid gap-3", local.class)}
      data-slot="radio-group"
      {...rest}
    />
  );
}

function RadioGroupItem(
  props: ComponentProps<typeof RadioGroupPrimitive.Item>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.Item
      class={cn("flex items-center gap-x-2", local.class)} // TODO: verify these styles (in solid-ui, shadcn)
      data-slot="radio-group-item"
      {...rest}
    />
  );
}

function RadioGroupItemInput(
  props: ComponentProps<typeof RadioGroupPrimitive.ItemInput>,
) {
  return (
    <RadioGroupPrimitive.ItemInput data-slot="radio-group-input" {...props} />
  );
}

function RadioGroupItemControl(
  props: ComponentProps<typeof RadioGroupPrimitive.ItemControl>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.ItemControl
      class={cn(
        // "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        "flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-primary shadow transition-shadow focus:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-foreground",
        local.class,
      )}
      data-slot="radio-group-control"
      {...rest}
    >
      <RadioGroupPrimitive.ItemIndicator
        class="size-2 rounded-full data-checked:bg-red-300 data-checked:text-red-300"
        data-slot="radio-group-indicator"
      >
        <DotIcon class="size-2" />
      </RadioGroupPrimitive.ItemIndicator>
    </RadioGroupPrimitive.ItemControl>
  );
}

function RadioGroupItemLabel(
  props: ComponentProps<typeof RadioGroupPrimitive.ItemLabel>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.ItemLabel
      class={cn(
        "font-medium text-primary text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        local.class,
      )}
      data-slot="radio-group-item-label"
      {...rest}
    />
  );
}

export interface RadioGroupItemValue<TValue = string> {
  value: TValue;
  label: string;
}

function RadioGroup<T extends string>(
  props: ComponentProps<typeof RadioGroupPrimitive.Root> & {
    items: RadioGroupItemValue<T>[];
  },
) {
  const [local, rest] = splitProps(props, ["class", "items"]);

  return (
    <RadioGroupRoot class={local.class} {...rest}>
      <For each={local.items}>
        {(item) => (
          <RadioGroupItem value={item.value}>
            <RadioGroupItemInput />
            <RadioGroupItemControl />
            <RadioGroupItemLabel>{item.label}</RadioGroupItemLabel>
          </RadioGroupItem>
        )}
      </For>
    </RadioGroupRoot>
  );
}

export {
  RadioGroupRoot,
  RadioGroupItem,
  RadioGroupItemLabel,
  RadioGroupItemInput,
  RadioGroupItemControl,
  // Forms
  FormRadioGroupLabel,
  FormRadioGroupDescription,
  FormRadioGroupMessage,
  // Pre-assembled
  RadioGroup,
};
