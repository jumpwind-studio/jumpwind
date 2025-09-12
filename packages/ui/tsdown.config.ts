import { defineConfig } from "tsdown";

export default defineConfig({
  exports: {
    devExports: true,
  },
  entry: ["src/ui/*.tsx"],
  unbundle: true,
  format: ["esm"],
  dts: {
    sourcemap: true,
  },
});
