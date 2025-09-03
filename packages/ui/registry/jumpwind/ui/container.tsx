import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import { cn } from "@/registry/jumpwind/lib/utils";
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

export type ContainerProps<T extends ValidComponent = "span"> =
  ComponentProps<T> & ContainerVariantProps;

export function Container<T extends ValidComponent = "span">(
  props: DynamicProps<T, ContainerProps<T>>,
) {
  const [local, rest] = splitProps(props as ContainerProps, [
    "class",
    "intent",
  ]);

  return (
    <Dynamic
      as="div"
      data-slot="container"
      class={cn(containerVariants({ intent: local.intent }), local.class)}
      {...rest}
    />
  );
}
