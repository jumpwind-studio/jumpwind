import { isFunction } from "@corvu/utils";
import Fragment from "@corvu/utils/components/Fragment";
import createOnce from "@corvu/utils/create/once";
import createRegister from "@corvu/utils/create/register";
import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import {
  createMemo,
  createUniqueId,
  type JSX,
  mergeProps,
  splitProps,
  untrack,
  type ValidComponent,
} from "solid-js";
import { useInternalStepperContext } from "./context.js";
import {
  createInternalStepperItemContext,
  createStepperItemContext,
} from "./itemContext.js";
import type { StepperRootProps } from "./Root.jsx";

export type StepperItemCorvuProps = {
  /**
   * Value of the stepper item.
   * @defaultValue `createUniqueId()`
   */
  value?: string;
  /**
   * Whether the stepper item is disabled. Used to override the default provided by `<Stepper.Root>`.
   */
  disabled?: boolean;
  /**
   * The `id` attribute of the stepper item trigger element.
   * @defaultValue `createUniqueId()`
   */
  triggerId?: string;
} & Omit<StepperRootProps, "children">;

export type StepperItemSharedElementProps<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends ValidComponent = typeof Fragment,
> = {
  children: JSX.Element | ((props: StepperItemChildrenProps) => JSX.Element);
};

export type StepperItemElementProps = StepperItemSharedElementProps & {
  "data-corvu-stepper-item": "";
};

export type StepperItemProps<T extends ValidComponent = typeof Fragment> =
  StepperItemCorvuProps & Partial<StepperItemSharedElementProps<T>>;

/** Props that are passed to the Item component children callback. */
export type StepperItemChildrenProps = {
  /** Value of the stepper item. */
  value: string;
  /** Whether the stepper item is disabled. */
  disabled: boolean;
  /** The `id` attribute of the stepper item trigger element. */
  triggerId: string | undefined;
};

/** Context wrapper for the stepper item. Is required for every stepper item you create.
 *
 * @data `data-corvu-stepper-item` - Present if the item isn't rendered as a Fragment.
 */
const StepperItem = <T extends ValidComponent = typeof Fragment>(
  props: DynamicProps<T, StepperItemProps<T>>,
) => {
  const defaultedProps = mergeProps(
    {
      stepperId: createUniqueId(),
    },
    props,
  );
  const [localProps, otherProps] = splitProps(
    defaultedProps as StepperItemProps,
    [
      "value",
      "disabled",
      "preventInitialContentAnimation",
      "triggerId",
      "contextId",
      "children",
    ],
  );

  const [triggerId, registerTriggerId, unregisterTriggerId] = createRegister({
    value: () => localProps.triggerId ?? createUniqueId(),
  });

  const context = createMemo(() =>
    useInternalStepperContext(localProps.contextId),
  );

  const value = createMemo(() => localProps.value ?? createUniqueId());

  const disabled = createMemo(
    () => (localProps.disabled ?? context().disabled()) as boolean,
  );

  const childrenProps: StepperItemChildrenProps = {
    get value() {
      return value();
    },
    get disabled() {
      return disabled();
    },
    get triggerId() {
      return triggerId();
    },
  };

  const memoizedChildren = createOnce(() => localProps.children);

  const resolveChildren = () => {
    const children = memoizedChildren()();
    if (isFunction(children)) {
      return children(childrenProps);
    }
    return children;
  };

  const memoizedStepperItem = createMemo(() => {
    const StepperItemContext = createStepperItemContext(localProps.contextId);
    const InternalStepperItemContext = createInternalStepperItemContext(
      localProps.contextId,
    );

    return (
      <StepperItemContext.Provider
        value={{
          value,
          disabled,
          triggerId,
        }}
      >
        <InternalStepperItemContext.Provider
          value={{
            value,
            disabled,
            triggerId,
            registerTriggerId,
            unregisterTriggerId,
          }}
        >
          <Dynamic<StepperItemElementProps>
            as={Fragment}
            // === ElementProps ===
            data-corvu-stepper-item=""
            {...otherProps}
          >
            {untrack(() => resolveChildren())}
          </Dynamic>
        </InternalStepperItemContext.Provider>
      </StepperItemContext.Provider>
    );
  });

  return memoizedStepperItem as unknown as JSX.Element;
};

export default StepperItem;
