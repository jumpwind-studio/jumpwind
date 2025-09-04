import type { ErrorComponentProps } from "@tanstack/solid-router";
import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/solid-router";
import { Show } from "solid-js";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();

  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  return (
    <div class="min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6">
      <ErrorComponent error={error} />
      <div class="flex gap-2 items-center flex-wrap">
        <button
          type="button"
          onClick={() => {
            router.invalidate();
          }}
          class={
            "px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold"
          }
        >
          Try Again
        </button>
        <Show
          when={isRoot()}
          fallback={
            <Link
              to="/"
              class={
                "px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold"
              }
            >
              Home
            </Link>
          }
        >
          <Link
            to="/"
            class={
              "px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold"
            }
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
          >
            Go Back
          </Link>
        </Show>
      </div>
    </div>
  );
}
