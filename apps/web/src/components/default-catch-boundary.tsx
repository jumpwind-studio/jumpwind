import type { ErrorComponentProps } from "@tanstack/solid-router";
import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/solid-router";
import { Show } from "solid-js";

export function DefaultCatchBoundary(props: ErrorComponentProps) {
  const router = useRouter();

  const isRoot = useMatch({
    select: (state) => state.id === rootRouteId,
    strict: false,
  });

  return (
    <div class="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4">
      <ErrorComponent error={props.error} />
      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            router.invalidate();
          }}
          class="rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700"
        >
          Try Again
        </button>
        <Show
          when={isRoot()}
          fallback={
            <Link
              to="/"
              class="rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700"
            >
              Home
            </Link>
          }
        >
          <Link
            to="/"
            class="rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700"
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
