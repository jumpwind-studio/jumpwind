import { Registry } from "@jumpwind/ui";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Logger from "effect/Logger";
import * as LogLevel from "effect/LogLevel";
import * as ManagedRuntime from "effect/ManagedRuntime";

export namespace ServerRuntime {
  export const layer = Layer.mergeAll(
    Registry.Registry.Live,
    Logger.minimumLogLevel(
      import.meta.env.DEV ? LogLevel.Debug : LogLevel.Info,
    ),
  );

  export type Runtime = ManagedRuntime.ManagedRuntime<
    Context,
    Layer.Layer.Error<typeof ServerRuntime.layer>
  >;

  export type Context =
    | Layer.Layer.Success<typeof ServerRuntime.layer>
    | Layer.Layer.Context<typeof ServerRuntime.layer>;
}

export const serverMemoMap = Effect.runSync(Layer.makeMemoMap);

export const serverRuntime = ManagedRuntime.make(
  ServerRuntime.layer,
  serverMemoMap,
);
