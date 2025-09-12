import { createRouter as createTanStackRouter } from "@tanstack/solid-router";
import { ErrorBoundary } from "@/components/error-boundary";
import { NotFound } from "./components/not-found.js";
import { routeTree } from "./routeTree.gen.js";

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: ErrorBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
  });

  return router;
}

declare module "@tanstack/solid-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
