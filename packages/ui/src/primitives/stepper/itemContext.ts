import {
  createKeyedContext,
  useKeyedContext,
} from "@corvu/utils/create/keyedContext";
import { type Accessor, createContext, useContext } from "solid-js";

export type StepperItemContextValue = {
  /** Value of the stepper item. */
  value: Accessor<string>;
  /** Whether the stepper item is disabled. */
  disabled: Accessor<boolean>;
  /** The `id` attribute of the stepper item trigger element. */
  triggerId: Accessor<string | undefined>;
};

const StepperItemContext = createContext<StepperItemContextValue>();

export const createStepperItemContext = (contextId?: string) => {
  if (contextId === undefined) return StepperItemContext;

  const context = createKeyedContext<StepperItemContextValue>(
    `stepper-item-${contextId}`,
  );
  return context;
};

/** Context which exposes various properties to interact with the stepper. Optionally provide a contextId to access a keyed context. */
export const useStepperItemContext = (contextId?: string) => {
  if (contextId === undefined) {
    const context = useContext(StepperItemContext);
    if (!context) {
      throw new Error(
        "[corvu]: Stepper Item context not found. Make sure to wrap Stepper Item components in <Stepper.Item>",
      );
    }
    return context;
  }

  const context = useKeyedContext<StepperItemContextValue>(
    `stepper-item-${contextId}`,
  );
  if (!context) {
    throw new Error(
      `[corvu]: Stepper Item context with id "${contextId}" not found. Make sure to wrap Stepper Item components in <Stepper.Item contextId="${contextId}">`,
    );
  }
  return context;
};

export type InternalStepperItemContextValue = StepperItemContextValue & {
  registerTriggerId: () => void;
  unregisterTriggerId: () => void;
};

const InternalStepperItemContext =
  createContext<InternalStepperItemContextValue>();

export const createInternalStepperItemContext = (contextId?: string) => {
  if (contextId === undefined) return InternalStepperItemContext;

  const context = createKeyedContext<InternalStepperItemContextValue>(
    `stepper-item-internal-${contextId}`,
  );
  return context;
};

export const useInternalStepperItemContext = (contextId?: string) => {
  if (contextId === undefined) {
    const context = useContext(InternalStepperItemContext);
    if (!context) {
      throw new Error(
        "[corvu]: Stepper context not found. Make sure to wrap Stepper components in <Stepper.Root>",
      );
    }
    return context;
  }

  const context = useKeyedContext<InternalStepperItemContextValue>(
    `stepper-item-internal-${contextId}`,
  );
  if (!context) {
    throw new Error(
      `[corvu]: Stepper context with id "${contextId}" not found. Make sure to wrap Stepper components in <Stepper.Root contextId="${contextId}">`,
    );
  }
  return context;
};
