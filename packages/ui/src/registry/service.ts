import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import * as BunContext from "@effect/platform-bun/BunContext";
import * as Cause from "effect/Cause";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import {
  type RegistryItem,
  registryItemSchema,
  registrySchema,
} from "shadcn/schema";

export class RegistryNotFoundError extends Data.TaggedError(
  "RegistryNotFoundError",
)<{
  readonly cause?: unknown;
}> {}

export class RegistryItemNotFoundError extends Data.TaggedError(
  "RegistryItemNotFoundError",
)<{
  readonly cause?: unknown;
  readonly name: string;
}> {}

const findRoot = Effect.fnUntraced(function* (start = ".") {
  const path = yield* Path.Path;
  const fs = yield* FileSystem.FileSystem;

  let current: string | undefined;
  yield* Effect.loop(path.resolve(start), {
    while: (c) => path.dirname(c) !== c,
    step: (c) => path.dirname(c),
    body: Effect.fnUntraced(function* (c) {
      if (yield* fs.exists(path.join(c, ".git"))) current = c;
    }),
    discard: true,
  });
  return yield* Effect.fromNullable(current);
});

const readRegistryItem = Effect.fn("read-registry-item")(function* (
  file: NonNullable<RegistryItem["files"]>[number],
) {
  const path = yield* Path.Path;
  const fs = yield* FileSystem.FileSystem;

  const root = yield* findRoot();
  const filePath = path.join(root, "/packages/ui", file.path);
  const content = yield* fs.readFileString(filePath, "utf8");
  return {
    content,
    ...file,
  };
});

const parseRegistry = (data: unknown) =>
  Effect.tryPromise({
    try: () => registrySchema.parseAsync(data, { async: true }),
    catch: (cause) => new RegistryNotFoundError({ cause }),
  });

const parseRegistryItem = (name: string, data: unknown) =>
  Effect.tryPromise({
    try: () => registryItemSchema.parseAsync(data, { async: true }),
    catch: (cause) => new RegistryItemNotFoundError({ cause, name }),
  });

const loadRegistry = Effect.tryPromise({
  try: () => import("@jumpwind/ui/registry.json").then((mod) => mod.default),
  catch: (cause) => new RegistryNotFoundError({ cause }),
});

export class Registry extends Effect.Service<Registry>()("Registry", {
  accessors: true,
  effect: Effect.gen(function* () {
    const registry = yield* loadRegistry;
    const parsedRegistry = parseRegistry(registry);
    const cachedRegistry = yield* Effect.cached(parsedRegistry);

    return {
      all: Effect.fn("all")(function* () {
        const registry = yield* cachedRegistry;
        return registry;
      }),
      getItem: Effect.fn("get-item")(
        function* (name: string) {
          const registry = yield* cachedRegistry;
          const component = registry.items.find((c) => c.name === name);
          if (!component?.files?.length) return Option.none<RegistryItem>();
          const files = yield* Effect.all(
            component.files.map(readRegistryItem),
            { concurrency: "unbounded" },
          );

          const parsed = yield* parseRegistryItem(name, {
            ...component,
            files,
          });

          return Option.some<RegistryItem>({
            $schema: "https://ui.shadcn.com/schema/registry-item.json",
            ...parsed,
          });
        },
        (effect, name) =>
          effect.pipe(
            Effect.tapErrorCause((cause) =>
              Effect.logError(Cause.squash(cause)),
            ),
            Effect.catchTags({
              NoSuchElementException: (error) =>
                new RegistryItemNotFoundError({
                  cause: error.message,
                  name: name,
                }),
            }),
          ),
      ),
    };
  }),
}) {
  static readonly Live = this.Default.pipe(
    Layer.provideMerge(BunContext.layer),
    Layer.orDie,
  );
}
