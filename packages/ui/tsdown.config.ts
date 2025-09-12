import { defineConfig, type UserConfig } from "tsdown";
import * as preset from "tsup-preset-solid";

const preset_options: preset.PresetOptions = {
  entries: [
    {
      name: "components",
      entry: "./src/ui/index.ts",
      dev_entry: true,
    },
    {
      name: "form",
      entry: "./src/form/index.ts",
      dev_entry: true,
    },
  ],
  // Set to `true` to remove all `console.*` calls and `debugger` statements in prod builds
  drop_console: true,
  // Set to `true` to generate a CommonJS build alongside ESM
  cjs: false,
};

export default defineConfig((config) => {
  const watching = !!config.watch;

  const parsed_data = preset.parsePresetOptions(preset_options, watching);

  if (!watching) {
    const package_fields = preset.generatePackageExports(parsed_data);

    console.log(
      `\npackage.json: \n${JSON.stringify(package_fields, null, 2)}\n\n`,
    );

    /*
     * Will update ./package.json with the correct export fields
     */
    preset.writePackageJson(package_fields);
  }

  const opts = preset.generateTsupOptions(parsed_data);
  return opts.map(
    (opt) =>
      ({
        ...opt,
        treeshake: typeof opt.treeshake === "boolean" ? opt.treeshake : true,
        loader: {
          ...opt.loader,
        } as Record<string, "tsx">,
      }) satisfies UserConfig,
  );
});
