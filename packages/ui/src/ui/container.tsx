import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import { type ComponentProps, splitProps, type ValidComponent } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const containerVariants = tv({
  base: "@container mx-auto w-full max-w-7xl lg:max-w-(--breakpoint-xl) 2xl:max-w-(--breakpoint-2xl)",
  variants: {
    intent: {
      constrained: "sm:px-6 lg:px-8",
      "padded-content": "px-4 sm:px-6 lg:px-8",
    },
  },
  defaultVariants: {
    intent: "padded-content",
  },
});

export type ContainerVariantProps = VariantProps<typeof containerVariants>;

function Container<T extends ValidComponent = "div">(
  props: DynamicProps<T, ComponentProps<T>> & ContainerVariantProps,
) {
  const [local, rest] = splitProps(props, ["class", "intent"]);

  return (
    <Dynamic
      as="div"
      data-slot="container"
      class={containerVariants({
        intent: local.intent,
        class: local.class,
      })}
      {...rest}
    />
  );
}

export { Container, containerVariants };
