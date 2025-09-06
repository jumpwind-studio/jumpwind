// import { dirname, join } from "node:path";
import type { StorybookConfig } from "storybook-solidjs-vite";
import { mergeConfig } from "vite";

function getAbsolutePath(value: string): any {
  return value;
  // return dirname(require.resolve(join(value, "../../../package.json")));
}

const config = {
  framework: "storybook-solidjs-vite",
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-themes",
    {
      name: "@storybook/addon-vitest",
      options: {
        cli: false,
      },
    },
  ],
  stories: [
    getAbsolutePath("../stories/**/*.mdx"),
    getAbsolutePath("../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"),
    getAbsolutePath("../stories/label.stories.tsx"),
  ],
  core: {
    builder: "@storybook/builder-vite", // 👈 The builder enabled here.
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      define: {
        "process.env": {},
      },
    });
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      // 👇 Default prop filter, which excludes props from node_modules
      propFilter: (prop: any) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
} satisfies StorybookConfig;

export default config;
