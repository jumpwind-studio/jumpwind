import { Link } from "@tanstack/solid-router";
import { type ParentProps, Show } from "solid-js";

export function NotFound(props: ParentProps) {
  return (
    <div class="space-y-2 p-2">
      <div class="text-gray-600 dark:text-gray-400">
        <Show
          when={props.children}
          fallback={<p>The page you are looking for does not exist.</p>}
        >
          {props.children}
        </Show>
      </div>
      <p class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          class="rounded bg-emerald-500 px-2 py-1 font-black text-sm text-white uppercase"
        >
          Go back
        </button>
        <Link
          to="/"
          class="rounded bg-cyan-600 px-2 py-1 font-black text-sm text-white uppercase"
        >
          Start Over
        </Link>
      </p>
    </div>
  );
}
