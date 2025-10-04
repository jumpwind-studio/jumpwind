import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import { type ComponentProps, splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/utils.js";
import { Separator } from "./separator.jsx";

function ItemGroup(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="item-group"
      role="list"
      class={cn("group/item-group flex flex-col", local.class)}
      {...rest}
    />
  );
}

function ItemSeparator(props: ComponentProps<typeof Separator>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      class={cn("my-0", local.class)}
      {...rest}
    />
  );
}

const itemVariants = tv({
  base: "group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  variants: {
    variant: {
      default: "bg-transparent",
      outline: "border-border",
      muted: "bg-muted/50",
    },
    size: {
      default: "p-4 gap-4 ",
      sm: "py-3 px-4 gap-2.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ItemVariantProps = VariantProps<typeof itemVariants>;

function Item(
  props: DynamicProps<"div", ComponentProps<"div">> & ItemVariantProps,
) {
  const [local, rest] = splitProps(props, ["class", "variant", "size"]);

  return (
    <Dynamic
      as="div"
      data-slot="item"
      data-variant={local.variant}
      data-size={local.size}
      class={cn(
        itemVariants({
          variant: local.variant,
          size: local.size,
          class: local.class,
        }),
      )}
      {...rest}
    />
  );
}

const itemMediaVariants = tv({
  base: "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  variants: {
    variant: {
      default: "bg-transparent",
      icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
      image:
        "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ItemMediaVariantProps = VariantProps<typeof itemMediaVariants>;

function ItemMedia(props: ComponentProps<"div"> & ItemMediaVariantProps) {
  const [local, rest] = splitProps(props, ["class", "variant"]);

  return (
    <div
      data-slot="item-media"
      data-variant={local.variant}
      class={itemMediaVariants({ variant: local.variant, class: local.class })}
      {...rest}
    />
  );
}

function ItemContent(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="item-content"
      class={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        local.class,
      )}
      {...rest}
    />
  );
}

function ItemTitle(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="item-title"
      class={cn(
        "flex w-fit items-center gap-2 font-medium text-sm leading-snug",
        local.class,
      )}
      {...rest}
    />
  );
}

function ItemDescription(props: ComponentProps<"p">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <p
      data-slot="item-description"
      class={cn(
        "line-clamp-2 text-balance font-normal text-muted-foreground text-sm leading-normal",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        local.class,
      )}
      {...rest}
    />
  );
}

function ItemActions(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="item-actions"
      class={cn("flex items-center gap-2", local.class)}
      {...rest}
    />
  );
}

function ItemHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="item-header"
      class={cn(
        "flex basis-full items-center justify-between gap-2",
        local.class,
      )}
      {...rest}
    />
  );
}

function ItemFooter(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="item-footer"
      class={cn(
        "flex basis-full items-center justify-between gap-2",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
};
