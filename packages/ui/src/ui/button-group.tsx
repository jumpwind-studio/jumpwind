import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/utils.js";
import { Separator } from "./separator.jsx";

const buttonGroupVariants = tv({
  base: "flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md has-[>[data-slot=button-group]]:gap-2",
  variants: {
    orientation: {
      horizontal:
        "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
      vertical:
        "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

type ButtonGroupVariantProps = VariantProps<typeof buttonGroupVariants>;

function ButtonGroup(
  props: ComponentProps<"fieldset"> & ButtonGroupVariantProps,
) {
  const [local, rest] = splitProps(props, ["class", "orientation"]);

  return (
    <fieldset
      data-slot="button-group"
      data-orientation={local.orientation}
      class={cn(
        buttonGroupVariants({
          orientation: local.orientation,
          class: local.class,
        }),
      )}
      {...rest}
    />
  );
}

function ButtonGroupText(props: DynamicProps<"div", ComponentProps<"div">>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Dynamic
      as="div"
      class={cn(
        "flex items-center gap-2 rounded-md border bg-muted px-4 font-medium text-sm shadow-xs [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        local.class,
      )}
      {...rest}
    />
  );
}

// TODO: props are `any` for some reason
function ButtonGroupSeparator(props: ComponentProps<typeof Separator>) {
  const defaultedProps = mergeProps(
    { orientation: "vertical" as const },
    props,
  );
  const [local, rest] = splitProps(defaultedProps, ["class", "orientation"]);

  return (
    <Separator
      data-slot="button-group-separator"
      orientation={local.orientation}
      class={cn(
        "!m-0 relative self-stretch bg-input data-[orientation=vertical]:h-auto",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
};
