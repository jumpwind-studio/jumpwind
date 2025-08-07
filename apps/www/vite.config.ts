import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

const external: string[] = [];

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        external,
      },
    },
    ssr: {
      external,
      optimizeDeps: {
        exclude: external,
      },
    },
    optimizeDeps: {
      exclude: external,
    },
    resolve: {
      dedupe: ["solid-js"],
    },
    plugins: [
      tsconfigPaths(),
      tailwindcss(),
      solid({ ssr: true }),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        sourcemap: true,
        filename: "stats.html",
      }),
    ],
  };
});
