import {
  type Accessor,
  type ComponentProps,
  createContext,
  mergeProps,
  splitProps,
} from "solid-js";
import { cn } from "../lib/utils.js";

type Key = KeyboardEvent[keyof Pick<KeyboardEvent, "key">];
type Modifier = keyof Pick<KeyboardEvent, "ctrlKey" | "metaKey" | "altKey">;

interface KbdContextValue {
  modifiers?: Accessor<Modifier[]>;
  separator?: Accessor<string>;
}

const KbdContext = createContext<KbdContextValue>({
  modifiers: () => [],
  separator: () => "+",
});

/**
 * Group Kbd components together.
 */
function KbdGroup(
  props: ComponentProps<"div"> & {
    modifiers?: Modifier[];
    separator?: string;
  },
) {
  const defaultedProps = mergeProps({ modifiers: [], separator: "+" }, props);

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "modifiers",
    "separator",
  ]);

  return (
    <KbdContext.Provider
      value={{
        modifiers: () => local.modifiers,
        separator: () => local.separator,
      }}
    >
      <div
        data-slot="kbd-group"
        class={cn("inline-flex items-center gap-1", local.class)}
        {...rest}
      />
    </KbdContext.Provider>
  );
}

/**
 * Display a keyboard key.
 */
function Kbd(props: ComponentProps<"kbd">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <kbd
      data-slot="kbd"
      class={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-muted px-1 font-medium font-sans text-muted-foreground text-xs",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        local.class,
      )}
      {...rest}
    />
  );
}

function KbdModifier(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      data-slot="kbd-modifier"
      class={cn("text-xs", local.class)}
      {...rest}
    />
  );
}

function KbdSeparator(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <span
      data-slot="kbd-separator"
      class={cn("text-muted-foreground/50", local.class)}
      {...rest}
    >
      {local.children ?? "+"}
    </span>
  );
}

export { KbdGroup, KbdModifier, Kbd, KbdSeparator };
