import { makeEventListener } from "@solid-primitives/event-listener";
import { createSingletonRoot } from "@solid-primitives/rootless";
import { arrayEquals } from "@solid-primitives/utils";
import {
  type Accessor,
  createEffect,
  createMemo,
  createSignal,
  on,
  untrack,
} from "solid-js";
import { isServer } from "solid-js/web";

export type ModifierKey = "Alt" | "Control" | "Meta" | "Shift";
export type KbdKey = ModifierKey | (string & {});

function equalsKeyHoldSequence(sequence: string[][], model: string[]): boolean {
  for (let i = sequence.length - 1; i >= 0; i--) {
    const _model = model.slice(0, i + 1);
    const seq = sequence[i];
    if (!seq) return false;
    if (!arrayEquals(seq, _model)) return false;
  }
  return true;
}

/**
 * Provides a signal with the last keydown event.
 *
 * The signal is `undefined` initially, and is reset to that after a timeout.
 *
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/keyboard#useKeyDownEvent
 *
 * @returns
 * Returns a signal of the last keydown event
 * ```ts
 * Accessor<KeyboardEvent | undefined>
 * ```
 *
 * @example
 * ```ts
 * const event = useKeyDownEvent();
 *
 * createEffect(() => {
 *   const e = event();
 *   console.log(e) // => KeyboardEvent | undefined
 *
 *   if (e) {
 *     console.log(e.key) // => "Q" | "ALT" | ... or undefined
 *     e.preventDefault(); // prevent default behavior or last keydown event
 *   }
 * })
 * ```
 */
export const useKeyDownEvent = /*#__PURE__*/ createSingletonRoot<
  Accessor<KeyboardEvent | undefined>
>(() => {
  if (isServer) {
    return () => undefined;
  }

  const [event, setEvent] = createSignal<KeyboardEvent>();

  makeEventListener(window, "keydown", (e) => {
    setEvent(e);
    setTimeout(() => setEvent(undefined));
  });

  return event;
});

/**
 * Provides a signal with the list of currently held keys, ordered from least recent to most recent.
 *
 * This is a [singleton root primitive](https://github.com/solidjs-community/solid-primitives/tree/main/packages/rootless#createSingletonRoot). *(signals and event-listeners are reused across dependents)*
 *
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/keyboard#useKeyDownList
 *
 * @returns
 * Returns a signal of a list of keys
 * ```ts
 * Accessor<string[]>
 * ```
 *
 * @example
 * ```ts
 * const keys = useKeyDownList();
 * createEffect(() => {
 *    console.log(keys()) // => ["ALT", "CONTROL", "Q", "A"]
 * })
 * ```
 */
export const useKeyDownList = /*#__PURE__*/ createSingletonRoot<
  Accessor<string[]>
>(() => {
  if (isServer) {
    return () => [];
  }

  const [pressedKeys, setPressedKeys] = createSignal<string[]>([]);
  const reset = () => setPressedKeys([]);

  makeEventListener(window, "keydown", (e) => {
    if (e.repeat || typeof e.key !== "string") return;

    const key = e.key.toUpperCase();
    const currentKeys = pressedKeys();
    if (currentKeys.includes(key)) return;

    const keys = [...currentKeys, key];

    // If the modifier is pressed before listening, add it to the list
    if (
      currentKeys.length === 0 &&
      key !== "ALT" &&
      key !== "CONTROL" &&
      key !== "META" &&
      key !== "SHIFT"
    ) {
      if (e.shiftKey) keys.unshift("SHIFT");
      if (e.altKey) keys.unshift("ALT");
      if (e.ctrlKey) keys.unshift("CONTROL");
      if (e.metaKey) keys.unshift("META");
    }

    setPressedKeys(keys);
  });

  makeEventListener(window, "keyup", (e) => {
    if (typeof e.key !== "string") return;
    const key = e.key.toUpperCase();
    setPressedKeys((prev) => prev.filter((k) => key !== k));
  });

  makeEventListener(window, "blur", reset);
  makeEventListener(window, "contextmenu", (e) => {
    e.defaultPrevented || reset();
  });

  return pressedKeys;
});

/**
 * Provides a signal with the currently held single key. Pressing any other key at the same time will reset the signal to `undefined`.
 *
 * This is a [singleton root primitive](https://github.com/solidjs-community/solid-primitives/tree/main/packages/rootless#createSingletonRoot). *(signals and event-listeners are reused across dependents)*
 *
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/keyboard#useCurrentlyHeldKey
 *
 * @returns
 * ```ts
 * Accessor<string | undefined>
 * ```
 *
 * @example
 * ```ts
 * const key = useCurrentlyHeldKey();
 * createEffect(() => {
 *    console.log(key()) // => "Q" | "ALT" | ... or undefined
 * })
 * ```
 */
export const useHeldKey = /*#__PURE__*/ createSingletonRoot<
  Accessor<string | undefined>
>(() => {
  if (isServer) {
    return () => undefined;
  }

  const keys = useKeyDownList();
  let prevKeys = untrack(keys);

  return createMemo(() => {
    const k = keys();
    const prev = prevKeys;
    prevKeys = k;
    if (prev.length !== undefined) return undefined;
    if (k.length !== 1) return undefined;
    return k[0];
  });
});

/**
 * Provides a signal with a sequence of currently held keys, as they were pressed down and up.
 *
 * This is a [singleton root primitive](https://github.com/solidjs-community/solid-primitives/tree/main/packages/rootless#createSingletonRoot). *(signals and event-listeners are reused across dependents)*
 *
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/keyboard#useKeyDownSequence
 *
 * @returns
 * ```ts
 * Accessor<string[][]>
 * // [["CONTROL"], ["CONTROL", "Q"], ["CONTROL", "Q", "A"]]
 * ```
 *
 * @example
 * ```ts
 * const sequence = useKeyDownSequence();
 * createEffect(() => {
 *    console.log(sequence()) // => string[][]
 * })
 * ```
 */
export const useKeyDownSequence = /*#__PURE__*/ createSingletonRoot<
  Accessor<string[][]>
>(() => {
  if (isServer) {
    return () => [];
  }

  const keys = useKeyDownList();

  return createMemo((prev) => {
    if (keys().length === 0) return [];
    return [...prev, keys()];
  }, []);
});

/**
 * Provides a `boolean` signal indicating if provided {@link key} is currently being held down.
 * Holding multiple keys at the same time will return `false` — holding only the specified one will return `true`.
 *
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/keyboard#createKeyHold
 *
 * @param key The key to check for.
 * @options The options for the key hold.
 * - `preventDefault` — Controlls in the keydown event should have it's default action prevented. Enabled by default.
 * @returns
 * ```ts
 * Accessor<boolean>
 * ```
 *
 * @example
 * ```ts
 * const isHeld = createKeyHold("ALT");
 * createEffect(() => {
 *    console.log(isHeld()) // => boolean
 * })
 * ```
 */
export function createKeyHold(
  key: KbdKey,
  options: { preventDefault?: boolean } = {},
): Accessor<boolean> {
  if (isServer) {
    return () => false;
  }

  const event = useKeyDownEvent();
  const heldKey = useHeldKey();

  return createMemo(() => {
    const preventDefault = options?.preventDefault ?? true;
    if (heldKey() !== key.toUpperCase()) return false;
    if (preventDefault) event()?.preventDefault();
    return true;
  });
}

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
  callback: (event: KeyboardEvent) => void,
  options?: {
    preventDefault?: boolean;
    requireReset?: boolean;
  },
): void {
  if (isServer || !keys.length) {
    return;
  }

  const upperKeys = keys.map((key) => key.toUpperCase());
  const shouldPreventDefault = options?.preventDefault ?? true;

  const event = useKeyDownEvent();
  const sequence = useKeyDownSequence();

  let reset = false;
  // allow to check the sequence only once the user has released all keys
  const handleSequenceWithReset = (sequence: string[][]) => {
    if (!sequence.length) {
      reset = false;
      return;
    }
    if (reset) return;
    const e = event();

    if (sequence.length < upperKeys.length) {
      // optimistically preventDefault behavior if we yet don't have enough keys
      if (
        equalsKeyHoldSequence(sequence, upperKeys.slice(0, sequence.length))
      ) {
        if (shouldPreventDefault) e?.preventDefault();
      } else {
        reset = true;
      }
    } else {
      reset = true;
      if (equalsKeyHoldSequence(sequence, upperKeys)) {
        if (shouldPreventDefault) e?.preventDefault();
        callback(e);
      }
    }
  };

  // Checking the sequence even if the user is still holding down keys
  const handleSequenceWithoutReset = (sequence: string[][]) => {
    const last = sequence.at(-1);
    if (!last) return;

    // Optimistically preventDefault behavior if we yet don't have enough keys
    const e = event();
    if (shouldPreventDefault && last.length < keys.length) {
      if (arrayEquals(last, keys.slice(0, keys.length - 1))) {
        e?.preventDefault();
      }
      return;
    }
    if (arrayEquals(last, keys)) {
      const prev = sequence.at(-2);
      if (!prev || arrayEquals(prev, keys.slice(0, keys.length - 1))) {
        if (shouldPreventDefault) e?.preventDefault();
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
