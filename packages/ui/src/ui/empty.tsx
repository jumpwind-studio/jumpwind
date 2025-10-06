import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/utils.js";

/**
 * Wraps the EmptyHeader and EmptyContent components.
 */
function Empty(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="empty"
      class={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12",
        local.class,
      )}
      {...rest}
    />
  );
}

/**
 * Wraps the empty media, title, and description.
 */
function EmptyHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="empty-header"
      class={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        local.class,
      )}
      {...rest}
    />
  );
}

const emptyMediaVariants = tv({
  base: "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-transparent",
      icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type EmptyMediaVariantProps = VariantProps<typeof emptyMediaVariants>;

/**
 * Media of the empty state such as an icon or an image.
 * Can also be used to display other components such as an avatar.
 */
function EmptyMedia(props: ComponentProps<"div"> & EmptyMediaVariantProps) {
  const defaultedProps = mergeProps({ variant: "default" as const }, props);
  const [local, rest] = splitProps(defaultedProps, ["class", "variant"]);

  return (
    <div
      data-slot="empty-icon"
      data-variant={local.variant}
      class={cn(
        emptyMediaVariants({ variant: local.variant, class: local.class }),
      )}
      {...rest}
    />
  );
}

/**
 * Title of the empty state.
 */
function EmptyTitle(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="empty-title"
      class={cn("font-medium text-lg tracking-tight", local.class)}
      {...rest}
    />
  );
}

/**
 * Description of the empty state.
 */
function EmptyDescription(props: ComponentProps<"p">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="empty-description"
      class={cn(
        "text-muted-foreground text-sm/relaxed [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        local.class,
      )}
      {...rest}
    />
  );
}

/**
 * Content of the empty state such as a button, input or a link.
 */
function EmptyContent(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="empty-content"
      class={cn(
        "flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
};
