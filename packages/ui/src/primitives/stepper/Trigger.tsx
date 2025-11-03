import { dataIf } from "@corvu/utils";
import { callEventHandler, type ElementOf } from "@corvu/utils/dom";
import {
  DynamicButton,
  type DynamicButtonElementProps,
  type DynamicButtonSharedElementProps,
  type DynamicProps,
} from "@corvu/utils/dynamic";
import { mergeRefs } from "@corvu/utils/reactivity";
import {
  type Component,
  createEffect,
  createMemo,
  createSignal,
  type JSX,
  onCleanup,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { useInternalStepperContext } from "./context.js";
import { useInternalStepperItemContext } from "./itemContext.js";

export type StepperTriggerCorvuProps = {
  /**
   * The `id` of the disclosure context to use.
   */
  contextId?: string;
};

export type StepperTriggerSharedElementProps<
  T extends ValidComponent = "button",
> = {
  onKeyDown: JSX.EventHandlerUnion<ElementOf<T>, KeyboardEvent>;
  onFocus?: JSX.EventHandlerUnion<ElementOf<T>, FocusEvent>;
  disabled: boolean | undefined;
} & DynamicButtonSharedElementProps<T>;

export type StepperTriggerElementProps = StepperTriggerSharedElementProps & {
  id: string | undefined;
  role: "button" | undefined;
  "aria-disabled": "true" | undefined;
  "aria-controls": string;
  "data-disabled": "" | undefined;
  "data-corvu-stepper-trigger": "";
} & DynamicButtonSharedElementProps<"button">;

export type StepperTriggerProps<T extends ValidComponent = "button"> =
  StepperTriggerCorvuProps & Partial<StepperTriggerSharedElementProps<T>>;

/** Button that changes the open state of the stepper item when clicked.
 *
 * @data `data-corvu-stepper-trigger` - Present on every stepper trigger element.
 * @data `data-expanded` - Present when the stepper is expanded.
 * @data `data-collapsed` - Present when the stepper is collapsed.
 * @data `data-disabled` - Present when the stepper trigger is disabled.
 */
const StepperTrigger = <T extends ValidComponent = "button">(
  props: DynamicProps<T, StepperTriggerProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as StepperTriggerProps, [
    "contextId",
    "ref",
    "onKeyDown",
    "onFocus",
    "disabled",
  ]);

  const [triggerRef, setTriggerRef] = createSignal<HTMLElement | null>(null);

  const stepperContext = createMemo(() =>
    useInternalStepperContext(localProps.contextId),
  );

  createEffect(() => {
    const trigger = triggerRef();
    const context = stepperContext();
    if (trigger) {
      context.registerTrigger(trigger);
      onCleanup(() => context.unregisterTrigger(trigger));
    }
  });

  const context = createMemo(() =>
    useInternalStepperItemContext(localProps.contextId),
  );

  createEffect(() => {
    const _context = context();
    _context.registerTriggerId();
    onCleanup(() => _context.unregisterTriggerId());
  });

  const onKeyDown: JSX.EventHandlerUnion<HTMLButtonElement, KeyboardEvent> = (
    e,
  ) => {
    !callEventHandler(localProps.onKeyDown, e) &&
      stepperContext().onTriggerKeyDown(e);
  };

  const onFocus: JSX.EventHandlerUnion<HTMLButtonElement, FocusEvent> = (e) => {
    callEventHandler(localProps.onFocus, e);
    stepperContext().onTriggerFocus(e);
  };

  return (
    <DynamicButton<
      Component<
        Omit<StepperTriggerElementProps, keyof DynamicButtonElementProps>
      >
    >
      // === SharedElementProps ===
      ref={mergeRefs(localProps.ref, setTriggerRef)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      disabled={
        localProps.disabled === true || context().disabled() || undefined
      }
      // === ElementProps ===
      id={context().triggerId()}
      contextId={localProps.contextId}
      aria-disabled={context().disabled() ? "true" : undefined}
      data-disabled={dataIf(context().disabled())}
      data-corvu-stepper-trigger=""
      // === Misc ===
      data-corvu-disclosure-trigger={null}
      {...otherProps}
      // Disclosure
      // === SharedElementProps ===
      // === ElementProps ===
      aria-controls={context().stepperId()}
      {...otherProps}
    />
  );
};

export default StepperTrigger;
