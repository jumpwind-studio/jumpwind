import { createSignal, onCleanup, onMount, type Signal } from "solid-js";

const createKeySignal = (opts: {
  readonly key: string;
  readonly modifiers?: Array<
    keyof Pick<KeyboardEvent, "altKey" | "metaKey" | "ctrlKey">
  >;
}): Signal<boolean> => {
  const [isOpen, setIsOpen] = createSignal(false);

  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const modifiers = opts.modifiers ?? [];
      const isModified = modifiers.length === 0 || modifiers.some((m) => e[m]);

      if (e.key === opts.key && isModified) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return onCleanup(() =>
      document.removeEventListener("keydown", handleKeyDown),
    );
  });

  return [isOpen, setIsOpen] as const;
};
