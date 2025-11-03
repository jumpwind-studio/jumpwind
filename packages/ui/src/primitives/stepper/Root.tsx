import { isFunction } from "@corvu/utils";
import createControllableSignal from "@corvu/utils/create/controllableSignal";
import createOnce from "@corvu/utils/create/once";
import { sortByDocumentPosition } from "@corvu/utils/dom";
import {
  type Component,
  createEffect,
  createMemo,
  createSignal,
  type JSX,
  mergeProps,
  type Setter,
  untrack,
} from "solid-js";
import { createList } from "solid-list";
import {
  createInternalStepperContext,
  createStepperContext,
} from "./context.js";

export type StepperRootProps = {
  /**
   * The value of the stepper.
   */
  value?: string | null;
  /**
   * Callback fired when the value changes.
   */
  onValueChange?: (value: string | null) => void;
  /**
   * The value of the stepper initially.
   * @defaultValue `null`
   */
  initialValue?: string | null;
  /**
   * Whether the stepper is disabled.
   * @defaultValue `false`
   */
  disabled?: boolean;
  /**
   * The orientation of the stepper.
   * @defaultValue `vertical`
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Whether the stepper should loop when navigating with the keyboard.
   * @defaultValue `true`
   */
  loop?: boolean;
  /**
   * The text direction of the stepper.
   * @defaultValue `ltr`
   */
  textDirection?: "ltr" | "rtl";
  /**
   * Whether the initial open animation of the disclosure content should be prevented.
   * @defaultValue `false`
   */
  preventInitialContentAnimation?: boolean;
  /**
   * The `id` of the stepper context. Useful if you have nested steppers and want to create components that belong to a stepper higher up in the tree.
   */
  contextId?: string;
  /** @hidden */
  children: JSX.Element | ((props: StepperRootChildrenProps) => JSX.Element);
};

/** Props that are passed to the Root component children callback. */
export type StepperRootChildrenProps = {
  /** The value of the stepper. */
  value: string | null;
  /** Callback fired when the value changes. */
  setValue: Setter<string | null>;
  /** Whether the stepper is disabled. */
  disabled: boolean;
  /** The orientation of the stepper. */
  orientation: "horizontal" | "vertical";
  /** Whether the stepper should loop when navigating with the keyboard. */
  loop: boolean;
  /** The text direction of the stepper. */
  textDirection: "ltr" | "rtl";
  /** Whether the initial open animation of the disclosure content should be prevented. */
  preventInitialContentAnimation: boolean;
};

/** Context wrapper for the stepper. Is required for every stepper you create. */
const StepperRoot: Component<StepperRootProps> = (props) => {
  const defaultedProps = mergeProps(
    {
      initialValue: null,
      disabled: false,
      orientation: "vertical" as const,
      loop: true,
      textDirection: "ltr" as const,
      preventInitialContentAnimation: false,
    },
    props,
  );

  const [value, setValue] = createControllableSignal({
    value: () => defaultedProps.value,
    initialValue: defaultedProps.initialValue,
    onChange: defaultedProps.onValueChange,
  });

  const internalValue = createMemo(() => {
    const _value = value();
    if (_value === null) {
      return null;
    }
    return _value;
  });

  const toggleValue = (value: string) => {
    const _internalValue = internalValue();
    if (_internalValue === value) {
      if (!defaultedProps.nullable) return;
      setValue(null);
    } else {
      setValue(value);
    }
    return;
  };

  const [triggers, setTriggers] = createSignal<HTMLElement[]>([]);
  const [selectableTriggers, setSelectableTriggers] = createSignal<
    HTMLElement[]
  >([]);

  createEffect(() => {
    const observer = new MutationObserver(updateSelectableTriggers);
    triggers().forEach((trigger) => {
      observer.observe(trigger, {
        attributes: true,
        attributeFilter: ["disabled"],
      });
    });

    updateSelectableTriggers();

    return observer.disconnect;
  });

  const updateSelectableTriggers = () => {
    setSelectableTriggers(
      triggers()
        .filter((trigger) => !trigger.hasAttribute("disabled"))
        .sort(sortByDocumentPosition),
    );
  };

  const { setActive, onKeyDown: onTriggerKeyDown } = createList({
    items: () => [...Array(selectableTriggers().length).keys()],
    orientation: () => defaultedProps.orientation,
    loop: () => defaultedProps.loop,
    textDirection: () => defaultedProps.textDirection,
    handleTab: false,
    onActiveChange: (index) => {
      if (index === null) return;
      const trigger = selectableTriggers()[index];
      if (!trigger) return;
      trigger.focus();
    },
  });

  const childrenProps: StepperRootChildrenProps = {
    get value() {
      return value();
    },
    setValue,
    get disabled() {
      return defaultedProps.disabled;
    },
    get orientation() {
      return defaultedProps.orientation;
    },
    get loop() {
      return defaultedProps.loop;
    },
    get textDirection() {
      return defaultedProps.textDirection;
    },
    get preventInitialContentAnimation() {
      return defaultedProps.preventInitialContentAnimation;
    },
  };

  const memoizedChildren = createOnce(() => defaultedProps.children);

  const resolveChildren = () => {
    const children = memoizedChildren()();
    if (isFunction(children)) {
      return children(childrenProps);
    }
    return children;
  };

  const memoizedStepperRoot = createMemo(() => {
    const StepperContext = createStepperContext(defaultedProps.contextId);
    const InternalStepperContext = createInternalStepperContext(
      defaultedProps.contextId,
    );

    return (
      <StepperContext.Provider
        value={{
          value,
          setValue,
          disabled: () => defaultedProps.disabled,
          orientation: () => defaultedProps.orientation,
          loop: () => defaultedProps.loop,
          textDirection: () => defaultedProps.textDirection,
          preventInitialContentAnimation: () =>
            defaultedProps.preventInitialContentAnimation,
        }}
      >
        <InternalStepperContext.Provider
          value={{
            value,
            setValue,
            disabled: () => defaultedProps.disabled,
            orientation: () => defaultedProps.orientation,
            loop: () => defaultedProps.loop,
            textDirection: () => defaultedProps.textDirection,
            preventInitialContentAnimation: () =>
              defaultedProps.preventInitialContentAnimation,
            internalValue,
            toggleValue,
            registerTrigger: (trigger) =>
              setTriggers((triggers) => [...triggers, trigger]),
            unregisterTrigger: (trigger) =>
              setTriggers((triggers) => triggers.filter((t) => t !== trigger)),
            onTriggerKeyDown,
            onTriggerFocus: (e) =>
              setActive(selectableTriggers().indexOf(e.target as HTMLElement)),
          }}
        >
          {untrack(() => resolveChildren())}
        </InternalStepperContext.Provider>
      </StepperContext.Provider>
    );
  });

  return memoizedStepperRoot as unknown as JSX.Element;
};

export default StepperRoot;
