import { defineConfig, type UserConfig } from "tsdown";
import * as preset from "tsup-preset-solid";

const files = Object.entries({
  accordion: "src/ui/accordion.tsx",
  "alert-dialog": "src/ui/alert-dialog.tsx",
  alert: "src/ui/alert.tsx",
  avatar: "src/ui/avatar.tsx",
  badge: "src/ui/badge.tsx",
  breadcrumb: "src/ui/breadcrumb.tsx",
  button: "src/ui/button.tsx",
  calendar: "src/ui/calendar.tsx",
  card: "src/ui/card.tsx",
  checkbox: "src/ui/checkbox.tsx",
  collapsible: "src/ui/collapsible.tsx",
  combobox: "src/ui/combobox.tsx",
  command: "src/ui/command.tsx",
  commandbox: "src/ui/commandbox.tsx",
  container: "src/ui/container.tsx",
  "context-menu": "src/ui/context-menu.tsx",
  "date-picker": "src/ui/date-picker.tsx",
  dialog: "src/ui/dialog.tsx",
  drawer: "src/ui/drawer.tsx",
  "dropdown-menu": "src/ui/dropdown-menu.tsx",
  flex: "src/ui/flex.tsx",
  form: "src/ui/form.tsx",
  grid: "src/ui/grid.tsx",
  "hover-card": "src/ui/hover-card.tsx",
  image: "src/ui/image.tsx",
  "input-otp": "src/ui/input-otp.tsx",
  input: "src/ui/input.tsx",
  kbd: "src/ui/kbd.tsx",
  label: "src/ui/label.tsx",
  link: "src/ui/link.tsx",
  menubar: "src/ui/menubar.tsx",
  "navigation-menu": "src/ui/navigation-menu.tsx",
  "number-field": "src/ui/number-field.tsx",
  pagination: "src/ui/pagination.tsx",
  popover: "src/ui/popover.tsx",
  progress: "src/ui/progress.tsx",
  "radio-group": "src/ui/radio-group.tsx",
  resizable: "src/ui/resizable.tsx",
  select: "src/ui/select.tsx",
  separator: "src/ui/separator.tsx",
  sheet: "src/ui/sheet.tsx",
  sidebar: "src/ui/sidebar.tsx",
  skeleton: "src/ui/skeleton.tsx",
  slider: "src/ui/slider.tsx",
  sonner: "src/ui/sonner.tsx",
  switch: "src/ui/switch.tsx",
  table: "src/ui/table.tsx",
  tabs: "src/ui/tabs.tsx",
  "text-field": "src/ui/text-field.tsx",
  textarea: "src/ui/textarea.tsx",
  "toggle-group": "src/ui/toggle-group.tsx",
  toggle: "src/ui/toggle.tsx",
  tooltip: "src/ui/tooltip.tsx",
  typography: "src/ui/typography.tsx",
}).map(([_name, path]) => ({
  // name,
  entry: path,
  dev_entry: true,
}));

const preset_options: preset.PresetOptions = {
  entries: [
    ...files,
    {
      name: "form",
      entry: "./src/form/index.tsx",
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
        cjsDefault: false,
        format: ["esm"],
        dts: {
          sourcemap: true,
        },
        loader: {
          ...opt.loader,
        } as Record<string, "tsx">,
      }) satisfies UserConfig,
  );
});
