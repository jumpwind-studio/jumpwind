import type * as SliderPrimitive from "@kobalte/core/slider";
import { useStore } from "@tanstack/solid-form";
import { Index, Show, splitProps } from "solid-js";
import { FieldContent } from "../ui/field.jsx";
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
import { useField } from "./context.js";
import type { FormProps } from "./types.js";
import { squash } from "./utils.js";

export interface FormSliderProps
  extends FormProps<SliderPrimitive.SliderRootOptions> {}

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
      data-slot="form-slider"
      name={field().name}
      value={value()}
      onChange={field().handleChange}
      onBlur={field().handleBlur}
      validationState={errors().length > 0 ? "invalid" : "valid"}
      class={local.class}
      {...rest}
    >
      <div class="flex flex-col group-data-orientation=horizontal:flex-row">
        <FieldContent>
          <Show when={local.label}>
            <SliderLabel data-slot="form-slider-label">
              {local.label}
            </SliderLabel>
          </Show>
          <Show when={local.description}>
            <SliderDescription data-slot="form-slider-description">
              {local.description}
            </SliderDescription>
          </Show>
        </FieldContent>
        <SliderValueLabel
          data-slot="form-slider-value-label"
          class="self-end"
        />
      </div>
      <SliderTrack data-slot="form-slider-track" class="mt-2 w-full">
        <SliderFill />
        <Index each={value()}>
          {(_, index) => (
            <SliderThumb data-slot={`form-slider-thumb-${index}`} />
          )}
        </Index>
      </SliderTrack>
      <SliderError data-slot="form-slider-error">
        {squash(errors())}
      </SliderError>
    </Slider>
  );
}
