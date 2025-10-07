import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import { type ComponentProps, splitProps, type ValidComponent } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

export const labelVariants = tv({
  base: "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
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

export const Label = <T extends ValidComponent = "label">(
  props: DynamicProps<T, ComponentProps<T>> & LabelVariantProps,
) => {
  const [local, rest] = splitProps(props, ["class", "variant"]);

  return (
    <Dynamic
      as="label"
      data-slot="label"
      class={labelVariants({ variant: local.variant, class: local.class })}
      {...rest}
    />
  );
};
