import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import MoreHorizontalIcon from "lucide-solid/icons/more-horizontal";
import {
  type ComponentProps,
  Show,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";
import { Dynamic, type DynamicProps } from "@/registry/jumpwind/ui/dynamic";

function Breadcrumb(props: ComponentProps<"nav">) {
  return <nav data-slot="breadcrumb" aria-label="breadcrumb" {...props} />;
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

function BreadcrumbLink<T extends ValidComponent = "a">(
  props: DynamicProps<T, ComponentProps<T>>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Dynamic
      as="a"
      data-slot="breadcrumb-link"
      class={cn("transition-colors hover:text-foreground", local.class)}
      {...rest}
    />
  );
}

function BreadcrumbPage(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    // biome-ignore lint/a11y/useFocusableInteractive: Required
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      aria-disabled="true"
      class={cn("font-normal text-foreground", local.class)}
      role="link"
      {...rest}
    />
  );
}

function BreadcrumbSeparator(props: ComponentProps<"li">) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <li
      data-slot="breadcrumb-separator"
      aria-hidden="true"
      class={cn("[&>svg]:size-3.5", local.class)}
      role="presentation"
      {...rest}
    >
      <Show when={local.children} fallback={<ChevronRightIcon />}>
        {local.children}
      </Show>
    </li>
  );
}

function BreadcrumbEllipsis(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      data-slot="breadcrumb-ellipsis"
      aria-hidden="true"
      class={cn("flex size-9 items-center justify-center", local.class)}
      role="presentation"
      {...rest}
    >
      <MoreHorizontalIcon class="size-4" />
      <span class="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
