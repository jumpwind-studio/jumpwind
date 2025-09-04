import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import * as BunContext from "@effect/platform-bun/BunContext";
import { TaggedError } from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Schema from "effect/Schema";
import { registryItemSchema } from "shadcn/schema";
import { RegistryItem, RegistryItemFile } from "./schema.js";

// Define error types for better error handling
class RegistryNotFoundError extends TaggedError("RegistryNotFoundError")<{
  readonly name: string;
}> {}

class InvalidRegistryItemError extends TaggedError("InvalidRegistryItemError")<{
  readonly name: string;
}> {}

// type RegistryItem = typeof registryItemSchema._output
// type RegistryItemFile = NonNullable<RegistryItem['files']>[number]

const readRegistryItem = Effect.fn("read-registry-item")(function* (
  file: RegistryItemFile,
) {
  const path = yield* Path.Path;
  const fs = yield* FileSystem.FileSystem;
  const filePath = path.join(process.cwd(), file.path);
  const content = yield* fs.readFileString(filePath, "utf8");
  return yield* Schema.encode(RegistryItemFile)({ ...file, content });
});

export class Registry extends Effect.Service<Registry>()("Registry", {
  accessors: true,
  succeed: {
    getItem: Effect.fn("get-item")(function* (name: string) {
      const registry = yield* Effect.tryPromise({
        try: () => import("@/registry.json").then((mod) => mod.default),
        catch: () => new RegistryNotFoundError({ name }),
      });
      if (name === "registry") {
        return yield* Option.some(registry);
      }

      const component = registry.items.find((c) => c.name === name);
      if (!component) {
        return yield* Option.none();
      }

      const parsed = yield* Effect.tryPromise({
        try: () => registryItemSchema.parseAsync(component),
        catch: () => new InvalidRegistryItemError({ name: component.name }),
      });
      if (!parsed?.files?.length) {
        return yield* Option.none();
      }

      const filesWithContent = yield* Effect.all(
        parsed.files.map(readRegistryItem),
        { concurrency: "unbounded" },
      );
      const registryItem = Schema.encode(RegistryItem)({
        ...parsed,
        files: filesWithContent,
      });

      return yield* Option.some(registryItem);
    }, Effect.orDie),
  },
}) {
  static readonly Live = this.Default.pipe(
    Layer.provide(BunContext.layer),
    Layer.orDie,
  );
}

export const getItemFromRegistry = (name: string) =>
  Effect.gen(function* () {
    const registry = yield* Registry;
    return yield* registry.getItem(name);
  }).pipe(Effect.provide(Registry.Live));
