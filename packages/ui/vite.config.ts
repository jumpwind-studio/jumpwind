import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "@jumpwind/ui",
      fileName: "jumpwind",
    },
    rollupOptions: {
      external: [
        "solid-js",
        "@effect/platform",
        "@effect/platform-bun",
        "@effect/platform-node-shared",
        "effect",
        /effect/,
      ],
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
  plugins: [tsconfigPaths(), tailwindcss(), solid()],
});
