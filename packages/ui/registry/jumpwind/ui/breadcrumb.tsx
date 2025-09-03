import { Link } from "@/components/ui/link";
import { cn } from "@/registry/jumpwind/lib/utils";
import type { RegisteredRouter, RouteIds } from "@tanstack/solid-router";
import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import MoreHorizontalIcon from "lucide-solid/icons/more-horizontal";
import { type ComponentProps, For, Show, splitProps } from "solid-js";

function Breadcrumb(props: ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList(props: ComponentProps<"ol">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ol
      class={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5",
        local.class,
      )}
      data-slot="breadcrumb-list"
      {...rest}
    />
  );
}

function BreadcrumbItem(props: ComponentProps<"li">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <li
      class={cn("inline-flex items-center gap-1.5", local.class)}
      data-slot="breadcrumb-item"
      {...rest}
    />
  );
}

function BreadcrumbLink(props: ComponentProps<typeof Link>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Link
      class={cn("transition-colors hover:text-foreground", local.class)}
      data-slot="breadcrumb-link"
      {...rest}
    />
  );
}

function BreadcrumbPage(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    // biome-ignore lint/a11y/useFocusableInteractive: Required
    <span
      aria-current="page"
      aria-disabled="true"
      class={cn("font-normal text-foreground", local.class)}
      data-slot="breadcrumb-page"
      role="link"
      {...rest}
    />
  );
}

function BreadcrumbSeparator(props: ComponentProps<"li">) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <li
      aria-hidden="true"
      class={cn("[&>svg]:size-3.5", local.class)}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...rest}
    >
      <Show fallback={<ChevronRightIcon />} when={local.children}>
        {local.children}
      </Show>
    </li>
  );
}

function BreadcrumbEllipsis(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      aria-hidden="true"
      class={cn("flex size-9 items-center justify-center", local.class)}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      {...rest}
    >
      <MoreHorizontalIcon class="size-4" />
      <span class="sr-only">More</span>
    </span>
  );
}

export type BreadcrumbProps<
  TRouter extends RegisteredRouter = RegisteredRouter,
> = ComponentProps<typeof Breadcrumb> & {
  breadcrumbs: Array<{
    to: RouteIds<TRouter["routeTree"]>;
    label: string;
  }>;
};

export function Breadcrumbs<
  TRouter extends RegisteredRouter = RegisteredRouter,
>(props: BreadcrumbProps<TRouter>) {
  const [local, rest] = splitProps(props, ["class", "children", "breadcrumbs"]);

  return (
    <Breadcrumb class={local.class} {...rest}>
      <BreadcrumbList>
        <For each={local.breadcrumbs}>
          {(match, index) => (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink to={match.to}>{match.label}</BreadcrumbLink>
              </BreadcrumbItem>
              <Show when={index() < local.breadcrumbs.length - 1}>
                <BreadcrumbSeparator />
              </Show>
            </>
          )}
        </For>
      </BreadcrumbList>
    </Breadcrumb>
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
