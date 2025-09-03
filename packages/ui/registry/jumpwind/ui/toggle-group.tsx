import * as ToggleGroupPrimitive from "@kobalte/core/toggle-group";
import { type ToggleVariantProps, toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/registry/jumpwind/lib/utils";
import {
  type ComponentProps,
  createContext,
  splitProps,
  useContext,
} from "solid-js";
import type { VariantProps } from "tailwind-variants";

const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

function useToggleGroup() {
  const context = useContext(ToggleGroupContext);
  if (!context) {
    throw new Error("useToggleGroup must be used within a ToggleGroup");
  }
  return context;
}

function ToggleGroup(
  props: ComponentProps<typeof ToggleGroupPrimitive.Root> & ToggleVariantProps,
) {
  const [local, rest] = splitProps(props, [
    "class",
    "variant",
    "size",
    "children",
  ]);

  return (
    <ToggleGroupPrimitive.Root
      class={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        local.class,
      )}
      data-size={local.size}
      data-slot="toggle-group"
      data-variant={local.variant}
      {...rest}
    >
      <ToggleGroupContext.Provider
        value={{
          variant: local.variant,
          size: local.size,
        }}
      >
        {local.children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem(
  props: ComponentProps<typeof ToggleGroupPrimitive.Item> & ToggleVariantProps,
) {
  const [local, rest] = splitProps(props, [
    "class",
    "variant",
    "size",
    "children",
  ]);

  const context = useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      class={cn(
        toggleVariants({
          variant: context.variant || local.variant,
          size: context.size || local.size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        local.class,
      )}
      data-size={context.size || local.size}
      data-slot="toggle-group-item"
      data-variant={context.variant || local.variant}
      {...rest}
    >
      {local.children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem, useToggleGroup };
