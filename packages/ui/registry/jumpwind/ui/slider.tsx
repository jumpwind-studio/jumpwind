import * as SliderPrimitive from "@kobalte/core/slider";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

const SliderDescription = SliderPrimitive.Description;
const SliderLabel = SliderPrimitive.Label;
const SliderMessage = SliderPrimitive.ErrorMessage;

function SliderRoot(props: ComponentProps<typeof SliderPrimitive.Root<"div">>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.Root
      as="div"
      data-slot="slider"
      class={cn(
        "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-disabled:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
}

function SliderTrack(
  props: ComponentProps<typeof SliderPrimitive.Track<"div">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.Track
      as="div"
      data-slot="slider-track"
      class={cn(
        "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5",
        local.class,
      )}
      {...rest}
    />
  );
}

function SliderFill(props: ComponentProps<typeof SliderPrimitive.Fill<"div">>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.Fill
      as="div"
      data-slot="slider-range"
      class={cn(
        "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
        local.class,
      )}
      {...rest}
    />
  );
}

function SliderThumb(
  props: ComponentProps<typeof SliderPrimitive.Thumb<"span">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SliderPrimitive.Thumb
      as="span"
      data-slot="slider-thumb"
      class={cn(
        "block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  SliderRoot,
  SliderFill,
  SliderTrack,
  SliderThumb,
  // Forms
  SliderDescription,
  SliderLabel,
  SliderMessage,
};
