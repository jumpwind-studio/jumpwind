import * as ToggleGroupPrimitive from "@kobalte/core/toggle-group";
import {
  type ComponentProps,
  createContext,
  splitProps,
  useContext,
} from "solid-js";
import { cn } from "../lib/utils.js";
import { type ToggleVariantProps, toggleVariants } from "./toggle.jsx";

const useToggleGroup = ToggleGroupPrimitive.useToggleGroupContext;

const ToggleGroupItemContext = createContext<ToggleVariantProps>({
  size: "default",
  variant: "default",
});

function useToggleGroupItem() {
  const context = useContext(ToggleGroupItemContext);
  if (!context) {
    throw new Error("useToggleGroupItem must be used within a ToggleGroup");
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
      as="div"
      data-slot="toggle-group"
      data-size={local.size}
      data-variant={local.variant}
      class={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        local.class,
      )}
      {...rest}
    >
      <ToggleGroupItemContext.Provider
        value={{
          variant: local.variant,
          size: local.size,
        }}
      >
        {local.children}
      </ToggleGroupItemContext.Provider>
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

  const context = useContext(ToggleGroupItemContext);
  const size = () => context?.size ?? local.size;
  const variant = () => context?.variant ?? local.variant;

  return (
    <ToggleGroupPrimitive.Item
      as="button"
      data-slot="toggle-group-item"
      data-size={size()}
      data-variant={variant()}
      class={toggleVariants({
        size: size(),
        variant: variant(),
        class: [
          "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
          local.class,
        ],
      })}
      {...rest}
    >
      {local.children}
    </ToggleGroupPrimitive.Item>
  );
}

export {
  ToggleGroup,
  ToggleGroupItem,
  // Hooks
  useToggleGroup,
  useToggleGroupItem,
};
