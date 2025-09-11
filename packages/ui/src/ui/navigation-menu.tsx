import * as NavigationMenuPrimitive from "@kobalte/core/navigation-menu";
import ChevronDownIcon from "lucide-solid/icons/chevron-down";
import { type ComponentProps, mergeProps, Show, splitProps } from "solid-js";
import { tv } from "tailwind-variants";
import { cn } from "../lib/utils.js";

const useNavigationMenu = NavigationMenuPrimitive.useNavigationMenuContext;

function NavigationMenu(
  props: ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    viewport?: boolean;
  },
) {
  const defaultedProps = mergeProps(
    { viewport: true } satisfies typeof props,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "children",
    "viewport",
  ]);

  return (
    <span class="group [&>nav]:relative [&>nav]:flex [&>nav]:max-w-max [&>nav]:flex-1 [&>nav]:items-center [&>nav]:justify-center">
      <NavigationMenuPrimitive.Root
        data-slot="navigation-menu"
        bool:data-viewport={local.viewport}
        class={cn(
          "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <Show when={local.viewport}>
          <NavigationMenuViewport />
        </Show>
      </NavigationMenuPrimitive.Root>
    </span>
  );
}

function NavigationMenuList(props: ComponentProps<"ul">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ul
      data-slot="navigation-menu-list"
      class={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        local.class,
      )}
      {...rest}
    />
  );
}

function NavigationMenuItem(
  props: ComponentProps<typeof NavigationMenuPrimitive.Menu> & {
    class?: string;
  },
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <span class={cn("[&>li]:relative", local.class)}>
      <NavigationMenuPrimitive.Menu data-slot="navigation-menu-item" {...rest}>
        {local.children}
      </NavigationMenuPrimitive.Menu>
    </span>
  );
}

const navigationMenuTriggerVariants = tv({
  base: "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-expanded:hover:bg-accent data-expanded:text-accent-foreground data-expanded:focus:bg-accent data-expanded:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1",
});

function NavigationMenuTrigger(
  props: ComponentProps<typeof NavigationMenuPrimitive.Trigger>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      class={cn(navigationMenuTriggerVariants({ class: local.class }))}
      {...rest}
    >
      {local.children}
      <ChevronDownIcon
        aria-hidden="true"
        class="relative top-[1px] ml-1 size-3 transition duration-300 group-data-expanded:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent(
  props: ComponentProps<typeof NavigationMenuPrimitive.Content>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Content
        data-slot="navigation-menu-content"
        class={cn(
          "top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
          "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
          "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52",
          "data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
          "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
          "**:data-[slot=navigation-menu-link]:focus:outline-none",
          "**:data-[slot=navigation-menu-link]:focus:ring-0",
          "group-not-data-viewport/navigation-menu:zoom-out-95",
          "group-not-data-viewport/navigation-menu:data-expanded:zoom-in-95",
          "group-not-data-viewport/navigation-menu:data-expanded:fade-in-0",
          "group-not-data-viewport/navigation-menu:fade-out-0",
          "group-not-data-viewport/navigation-menu:top-full",
          "group-not-data-viewport/navigation-menu:mt-1.5",
          "group-not-data-viewport/navigation-menu:animate-out",
          "group-not-data-viewport/navigation-menu:overflow-hidden",
          "group-not-data-viewport/navigation-menu:rounded-md",
          "group-not-data-viewport/navigation-menu:border",
          "group-not-data-viewport/navigation-menu:bg-popover",
          "group-not-data-viewport/navigation-menu:text-popover-foreground",
          "group-not-data-viewport/navigation-menu:shadow",
          "group-not-data-viewport/navigation-menu:duration-200",
          "group-not-data-viewport/navigation-menu:data-expanded:animate-in",
          // "bg-popover",
          // viewport=false: top-full mt-1.5 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow duration-200 data-closed:animate-out data-expanded:animate-in data-closed:zoom-out-95 data-expanded:zoom-in-95 data-expanded:fade-in-0 data-closed:fade-out-0
          local.class,
        )}
        {...rest}
      />
    </NavigationMenuPrimitive.Portal>
  );
}

function NavigationMenuViewport(
  props: ComponentProps<typeof NavigationMenuPrimitive.Viewport>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("absolute top-full left-0 isolate z-50 flex justify-center")}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        class={cn(
          // "relative mt-1.5 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow",
          // "data-expanded:zoom-in-90 data-expanded:animate-in",
          // "not-data-expanded:zoom-out-95 not-data-expanded:animate-out",
          // "h-(--kb-navigation-menu-viewport-height) md:w-(--kb-navigation-menu-viewport-width)",
          // "origin-(--kb-menu-content-transform-origin)",
          "not-data-expanded:zoom-out-95 data-expanded:zoom-in-90 relative mt-1.5 h-(--kb-navigation-menu-viewport-height) w-full origin-top-center not-data-expanded:animate-out overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-expanded:animate-in md:w-(--kb-navigation-menu-viewport-width)",
          "origin-(--kb-menu-content-transform-origin)",
          local.class,
        )}
        {...rest}
      />
    </div>
  );
}

function NavigationMenuLink(
  props: ComponentProps<typeof NavigationMenuPrimitive.Item>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-link"
      class={cn(
        "flex flex-col gap-1 rounded-sm p-2 text-sm outline-none transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[highlighted=true]:bg-accent/50 data-[highlighted=true]:text-accent-foreground data-[highlighted=true]:focus:bg-accent data-[highlighted=true]:hover:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        local.class,
      )}
      {...rest}
    />
  );
}

function NavigationMenuIndicator(
  props: ComponentProps<typeof NavigationMenuPrimitive.Icon>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-icon"
      class={cn(
        "not-data-expanded:fade-out data-expanded:fade-in top-full z-1 flex h-1.5 not-data-expanded:animate-out items-end justify-center overflow-hidden data-expanded:animate-in",
        local.class,
      )}
      {...rest}
    >
      <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuPrimitive.Icon>
  );
}

function NavigationMenuLabel(
  props: ComponentProps<typeof NavigationMenuPrimitive.ItemLabel>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NavigationMenuPrimitive.ItemLabel
      data-slot="navigation-menu-label"
      class={cn("font-medium text-sm leading-none", local.class)}
      {...rest}
    />
  );
}

function NavigationMenuDescription(
  props: ComponentProps<typeof NavigationMenuPrimitive.ItemDescription>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NavigationMenuPrimitive.ItemDescription
      data-slot="navigation-menu-description"
      class={cn(
        "line-clamp-2 text-muted-foreground text-sm leading-snug",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLabel,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuIndicator,
  NavigationMenuDescription,
  navigationMenuTriggerVariants,
  // Hooks
  useNavigationMenu,
};
