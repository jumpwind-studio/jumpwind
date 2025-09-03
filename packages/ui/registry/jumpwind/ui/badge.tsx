import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import { cn } from "@/registry/jumpwind/lib/utils";
import { type ComponentProps, splitProps, type ValidComponent } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
  base: "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 font-medium text-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  variants: {
    variant: {
      default:
        "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
      secondary:
        "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
      destructive:
        "border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
      outline:
        "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

export type BadgeProps<T extends ValidComponent = "span"> = ComponentProps<T> &
  BadgeVariantProps;

function Badge<T extends ValidComponent = "span">(
  props: DynamicProps<T, BadgeProps<T>>,
) {
  const [local, rest] = splitProps(props as BadgeProps, ["class", "variant"]);

  return (
    <Dynamic
      as="span"
      class={cn(badgeVariants({ variant: local.variant }), local.class)}
      data-slot="badge"
      {...rest}
    />
  );
}

export { Badge, badgeVariants };
