import type * as SliderPrimitive from "@kobalte/core/slider";
import { useStore } from "@tanstack/solid-form";
import { Index, Show, splitProps } from "solid-js";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field.jsx";
import {
  Slider,
  SliderDescription,
  SliderError,
  SliderFill,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from "../ui/slider.jsx";
import type { FormProps } from "./types.js";
import { squash, useField } from "./utils.js";

export interface FormSliderProps
  extends FormProps<SliderPrimitive.SliderRootOptions, number[]> {}

export function FormSlider(props: FormSliderProps) {
  const [local, rest] = splitProps(props, [
    "field",
    "class",
    "label",
    "description",
    "value",
  ]);

  const field = useField<number[]>(() => local.field);
  const value = useStore(field().store, (state) => state.value);
  const errors = useStore(field().store, (state) => state.meta.errors);

  return (
    <Slider
      as={Field}
      data-slot="form-slider"
      name={field().name}
      value={value()}
      onChange={field().handleChange}
      onBlur={field().handleBlur}
      validationState={errors().length > 0 ? "invalid" : "valid"}
      class={local.class}
      {...rest}
    >
      <Show when={local.label}>
        <SliderLabel as={FieldLabel} data-slot="form-slider-label">
          {local.label}
        </SliderLabel>
      </Show>
      <Show when={local.description}>
        <SliderDescription
          as={FieldDescription}
          data-slot="form-slider-description"
        >
          {local.description}
        </SliderDescription>
      </Show>
      <SliderValueLabel
        as={FieldDescription}
        data-slot="form-slider-value-label"
      />
      <SliderTrack data-slot="form-slider-track">
        <SliderFill />
        <Index each={value()}>
          {(_, index) => (
            <SliderThumb data-slot={`form-slider-thumb-${index}`} />
          )}
        </Index>
      </SliderTrack>
      <SliderError as={FieldError} data-slot="form-slider-error">
        {squash(errors())}
      </SliderError>
    </Slider>
  );
}
