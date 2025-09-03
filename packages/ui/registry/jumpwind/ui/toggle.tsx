import * as TogglePrimitive from "@kobalte/core/toggle-button";
import { cn } from "@/components/ui/utils";
import { type ComponentProps, splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const toggleVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-[color,box-shadow] hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-pressed:bg-accent data-pressed:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-transparent",
      outline:
        "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-9 min-w-9 px-2",
      sm: "h-8 min-w-8 px-1.5",
      lg: "h-10 min-w-10 px-2.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type ToggleVariantProps = VariantProps<typeof toggleVariants>;

function Toggle(
  props: ComponentProps<typeof TogglePrimitive.Root> & ToggleVariantProps,
) {
  const [local, rest] = splitProps(props, ["class", "variant", "size"]);

  return (
    <TogglePrimitive.Root
      class={cn(
        toggleVariants({
          variant: local.variant,
          size: local.size,
          class: local.class,
        }),
      )}
      data-slot="toggle"
      {...rest}
    />
  );
}

export { Toggle, toggleVariants };
