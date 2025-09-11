import { type Accessor, createMemo, type Ref } from "solid-js";
import { type ClassValue, cn as tvCn } from "tailwind-variants";

/**
 * Combines multiple class strings into one single string.
 *
 * @param classes - The classes to combine.
 * @returns The combined classes.
 */
export function cn(...classes: ClassValue[]): string | undefined {
  return tvCn(classes)({ twMerge: true });
}

export type MaybeAccessor<T> = T | (() => T);

export type MaybeAccessorValue<T extends MaybeAccessor<unknown>> =
  T extends () => unknown ? ReturnType<T> : T;

export function access<T extends MaybeAccessor<unknown>>(
  v: T,
): MaybeAccessorValue<T> {
  return typeof v === "function" ? v() : (v as MaybeAccessorValue<T>);
}

export function chain<Args extends [] | unknown[]>(callbacks: {
  [Symbol.iterator]: () => IterableIterator<
    ((...args: Args) => unknown) | undefined
  >;
}): (...args: Args) => void {
  return (...args: Args) => {
    for (const callback of callbacks) callback?.(...args);
  };
}

export function mergeRefs<T>(...refs: Ref<T>[]): (el: T) => void {
  return chain(refs as ((el: T) => void)[]);
}

export function some(...signals: Accessor<unknown>[]) {
  return signals.some((signal) => !!signal());
}

/**
 * Returns a signal with the tag name of the element.
 *
 * @param props.element - The element to get the tag name of.
 * @param props.fallback - The fallback tag name to use if the element is `null`.
 * @returns ```typescript
 * Accessor<string>
 * ```
 */
export function createTagName(props: {
  element: MaybeAccessor<HTMLElement | null>;
  fallback: string;
}): Accessor<string> {
  const tagName = createMemo(
    () => access(props.element)?.tagName?.toLowerCase() ?? props.fallback,
  );

  return tagName;
}
