import type { ElementOf } from "@corvu/utils/dom";
import { Dynamic, type DynamicProps } from "@corvu/utils/dynamic";
import {
  createMemo,
  type JSX,
  type Ref,
  Show,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { useInternalStepperItemContext } from "./itemContext.js";

export type StepperContentCorvuProps = {
  /**
   * Whether the stepper content should be forced to render. Useful when using third-party animation libraries.
   * @defaultValue `false`
   */
  forceMount?: boolean;
  /**
   * The `id` of the stepper context to use.
   */
  contextId?: string;
};

export type StepperContentSharedElementProps<T extends ValidComponent = "div"> =
  {
    ref: Ref<ElementOf<T>>;
    style: string | JSX.CSSProperties;
  };

export type StepperContentElementProps = StepperContentSharedElementProps & {
  id: string;
  role: "region";
  "aria-labelledby": string | undefined;
  "data-corvu-stepper-content": "";
};

export type StepperContentProps<T extends ValidComponent = "div"> =
  StepperContentCorvuProps & Partial<StepperContentSharedElementProps<T>>;

/** Content of an stepper item. Can be animated.
 *
 * @data `data-corvu-stepper-content` - Present on every stepper item content element.
 * @css `--corvu-disclosure-content-width` - The width of the stepper item content. Useful if you want to animate its width.
 * @css `--corvu-disclosure-content-height` - The height of the stepper item content. Useful if you want to animate its height.
 */
const StepperContent = <T extends ValidComponent = "div">(
  props: DynamicProps<T, StepperContentProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as StepperContentProps, [
    "forceMount",
    "contextId",
    "ref",
    "style",
  ]);

  const context = createMemo(() =>
    useInternalStepperItemContext(localProps.contextId),
  );

  const show = () => localProps.forceMount;

  return (
    <Show when={show()}>
      <Dynamic<
        Omit<StepperContentElementProps, keyof StepperContentElementProps>
      >
        // === ElementProps ===
        role="region"
        aria-labelledby={context().triggerId()}
        data-corvu-stepper-content=""
        // === Misc ===
        {...(otherProps as StepperContentProps)}
      />
    </Show>
  );
};

export default StepperContent;
