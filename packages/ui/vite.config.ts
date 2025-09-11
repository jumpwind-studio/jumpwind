import * as path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@repo/ui",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web", /effect/],
      output: {
        globals: {
          "@effect/platform-bun/BunContext": "BunContext",
          "@effect/platform/FileSystem": "FileSystem",
          "@effect/platform/Path": "Path",
          "effect/Cause": "Cause",
          "effect/Data": "Data",
          "effect/Effect": "Effect",
          "effect/Layer": "Layer",
          "effect/Option": "Option",
          "solid-js": "Solid",
        },
      },
    },
  },
  resolve: {
    conditions: ["development", "solid", "browser"],
  },
  plugins: [tsconfigPaths(), tailwindcss(), solid()],
});
