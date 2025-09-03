import * as LinkPrimitive from "@kobalte/core/link";
import { type ComponentProps, splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { buttonVariants } from "@/registry/jumpwind/ui/button";

const linkVariants = tv({
  extend: buttonVariants,
  defaultVariants: {
    variant: "link",
  },
});

type LinkVariantProps = VariantProps<typeof linkVariants>;

function Link(
  props: ComponentProps<typeof LinkPrimitive.Root<"a">> & LinkVariantProps,
) {
  const [local, rest] = splitProps(props, ["class", "variant", "size"]);

  return (
    <LinkPrimitive.Root
      as="a"
      data-slot="link"
      class={linkVariants({
        variant: local.variant,
        size: local.size,
        class: local.class,
      })}
      {...rest}
    />
  );
}

export { Link, linkVariants };
