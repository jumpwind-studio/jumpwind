import { createMiddleware, json } from "@tanstack/solid-start";
import { createServerFileRoute, getHeader } from "@tanstack/solid-start/server";
import * as Effect from "effect/Effect";
import * as Registry from "@/lib/registry";
import { serverRuntime } from "@/lib/runtime";

function isValidToken(token: string | null | undefined): boolean {
  if (!token) return false;
  return import.meta.env.VITE_REGISTRY_TOKEN === token;
}

export const registryAuthMiddleware = createMiddleware({
  type: "request",
}).server(async ({ request, next }) => {
  const authHeader = getHeader("Authorization");
  const token =
    authHeader?.replace("Bearer ", "") ??
    new URL(request.url).searchParams.get("token");
  if (!isValidToken(token)) {
    console.warn(`Invalid token: ${token}`);
    throw json({ message: "Invalid credentials." }, { status: 403 });
  }
  return next();
});

export const ServerRoute = createServerFileRoute("/api/registry/")
  .middleware([registryAuthMiddleware])
  .methods({
    GET: async () => {
      const program = Effect.gen(function* () {
        const registry = yield* Registry.RegistryApi;
        const all = yield* registry.all();
        return json(all, { status: 200 });
      }).pipe(
        Effect.tapErrorCause(Effect.logError),
        Effect.catchTags({
          RegistryNotFoundError: (error) =>
            Effect.succeed(json({ message: error.message }, { status: 404 })),
        }),
      );

      return serverRuntime.runPromise(program);
    },
  });
