import { json } from "@tanstack/solid-start";
import { createServerFileRoute } from "@tanstack/solid-start/server";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as Registry from "@/lib/registry";
import { serverRuntime } from "@/lib/runtime";

export const ServerRoute = createServerFileRoute(
  "/api/registry/public/$name",
).methods({
  GET: async ({ params }) => {
    const program = Effect.gen(function* () {
      const registry = yield* Registry.RegistryApi;
      const item = yield* registry.getItem(params.name);
      return json(Option.getOrThrow(item), { status: 200 });
    }).pipe(
      Effect.catchTags({
        BadArgument: (error) =>
          Effect.succeed(json({ message: error.message }, { status: 400 })),
        RegistryItemNotFoundError: (error) =>
          Effect.succeed(json({ message: error.message }, { status: 404 })),
        RegistryNotFoundError: (error) =>
          Effect.succeed(json({ message: error.message }, { status: 404 })),
        SystemError: (error) =>
          Effect.succeed(json({ message: error.message }, { status: 500 })),
      }),
    );

    return serverRuntime.runPromise(program);
  },
});
