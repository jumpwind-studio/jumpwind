import { json } from "@tanstack/solid-start";
import { createServerFileRoute } from "@tanstack/solid-start/server";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as Registry from "@/lib/registry";
import { serverRuntime } from "@/lib/runtime";
import { registryAuthMiddleware } from "./index.js";

export const ServerRoute = createServerFileRoute("/api/registry/$name")
  .middleware([registryAuthMiddleware])
  .methods({
    GET: async ({ params, pathname }) => {
      const program = Effect.gen(function* () {
        const registry = yield* Registry.RegistryApi;
        const item = yield* registry.getItem(params.name);
        if (Option.isNone(item)) {
          return json(
            {
              path: pathname,
              message: "Invalid URL",
            },
            { status: 404 },
          );
        }
        return json(item.value, { status: 200 });
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
