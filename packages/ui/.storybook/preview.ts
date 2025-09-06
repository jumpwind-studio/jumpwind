import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { themes } from "storybook/theming";
import type { Preview } from "storybook-solidjs-vite";

import "../registry/jumpwind/ui/styles.css";

const preview = {
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
  tags: ["autodocs"],
  args: { theme: "dark" },
  argTypes: {
    variant: {
      table: {
        defaultValue: {
          summary: "default",
        },
      },
    },
  },
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
        exclude: ["ref"],
        sort: "requiredFirst",
      },
      theme: themes.dark,
    },
    layout: "centered",
  },
} satisfies Preview;

export default preview;
