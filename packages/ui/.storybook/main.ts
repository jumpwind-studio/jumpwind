// import { dirname, join } from "node:path";
import type { StorybookConfig } from "storybook-solidjs-vite";
import { mergeConfig } from "vite";

const config = {
  framework: "storybook-solidjs-vite",
  addons: [
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
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  core: {
    builder: "@storybook/builder-vite",
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
      propFilter: (prop: any) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
} satisfies StorybookConfig;

export default config;
