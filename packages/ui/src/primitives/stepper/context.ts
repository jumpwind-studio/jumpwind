import {
  createKeyedContext,
  useKeyedContext,
} from "@corvu/utils/create/keyedContext";
import {
  type Accessor,
  createContext,
  type Setter,
  useContext,
} from "solid-js";

export type StepperContextValue = {
  /** The value of the stepper. */
  value: Accessor<string | null>;
  /** Callback fired when the value changes. */
  setValue: Setter<string | null>;
  /** Whether the stepper is disabled. */
  disabled: Accessor<boolean>;
  /** The orientation of the stepper. */
  orientation: Accessor<"horizontal" | "vertical">;
  /** Whether the stepper should loop when navigating with the keyboard. */
  loop: Accessor<boolean>;
  /** The text direction of the stepper. */
  textDirection: Accessor<"ltr" | "rtl">;
  /** Whether the initial open animation of the disclosure content should be prevented. */
  preventInitialContentAnimation: Accessor<boolean>;
};

const StepperContext = createContext<StepperContextValue>();

export const createStepperContext = (contextId?: string) => {
  if (contextId === undefined) return StepperContext;

  const context = createKeyedContext<StepperContextValue>(
    `stepper-${contextId}`,
  );
  return context;
};

/** Context which exposes various properties to interact with the stepper. Optionally provide a contextId to access a keyed context. */
export const useStepperContext = (contextId?: string) => {
  if (contextId === undefined) {
    const context = useContext(StepperContext);
    if (!context) {
      throw new Error(
        "[corvu]: Stepper context not found. Make sure to wrap Stepper components in <Stepper.Root>",
      );
    }
    return context;
  }

  const context = useKeyedContext<StepperContextValue>(`stepper-${contextId}`);
  if (!context) {
    throw new Error(
      `[corvu]: Stepper context with id "${contextId}" not found. Make sure to wrap Stepper components in <Stepper.Root contextId="${contextId}">`,
    );
  }
  return context;
};

export type InternalStepperContextValue = StepperContextValue & {
  internalValue: Accessor<string | null>;
  toggleValue: (value: string) => void;
  registerTrigger: (element: HTMLElement) => void;
  unregisterTrigger: (element: HTMLElement) => void;
  onTriggerKeyDown: (event: KeyboardEvent) => void;
  onTriggerFocus: (event: FocusEvent) => void;
};

const InternalStepperContext = createContext<InternalStepperContextValue>();

export const createInternalStepperContext = (contextId?: string) => {
  if (contextId === undefined) return InternalStepperContext;

  const context = createKeyedContext<InternalStepperContextValue>(
    `stepper-internal-${contextId}`,
  );
  return context;
};

export const useInternalStepperContext = (contextId?: string) => {
  if (contextId === undefined) {
    const context = useContext(InternalStepperContext);
    if (!context) {
      throw new Error(
        "[corvu]: Stepper context not found. Make sure to wrap Stepper components in <Stepper.Root>",
      );
    }
    return context;
  }

  const context = useKeyedContext<InternalStepperContextValue>(
    `stepper-internal-${contextId}`,
  );
  if (!context) {
    throw new Error(
      `[corvu]: Stepper context with id "${contextId}" not found. Make sure to wrap Stepper components in <Stepper.Root contextId="${contextId}">`,
    );
  }
  return context;
};
