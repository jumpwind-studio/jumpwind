import * as S from "effect/Schema";

// Note: if you edit the schema here, you must also edit the schema in the
// apps/www/public/schema/registry-item.json file.

const RegistryItemTemplateLiteral = S.TemplateLiteralParser(
  S.Literal("registry"),
  S.Literal(":"),
  S.NonEmptyString,
);

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
  ] as const satisfies ReadonlyArray<
    S.Schema.Encoded<typeof RegistryItemTemplateLiteral>
  >),
);

class BaseRegistryItem extends S.Class<BaseRegistryItem>("BaseRegistryItem")({
  path: S.String,
  content: S.String.pipe(S.optional),
  type: RegistryItemTemplateLiteral,
}) {}

S;

class RegistryItemWithTarget extends BaseRegistryItem.extend<RegistryItemWithTarget>(
  "RegistryItemWithTarget",
)({
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
}) {}

class RegistryItemWithoutTarget extends BaseRegistryItem.extend<RegistryItemWithoutTarget>(
  "RegistryItemWithoutTarget",
)({
  target: S.String,
  type: RegistryItemKind.pipe(S.pickLiteral("registry:page", "registry:file")),
}) {}

const RegistryItemFile = S.Union(
  RegistryItemWithTarget,
  RegistryItemWithoutTarget,
);

export const RegistryItemTailwind = S.Struct({
  config: S.Struct({
    content: S.Array(S.String).pipe(S.optional),
    theme: S.Record({ key: S.String, value: S.Any }).pipe(S.optional),
    plugins: S.Array(S.String).pipe(S.optional),
  }).pipe(S.optional),
});

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
type CssValue = S.Schema.Type<typeof CssValue>;

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
  title: S.String.pipe(S.optional),
  author: S.String.pipe(S.minLength(2), S.optional),
  description: S.String.pipe(S.optional),
  dependencies: S.Array(S.String).pipe(S.optional),
  devDependencies: S.Array(S.String).pipe(S.optional),
  registryDependencies: S.Array(S.String).pipe(S.optional),
  files: S.Array(RegistryItemFile).pipe(S.optional),
  tailwind: RegistryItemTailwind.pipe(S.optional),
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
export const WorkspaceConfig = S.Record({ key: Config, value: S.Any });

export const SearchResultItem = S.Struct({
  name: S.String,
  type: S.String.pipe(S.optional),
  description: S.String.pipe(S.optional),
  registry: S.String,
  addCommandArgument: S.String,
});

export const SearchResults = S.Struct({
  pagination: S.Struct({
    total: S.Positive,
    offset: S.Positive,
    limit: S.Positive,
    hasMore: S.Boolean,
  }),
  items: S.Array(SearchResultItem),
});
