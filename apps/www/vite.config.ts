import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
// import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      target: "bun",
      customViteSolidPlugin: true,
    }),
    // solid(),
    solid({ ssr: true }),
    // visualizer({
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    //   sourcemap: true,
    //   filename: "stats.html",
    // }) as PluginOption,
  ],
});
