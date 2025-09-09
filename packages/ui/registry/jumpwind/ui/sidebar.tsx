import createControllableSignal from "@corvu/utils/create/controllableSignal";
import { DynamicButton } from "@corvu/utils/dynamic";
import type { TooltipContentProps } from "@kobalte/core/tooltip";
import { createShortcut } from "@solid-primitives/keyboard";
import PanelLeftCloseIcon from "lucide-solid/icons/panel-left-close";
import PanelLeftOpenIcon from "lucide-solid/icons/panel-left-open";
import type { Accessor, ComponentProps, JSX } from "solid-js";
import {
  createContext,
  createMemo,
  Match,
  mergeProps,
  Show,
  Switch,
  splitProps,
  useContext,
} from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { useIsMobile } from "@/registry/jumpwind/hook/use-is-mobile";
import { cn } from "@/registry/jumpwind/lib/utils";
import { Button } from "@/registry/jumpwind/ui/button";
import { Drawer, DrawerContent } from "@/registry/jumpwind/ui/drawer";
import { Separator } from "@/registry/jumpwind/ui/separator";
import { Skeleton } from "@/registry/jumpwind/ui/skeleton";
import { TextField, TextFieldInput } from "@/registry/jumpwind/ui/text-field";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/jumpwind/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

export interface SidebarDataSet {
  "data-expanded": string | undefined;
  "data-closed": string | undefined;
}

export type SidebarContextValue = {
  dataset: Accessor<SidebarDataSet>;
  open: Accessor<boolean>;
  setOpen: (open: boolean) => void;
  isMobile: Accessor<boolean>;
  toggle: () => void;
};

export const SidebarContext = createContext<SidebarContextValue>();

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "`useSidebarContext` must be used within a `SidebarProvider`.",
    );
  }

  return context;
}

export function SidebarProvider(
  props: Omit<ComponentProps<"div">, "style"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    style?: JSX.CSSProperties;
  },
) {
  const defaulted = mergeProps(
    { defaultOpen: true } satisfies typeof props,
    props,
  );

  const [local, rest] = splitProps(defaulted, [
    "defaultOpen",
    "open",
    "onOpenChange",
    "class",
    "style",
    "children",
  ]);

  const [open, setOpen] = createControllableSignal<boolean>({
    initialValue: local.defaultOpen,
    value: () => local.open,
    onChange: (value) => {
      local.onOpenChange?.(value);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
  });

  const toggle = () => setOpen((open) => !open);

  // Adds a keyboard shortcut to toggle the sidebar.
  createShortcut(["Meta", SIDEBAR_KEYBOARD_SHORTCUT], toggle);

  const isMobile = useIsMobile();

  const dataset: Accessor<SidebarDataSet> = createMemo(() => ({
    "data-expanded": open() ? "" : undefined,
    "data-closed": !open() ? "" : undefined,
  }));

  const contextValue: SidebarContextValue = {
    dataset,
    open,
    setOpen,
    isMobile,
    toggle,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        style={{
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...local.style,
        }}
        class={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
          local.class,
        )}
        {...rest}
      >
        {local.children}
      </div>
    </SidebarContext.Provider>
  );
}

const sidebarVariants = tv({
  slots: {
    gap: "relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180",
    body: "",
  },
  variants: {
    collapsible: {
      offcanvas: "",
      icon: "",
      none: "",
    },
    side: {
      left: {
        body: "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",
      },
      right: {
        body: "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
      },
    },
    variant: {
      sidebar: {
        gap: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        body: "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
      },
      floating: {
        gap: "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]",
        body: "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]",
      },
      inset: {
        gap: "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]",
        body: "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]",
      },
    },
  },
  defaultVariants: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
});

type SidebarVariantProps = VariantProps<typeof sidebarVariants>;

export function Sidebar(props: ComponentProps<"div"> & SidebarVariantProps) {
  const defaulted = mergeProps(
    {
      side: "left",
      variant: "sidebar",
      collapsible: "offcanvas",
    } satisfies typeof props,
    props,
  );

  const [local, rest] = splitProps(defaulted, [
    "side",
    "variant",
    "collapsible",
    "class",
    "children",
  ]);

  const context = useSidebarContext();

  return (
    <Switch
      fallback={
        <div
          class="group peer hidden text-sidebar-foreground md:block"
          {...context.dataset()}
          data-variant={local.variant}
          data-side={local.side}
        >
          {/* This is what handles the sidebar gap on desktop */}
          <div
            class={cn(
              "relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              local.variant === "floating" || local.variant === "inset"
                ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
            )}
          />
          <div
            class={cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              local.side === "left"
                ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              local.variant === "floating" || local.variant === "inset"
                ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              local.class,
            )}
            {...rest}
          >
            <div
              data-sidebar="sidebar"
              class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
            >
              {local.children}
            </div>
          </div>
        </div>
      }
    >
      <Match when={local.collapsible === "none"}>
        <div
          class={cn(
            "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
            local.class,
          )}
          {...rest}
        >
          {local.children}
        </div>
      </Match>

      <Match when={context.isMobile()}>
        <Drawer
          open={context.open()}
          onOpenChange={context.setOpen}
          side={local.side}
        >
          <DrawerContent
            data-sidebar="sidebar"
            data-mobile="true"
            class="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={{
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            }}
          >
            <div class="flex h-full w-full flex-col">{local.children}</div>
          </DrawerContent>
        </Drawer>
      </Match>
    </Switch>
  );
}

export function SidebarTrigger(props: ComponentProps<typeof Button<"button">>) {
  const [local, rest] = splitProps(props, ["class", "onClick"]);

  const context = useSidebarContext();

  return (
    <Button<"button">
      data-trigger="trigger"
      variant="ghost"
      size="icon"
      class={cn("size-7", local.class)}
      onClick={(event) => {
        if (typeof local.onClick === "function") {
          local.onClick?.(event);
        } else {
          local.onClick?.[1](event);
        }
        context.toggle();
      }}
      {...rest}
    >
      <Show
        when={!open()}
        fallback={
          <PanelLeftCloseIcon class="size-4">
            <title>Close sidebar</title>
          </PanelLeftCloseIcon>
        }
      >
        <PanelLeftOpenIcon class="size-4">
          <title>Open sidebar</title>
        </PanelLeftOpenIcon>
      </Show>
    </Button>
  );
}

export function SidebarRail(props: ComponentProps<"button">) {
  const [local, rest] = splitProps(props, ["class"]);

  const context = useSidebarContext();

  return (
    <button
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={context.toggle}
      title="Toggle Sidebar"
      class={cn(
        "-translate-x-1/2 group-data-[side=left]:-right-4 absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:hover:bg-sidebar group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        local.class,
      )}
      {...rest}
    />
  );
}

export function SidebarInset(props: ComponentProps<"main">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <main
      class={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        local.class,
      )}
      {...rest}
    />
  );
}

export function SidebarTextField(props: ComponentProps<typeof TextField>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TextField
      data-sidebar="input"
      class={cn("space-y-1", local.class)}
      {...rest}
    />
  );
}

export function SidebarTextFieldInput(
  props: ComponentProps<typeof TextFieldInput>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TextFieldInput
      data-sidebar="input"
      class={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        local.class,
      )}
      {...rest}
    />
  );
}

export function SidebarHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-sidebar="header"
      class={cn("flex flex-col gap-2 p-2", local.class)}
      {...rest}
    />
  );
}

export function SidebarFooter(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-sidebar="footer"
      class={cn("flex flex-col gap-2 p-2", local.class)}
      {...rest}
    />
  );
}

export function SidebarSeparator(props: ComponentProps<typeof Separator>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Separator
      data-sidebar="separator"
      class={cn("mx-2 w-auto bg-sidebar-border", local.class)}
      {...rest}
    />
  );
}

export function SidebarContent(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-sidebar="content"
      class={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

export function SidebarGroup(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-sidebar="group"
      class={cn("relative flex w-full min-w-0 flex-col p-2", local.class)}
      {...rest}
    />
  );
}

export function SidebarGroupLabel(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-sidebar="group-label"
      class={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-sidebar-foreground/70 text-xs outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        local.class,
      )}
      {...rest}
    />
  );
}

export function SidebarGroupAction(props: ComponentProps<"button">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <button
      data-sidebar="group-action"
      class={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:-inset-2 after:absolute after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

export function SidebarGroupContent(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-sidebar="group-content"
      class={cn("w-full text-sm", local.class)}
      {...rest}
    />
  );
}

export function SidebarMenu(props: ComponentProps<"ul">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ul
      data-sidebar="menu"
      class={cn("flex w-full min-w-0 flex-col gap-1", local.class)}
      {...rest}
    />
  );
}

export function SidebarMenuItem(props: ComponentProps<"li">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <li
      data-sidebar="menu-item"
      class={cn("group/menu-item relative", local.class)}
      {...rest}
    />
  );
}

const sidebarMenuButtonVariants = tv({
  base: "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  variants: {
    variant: {
      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      outline:
        "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
    },
    size: {
      default: "h-8 text-sm",
      sm: "h-7 text-xs",
      lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type SidebarMenuButtonVariantProps = VariantProps<
  typeof sidebarMenuButtonVariants
>;

export function SidebarMenuButton(
  props: ComponentProps<typeof DynamicButton> &
    SidebarMenuButtonVariantProps & {
      isActive?: boolean;
      tooltip?: string | TooltipContentProps<"div">;
    },
) {
  const defaulted = mergeProps(
    {
      isActive: false,
    } satisfies Partial<typeof props>,
    props,
  );

  const [local, rest] = splitProps(defaulted, [
    "class",
    "isActive",
    "variant",
    "size",
    "tooltip",
  ]);

  const context = useSidebarContext();

  return (
    <Show
      when={!local.tooltip || !context.dataset()["data-closed"]}
      fallback={
        <Tooltip placement="right" openDelay={0} closeDelay={0}>
          <TooltipTrigger
            data-sidebar="menu-button"
            data-size={local.size}
            data-active={local.isActive}
            class={sidebarMenuButtonVariants({
              size: local.size,
              variant: local.variant,
              class: local.class,
            })}
            {...rest}
          />
          <TooltipContent
            hidden={!context.dataset()["data-closed"] || context.isMobile()}
            {...(typeof local.tooltip === "string"
              ? { children: local.tooltip }
              : local.tooltip)}
          />
        </Tooltip>
      }
    >
      <DynamicButton
        data-sidebar="menu-button"
        data-active={local.isActive}
        data-size={local.size}
        class={sidebarMenuButtonVariants({
          size: local.size,
          variant: local.variant,
          class: local.class,
        })}
        {...rest}
      />
    </Show>
  );
}

export function SidebarMenuAction(
  props: ComponentProps<"button"> & {
    showOnHover?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "showOnHover"]);

  return (
    <button
      data-sidebar="menu-action"
      class={cn(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:-inset-2 after:absolute after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        local.showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[expanded]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        local.class,
      )}
      {...rest}
    />
  );
}

export function SidebarMenuBadge(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-sidebar="menu-badge"
      class={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 font-medium text-sidebar-foreground text-xs tabular-nums",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
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

export function SidebarMenuSkeleton(
  props: ComponentProps<"div"> & { showIcon?: boolean },
) {
  const [local, rest] = splitProps(props, ["class", "showIcon"]);

  // Random width between 50 to 90%.
  const width = createMemo(() => `${Math.floor(Math.random() * 40) + 50}%`);

  return (
    <div
      data-sidebar="menu-skeleton"
      class={cn("flex h-8 items-center gap-2 rounded-md px-2", local.class)}
      {...rest}
    >
      <Show when={local.showIcon}>
        <Skeleton class="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />
      </Show>
      <Skeleton
        data-sidebar="menu-skeleton-text"
        style={{
          "--skeleton-width": width(),
        }}
        class="h-4 max-w-(--skeleton-width) flex-1"
      />
    </div>
  );
}

export function SidebarMenuSub(props: ComponentProps<"ul">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ul
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

export function SidebarMenuSubItem(props: ComponentProps<"li">) {
  const [local, rest] = splitProps(props, ["class"]);

  return <li class={local.class} {...rest} />;
}

export function SidebarMenuSubButton(
  props: ComponentProps<"a"> & {
    size?: "sm" | "md";
    isActive?: boolean;
    class?: string;
  },
) {
  const defaulted = mergeProps({ size: "md" } satisfies typeof props, props);

  const [local, rest] = splitProps(defaulted, ["class", "isActive", "size"]);

  return (
    <a
      data-sidebar="menu-sub-button"
      data-size={local.size}
      data-active={local.isActive}
      class={cn(
        "-translate-x-px flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        local.size === "sm" && "text-xs",
        local.size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        local.class,
      )}
      {...rest}
    />
  );
}
