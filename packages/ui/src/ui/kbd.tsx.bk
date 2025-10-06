import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

type Key = KeyboardEvent[keyof Pick<KeyboardEvent, "key">];
type Modifier = keyof Pick<KeyboardEvent, "ctrlKey" | "metaKey" | "altKey">;

function Kbd(props: ComponentProps<"span"> & { modifiers?: Modifier[] }) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      data-slot="kbd"
      class={cn(
        "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 align-middle font-medium font-mono text-[10px] text-muted-foreground opacity-100",
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

function KbdKey(
  props: Omit<ComponentProps<"kbd">, "aria-label"> & {
    "aria-label"?: Key | (string & {});
  },
) {
  return <kbd data-slot="kbd-key" {...props} />;
}

export { Kbd, KbdModifier, KbdKey, KbdSeparator };
