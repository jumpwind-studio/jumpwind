import type { StorybookConfig } from "storybook-solidjs-vite";

// import { mergeConfig } from "vite";

const config = {
  framework: "storybook-solidjs-vite",
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    {
      name: "@storybook/addon-vitest",
      options: {
        cli: false,
      },
    },
  ],
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  async viteFinal(config) {
    return {
      ...config,
      define: {
        "process.env": {},
      },
    };
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
