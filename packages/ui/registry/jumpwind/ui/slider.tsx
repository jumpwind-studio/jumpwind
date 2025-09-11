import * as SliderPrimitive from "@kobalte/core/slider";
import {
  type ComponentProps,
  createMemo,
  Index,
  mergeProps,
  splitProps,
} from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";
import { labelVariants } from "@/registry/jumpwind/ui/label";

const useSlider = SliderPrimitive.useSliderContext;

function Slider(props: ComponentProps<typeof SliderPrimitive.Root>) {
  const defaultedProps = mergeProps(
    {
      minValue: 0,
      maxValue: 100,
      step: 1,
      orientation: "horizontal",
    } satisfies typeof props,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "defaultValue",
    "value",
    "minValue",
    "maxValue",
    "getValueLabel",
  ]);

  const getValueLabel = (
    params: SliderPrimitive.SliderGetValueLabelParams,
  ): string => {
    if (local.getValueLabel) return local.getValueLabel(params);
    return params.values.join(" - ");
  };

  const values = createMemo<number[]>(() => {
    if (Array.isArray(local.value)) return local.value;
    if (Array.isArray(local.defaultValue)) return local.defaultValue;
    return [local.minValue, local.maxValue];
  });

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      data-orientation={rest.orientation}
      value={local.value}
      defaultValue={local.defaultValue}
      minValue={local.minValue}
      maxValue={local.maxValue}
      getValueLabel={getValueLabel}
      class={cn(
        "relative flex w-full touch-none select-none flex-col items-center gap-y-3 data-disabled:opacity-50",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        local.class,
      )}
      {...rest}
    />
  );
}

function SliderFill(props: ComponentProps<typeof SliderPrimitive.Fill>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.Fill
      data-slot="slider-fill"
      class={cn(
        "absolute rounded-full bg-primary",
        "data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
        local.class,
      )}
      {...rest}
    />
  );
}

function SliderThumb(props: ComponentProps<typeof SliderPrimitive.Thumb>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      data-orientation={rest.orientation}
      class={cn(
        // "block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50",
        "block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50",
        "data-[orientation=horizontal]:top-[-6px] data-[orientation=vertical]:right-[-6px]",
        local.class,
      )}
      {...rest}
    >
      <SliderPrimitive.Input data-slot="slider-input" />
    </SliderPrimitive.Thumb>
  );
}

function SliderTrack(props: ComponentProps<typeof SliderPrimitive.Track>) {
  const [local, rest] = splitProps(props, ["class"]);

  const slider = useSlider();

  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      class={cn(
        "relative grow rounded-full bg-muted",
        "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        local.class,
      )}
      {...rest}
    >
      <SliderFill />
      <Index each={slider.state.values()}>
        {(_, index) => (
          <SliderThumb
            data-slot={`slider-thumb-${index}`}
            data-orientation={rest.orientation}
          />
        )}
      </Index>
    </SliderPrimitive.Track>
  );
}

function SliderValueLabel(
  props: ComponentProps<typeof SliderPrimitive.ValueLabel>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.ValueLabel
      data-slot="slider-value-label"
      class={labelVariants({ variant: "label", class: local.class })}
      {...rest}
    />
  );
}

function SliderLabel(props: ComponentProps<typeof SliderPrimitive.Label>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.Label
      data-slot="slider-label"
      class={labelVariants({ variant: "label", class: local.class })}
      {...rest}
    />
  );
}

function SliderDescription(
  props: ComponentProps<typeof SliderPrimitive.Description>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.Description
      data-slot="slider-description"
      class={labelVariants({ variant: "description", class: local.class })}
      {...rest}
    />
  );
}

function SliderErrorMessage(
  props: ComponentProps<typeof SliderPrimitive.ErrorMessage>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.ErrorMessage
      data-slot="slider-error-message"
      class={labelVariants({ variant: "error", class: local.class })}
      {...rest}
    />
  );
}

export {
  Slider,
  SliderTrack,
  SliderValueLabel,
  // Forms
  SliderLabel,
  SliderDescription,
  SliderErrorMessage,
  // Hooks
  useSlider,
};
