import * as SliderPrimitive from "@kobalte/core/slider";
import {
  type ComponentProps,
  createMemo,
  Index,
  mergeProps,
  splitProps,
} from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";
import { Label } from "@/registry/jumpwind/ui/label";

function Slider(props: ComponentProps<typeof SliderPrimitive.Root>) {
  const defaultedProps = mergeProps(
    {
      orientation: "vertical",
    } satisfies typeof props,
    props,
  );
  const [local, rest] = splitProps(defaultedProps, ["class"]);

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      data-orientation={rest.orientation}
      class={cn(
        "relative flex touch-none select-none items-center data-disabled:opacity-50",
        "data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-col",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        // "data-[orientation=vertical]:flex-row",
        local.class,
      )}
      // class={cn(
      //   "relative flex w-full touch-none select-none flex-col items-center data-disabled:opacity-50",
      //   rest.orientation === "vertical" && "h-full min-h-44 w-auto flex-col",
      //   local.class,
      // )}
      {...rest}
    />
  );
}

function SliderTrack(props: ComponentProps<typeof SliderPrimitive.Track>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      class={cn(
        "relative grow overflow-hidden rounded-full bg-muted",
        "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
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
      data-slot="slider-range"
      class={cn(
        "absolute rounded-full bg-primary",
        // "size-full",
        // "data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
        local.class,
      )}
      {...rest}
    />
  );
}

function SliderThumb(props: ComponentProps<typeof SliderPrimitive.Thumb>) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      class={cn(
        "block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <SliderPrimitive.Input data-slot="slider-input" />
    </SliderPrimitive.Thumb>
  );
}

function SliderValueLabel(
  props: ComponentProps<typeof SliderPrimitive.ValueLabel>,
) {
  return (
    <SliderPrimitive.ValueLabel
      data-slot="slider-value-label"
      as={Label}
      {...props}
    />
  );
}

function SliderLabel(props: ComponentProps<typeof SliderPrimitive.Label>) {
  return (
    <SliderPrimitive.Label data-slot="slider-label" as={Label} {...props} />
  );
}

function SliderDescription(
  props: ComponentProps<typeof SliderPrimitive.Description>,
) {
  return (
    <SliderPrimitive.Description data-slot="slider-description" {...props} />
  );
}

function SliderErrorMessage(
  props: ComponentProps<typeof SliderPrimitive.ErrorMessage>,
) {
  return (
    <SliderPrimitive.ErrorMessage data-slot="slider-error-message" {...props} />
  );
}

function SliderExample(props: ComponentProps<typeof SliderPrimitive.Root>) {
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
  ]);
  const values = createMemo(() =>
    Array.isArray(local.value)
      ? local.value
      : Array.isArray(local.defaultValue)
        ? local.defaultValue
        : [local.minValue, local.maxValue],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={local.defaultValue}
      value={values()}
      // value={local.value}
      minValue={local.minValue}
      maxValue={local.maxValue}
      data-orientation={rest.orientation}
      class={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        local.class,
      )}
      {...rest}
    >
      <div class="flex w-full justify-between">
        <SliderPrimitive.Label>Foo</SliderPrimitive.Label>
        <SliderPrimitive.ValueLabel />
      </div>
      <SliderPrimitive.Track
        data-slot="slider-track"
        data-orientation={rest.orientation}
        class={
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        }
      >
        <SliderPrimitive.Fill
          data-slot="slider-fill"
          data-orientation={rest.orientation}
          class="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        />
      </SliderPrimitive.Track>
      <Index each={values()}>
        {(_, index) => (
          <SliderPrimitive.Thumb
            data-slot={`slider-thumb-${index}`}
            data-orientation={rest.orientation}
            class="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          >
            <SliderPrimitive.Input data-slot="slider-input" />
          </SliderPrimitive.Thumb>
        )}
      </Index>
    </SliderPrimitive.Root>
  );
}

export {
  Slider,
  SliderFill,
  SliderTrack,
  SliderThumb,
  SliderValueLabel,
  // Forms
  SliderLabel,
  SliderDescription,
  SliderErrorMessage,
  // Example
  SliderExample,
};
