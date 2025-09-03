import * as SliderPrimitive from "@kobalte/core/slider";
import { cn } from "@/registry/jumpwind/lib/utils";
import {
  type ComponentProps,
  createMemo,
  Index,
  mergeProps,
  splitProps,
} from "solid-js";

const FormSliderDescription = SliderPrimitive.Description;
const FormSliderLabel = SliderPrimitive.Label;
const FormSliderMessage = SliderPrimitive.ErrorMessage;

function SliderRoot(props: ComponentProps<typeof SliderPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.Root
      class={cn(
        "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-disabled:opacity-50",
        local.class,
      )}
      data-slot="slider"
      {...rest}
    />
  );
}

function SliderTrack(props: ComponentProps<typeof SliderPrimitive.Track>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.Track
      class={cn(
        "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5",
        local.class,
      )}
      data-slot="slider-track"
      {...rest}
    />
  );
}

function SliderFill(props: ComponentProps<typeof SliderPrimitive.Fill>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.Fill
      class={cn(
        "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
        local.class,
      )}
      data-slot="slider-range"
      {...rest}
    />
  );
}

function SliderThumb(props: ComponentProps<typeof SliderPrimitive.Thumb>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.Thumb
      class={cn(
        "block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50",
        local.class,
      )}
      data-slot="slider-thumb"
      {...rest}
    />
  );
}

/**
 * Pre-assessmbled slider.
 */
function Slider(props: ComponentProps<typeof SliderRoot>) {
  const defaultedProps = mergeProps(
    { minValue: 0, maxValue: 100 } satisfies Partial<
      ComponentProps<typeof SliderRoot>
    >,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "defaultValue",
    "value",
    "minValue",
    "maxValue",
  ]);

  const values = createMemo(() =>
    Array.isArray(local.value)
      ? local.value
      : Array.isArray(local.defaultValue)
        ? local.defaultValue
        : [local.minValue, local.maxValue],
  );

  return (
    <SliderRoot {...rest}>
      <SliderTrack>
        <SliderFill />
      </SliderTrack>
      <Index each={values()}>{() => <SliderThumb />}</Index>
    </SliderRoot>
  );
}

export {
  SliderRoot,
  SliderFill,
  SliderTrack,
  SliderThumb,
  // Forms
  FormSliderDescription,
  FormSliderLabel,
  FormSliderMessage,
  // Pre-assembled
  Slider,
};
