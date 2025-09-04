import * as BunContext from "@effect/platform-bun/BunContext";
import { Registry } from "@jumpwind/ui";
import { json } from "@tanstack/solid-start";
import { createServerFileRoute } from "@tanstack/solid-start/server";
import * as Effect from "effect/Effect";

export const ServerRoute = createServerFileRoute(
  "/api/registry/public/$name",
).methods({
  GET: async ({ params }) => {
    const program = Registry.getItem(params.name).pipe(
      Effect.provide(Registry.Live),
      Effect.provide(BunContext.layer),
    );
    const item = await Effect.runPromise(program);

    return json(item);
  },
});
