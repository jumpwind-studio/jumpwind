import { type ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/registry/jumpwind/lib/utils";
import ChevronLeftIcon from "lucide-solid/icons/chevron-left";
import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import MoreHorizontalIcon from "lucide-solid/icons/more-horizontal";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";

const Pagination = (props: ComponentProps<"nav">) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <nav
      aria-label="pagination"
      class={cn("mx-auto flex w-full justify-center", local.class)}
      {...rest}
    />
  );
};

const PaginationContent = (props: ComponentProps<"ul">) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ul class={cn("flex flex-row items-center gap-1", local.class)} {...rest} />
  );
};

const PaginationItem = (props: ComponentProps<"li">) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <li class={cn("", local.class)} {...rest} />;
};

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  ComponentProps<"a">;

const PaginationLink = (props: PaginationLinkProps) => {
  const defaultedProps = mergeProps(
    {
      size: "icon",
    } satisfies PaginationLinkProps,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "isActive",
    "size",
  ]);

  return (
    <a
      aria-current={local.isActive ? "page" : undefined}
      class={cn(
        buttonVariants({
          variant: local.isActive ? "outline" : "ghost",
          size: local.size,
        }),
        local.class,
      )}
      {...rest}
    />
  );
};

const PaginationPrevious = (props: ComponentProps<typeof PaginationLink>) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <PaginationLink
      aria-label="Go to previous page"
      class={cn("gap-1 pl-2.5", local.class)}
      size="default"
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
      aria-label="Go to next page"
      class={cn("gap-1 pr-2.5", local.class)}
      size="default"
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
