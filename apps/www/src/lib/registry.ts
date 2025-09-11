import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import * as BunContext from "@effect/platform-bun/BunContext";
import * as Cause from "effect/Cause";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as S from "effect/Schema";
import { registryItemSchema, registrySchema } from "shadcn/schema";

const RegistryItemTemplateLiteral = S.TemplateLiteralParser(
  S.Literal("registry:"),
  S.NonEmptyString,
);

export class RegistryItemType extends S.transform(
  RegistryItemTemplateLiteral,
  S.String,
  {
    // optional but you get better error messages from TypeScript
    strict: true,
    decode: ([_, type]) => type,
    encode: (type) => ["registry:", type] as const,
  },
) {}

export const RegistryItemKind = S.Literal(
  ...([
    "registry:lib",
    "registry:block",
    "registry:component",
    "registry:ui",
    "registry:hook",
    "registry:page",
    "registry:file",
    "registry:theme",
    "registry:style",
    "registry:item",
    // Internal use only
    "registry:example",
    "registry:internal",
  ] as const satisfies ReadonlyArray<S.Schema.Type<typeof RegistryItemType>>),
);

export const RegistryItemFile = S.Union(
  S.Struct({
    path: S.String,
    content: S.String.pipe(S.optional),
    target: S.String,
    type: RegistryItemKind.pipe(
      S.pickLiteral("registry:page", "registry:file"),
    ),
  }),
  S.Struct({
    path: S.String,
    content: S.String.pipe(S.optional),
    target: S.String.pipe(S.optional),
    type: RegistryItemKind.pipe(
      S.pickLiteral(
        "registry:lib",
        "registry:block",
        "registry:component",
        "registry:ui",
        "registry:hook",
        "registry:theme",
        "registry:style",
        "registry:item",
        // Internal use only
        "registry:example",
        "registry:internal",
      ),
    ),
  }),
);
export type RegistryItemFile = S.Schema.Type<typeof RegistryItemFile>;

export const RegistryItemCssVars = S.Struct({
  theme: S.Record({ key: S.String, value: S.String }).pipe(S.optional),
  light: S.Record({ key: S.String, value: S.String }).pipe(S.optional),
  dark: S.Record({ key: S.String, value: S.String }).pipe(S.optional),
});

// Recursive type for CSS properties that supports empty objects at any level.
interface CssValueType {
  [key: string]: string | CssValueType;
}

const CssValue = S.Union(
  S.String,
  S.suspend(
    (): S.Schema<CssValueType> => S.Record({ key: S.String, value: CssValue }),
  ),
);

export const RegistryItemCss = S.Record({ key: S.String, value: CssValue });

export const RegistryItemEnvVars = S.Record({
  key: S.String,
  value: S.String,
});

export class RegistryItem extends S.Class<RegistryItem>("RegistryItem")({
  $schema: S.String.pipe(S.optional),
  extends: S.String.pipe(S.optional),
  name: S.String,
  type: RegistryItemKind,
  dependencies: S.Array(S.String).pipe(S.optional),
  devDependencies: S.Array(S.String).pipe(S.optional),
  registryDependencies: S.Array(S.String).pipe(S.optional),
  files: S.Array(RegistryItemFile).pipe(S.optional),
  // Metadata
  title: S.String.pipe(S.optional),
  author: S.String.pipe(S.minLength(2), S.optional),
  description: S.String.pipe(S.optional),
  // Extra
  tailwind: S.Struct({
    config: S.Struct({
      content: S.Array(S.String).pipe(S.optional),
      theme: S.Record({ key: S.String, value: S.Any }).pipe(S.optional),
      plugins: S.Array(S.String).pipe(S.optional),
    }).pipe(S.optional),
  }).pipe(S.optional),
  cssVars: RegistryItemCssVars.pipe(S.optional),
  css: RegistryItemCss.pipe(S.optional),
  envVars: RegistryItemEnvVars.pipe(S.optional),
  meta: S.Record({ key: S.String, value: S.Any }).pipe(S.optional),
  docs: S.String.pipe(S.optional),
  categories: S.Array(S.String).pipe(S.optional),
}) {}

export class Registry extends S.Class<Registry>("Registry")({
  name: S.String,
  homepage: S.String,
  items: S.Array(RegistryItem),
}) {}

export const decodeRegistry = S.decode(Registry);
export const encodeRegistry = S.encode(Registry);

export const RegistryIndex = S.Array(RegistryItem);

export const Styles = S.Array(
  S.Struct({
    name: S.String,
    label: S.String,
  }),
);

export const Icons = S.Record({
  key: S.String,
  value: S.Record({ key: S.String, value: S.String }),
});

export class RegistryBaseColor extends S.Class<RegistryBaseColor>(
  "RegistryBaseColor",
)({
  inlineColors: S.Struct({
    light: S.Record({ key: S.String, value: S.String }),
    dark: S.Record({ key: S.String, value: S.String }),
  }),
  cssVars: RegistryItemCssVars,
  cssVarsV4: RegistryItemCssVars.pipe(S.optional),
  inlineColorsTemplate: S.String,
  cssVarsTemplate: S.String,
}) {}

export const RegistryResolvedItemsTree = RegistryItem.pipe(
  S.pick(
    "dependencies",
    "devDependencies",
    "files",
    "tailwind",
    "cssVars",
    "css",
    "envVars",
    "docs",
  ),
);

export const RegistryConfigItem = S.Union(
  S.String.pipe(
    S.includes("{name}", {
      message: () => "Registry URL must include {name} placeholder",
    }),
    S.annotations({
      description: "Simple string format",
      examples: ["https://example.com/{name}.json"],
    }),
  ),
  S.Struct({
    url: S.String.pipe(
      S.includes("{name}", {
        message: () => "Registry URL must include {name} placeholder",
      }),
    ),
    params: S.Record({ key: S.String, value: S.String }).pipe(S.optional),
    headers: S.Record({ key: S.String, value: S.String }).pipe(S.optional),
  }).pipe(
    S.annotations({
      description: "Advanced object format with auth options",
    }),
  ),
);

export const RegistryConfig = S.Record({
  key: S.String.pipe(
    S.startsWith("@", {
      message: () => "Registry names must start with @ (e.g., @v0, @acme)",
    }),
  ),
  value: RegistryConfigItem,
});

export class BaseConfig extends S.Class<BaseConfig>("BaseConfig")({
  $schema: S.String.pipe(S.optional),
  style: S.String,
  rsc: S.BooleanFromUnknown.pipe(S.optionalWith({ default: () => false })),
  tsx: S.BooleanFromUnknown.pipe(S.optionalWith({ default: () => true })),
  tailwind: S.Struct({
    config: S.String.pipe(S.optional),
    css: S.String,
    baseColor: S.String,
    cssVariables: S.Boolean.pipe(S.optionalWith({ default: () => true })),
    prefix: S.String.pipe(S.optionalWith({ default: () => "" })),
  }),
  iconLibrary: S.String.pipe(S.optional),
  aliases: S.Struct({
    components: S.String,
    utils: S.String,
    ui: S.String.pipe(S.optional),
    lib: S.String.pipe(S.optional),
    hooks: S.String.pipe(S.optional),
  }),
  registries: RegistryConfig.pipe(S.optional),
}) {}

export class Config extends BaseConfig.extend<Config>("Config")({
  resolvedPaths: S.Struct({
    cwd: S.String,
    tailwindConfig: S.String,
    tailwindCss: S.String,
    utils: S.String,
    components: S.String,
    lib: S.String,
    hooks: S.String,
    ui: S.String,
  }),
}) {}

// TODO: type the key.
// Okay for now since I don't want a breaking change.
// export const WorkspaceConfig = S.Record({ key: Config, value: S.Any });

export class SearchResultItem extends S.Class<SearchResultItem>(
  "SearchResultItem",
)({
  name: S.String,
  type: S.String.pipe(S.optional),
  description: S.String.pipe(S.optional),
  registry: S.String,
  addCommandArgument: S.String,
}) {}

export class SearchResults extends S.Class<SearchResults>("SearchResults")({
  pagination: S.Struct({
    total: S.Positive,
    offset: S.Positive,
    limit: S.Positive,
    hasMore: S.Boolean,
  }),
  items: S.Array(SearchResultItem),
}) {}

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

export class RegistryApi extends Effect.Service<RegistryApi>()("RegistryApi", {
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
