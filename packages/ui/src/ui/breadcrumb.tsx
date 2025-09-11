import * as BreadcrumbPrimitive from "@kobalte/core/breadcrumbs";
import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import MoreHorizontalIcon from "lucide-solid/icons/more-horizontal";
import { type ComponentProps, Show, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

function Breadcrumb(props: ComponentProps<typeof BreadcrumbPrimitive.Root>) {
  return (
    <BreadcrumbPrimitive.Root
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      {...props}
    />
  );
}

function BreadcrumbList(props: ComponentProps<"ol">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ol
      data-slot="breadcrumb-list"
      class={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5",
        local.class,
      )}
      {...rest}
    />
  );
}

function BreadcrumbItem(props: ComponentProps<"li">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <li
      data-slot="breadcrumb-item"
      class={cn("inline-flex items-center gap-1.5", local.class)}
      {...rest}
    />
  );
}

function BreadcrumbLink(
  props: ComponentProps<typeof BreadcrumbPrimitive.Link>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <BreadcrumbPrimitive.Link
      data-slot="breadcrumb-link"
      class={cn("transition-colors hover:text-foreground", local.class)}
      {...rest}
    />
  );
}

function BreadcrumbPage(
  props: ComponentProps<typeof BreadcrumbPrimitive.Link>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <BreadcrumbPrimitive.Link
      data-slot="breadcrumb-page"
      current
      aria-current="page"
      aria-disabled
      class={cn("font-normal text-foreground", local.class)}
      {...rest}
    />
  );
}

function BreadcrumbSeparator(
  props: ComponentProps<typeof BreadcrumbPrimitive.Separator>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <BreadcrumbPrimitive.Separator
      data-slot="breadcrumb-separator"
      class={cn("[&>svg]:size-3.5", local.class)}
      {...rest}
    >
      <Show when={local.children} fallback={<ChevronRightIcon />}>
        {local.children}
      </Show>
    </BreadcrumbPrimitive.Separator>
  );
}

function BreadcrumbEllipsis(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden
      class={cn("flex size-9 items-center justify-center", local.class)}
      {...rest}
    >
      <span class="sr-only">More</span>
      <MoreHorizontalIcon class="size-4" />
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
