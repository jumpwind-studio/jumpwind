import { Link } from "@tanstack/solid-router";

export function NotFound() {
  return (
    <div class="space-y-2 p-2">
      <div class="text-gray-600 dark:text-gray-400">
        <p>The page you are looking for does not exist.</p>
      </div>
      <p class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          class="rounded bg-emerald-500 px-2 py-1 font-black text-sm text-white uppercase"
          onClick={() => window.history.back()}
        >
          Go back
        </button>
        <Link
          class="rounded bg-cyan-600 px-2 py-1 font-black text-sm text-white uppercase"
          to="/"
        >
          Start Over
        </Link>
      </p>
    </div>
  );
}
