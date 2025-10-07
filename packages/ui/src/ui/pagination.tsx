import ChevronLeftIcon from "lucide-solid/icons/chevron-left";
import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import MoreHorizontalIcon from "lucide-solid/icons/more-horizontal";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import { type ButtonVariantProps, buttonVariants } from "./button.jsx";

const Pagination = (props: ComponentProps<"nav">) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <nav
      data-slot="pagination"
      aria-label="pagination"
      class={cn("mx-auto flex w-full justify-center", local.class)}
      {...rest}
    />
  );
};

function PaginationContent(props: ComponentProps<"ul">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ul
      data-slot="pagination-content"
      class={cn("flex flex-row items-center gap-1", local.class)}
      {...rest}
    />
  );
}

function PaginationItem(props: ComponentProps<"li">) {
  return <li data-class="pagination-item" {...props} />;
}

function PaginationLink(
  props: ComponentProps<"a"> & ButtonVariantProps & { isActive?: boolean },
) {
  const defaultedProps = mergeProps(
    { size: "icon" } satisfies typeof props,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "isActive",
    "size",
    "variant",
  ]);

  return (
    <a
      data-slot="pagination-link"
      aria-current={local.isActive ? "page" : undefined}
      bool:data-active={local.isActive}
      class={buttonVariants({
        size: local.size,
        variant: local.isActive ? "outline" : "ghost",
        class: local.class,
      })}
      {...rest}
    />
  );
}

function PaginationPrevious(props: ComponentProps<typeof PaginationLink>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <PaginationLink
      data-slot="pagination-previous"
      aria-label="Go to previous page"
      size="default"
      class={cn("gap-1 px-2.5 sm:pl-2.5", local.class)}
      {...rest}
    >
      <ChevronLeftIcon class="size-4" />
      <span class="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext(props: ComponentProps<typeof PaginationLink>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <PaginationLink
      data-slot="pagination-next"
      aria-label="Go to next page"
      size="default"
      class={cn("gap-1 px-2.5 sm:pl-2.5", local.class)}
      {...rest}
    >
      <span class="hidden sm:block">Next</span>
      <ChevronRightIcon class="size-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      data-slot="pagination-ellipsis"
      aria-hidden
      class={cn("flex size-9 items-center justify-center", local.class)}
      {...rest}
    >
      <MoreHorizontalIcon class="size-4" />
      <span class="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
