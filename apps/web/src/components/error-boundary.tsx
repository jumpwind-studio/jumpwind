import type { ErrorComponentProps } from "@tanstack/solid-router";
import { For, Show } from "solid-js";

export function ErrorBoundary(props: ErrorComponentProps) {
  const lines = () => props.error.stack?.split("\n");

  return (
    <div class="flex max-w-3xl flex-col justify-around rounded-lg border border-warning p-4 text-sm">
      <div class="mb-2 font-bold text-2xl text-destructive/70">
        {props.error.name ?? "An error occurred"}
      </div>

      <Show when={props.error.message}>
        <div class="mb-3 font-semibold text-destructive/60 text-lg">
          {props.error.message}
        </div>
      </Show>

      <Show when={props.error.stack}>
        <div class="mt-2 grow font-mono">
          <div class="mb-1 font-semibold text-muted-foreground">Stack:</div>
          <div class="overflow-x-auto rounded border border-r-muted-foreground bg-muted p-2">
            <For each={lines()}>
              {(line) => <div class="whitespace-nowrap">{line}</div>}
            </For>
          </div>
        </div>
      </Show>

      <Show when={props.error.cause}>
        {(cause) => (
          <div class="mt-2 font-mono">
            <div class="mb-1 font-semibold text-muted-foreground">Cause:</div>
            <div class="overflow-x-auto rounded border border-r-muted-foreground bg-muted p-2">
              {JSON.stringify(cause(), null, 2)}
            </div>
          </div>
        )}
      </Show>
    </div>
  );
}
