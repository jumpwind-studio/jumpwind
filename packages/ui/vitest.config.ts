import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    workspace: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(__dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            // Enable browser-based testing for UI components
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          // This setup file applies Storybook project annotations for Vitest
          // More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
    include: ["stories/**/*.stories.tsx", "stories/**/*.test.tsx"],
    exclude: ["stories/**/*.mdx"],
  },
  plugins: [tsconfigPaths(), tailwindcss(), solid()],
});
