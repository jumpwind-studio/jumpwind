import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import * as BunContext from "@effect/platform-bun/BunContext";
import { TaggedError } from "effect/Data";
import * as Effect from "effect/Effect";
import { registryItemSchema } from "shadcn/schema";

// Define error types for better error handling
class RegistryNotFoundError extends TaggedError("RegistryNotFoundError")<{
  readonly name: string;
}> {}

class InvalidRegistryItemError extends TaggedError("InvalidRegistryItemError")<{
  readonly name: string;
}> {}

const readRegistryItem = Effect.fn("read-registry-item")(function* (
  file: NonNullable<typeof registryItemSchema._type.files>[number],
) {
  const path = yield* Path.Path;
  const fs = yield* FileSystem.FileSystem;
  const filePath = path.join(process.cwd(), file.path);
  const content = yield* fs.readFileString(filePath, "utf8");
  return { ...file, content };
}, Effect.provide(BunContext.layer));

export const getItemFromRegistry = Effect.fn("get-item")(function* (
  name: string,
) {
  const registry = yield* Effect.tryPromise({
    try: () => import("@jumpwind/ui/registry.json").then((mod) => mod.default),
    catch: () => new RegistryNotFoundError({ name }),
  });
  if (name === "registry") {
    return registry;
  }

  const component = registry.items.find((c) => c.name === name);
  if (!component) {
    return undefined;
  }

  const parsed = yield* Effect.tryPromise({
    try: () => registryItemSchema.parseAsync(component),
    catch: () => new InvalidRegistryItemError({ name: component.name }),
  });
  if (!parsed?.files?.length) {
    return undefined;
  }

  const filesWithContent = yield* Effect.all(
    parsed.files.map(readRegistryItem),
    { concurrency: "unbounded" },
  );

  return { ...parsed, files: filesWithContent };
});
