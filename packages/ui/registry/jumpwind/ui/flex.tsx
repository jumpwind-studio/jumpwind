import { cn } from "@/components/ui/utils";
import type { ComponentProps } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

type JustifyContent =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";
type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";
type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse";

interface FlexProps extends ComponentProps<"div"> {
  direction?: FlexDirection;
  justify?: JustifyContent;
  align?: AlignItems;
  gap?: string | number; // Tailwind gap classes like "4", "8", etc.
  w?: number | "full" | "auto" | `${number}/${number}`; // Tailwind width classes like "full", "1/2", etc.
  h?: number | "full" | "auto" | `${number}/${number}`; // Tailwind height classes like "full", "1/2", etc.
}

const JUSTIFY_CONTENT: Record<JustifyContent, string> = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const ALIGN_ITEM: Record<AlignItems, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

const FLEX_DIRECTION: Record<FlexDirection, string> = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
};

function Flex(props: FlexProps) {
  const defaultedProps = mergeProps(
    {
      direction: "row",
      justify: "between",
      align: "center",
      gap: "4",
      w: "full",
      h: "auto",
    } satisfies FlexProps,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "direction",
    "justify",
    "align",
    "gap",
    "w",
    "h",
  ]);

  return (
    <div
      class={cn(
        "flex w-full",
        local.class,
        FLEX_DIRECTION[local.direction],
        JUSTIFY_CONTENT[local.justify],
        ALIGN_ITEM[local.align],
        local.gap ? `gap-${local.gap}` : "",
        local.w ? `w-${local.w}` : "",
        local.h ? `h-${local.h}` : "",
      )}
      {...rest}
    />
  );
}

function HStack(
  props: Omit<FlexProps, "flexDirection"> & ComponentProps<"div">,
) {
  const defaultedProps = mergeProps(
    { direction: "row" } satisfies FlexProps,
    props,
  );

  return <Flex {...defaultedProps} />;
}

function VStack(
  props: Omit<FlexProps, "flexDirection"> & ComponentProps<"div">,
) {
  const defaultedProps = mergeProps(
    { direction: "col" } satisfies FlexProps,
    props,
  );

  return <Flex {...defaultedProps} />;
}

export { Flex, HStack, VStack };
