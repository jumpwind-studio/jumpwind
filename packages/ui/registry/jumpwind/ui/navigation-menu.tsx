import * as NavigationMenuPrimitive from "@kobalte/core/navigation-menu";
import ChevronDownIcon from "lucide-solid/icons/chevron-down";
import { type ComponentProps, mergeProps, Show, splitProps } from "solid-js";
import { tv } from "tailwind-variants";
import { cn } from "@/registry/jumpwind/lib/utils";

function NavigationMenu(
  props: ComponentProps<typeof NavigationMenuPrimitive.Root<"ul">> & {
    viewport?: boolean;
  },
) {
  const defaultedProps = mergeProps(
    {
      viewport: true,
    } satisfies ComponentProps<typeof NavigationMenuPrimitive.Root>,
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
        as="ul"
        data-slot="navigation-menu"
        data-viewport={local.viewport}
        class={cn(
          "group/navigation-menu flex flex-1 list-none items-center justify-center gap-1",
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

function NavigationMenuList(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
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
  base: "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-sm outline-none transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-expanded:bg-accent/50 data-expanded:text-accent-foreground data-expanded:focus:bg-accent data-expanded:hover:bg-accent",
});

function NavigationMenuTrigger(
  props: ComponentProps<typeof NavigationMenuPrimitive.Trigger<"button">>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <NavigationMenuPrimitive.Trigger
      as="button"
      data-slot="navigation-menu-trigger"
      class={cn(
        navigationMenuTriggerVariants({ class: ["group", local.class] }),
      )}
      {...rest}
    >
      {local.children}
      <ChevronDownIcon
        aria-hidden="true"
        class="relative top-px ml-1 size-3 transition duration-300 group-data-expanded:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent(
  props: ComponentProps<typeof NavigationMenuPrimitive.Content<"ul">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Content
        as="ul"
        data-slot="navigation-menu-content"
        class={cn(
          "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out md:absolute md:w-auto",
          "group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-expanded:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-expanded:fade-in-0 group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 **:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-expanded:animate-in",
          local.class,
        )}
        {...rest}
      />
    </NavigationMenuPrimitive.Portal>
  );
}

function NavigationMenuViewport(
  props: ComponentProps<typeof NavigationMenuPrimitive.Viewport<"li">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
    // class={cn("absolute top-full left-0 isolate z-50 flex justify-center")}
    >
      <NavigationMenuPrimitive.Viewport
        as="li"
        data-slot="navigation-menu-viewport"
        class={cn(
          "data-closed:zoom-out-95 data-expanded:zoom-in-90 relative mt-1.5 h-(--kb-navigation-menu-viewport-height) w-full origin-(--kb-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-closed:animate-out data-expanded:animate-in md:w-(--kb-navigation-menu-viewport-width)",
          local.class,
        )}
        {...rest}
      />
    </div>
  );
}

function NavigationMenuLinkComponent(
  props: ComponentProps<typeof NavigationMenuPrimitive.Item<"a">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NavigationMenuPrimitive.Item
      as="a"
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
  props: ComponentProps<typeof NavigationMenuPrimitive.Icon<"span">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NavigationMenuPrimitive.Icon
      as="span"
      data-slot="navigation-menu-icon"
      class={cn(
        "data-closed:fade-out data-expanded:fade-in top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-closed:animate-out data-expanded:animate-in",
        local.class,
      )}
      {...rest}
    >
      <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuPrimitive.Icon>
  );
}

function NavigationMenuLabel(
  props: ComponentProps<typeof NavigationMenuPrimitive.ItemLabel<"div">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NavigationMenuPrimitive.ItemLabel
      as="div"
      data-slot="navigation-menu-label"
      class={cn("font-medium text-sm leading-none", local.class)}
      {...rest}
    />
  );
}

function NavigationMenuDescription(
  props: ComponentProps<typeof NavigationMenuPrimitive.ItemDescription<"div">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <NavigationMenuPrimitive.ItemDescription
      as="div"
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
  NavigationMenuList,
  NavigationMenuLabel,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuIndicator,
  NavigationMenuDescription,
  navigationMenuTriggerVariants,
};
