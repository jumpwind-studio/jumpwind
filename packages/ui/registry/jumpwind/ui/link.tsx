import * as LinkPrimitive from "@kobalte/core/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/registry/jumpwind/lib/utils";
import { type ComponentProps, splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

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
      class={cn(
        linkVariants({ variant: local.variant, size: local.size }),
        local.class,
      )}
      data-slot="link"
      {...rest}
    />
  );
}

export { Link, linkVariants };
