import { type ComponentProps, type JSX, Show, splitProps } from "solid-js";
import { Button } from "../ui/button.jsx";
import { Spinner } from "../ui/spinner.jsx";
import { useFormContext } from "./context.js";
import type { FormProps } from "./types.js";

export interface FormSubmitButtonProps
  extends FormProps<Omit<ComponentProps<typeof Button>, "form">> {
  submittingFallback?: JSX.Element;
}

export function FormSubmitButton(props: FormSubmitButtonProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "submittingFallback",
  ]);

  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => ({
        canSubmit: state.canSubmit,
        isSubmitting: state.isSubmitting,
      })}
    >
      {(state) => (
        <Button
          data-slot="form-submit-button"
          variant="outline"
          disabled={!state().canSubmit}
          class={local.class}
          {...rest}
        >
          <Show
            when={!state().isSubmitting}
            fallback={
              <Show when={local.submittingFallback} fallback={<Spinner />}>
                {local.submittingFallback}
              </Show>
            }
          >
            <Show when={local.children} fallback="Submit">
              {local.children}
            </Show>
          </Show>
        </Button>
      )}
    </form.Subscribe>
  );
}
