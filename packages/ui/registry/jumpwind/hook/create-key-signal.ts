import { createSignal, onCleanup, onMount, type Signal } from "solid-js";
import { isServer } from "solid-js/web";

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

/**
 * Creates a keyboard shotcut observer. The provided {@link callback} will be called when the specified {@link keys} are pressed.
 *
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/keyboard#createShortcut
 *
 * @param keys The sequence of keys to watch for.
 * @param callback The callback to call when the keys are pressed.
 * @options The options for the shortcut.
 * - `preventDefault` — Controlls in the keydown event should have it's default action prevented. Enabled by default.
 * - `requireReset` — If `true`, the shortcut will only be triggered once until all of the keys stop being pressed. Disabled by default.
 *
 * @example
 * ```ts
 * createShortcut(["CONTROL", "SHIFT", "C"], () => {
 *    console.log("Ctrl+Shift+C was pressed");
 * });
 * ```
 */
export function createShortcut(
  keys: KbdKey[],
  callback: (event: KeyboardEvent | null) => void,
  options: {
    preventDefault?: boolean;
    requireReset?: boolean;
  } = {},
): void {
  if (isServer || !keys.length) {
    return;
  }

  keys = keys.map((key) => key.toUpperCase());
  const { preventDefault = true } = options;
  const event = useKeyDownEvent();
  const sequence = useKeyDownSequence();

  let reset = false;
  // allow to check the sequence only once the user has released all keys
  const handleSequenceWithReset = (sequence: string[][]) => {
    if (!sequence.length) return (reset = false);
    if (reset) return;
    const e = event();

    if (sequence.length < keys.length) {
      // optimistically preventDefault behavior if we yet don't have enough keys
      if (equalsKeyHoldSequence(sequence, keys.slice(0, sequence.length))) {
        preventDefault && e && e.preventDefault();
      } else {
        reset = true;
      }
    } else {
      reset = true;
      if (equalsKeyHoldSequence(sequence, keys)) {
        preventDefault && e && e.preventDefault();
        callback(e);
      }
    }
  };

  // allow checking the sequence even if the user is still holding down keys
  const handleSequenceWithoutReset = (sequence: string[][]) => {
    const last = sequence.at(-1);
    if (!last) return;
    const e = event();

    // optimistically preventDefault behavior if we yet don't have enough keys
    if (preventDefault && last.length < keys.length) {
      if (arrayEquals(last, keys.slice(0, keys.length - 1))) {
        e?.preventDefault();
      }
      return;
    }
    if (arrayEquals(last, keys)) {
      const prev = sequence.at(-2);
      if (!prev || arrayEquals(prev, keys.slice(0, keys.length - 1))) {
        preventDefault && e && e.preventDefault();
        callback(e);
      }
    }
  };

  createEffect(
    on(
      sequence,
      options.requireReset
        ? handleSequenceWithReset
        : handleSequenceWithoutReset,
    ),
  );
}
