/**
 * Portions of this code where adapted from corvu
 *
 * MIT License
 * Copyright (c) 2023-2025 Jasmin Noetzli
 */

import {
  type ComponentProps,
  createMemo,
  type JSX,
  splitProps,
  untrack,
  type ValidComponent,
} from "solid-js";
import { Dynamic as SolidDynamic } from "solid-js/web";

export type DynamicAttributes<T extends ValidComponent = "div"> = {
  /**
   * Component to render the dynamic component as.
   * @defaultValue `div`
   */
  as?: T | keyof JSX.HTMLElementTags;
};

type OverrideProps<T, P> = Omit<T, keyof P> & P;

export type DynamicProps<
  T extends ValidComponent,
  Props extends object,
> = OverrideProps<ComponentProps<T>, Props & DynamicAttributes<T>>;

// corvu's version of Solid's `Dynamic` component.
// Renders as a div by default and can be overridden with the `as` property.
export function Dynamic<ElementProps>(
  props: DynamicAttributes<ValidComponent> & ElementProps,
) {
  const [local, rest] = splitProps(props, ["as"]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const cached = createMemo<Function | string>(() => local.as ?? "div");
  const memo = createMemo(() => {
    const component = cached();
    switch (typeof component) {
      case "function":
        return untrack(() => component(rest));
      case "string":
        return <SolidDynamic component={component} {...rest} />;
    }
  });

  return memo as unknown as JSX.Element;
}
