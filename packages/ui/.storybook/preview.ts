import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { themes } from "storybook/theming";
import type { Preview } from "storybook-solidjs-vite";

import "../registry/jumpwind/styles/styles.css";

const preview = {
  tags: ["autodocs"],
  parameters: {
    actions: {
      // create action args for all props that start with "on"
      argTypesRegex: "^on.*",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      codePanel: true,
      controls: {
        exclude: ["ref", "children"],
        sort: "requiredFirst",
      },
      theme: themes.dark,
    },
    layout: "centered",
  },
  decorators: [
    withThemeByDataAttribute({
      attributeName: "data-mode",
      defaultTheme: "dark",
      themes: {
        light: "light",
        dark: "dark",
      },
    }),
  ],
  args: { theme: "dark" },
} satisfies Preview;

export default preview;
