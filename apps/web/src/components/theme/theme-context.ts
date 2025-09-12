import type { Accessor, Setter } from "solid-js";
import { createContext } from "solid-js";

export type Theme = "dark" | "light" | "system";

export interface ThemeContextValue {
  theme: Accessor<Theme>;
  setTheme: Setter<Theme>;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: () => "dark" as const,
  setTheme: () => {},
  toggleTheme: () => {},
});
