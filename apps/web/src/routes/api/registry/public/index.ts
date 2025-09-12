import { Registry } from "@jumpwind/ui";
import { json } from "@tanstack/solid-start";
import { createServerFileRoute } from "@tanstack/solid-start/server";
import * as Effect from "effect/Effect";
import { serverRuntime } from "@/lib/runtime";

export const ServerRoute = createServerFileRoute(
  "/api/registry/public/",
).methods({
  GET: async () => {
    const program = Effect.gen(function* () {
      const registry = yield* Registry.Registry;
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
