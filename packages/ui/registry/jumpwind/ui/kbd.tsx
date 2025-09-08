import {
  type Accessor,
  type ComponentProps,
  createContext,
  For,
  type JSX,
  Show,
  splitProps,
} from "solid-js";
import { createStore } from "solid-js/store";
import { cn } from "@/lib/utils";

type Key = KeyboardEvent[keyof Pick<KeyboardEvent, "key">];
type Modifier = keyof Pick<KeyboardEvent, "ctrlKey" | "metaKey" | "altKey">;

interface KbdContextValue {
  keys: Accessor<Key[]>;
  modifiers: Accessor<Modifier[]>;
  registerKey: (key: string) => void;
}

const KbdContext = createContext<KbdContextValue>({
  keys: () => [],
  modifiers: () => [],
  registerKey: () => {},
});

export type KbdProps = ComponentProps<"span"> & {
  separator?: JSX.Element;
  modifiers?: Modifier[];
};

export const Kbd = (props: KbdProps) => {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "modifiers",
    "separator",
  ]);

  const [keys, setKeys] = createStore<Key[]>([]);

  const registerKey = (key: string) => {
    setKeys(keys.length, key);
  };

  const context: KbdContextValue = {
    keys: () => keys,
    modifiers: () => local.modifiers ?? [],
    registerKey,
  };

  return (
    <KbdContext.Provider value={context}>
      <span
        class={cn(
          "inline-flex select-none items-center gap-1 rounded border bg-muted px-1.5 align-middle font-medium font-mono text-[10px] text-muted-foreground leading-loose",
          local.class,
        )}
        {...rest}
      >
        <For each={context.keys()}>
          {(key, index) => (
            <>
              <KbdKey>{key}</KbdKey>
              <Show when={index() < context.keys().length - 1}>
                {local.separator}
              </Show>
            </>
          )}
        </For>
      </span>
    </KbdContext.Provider>
  );
};

const KbdSeparator = (props: ComponentProps<"span">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <span class={cn("text-muted-foreground/50", local.class)} {...rest}>
      {local.children ?? "+"}
    </span>
  );
};

export type KbdKeyProps = Omit<ComponentProps<"kbd">, "aria-label"> & {
  "aria-label"?: Key | (string & {});
};

export const KbdKey = (props: KbdKeyProps) => {
  return <kbd {...props} />;
};
