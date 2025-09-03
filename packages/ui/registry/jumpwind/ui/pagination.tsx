import ChevronLeftIcon from "lucide-solid/icons/chevron-left";
import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import MoreHorizontalIcon from "lucide-solid/icons/more-horizontal";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";
import {
  type ButtonVariantProps,
  buttonVariants,
} from "@/registry/jumpwind/ui/button";

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

const PaginationContent = (props: ComponentProps<"ul">) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ul
      data-slot="pagination-content"
      class={cn("flex flex-row items-center gap-1", local.class)}
      {...rest}
    />
  );
};

const PaginationItem = (props: ComponentProps<"li">) => {
  return <li data-class="pagination-item" {...props} />;
};

const PaginationLink = (
  props: ComponentProps<"a"> &
    ButtonVariantProps & {
      isActive?: boolean;
    },
) => {
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
        variant: local.variant ?? (local.isActive ? "outline" : "ghost"),
        size: local.size,
        class: local.class,
      })}
      {...rest}
    />
  );
};

const PaginationPrevious = (props: ComponentProps<typeof PaginationLink>) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <PaginationLink
      data-slot="pagination-previous"
      aria-label="Go to previous page"
      size="default"
      class={cn("gap-1 px-2.5 sm:pl-2.5", local.class)}
      {...rest}
    >
      <ChevronLeftIcon class="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  );
};

const PaginationNext = (props: ComponentProps<typeof PaginationLink>) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <PaginationLink
      data-slot="pagination-next"
      aria-label="Go to next page"
      size="default"
      class={cn("gap-1 px-2.5 sm:pl-2.5", local.class)}
      {...rest}
    >
      <span>Next</span>
      <ChevronRightIcon class="h-4 w-4" />
    </PaginationLink>
  );
};

const PaginationEllipsis = (props: ComponentProps<"span">) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      data-slot="pagination-ellipsis"
      aria-hidden
      class={cn("flex h-9 w-9 items-center justify-center", local.class)}
      {...rest}
    >
      <MoreHorizontalIcon class="h-4 w-4" />
      <span class="sr-only">More pages</span>
    </span>
  );
};

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
