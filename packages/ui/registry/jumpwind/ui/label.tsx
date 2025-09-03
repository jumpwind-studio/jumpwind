import { Polymorphic, type PolymorphicProps } from "@kobalte/core/polymorphic";
import { cn } from "@/registry/jumpwind/lib/utils";
import type { ComponentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

export const labelVariants = tv({
  base: "flex select-none items-center gap-2 font-medium text-sm leading-none disabled:pointer-events-none disabled:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-disabled:pointer-events-none group-data-disabled:opacity-50",
  variants: {
    variant: {
      label: "data-invalid:text-destructive",
      error: "text-destructive",
      description: "font-normal text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "label",
  },
});

export type LabelVariantProps = VariantProps<typeof labelVariants>;

export type LabelProps<T extends ValidComponent = "label"> = ComponentProps<T> &
  LabelVariantProps & {
    class?: string;
  };

export const Label = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, LabelProps<T>>,
) => {
  const [local, rest] = splitProps(props as LabelProps, ["class", "variant"]);

  return (
    <Polymorphic
      as="label"
      class={cn(labelVariants({ variant: local.variant }), local.class)}
      data-slot="label"
      {...rest}
    />
  );
};
