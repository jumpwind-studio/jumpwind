import { isFunction } from "@corvu/utils";
import createControllableSignal from "@corvu/utils/create/controllableSignal";
import createOnce from "@corvu/utils/create/once";
import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import { createShortcut } from "@solid-primitives/keyboard";
import { serialize } from "cookie-es";
import type * as TooltipPrimitive from "corvu/tooltip";
import PanelLeftIcon from "lucide-solid/icons/panel-left";
import {
  type Accessor,
  type ComponentProps,
  createContext,
  createMemo,
  type JSX,
  mergeProps,
  Show,
  splitProps,
  untrack,
  useContext,
  type ValidComponent,
} from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { useIsMobile } from "@/registry/jumpwind/hook/use-is-mobile";
import { cn } from "@/registry/jumpwind/lib/utils";
import { Button } from "@/registry/jumpwind/ui/button";
import { Input } from "@/registry/jumpwind/ui/input";
import { Separator } from "@/registry/jumpwind/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/registry/jumpwind/ui/sheet";
import { Skeleton } from "@/registry/jumpwind/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/jumpwind/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 week
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

export interface SidebarDataSet {
  "data-expanded": string | undefined;
  "data-collapsed": string | undefined;
}

interface SidebarContextProps {
  dataset: Accessor<SidebarDataSet>;
  isOpen: Accessor<boolean>;
  setIsOpen: (open: boolean) => void;
  isMobile: Accessor<boolean>;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextProps>({
  dataset: () => ({
    "data-expanded": undefined,
    "data-collapsed": undefined,
  }),
  isOpen: () => false,
  setIsOpen: () => {},
  isMobile: () => false,
  toggle: () => {},
});

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function SidebarProvider(
  props: Omit<ComponentProps<"div">, "style"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    style?: JSX.CSSProperties;
  },
) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "defaultOpen",
    "open",
    "onOpenChange",
    "style",
  ]);

  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = createControllableSignal<boolean>({
    initialValue: local.defaultOpen ?? true,
    value: () => local.open,
    onChange: (value) => {
      local.onOpenChange?.(value);
      // biome-ignore lint/suspicious/noDocumentCookie: Valid
      document.cookie = serialize(SIDEBAR_COOKIE_NAME, value.toString(), {
        path: "/",
        maxAge: SIDEBAR_COOKIE_MAX_AGE,
      });
    },
  });

  const toggle = () => setIsOpen((open) => !open);

  createShortcut(["Meta", SIDEBAR_KEYBOARD_SHORTCUT], toggle);
  createShortcut(["Ctrl", SIDEBAR_KEYBOARD_SHORTCUT], toggle);

  const dataset: Accessor<SidebarDataSet> = createMemo(() => ({
    "data-expanded": isOpen() ? "" : undefined,
    "data-collapsed": !isOpen() ? "" : undefined,
  }));

  const contextValue: SidebarContextProps = {
    dataset,
    isOpen,
    setIsOpen,
    isMobile,
    toggle,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <Tooltip openDelay={0} closeDelay={0}>
        <div
          data-slot="sidebar-wrapper"
          style={{
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...local.style,
          }}
          class={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
            local.class,
          )}
          {...rest}
        >
          {local.children}
        </div>
      </Tooltip>
    </SidebarContext.Provider>
  );
}

function Sidebar(
  props: ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  },
) {
  const defaultedProps = mergeProps(
    {
      side: "left",
      variant: "sidebar",
      collapsible: "offcanvas",
    } as const satisfies typeof props,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "children",
    "collapsible",
    "side",
    "variant",
  ]);

  const { dataset, ...sidebar } = useSidebar();

  if (local.collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        class={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          local.class,
        )}
        {...rest}
      >
        {local.children}
      </div>
    );
  }

  if (sidebar.isMobile()) {
    return (
      <Sheet open={sidebar.isOpen()} onOpenChange={sidebar.setIsOpen} {...rest}>
        <SheetContent
          data-slot="sidebar"
          data-sidebar="sidebar"
          data-mobile
          side={local.side}
          style={{
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
          }}
          class="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
        >
          <SheetHeader class="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div class="flex h-full w-full flex-col">{local.children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      data-slot="sidebar"
      data-state={dataset()["data-collapsed"] ? "collapsed" : "expanded"}
      data-collapsible={
        dataset()["data-collapsed"] !== undefined ? local.collapsible : ""
      }
      data-variant={local.variant}
      data-side={local.side}
      {...dataset()}
      class="group peer hidden text-sidebar-foreground md:block"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        class={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          local.variant === "floating" || local.variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        class={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          local.side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          local.variant === "floating" || local.variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          local.class,
        )}
        {...rest}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm"
        >
          {local.children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger(props: ComponentProps<typeof Button>) {
  const [local, rest] = splitProps(props, ["class", "onClick"]);

  const sidebar = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      class={cn("size-7", local.class)}
      onClick={(event) => {
        local.onClick?.(event);
        sidebar.toggle();
      }}
      {...rest}
    >
      <PanelLeftIcon />
      <span class="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarRail(props: ComponentProps<"button">) {
  const [local, rest] = splitProps(props, ["class"]);

  const sidebar = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={sidebar.toggle}
      title="Toggle Sidebar"
      class={cn(
        "-translate-x-1/2 group-data-[side=left]:-right-4 absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=right]:left-0 sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        local.class,
      )}
      {...rest}
    />
  );
}

function SidebarInset(props: ComponentProps<"main">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <main
      data-slot="sidebar-inset"
      class={cn(
        "relative flex w-full flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0",
        "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        local.class,
      )}
      {...rest}
    />
  );
}

function SidebarInput(props: ComponentProps<typeof Input>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      class={cn("h-8 w-full bg-background shadow-none", local.class)}
      {...rest}
    />
  );
}

function SidebarHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      class={cn("flex flex-col gap-2 p-2", local.class)}
      {...rest}
    />
  );
}

function SidebarFooter(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      class={cn("flex flex-col gap-2 p-2", local.class)}
      {...rest}
    />
  );
}

function SidebarSeparator(props: ComponentProps<typeof Separator>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      class={cn("mx-2 w-auto bg-sidebar-border", local.class)}
      {...rest}
    />
  );
}

function SidebarContent(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      class={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

function SidebarGroup(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      class={cn("relative flex w-full min-w-0 flex-col p-2", local.class)}
      {...rest}
    />
  );
}

function SidebarGroupLabel(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Dynamic
      as="div"
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      class={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-sidebar-foreground/70 text-xs outline-hidden ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        local.class,
      )}
      {...rest}
    />
  );
}

function SidebarGroupAction(props: ComponentProps<"button">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Dynamic
      as="button"
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      class={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:-inset-2 after:absolute md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

function SidebarGroupContent(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      class={cn("w-full text-sm", local.class)}
      {...rest}
    />
  );
}

function SidebarMenu(props: ComponentProps<"ul">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      class={cn("flex w-full min-w-0 flex-col gap-1", local.class)}
      {...rest}
    />
  );
}

function SidebarMenuItem(props: ComponentProps<"li">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      class={cn("group/menu-item relative", local.class)}
      {...rest}
    />
  );
}

const sidebarMenuButtonVariants = tv({
  base: [
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding]",
    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    "focus-visible:ring-2",
    "active:bg-sidebar-accent active:text-sidebar-accent-foreground",
    "disabled:pointer-events-none disabled:opacity-50",
    "group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground",
    "data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground",
    "group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
    "[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  ],
  variants: {
    variant: {
      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      outline:
        "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
    },
    size: {
      default: "h-8 text-sm",
      sm: "h-7 text-xs",
      lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type SidebarMenuButtonVariantProps = VariantProps<
  typeof sidebarMenuButtonVariants
>;

function SidebarMenuButton(
  props: ComponentProps<"button"> & {
    isActive?: boolean;
    tooltip?:
      | ((props: TooltipPrimitive.RootChildrenProps) => JSX.Element)
      | JSX.Element;
  } & SidebarMenuButtonVariantProps,
) {
  const [local, rest] = splitProps(props, [
    "class",
    "size",
    "variant",
    "isActive",
    "tooltip",
  ]);

  const { isMobile, dataset } = useSidebar();

  // NOTE: Using `corvu` pattern for memoizing child components
  // Okay to remove if overkill
  const memoizedTooltip = createOnce(() => local.tooltip);

  return (
    <Show
      when={local.tooltip}
      fallback={
        <button
          data-slot="sidebar-menu-button"
          data-sidebar="menu-button"
          data-size={local.size}
          bool:data-active={local.isActive}
          class={sidebarMenuButtonVariants({
            variant: local.variant,
            size: local.size,
            class: local.class,
          })}
          {...rest}
        />
      }
    >
      <Tooltip>
        {(rootProps) => {
          const resolveTooltip = () => {
            const tooltip = memoizedTooltip()();
            return isFunction(tooltip) ? tooltip(rootProps) : tooltip;
          };
          return (
            <>
              <TooltipTrigger
                as="button"
                data-slot="sidebar-menu-button"
                data-sidebar="menu-button"
                data-size={local.size}
                bool:data-active={local.isActive}
                class={sidebarMenuButtonVariants({
                  variant: local.variant,
                  size: local.size,
                  class: local.class,
                })}
                {...rest}
              />
              <TooltipContent
                side="right"
                align="center"
                hidden={dataset()["data-collapsed"] !== undefined || isMobile()}
              >
                {untrack(() => resolveTooltip())}
              </TooltipContent>
            </>
          );
        }}
      </Tooltip>
    </Show>
  );
}

function SidebarMenuAction(
  props: ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "showOnHover"]);

  return (
    <Dynamic
      as="button"
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      class={cn(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:-inset-2 after:absolute md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        local.showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        local.class,
      )}
      {...rest}
    />
  );
}

function SidebarMenuBadge(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      class={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 font-medium text-sidebar-foreground text-xs tabular-nums",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-active/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

function SidebarMenuSkeleton(
  props: ComponentProps<"div"> & {
    showIcon?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "showIcon"]);

  // Random width between 50 to 90%.
  const width = () => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  };

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      class={cn("flex h-8 items-center gap-2 rounded-md px-2", local.class)}
      {...rest}
    >
      <Show when={local.showIcon}>
        <Skeleton class="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />
      </Show>
      <Skeleton
        class="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={{
          "--skeleton-width": width(),
        }}
      />
    </div>
  );
}

function SidebarMenuSub(props: ComponentProps<"ul">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      class={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-sidebar-border border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

function SidebarMenuSubItem(props: ComponentProps<"li">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      class={cn("group/menu-sub-item relative", local.class)}
      {...rest}
    />
  );
}

type SidebarMenuSubButtonProps<T extends ValidComponent = "a"> =
  ComponentProps<T> & {
    size?: "sm" | "md";
    isActive?: boolean;
  };

function SidebarMenuSubButton<T extends ValidComponent = "a">(
  props: DynamicProps<T, SidebarMenuSubButtonProps<T>>,
) {
  const defaultedProps = mergeProps(
    {
      size: "md",
      isActive: false,
    } satisfies SidebarMenuSubButtonProps,
    props,
  );

  const [local, rest] = splitProps(
    defaultedProps as SidebarMenuSubButtonProps,
    ["class", "size", "isActive"],
  );

  return (
    <Dynamic
      as="a"
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={local.size}
      bool:data-active={local.isActive}
      class={cn(
        "-translate-x-px flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-hidden ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground",
        "data-[size=md]:text-sm data-[size=sm]:text-xs",
        "group-data-[collapsible=icon]:hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
