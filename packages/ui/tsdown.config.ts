import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/ui/*.tsx", "!src/ui/chart.tsx"],
  dts: { sourcemap: true },
  exports: { devExports: true },
  format: ["esm"],
  unbundle: true,
  copy: [{ from: "public/r", to: "dist/registry" }],
});
