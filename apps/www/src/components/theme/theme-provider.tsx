import { createEffect, createSignal, type FlowProps, on } from "solid-js";
import {
  type Theme,
  ThemeContext,
  type ThemeContextValue,
} from "./theme-context.js";

function setDarkStyle() {
  document.documentElement.style.colorScheme = "dark";
  document.documentElement.setAttribute("data-mode", "dark");
}

function setLightStyle() {
  document.documentElement.style.colorScheme = "light";
  document.documentElement.removeAttribute("data-mode");
}

function setDark() {
  if (window?.localStorage) {
    window.localStorage.theme = "dark";
  }
  setDarkStyle();
}

function setLight() {
  if (window?.localStorage) {
    window.localStorage.theme = "light";
  }
  setLightStyle();
}

function setSystemTheme() {
  window?.localStorage.removeItem("theme");

  if (window?.matchMedia("(prefers-color-scheme: dark)")?.matches) {
    setDarkStyle();
  } else {
    setLightStyle();
  }
}

export function getSystem(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  if (
    window.localStorage?.theme === "dark" ||
    (!window.localStorage?.theme &&
      matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return "dark";
  }

  return "light";
}

export function ThemeProvider(props: FlowProps<{ defaultTheme?: Theme }>) {
  const [theme, setTheme] = createSignal(props?.defaultTheme ?? getSystem());

  createEffect(
    on(theme, (theme) => {
      switch (theme) {
        case "dark":
          return setDark();
        case "light":
          return setLight();
        case "system":
          return setSystemTheme();
        default:
          console.warn(`Unknown theme: ${theme}. Falling back to system.`);
          setSystemTheme();
      }
    }),
  );

  const toggleTheme = () => {
    setTheme((c) => (c === "dark" ? "light" : "dark"));
  };

  const contextValue: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
}
